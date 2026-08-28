import type { RoastResult } from "./roast-data"

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000"

type BackendCardData = {
  header_badge: string
  overconfidence: number
  stackoverflow: number
  coffee: string
  ai_verdict: string
}

type BackendResponse = {
  gender: string
  rank_title: string
  developer_level: string
  intensity: number
  roast_text: string
  salary_usd: string
  salary_uzs: string
  fixes: string[]
  card_data: BackendCardData
}

type ApiSuccess = { success: true; data: BackendResponse }
type ApiError = { success: false; error: string }
type ApiResponse = ApiSuccess | ApiError

function mapBackendToRoastResult(data: BackendResponse): RoastResult {
  const paragraphs = data.roast_text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

  const gender: "boy" | "girl" = data.gender === "girl" ? "girl" : "boy"

  return {
    rank: data.rank_title,
    intensity: Math.min(5, Math.max(1, data.intensity)),
    gender,
    developerLevel: data.developer_level,
    storyBadge: data.card_data.header_badge,
    roast: paragraphs.length > 0 ? paragraphs : [data.roast_text],
    salaryUsd: data.salary_usd,
    salaryUzs: data.salary_uzs,
    fixes: data.fixes,
    verdict: data.card_data.ai_verdict,
    meters: {
      overconfidence: data.card_data.overconfidence,
      stack: data.card_data.stackoverflow,
      coffee: data.card_data.coffee,
    },
  }
}

export async function roastCv(file: File): Promise<RoastResult> {
  const form = new FormData()
  form.append("cv_file", file)

  let res: Response
  try {
    res = await fetch(`${API_BASE}/api/roast-cv`, {
      method: "POST",
      body: form,
    })
  } catch {
    throw new Error("Backend server is unreachable. Please try again later.")
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    let msg = `Server error (${res.status})`
    try {
      const json = JSON.parse(text) as ApiError
      msg = json.error ?? msg
    } catch {
      // non-JSON response
    }
    throw new Error(msg)
  }

  const json: ApiResponse = await res.json()

  if (!json.success) {
    throw new Error((json as ApiError).error ?? "Failed to analyze CV")
  }

  return mapBackendToRoastResult((json as ApiSuccess).data)
}

export async function roastCvDemo(): Promise<RoastResult> {
  let res: Response
  try {
    res = await fetch(`${API_BASE}/api/roast-cv?demo=true`, {
      method: "POST",
    })
  } catch {
    throw new Error("Backend server is unreachable. Please try again later.")
  }

  if (!res.ok) {
    const text = await res.text().catch(() => "")
    let msg = `Server error (${res.status})`
    try {
      const json = JSON.parse(text) as ApiError
      msg = json.error ?? msg
    } catch {
      // non-JSON response
    }
    throw new Error(msg)
  }

  const json: ApiResponse = await res.json()

  if (!json.success) {
    throw new Error((json as ApiError).error ?? "Failed to load demo")
  }

  return mapBackendToRoastResult((json as ApiSuccess).data)
}
