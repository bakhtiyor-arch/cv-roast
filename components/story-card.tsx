"use client"

import { useMemo, useState } from "react"
import Image from "next/image"
import { Download, Send, Loader2, Globe } from "lucide-react"
import { toPng } from "html-to-image"
import { t, type Lang } from "@/lib/i18n"
import type { RoastResult } from "@/lib/roast-data"
import { cn } from "@/lib/utils"

const MAX_AVATAR_IMAGES = 5

type SkinId = "neon" | "gold" | "retro"

type Skin = {
  id: SkinId
  label: string
  swatch: string
  bg: string
  text: string
  subText: string
  accent: string
  accent2: string
  border: string
  badgeBg: string
  badgeText: string
  track: string
  verdictBg: string
  radius: number
  mono?: boolean
  pixel?: boolean
}

const SKINS: Skin[] = [
  {
    id: "neon",
    label: "Neon Purple",
    swatch: "linear-gradient(135deg,#a855f7,#22d3ee)",
    bg: "radial-gradient(120% 80% at 50% -10%, #3b0f6b 0%, #160a36 45%, #22093f 100%)",
    text: "#f5f3ff",
    subText: "#c4b5fd",
    accent: "#a855f7",
    accent2: "#22d3ee",
    border: "#7c3aed",
    badgeBg: "linear-gradient(90deg,#a855f7,#22d3ee)",
    badgeText: "#0b051b",
    track: "rgba(255,255,255,0.12)",
    verdictBg: "rgba(168,85,247,0.16)",
    radius: 20,
  },
  {
    id: "gold",
    label: "Golden Meme",
    swatch: "linear-gradient(135deg,#eab308,#111111)",
    bg: "radial-gradient(120% 80% at 50% -10%, #2a2200 0%, #0a0a0a 55%, #1a1600 100%)",
    text: "#fef3c7",
    subText: "#d4b106",
    accent: "#eab308",
    accent2: "#f59e0b",
    border: "#eab308",
    badgeBg: "#eab308",
    badgeText: "#0a0a0a",
    track: "rgba(234,179,8,0.18)",
    verdictBg: "rgba(234,179,8,0.12)",
    radius: 18,
  },
  {
    id: "retro",
    label: "Retro Arcade",
    swatch: "linear-gradient(135deg,#34d399,#f472b6)",
    bg: "linear-gradient(180deg,#0d0221 0%,#1b0838 60%,#2a0a4a 100%)",
    text: "#e0f2fe",
    subText: "#67e8f9",
    accent: "#34d399",
    accent2: "#f472b6",
    border: "#34d399",
    badgeBg: "#f472b6",
    badgeText: "#0d0221",
    track: "rgba(52,211,153,0.18)",
    verdictBg: "rgba(52,211,153,0.12)",
    radius: 2,
    mono: true,
    pixel: true,
  },
]

type Props = {
  lang: Lang
  result: RoastResult
}

