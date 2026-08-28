"use client"

import { useState } from "react"
import { Flame, Moon, Sun, Send, Menu, X } from "lucide-react"
import { LANGS, t, type Lang } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type Props = {
  theme: "dark" | "light"
  toggleTheme: () => void
  lang: Lang
  setLang: (l: Lang) => void
  onLogoClick: () => void
  view?: "home" | "results"
}

export function Navbar({ theme, toggleTheme, lang, setLang, onLogoClick, view }: Props) {
  const [open, setOpen] = useState(false)
  const tr = t[lang]

  const links = [
    { href: "#how", label: tr.nav.capabilities },
    { href: "#samples", label: tr.nav.samples },
    { href: "#faq", label: tr.nav.faq },
  ]

  const handleNavLink = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (view === "results") {
      e.preventDefault()
      onLogoClick()
    }
  }

  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-b border-border">
        <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          {/* Logo */}
          <button
            onClick={onLogoClick}
            className="flex items-center gap-2 font-display text-lg font-bold tracking-tight"
          >
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground glow-violet">
              <Flame className="h-5 w-5" />
            </span>
            <span className="text-glow">
              CVROAST<span className="text-primary">.UZ</span>
            </span>
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => handleNavLink(e, l.href)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            {/* Language selector */}
            <div className="flex items-center rounded-lg border border-border bg-secondary/50 p-0.5">
              {LANGS.map((l) => (
                <button
                  key={l.code}
                  onClick={() => setLang(l.code)}
                  className={cn(
                    "rounded-md px-2 py-1 text-xs font-semibold transition-colors",
                    lang === l.code
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                  aria-pressed={lang === l.code}
                >
                  {l.label}
                </button>
              ))}
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-secondary/50 text-foreground transition-colors duration-300 hover:bg-secondary"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>

            {/* Telegram CTA */}
            <a
              href="https://t.me"
              target="_blank"
              rel="noreferrer"
              className="hidden items-center gap-1.5 rounded-lg bg-telegram px-3 py-2 text-sm font-semibold text-telegram-foreground transition-transform hover:scale-105 sm:flex"
            >
              <Send className="h-4 w-4" />
              {tr.nav.bot}
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setOpen((o) => !o)}
              className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-secondary/50 text-foreground lg:hidden"
              aria-label="Menu"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile dropdown */}
        {open && (
          <div className="border-t border-border px-4 pb-4 pt-2 lg:hidden">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => {
                    handleNavLink(e, l.href)
                    setOpen(false)
                  }}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="https://t.me"
                target="_blank"
                rel="noreferrer"
                className="mt-1 flex items-center justify-center gap-1.5 rounded-lg bg-telegram px-3 py-2 text-sm font-semibold text-telegram-foreground"
              >
                <Send className="h-4 w-4" />
                {tr.nav.bot}
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
