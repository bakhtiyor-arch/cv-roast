"use client"

import { useCallback, useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { HomeView } from "@/components/home-view"
import { LoadingModal } from "@/components/loading-modal"
import { ResultsView } from "@/components/results-view"
import { roastCv, roastCvDemo } from "@/lib/api"
import type { RoastResult } from "@/lib/roast-data"
import type { Lang } from "@/lib/i18n"

type View = "home" | "results"
type Theme = "dark" | "light"

export default function Page() {
  const [theme, setTheme] = useState<Theme>("dark")
  const [lang, setLang] = useState<Lang>("uz")
  const [view, setView] = useState<View>("home")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string>("demo_resume.pdf")
  const [result, setResult] = useState<RoastResult | null>(null)

  useEffect(() => {
    const root = document.documentElement
    root.classList.toggle("dark", theme === "dark")
    root.classList.toggle("light", theme === "light")
  }, [theme])

  useEffect(() => {
    const tg = (window as unknown as { Telegram?: { WebApp?: { expand?: () => void; ready?: () => void } } }).Telegram
      ?.WebApp
    try {
      tg?.ready?.()
      tg?.expand?.()
    } catch {
      /* not in Telegram */
    }
  }, [])

  const toggleTheme = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), [])

  const startRoast = useCallback(
    async (file: File | null) => {
      setError(null)
      setLoading(true)
      setFileName(file?.name ?? "demo_resume.pdf")
      try {
        const roastResult = file ? await roastCv(file) : await roastCvDemo()
        setResult(roastResult)
        setView("results")
        window.scrollTo({ top: 0 })
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.")
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  const goHome = useCallback(() => {
    setView("home")
    setResult(null)
    setError(null)
    window.scrollTo({ top: 0 })
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        lang={lang}
        setLang={setLang}
        onLogoClick={goHome}
        view={view}
      />

      {view === "home" ? (
        <HomeView lang={lang} onRoast={startRoast} error={error} />
      ) : (
        result && <ResultsView lang={lang} fileName={fileName} result={result} onBack={goHome} onAnother={goHome} />
      )}

      {loading && <LoadingModal lang={lang} onDone={() => {}} />}
    </div>
  )
}
