"use client"

import { useEffect, useState } from "react"
import { Flame, Check, Loader2 } from "lucide-react"
import { t, type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type Props = {
  lang: Lang
  onDone: () => void
}

const STEP_MS = 900

export function LoadingModal({ lang, onDone }: Props) {
  const tr = t[lang]
  const steps = tr.loading.steps
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (current >= steps.length) {
      const finish = setTimeout(onDone, 500)
      return () => clearTimeout(finish)
    }
    const timer = setTimeout(() => setCurrent((c) => c + 1), STEP_MS)
    return () => clearTimeout(timer)
  }, [current, steps.length, onDone])

  const progress = Math.min(100, Math.round((current / steps.length) * 100))

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/80 p-4 backdrop-blur-md">
      <div className="glass glow-violet w-full max-w-md rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <span className="relative grid h-20 w-20 place-items-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
            <span className="grid h-16 w-16 place-items-center rounded-full bg-primary text-primary-foreground glow-violet">
              <Flame className="h-8 w-8 animate-float-slow" />
            </span>
          </span>
          <h2 className="mt-5 font-display text-xl font-bold">{tr.loading.title}</h2>

          {/* progress bar */}
          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <ul className="mt-6 flex flex-col gap-2.5">
          {steps.map((step, i) => {
            const done = i < current
            const active = i === current
            return (
              <li
                key={step}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-3 py-2.5 text-sm transition-all",
                  done && "border-primary/30 bg-primary/10 text-foreground",
                  active && "border-primary bg-primary/15 text-foreground",
                  !done && !active && "border-transparent text-muted-foreground/50",
                )}
              >
                <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full">
                  {done ? (
                    <Check className="h-4 w-4 text-primary" />
                  ) : active ? (
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  ) : (
                    <span className="h-2 w-2 rounded-full bg-current" />
                  )}
                </span>
                <span className="text-left leading-snug">{step}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
