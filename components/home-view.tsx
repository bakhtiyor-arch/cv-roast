"use client"

import { useRef, useState } from "react"
import {
  Upload,
  Sparkles,
  BrainCircuit,
  Flame,
  Wallet,
  Share2,
  FileText,
  ScanSearch,
  Trophy,
  Send,
  ShieldCheck,
  ChevronDown,
} from "lucide-react"
import { t, type Lang } from "@/lib/i18n"
import { SAMPLES } from "@/lib/roast-data"
import { cn } from "@/lib/utils"

type Props = {
  lang: Lang
  onRoast: (file: File | null) => void
  error?: string | null
}

export function HomeView({ lang, onRoast, error }: Props) {
  return (
    <main>
      <Hero lang={lang} onRoast={onRoast} error={error} />
      <HowItWorks lang={lang} />
      <Samples lang={lang} />
      <TelegramBanner lang={lang} />
      <Faq lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}

/* ---------------- HERO ---------------- */

function Hero({ lang, onRoast, error }: Props) {
  const tr = t[lang]
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragging, setDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const handleFile = (f?: File | null) => {
    if (!f) return
    setFile(f)
  }

  const features = [
    { icon: BrainCircuit, title: tr.features.analysis, desc: tr.featuresDesc.analysis },
    { icon: Flame, title: tr.features.humor, desc: tr.featuresDesc.humor },
    { icon: Wallet, title: tr.features.salary, desc: tr.featuresDesc.salary },
    { icon: Share2, title: tr.features.story, desc: tr.featuresDesc.story },
  ]

  return (
    <section className="relative overflow-hidden bg-grid">
      {/* ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-[-6rem] h-72 w-72 -translate-x-1/2 rounded-full bg-primary/25 blur-[120px]" />
      <div className="pointer-events-none absolute right-[-4rem] top-40 h-64 w-64 rounded-full bg-accent/20 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-xs font-semibold text-secondary-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            {tr.hero.badge}
          </span>
          <h1 className="mt-6 text-balance font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
            <span className="text-glow">{tr.hero.title1}</span>
            <br />
            <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
              {tr.hero.title2}
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base text-muted-foreground sm:text-lg">
            {tr.hero.subtitle}
          </p>
        </div>

        {/* Upload card */}
        <div className="mx-auto mt-10 max-w-2xl">
          <div className="glass glow-violet rounded-3xl p-4 sm:p-6">
            <div
              onDragOver={(e) => {
                e.preventDefault()
                setDragging(true)
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault()
                setDragging(false)
                handleFile(e.dataTransfer.files?.[0])
              }}
              onClick={() => inputRef.current?.click()}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
              className={cn(
                "flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-10 text-center transition-colors",
                dragging ? "border-primary bg-primary/10" : "border-primary/40 hover:border-primary hover:bg-primary/5",
              )}
            >
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={(e) => handleFile(e.target.files?.[0])}
              />
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-primary/15 text-primary animate-float-slow">
                <Upload className="h-7 w-7" />
              </span>
              <p className="mt-4 font-display text-lg font-semibold">
                {file ? file.name : tr.hero.dropTitle}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">{tr.hero.dropHint}</p>
              <p className="mt-3 rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs font-medium text-muted-foreground">
                {tr.hero.maxSize}
              </p>
            </div>

            {error && (
              <div className="mt-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                {error}
              </div>
            )}

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => onRoast(file)}
                className="group flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-6 py-3.5 font-display text-base font-bold text-primary-foreground shadow-lg shadow-primary/30 transition-transform hover:scale-[1.02] active:scale-95"
              >
                <Flame className="h-5 w-5 transition-transform group-hover:rotate-12" />
                {tr.hero.roastMe}
              </button>
              <button
                onClick={() => onRoast(null)}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-secondary/50 px-6 py-3.5 font-semibold text-foreground transition-colors hover:bg-secondary"
              >
                <FileText className="h-5 w-5" />
                {tr.hero.tryDemo}
              </button>
            </div>
            <p className="mt-3 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              {tr.hero.noReg}
            </p>
          </div>
        </div>

        {/* Quick features */}
        <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass rounded-2xl p-4 transition-transform hover:-translate-y-1"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <f.icon className="h-5 w-5" />
              </span>
              <p className="mt-3 font-display text-sm font-bold">{f.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- HOW IT WORKS ---------------- */

function HowItWorks({ lang }: { lang: Lang }) {
  const tr = t[lang]
  const steps = [
    { icon: FileText, title: tr.how.step1Title, desc: tr.how.step1Desc },
    { icon: ScanSearch, title: tr.how.step2Title, desc: tr.how.step2Desc },
    { icon: Trophy, title: tr.how.step3Title, desc: tr.how.step3Desc },
  ]

  return (
    <section id="how" className="scroll-mt-20 border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={tr.how.title} subtitle={tr.how.subtitle} />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {steps.map((s, i) => (
            <div key={s.title} className="glass relative rounded-3xl p-6">
              <span className="absolute right-5 top-5 font-display text-4xl font-bold text-primary/15">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground glow-violet">
                <s.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-balance font-display text-lg font-bold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ---------------- SAMPLES ---------------- */

function Samples({ lang }: { lang: Lang }) {
  const tr = t[lang]
  return (
    <section id="samples" className="scroll-mt-20 border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={tr.samples.title} subtitle={tr.samples.subtitle} />
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SAMPLES.map((s) => (
            <div
              key={s.rank}
              className="glass group rounded-2xl p-5 transition-transform hover:-translate-y-1"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-primary">
                  <Flame className="h-3 w-3" />
                  {s.badge}
                </span>
                <FlameRating value={s.intensity} />
              </div>
              <h3 className="mt-4 text-balance font-display text-lg font-bold leading-snug">
                {s.rank}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function FlameRating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${value} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Flame
          key={i}
          className={cn("h-3.5 w-3.5", i < value ? "text-flame" : "text-muted-foreground/25")}
          fill={i < value ? "currentColor" : "none"}
        />
      ))}
    </span>
  )
}

/* ---------------- TELEGRAM BANNER ---------------- */

function TelegramBanner({ lang }: { lang: Lang }) {
  const tr = t[lang]
  return (
    <section className="border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="glass glow-violet relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="pointer-events-none absolute right-[-3rem] top-[-3rem] h-56 w-56 rounded-full bg-telegram/25 blur-[90px]" />
          <div className="relative flex flex-col items-center gap-6 text-center md:flex-row md:justify-between md:text-left">
            <div className="max-w-xl">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-telegram text-telegram-foreground md:hidden">
                <Send className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-balance font-display text-2xl font-bold sm:text-3xl md:mt-0">
                {tr.telegram.title}
              </h3>
              <p className="mt-3 text-pretty text-sm leading-relaxed text-muted-foreground sm:text-base">
                {tr.telegram.desc}
              </p>
            </div>
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-telegram px-6 py-3.5 font-display font-bold text-telegram-foreground shadow-lg shadow-telegram/30 transition-transform hover:scale-105"
            >
              <Send className="h-5 w-5" />
              {tr.telegram.cta}
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---------------- FAQ ---------------- */

function Faq({ lang }: { lang: Lang }) {
  const tr = t[lang]
  const items = [
    { q: tr.faq.q1, a: tr.faq.a1 },
    { q: tr.faq.q2, a: tr.faq.a2 },
    { q: tr.faq.q3, a: tr.faq.a3 },
  ]
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="scroll-mt-20 border-t border-border py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <SectionHeading title={tr.faq.title} subtitle={tr.faq.subtitle} />
        <div className="mt-8 flex flex-col gap-3">
          {items.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={item.q} className="glass overflow-hidden rounded-2xl">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-sm font-semibold sm:text-base">{item.q}</span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 text-primary transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ---------------- FOOTER ---------------- */

function Footer({ lang }: { lang: Lang }) {
  const tr = t[lang]
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 sm:px-6 md:flex-row lg:px-8">
        <div className="flex items-center gap-2 font-display font-bold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground">
            <Flame className="h-4 w-4" />
          </span>
          CVROAST<span className="-ml-1.5 text-primary">.UZ</span>
        </div>
        <p className="text-center text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} CVROAST.UZ. {tr.footer.rights}
        </p>
        <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
          <a href="#" className="transition-colors hover:text-foreground">
            {tr.footer.terms}
          </a>
          <a href="#" className="transition-colors hover:text-foreground">
            {tr.footer.privacy}
          </a>
          <span className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-primary">
            {tr.footer.tagline}
          </span>
        </div>
      </div>
    </footer>
  )
}

/* ---------------- SHARED ---------------- */

function SectionHeading({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="text-center">
      <h2 className="text-balance font-display text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="mx-auto mt-3 max-w-lg text-pretty text-sm text-muted-foreground sm:text-base">
        {subtitle}
      </p>
    </div>
  )
}
