"use client"

import { motion, useInView, Variants } from "framer-motion"
import { ReactNode, RefObject, useMemo } from "react"
import type { JSX } from "react"

interface TimelineContentProps {
  children: ReactNode
  animationNum: number
  timelineRef: RefObject<HTMLDivElement | null>
  customVariants?: Variants
  as?: keyof JSX.IntrinsicElements
  className?: string
}

export function TimelineContent({
  children,
  animationNum,
  timelineRef,
  customVariants,
  as = "div",
  className = "",
}: TimelineContentProps) {
  const Component = motion[as as keyof typeof motion] as any  as any
  const isInView = useInView(timelineRef, { once: true, amount: 0.3 })

  const defaultVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut",
      },
    }),
  }

  const variants = customVariants || defaultVariants

  return (
    <Component
      custom={animationNum}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </Component>
  )
}