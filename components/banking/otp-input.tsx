'use client'

import { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'

interface OTPInputProps {
  length?: number
  onComplete?: (otp: string) => void
  onChange?: (otp: string) => void
  disabled?: boolean
  error?: boolean
}

export function OTPInput({
  length = 6,
  onComplete,
  onChange,
  disabled = false,
  error = false,
}: OTPInputProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''))
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, length)
  }, [length])

  const handleChange = (index: number, value: string) => {
    if (disabled) return

    // Only allow single digit
    const digit = value.slice(-1)
    if (digit && !/^\d$/.test(digit)) return

    const newOtp = [...otp]
    newOtp[index] = digit
    setOtp(newOtp)

    const otpString = newOtp.join('')
    onChange?.(otpString)

    // Move to next input
    if (digit && index < length - 1) {
      inputRefs.current[index + 1]?.focus()
    }

    // Check if complete
    if (newOtp.every((d) => d !== '') && onComplete) {
      onComplete(otpString)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return

    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault()
      inputRefs.current[index - 1]?.focus()
    }

    if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault()
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    if (disabled) return

    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, length)
    const digits = pastedData.split('').filter((char) => /^\d$/.test(char))

    const newOtp = [...otp]
    digits.forEach((digit, i) => {
      if (i < length) {
        newOtp[i] = digit
      }
    })
    setOtp(newOtp)

    const otpString = newOtp.join('')
    onChange?.(otpString)

    // Focus appropriate input
    const nextEmptyIndex = newOtp.findIndex((d) => d === '')
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus()
    } else {
      inputRefs.current[length - 1]?.focus()
      if (onComplete) {
        onComplete(otpString)
      }
    }
  }

  return (
    <div className="flex items-center justify-center gap-2 sm:gap-3">
      {Array.from({ length }).map((_, index) => (
        <Input
          key={index}
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={otp[index]}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={cn(
            'h-12 w-12 text-center text-lg font-semibold sm:h-14 sm:w-14 sm:text-xl',
            error && 'border-destructive focus-visible:ring-destructive'
          )}
        />
      ))}
    </div>
  )
}
