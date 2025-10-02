"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface AccuracyGaugeProps {
  accuracy: number
  size?: number
}

export function AccuracyGauge({ accuracy, size = 200 }: AccuracyGaugeProps) {
  const [count, setCount] = useState(0)
  const circumference = 2 * Math.PI * 70
  const offset = circumference - (accuracy / 100) * circumference

  useEffect(() => {
    let start = 0
    const end = accuracy
    const duration = 2000
    const increment = end / (duration / 16)

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)

    return () => clearInterval(timer)
  }, [accuracy])

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r="70"
          stroke="currentColor"
          strokeWidth="12"
          fill="none"
          className="text-muted"
        />
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r="70"
          stroke="url(#gradient)"
          strokeWidth="12"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
          {count}%
        </span>
        <span className="text-sm text-muted-foreground mt-1">Accuracy</span>
      </div>
    </div>
  )
}
