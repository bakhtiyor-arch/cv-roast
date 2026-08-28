"use client"

import {
  ArrowLeft,
  Upload,
  BadgeCheck,
  Flame,
  Wallet,
  Lightbulb,
  Info,
  FileText,
} from "lucide-react"
import { t, type Lang } from "@/lib/i18n"
import type { RoastResult } from "@/lib/roast-data"
import { StoryCard } from "@/components/story-card"
import { cn } from "@/lib/utils"

type Props = {
  lang: Lang
  fileName: string
  result: RoastResult
  onBack: () => void
  onAnother: () => void
}

export function ResultsView({ lang, fileName, result, onBack, onAnother }: Props) {
  const tr = t[lang]

  return (
    <main className="mx-auto max-w-7xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
      {/* Header bar */}
      <div className="glass flex flex-col gap-4 rounded-2xl p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm font-medium transition-colors hover:bg-secondary"
          >
            <ArrowLeft className="h-4 w-4" />
            {tr.results.back}
          </button>
          <div className="hidden items-center gap-2 text-sm text-muted-foreground sm:flex">
            <FileText className="h-4 w-4 text-primary" />
            <span className="max-w-[180px] truncate font-medium text-foreground">{fileName}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
              <BadgeCheck className="h-3.5 w-3.5" />
              {tr.results.done}
            </span>
          </div>
        </div>
        <button
          onClick={onAnother}
          className="flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary to-accent px-4 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02]"
        >
          <Upload className="h-4 w-4" />
          {tr.results.another}
        </button>
      </div>

      {/* mobile file badge */}
      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground sm:hidden">
        <FileText className="h-4 w-4 text-primary" />
        <span className="max-w-[160px] truncate font-medium text-foreground">{fileName}</span>
        <span className="inline-flex items-center gap-1 rounded-full bg-primary/15 px-2.5 py-1 text-xs font-semibold text-primary">
          <BadgeCheck className="h-3.5 w-3.5" />
          {tr.results.done}
        </span>
      </div>

      {/* Dashboard grid */}
      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* LEFT: critique */}
        <div className="flex flex-col gap-5 lg:col-span-2">
          {/* Rank */}
          <div className="glass glow-violet rounded-3xl p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {tr.results.rankLabel}
            </p>
            <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
              <h1 className="text-balance font-display text-2xl font-bold leading-tight sm:text-3xl">
                {result.rank}
              </h1>
              <IntensityMeter value={result.intensity} />
            </div>
          </div>

          {/* Roast */}
          <div className="glass rounded-3xl p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <Flame className="h-5 w-5 text-flame" />
              {tr.results.roastTitle}
            </h2>
            <div className="mt-4 flex flex-col gap-3">
              {result.roast.map((p, i) => (
                <p key={i} className="text-pretty text-sm leading-relaxed text-muted-foreground">
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Salary */}
          <div className="glass overflow-hidden rounded-3xl">
            <div className="relative p-6">
              <div className="pointer-events-none absolute right-[-2rem] top-[-2rem] h-40 w-40 rounded-full bg-primary/20 blur-[70px]" />
              <h2 className="flex items-center gap-2 font-display text-lg font-bold">
                <Wallet className="h-5 w-5 text-primary" />
                {tr.results.salaryTitle}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">{tr.results.salaryMonthly}</p>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border bg-secondary/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    USD
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold text-foreground sm:text-3xl">
                    {result.salaryUsd}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-secondary/40 p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    UZS
                  </p>
                  <p className="mt-1 font-display text-2xl font-bold text-foreground sm:text-3xl">
                    {result.salaryUzs}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Fixes */}
          <div className="glass rounded-3xl p-6">
            <h2 className="flex items-center gap-2 font-display text-lg font-bold">
              <Lightbulb className="h-5 w-5 text-gold" />
              {tr.results.fixTitle}
            </h2>
            <ul className="mt-4 flex flex-col gap-3">
              {result.fixes.map((fix, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                    {i + 1}
                  </span>
                  <span className="text-sm leading-relaxed text-muted-foreground">{fix}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="flex items-start gap-3 rounded-2xl border border-border bg-secondary/30 p-4">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
            <p className="text-xs leading-relaxed text-muted-foreground">{tr.results.disclaimer}</p>
          </div>
        </div>

        {/* RIGHT: story card */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <StoryCard lang={lang} result={result} />
          </div>
        </div>
      </div>
    </main>
  )
}

function IntensityMeter({ value }: { value: number }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-3 py-1.5">
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Flame
            key={i}
            className={cn("h-4 w-4", i < value ? "text-flame" : "text-muted-foreground/25")}
            fill={i < value ? "currentColor" : "none"}
          />
        ))}
      </span>
      <span className="font-display text-sm font-bold">{value}/5</span>
    </span>
  )
}