export function StoryCard({ lang, result }: Props) {
  const tr = t[lang]
  const [skinId, setSkinId] = useState<SkinId>("neon")
  const [downloading, setDownloading] = useState(false)
  const skin = SKINS.find((s) => s.id === skinId)!

  const headerBadge = useMemo(() => {
    const list = tr.results.headerBadges
    return list[Math.floor(Math.random() * list.length)]
  }, [tr.results.headerBadges])

  const randomAvatar = useMemo(() => {
    const idx = Math.floor(Math.random() * MAX_AVATAR_IMAGES) + 1
    return `/avatars/${result.gender}/${idx}.png`
  }, [result.gender])

  const [avatarSrc, setAvatarSrc] = useState(randomAvatar)

  const handleAvatarError = () => {
    if (avatarSrc !== `/avatars/${result.gender}/1.png`) {
      setAvatarSrc(`/avatars/${result.gender}/1.png`)
    }
  }

  const fire = "\uD83D\uDD25".repeat(Math.max(1, Math.min(5, result.intensity)))

  const handleDownload = async () => {
    const cardElement = document.getElementById("story-card-element")
    if (!cardElement) return

    setDownloading(true)
    try {
      const dataUrl = await toPng(cardElement, {
        quality: 0.95,
        pixelRatio: 2,
        cacheBust: true,
        skipFonts: true,
        filter: (node) => true,
      })

      const link = document.createElement("a")
      link.download = `cv-roast-story-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (error) {
      console.error("Failed to export Story Card as PNG:", error)
      alert("Rasm yuklashda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.")
    } finally {
      setDownloading(false)
    }
  }

  const handleTelegramShare = async () => {
    const cardElement = document.getElementById("story-card-element")
    if (!cardElement) {
      alert("Karta topilmadi!")
      return
    }

    try {
      const dataUrl = await toPng(cardElement, {
        quality: 0.95,
        pixelRatio: 2,
        skipFonts: true,
      })

      const response = await fetch(dataUrl)
      const blob = await response.blob()
      const file = new File([blob], "cv-roast-story.png", { type: "image/png" })

      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "AI CV Roast",
          text: "Mening CV tahlilim! Sen ham o'z CV'ingni tekshirib ko'r: https://cv-roast.uz yoki @cvroast_bot",
          files: [file],
        })
      } else {
        const downloadLink = document.createElement("a")
        downloadLink.download = "cv-roast-story.png"
        downloadLink.href = dataUrl
        downloadLink.click()

        alert("Rasm yuklab olindi! Uni endi Telegram orqali do'stlaringizga bemalol yuborishingiz mumkin.")

        const shareUrl = "https://cv-roast.uz"
        const shareText = "Mening CV tahlilim! Sen ham o'z CV'ingni tekshirib ko'r:"
        window.open(`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}`, "_blank")
      }
    } catch (error) {
      console.error("Telegram share failed:", error)
      alert("Ulashishda xatolik yuz berdi. Iltimos qaytadan urinib ko'ring.")
    }
  }

  const meters = [
    { label: tr.results.overconfidence, value: `${result.meters.overconfidence}%`, pct: result.meters.overconfidence, emoji: "\uD83D\uDE80" },
    { label: tr.results.stackReliance, value: `${result.meters.stack}%`, pct: result.meters.stack, emoji: "\uD83D\uDCBB" },
    { label: tr.results.coffeeRatio, value: `\u2615 ${result.meters.coffee}`, pct: 92, emoji: "\u2615" },
  ]

  return (
    <div className="flex flex-col items-center gap-4">
      {/* The capturable card */}
      <div
        id="story-card-element"
        className="relative w-[380px] overflow-hidden shadow-2xl"
        style={{
          height: "675px",
          background: skin.bg,
          color: skin.text,
          border: `${skin.pixel ? 3 : 2}px solid ${skin.border}`,
          borderRadius: skin.radius,
          boxShadow: skin.pixel
            ? `6px 6px 0 0 ${skin.accent2}, 0 0 0 1px ${skin.border}`
            : `0 0 0 1px ${skin.border}55, 0 20px 60px -20px ${skin.accent}66`,
          fontFamily: skin.mono ? "ui-monospace, monospace" : "var(--font-display)",
          lineHeight: "1.4",
        }}
      >
        {/* subtle scanline / grid texture */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            opacity: 0.12,
            backgroundImage: skin.pixel
              ? `repeating-linear-gradient(0deg, ${skin.text}, ${skin.text} 1px, transparent 1px, transparent 4px)`
              : `radial-gradient(${skin.accent}55 1px, transparent 1px)`,
            backgroundSize: skin.pixel ? "100% 4px" : "16px 16px",
          }}
        />

        <div className="relative flex h-full flex-col p-6">

          {/* ====== TOP BADGE ====== */}
          <div className="flex-shrink-0 mx-auto mb-3 flex items-center justify-center px-3 py-1.5 text-center font-extrabold uppercase"
            style={{
              background: skin.badgeBg,
              color: skin.badgeText,
              borderRadius: skin.pixel ? 0 : 999,
              boxShadow: skin.pixel ? `3px 3px 0 0 ${skin.accent}` : "none",
              fontSize: "9.5px",
              lineHeight: "1.4",
              letterSpacing: "0.1em",
            }}
          >
            {headerBadge}
          </div>

          {/* ====== AVATAR ====== */}
          <div className="flex-shrink-0 flex justify-center mb-3">
            <div className="relative h-[180px] w-[180px] overflow-hidden rounded-2xl border border-purple-500/20 shadow-md">
              <Image
                src={avatarSrc}
                alt="Roasted developer meme avatar"
                fill
                sizes="180px"
                className="rounded-2xl object-cover"
                crossOrigin="anonymous"
                priority
                onError={handleAvatarError}
              />
              <div className="absolute right-2 top-2 z-10 flex items-center gap-1 rounded-full border border-orange-500/30 bg-[#0f0826]/90 px-2.5 py-0.5 text-[10px] font-bold text-orange-400">
                {fire} {result.intensity}/5
              </div>
            </div>
          </div>

          {/* ====== JOB TITLE ====== */}
          <div className="flex-shrink-0 text-center mb-4">
            <p className="text-balance px-2 font-extrabold leading-tight line-clamp-2" style={{ color: skin.text, fontSize: "17px" }}>
              {result.rank}
            </p>
          </div>

          {/* ====== METRICS ====== */}
          <div className="flex-shrink-0 space-y-2.5 mb-4">
            {meters.map((m) => (
              <div key={m.label}>
                <div className="flex items-center justify-between font-bold uppercase" style={{ fontSize: "9px", lineHeight: "1.4", letterSpacing: "0.05em" }}>
                  <span style={{ color: skin.subText }}>{m.label} {m.emoji}</span>
                  <span style={{ color: skin.text }}>{m.value}</span>
                </div>
                <div className="mt-1 h-2 w-full overflow-hidden" style={{ background: skin.track, borderRadius: skin.pixel ? 0 : 999 }}>
                  <div style={{ height: "100%", width: `${m.pct}%`, background: `linear-gradient(90deg,${skin.accent},${skin.accent2})`, borderRadius: skin.pixel ? 0 : 999 }} />
                </div>
              </div>
            ))}
          </div>

          {/* ====== AI VERDICT ====== */}
          <div className="flex-shrink-0 rounded-xl p-3 mb-3"
            style={{ background: `${skin.accent}15`, border: `1px dashed ${skin.accent}` }}
          >
            <p className="font-extrabold uppercase" style={{ color: skin.accent, fontSize: "8px", lineHeight: "1.4", letterSpacing: "0.15em" }}>
              {tr.results.verdictLabel} {"\uD83D\uDD25"}
            </p>
            <p className="mt-1 font-semibold leading-snug line-clamp-3" style={{ color: skin.text, fontSize: "11px" }}>
              &ldquo;{result.verdict}&rdquo;
            </p>
          </div>

          {/* ====== SALARY BADGE ====== */}
          <div className="flex-shrink-0 w-full rounded-xl py-2.5 text-center shadow-lg"
            style={{ background: skin.badgeBg, color: skin.badgeText, boxShadow: skin.pixel ? `3px 3px 0 0 ${skin.accent}` : "none" }}
          >
            <p className="font-extrabold uppercase opacity-80" style={{ fontSize: "7px", lineHeight: "1.4", letterSpacing: "0.15em" }}>
              {tr.results.storySalaryLabel}
            </p>
            <p className="font-extrabold" style={{ fontSize: "12px", lineHeight: "1.3" }}>
              {result.salaryUsd} <span className="opacity-70">/</span> {result.salaryUzs}
            </p>
          </div>

          {/* ====== FOOTER (pushed to bottom) ====== */}
          <div className="mt-auto flex items-center justify-between border-t pt-3 font-bold"
            style={{ borderColor: `${skin.border}66`, fontSize: "10px", lineHeight: "1.4" }}
          >
            <div className="flex items-center gap-1.5" style={{ color: skin.accent }}>
              <Globe width={14} height={14} style={{ display: "inline" }} aria-hidden="true" />
              cv-roast.uz
            </div>
            <div className="flex items-center gap-1.5" style={{ color: "#38bdf8" }}>
              <Send width={14} height={14} style={{ display: "inline" }} aria-hidden="true" />
              @cvroast_bot
            </div>
          </div>

        </div>
      </div>

      {/* Skin selector — excluded from capture */}
      <div className="w-[380px]">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {tr.results.skinLabel}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {SKINS.map((s) => (
            <button
              key={s.id}
              onClick={() => setSkinId(s.id)}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border p-2 transition-colors",
                skinId === s.id ? "border-primary bg-primary/10" : "border-border bg-secondary/40 hover:bg-secondary",
              )}
              aria-pressed={skinId === s.id}
            >
              <span className="h-6 w-full rounded-md" style={{ background: s.swatch }} />
              <span className="text-[10px] font-semibold leading-tight">{s.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="w-[380px] flex flex-col gap-2">
        <button
          onClick={handleDownload}
          disabled={downloading}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-primary to-accent px-4 py-3 font-display text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-70"
        >
          {downloading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          {tr.results.downloadCard}
        </button>
        <button
          onClick={handleTelegramShare}
          className="flex items-center justify-center gap-2 rounded-xl bg-telegram px-4 py-3 text-sm font-semibold text-telegram-foreground transition-transform hover:scale-[1.02]"
        >
          <Send className="h-4 w-4" />
          {tr.results.shareTelegram}
        </button>
      </div>
    </div>
  )
}
