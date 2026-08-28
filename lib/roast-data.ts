import type { Lang } from "./i18n"

export type Sample = {
  rank: string
  intensity: number // out of 5
  badge: string
}

export const SAMPLES: Sample[] = [
  { rank: "Senior StackOverflow Copy-Paster", intensity: 5, badge: "CTRL+C / CTRL+V" },
  { rank: "Bug Creator & Coffee Drinker", intensity: 4, badge: "CERTIFIED BUG GENERATOR" },
  { rank: "Junior HTML/CSS Master", intensity: 3, badge: "DIV ENJOYER" },
  { rank: "Professional Meeting Attendee", intensity: 4, badge: "ZOOM WARRIOR" },
  { rank: "LinkedIn Buzzword Engineer", intensity: 5, badge: "SYNERGY MAXIMIZER" },
  { rank: "It Works On My Machine Dev", intensity: 3, badge: "LOCALHOST HERO" },
]

export type RoastResult = {
  rank: string
  intensity: number
  gender: "boy" | "girl"
  developerLevel: string
  storyBadge: string
  roast: string[]
  salaryUsd: string
  salaryUzs: string
  fixes: string[]
  verdict: string
  meters: { overconfidence: number; stack: number; coffee: string }
}

const DATA: Record<Lang, RoastResult> = {
  uz: {
    rank: "Senior StackOverflow Copy-Paster",
    intensity: 5,
    gender: "boy",
    developerLevel: "Senior",
    storyBadge: "CERTIFIED BUG GENERATOR",
    roast: [
      "Rezyumeingizni o\u2018qidim va StackOverflow'ning eng faol foydalanuvchisi bilan tanishgandek his qildim \u2014 faqat savol berish tomonidan emas, balki javoblarni ko\u2018chirish tomonidan.",
      "\u201cJamoada ishlash\u201d, \u201cnatijaga yo\u2018naltirilgan\u201d va \u201ctez o\u2018rganaman\u201d \u2014 bu klishelarni hisoblab, kalkulyatorim qizib ketdi. 15 ta ko\u2018nikma yozgansiz, lekin ularning 12 tasi \u201cMicrosoft Word\u201d darajasida.",
      "\u201c5 yillik tajriba\u201d deb yozibsiz, lekin loyihalar bo\u2018limi bitta to-do app va bitta ko\u2018chirilgan template'dan iborat. HR menejer buni o\u2018qib, qahva o\u2018rniga ko\u2018z yoshini ichdi.",
    ],
    salaryUsd: "$800 \u2013 $1,200",
    salaryUzs: "10.1M \u2013 15.2M UZS",
    fixes: [
      "\u201cTez o\u2018rganaman\u201d o\u2018rniga aniq loyiha va o\u2018lchanadigan natijalarni yozing.",
      "Ko\u2018nikmalar ro\u2018yxatini qisqartiring \u2014 15 tadan 6 ta real ko\u2018nikmaga.",
      "Har bir ish joyiga bitta konkret yutuqni raqamlar bilan qo\u2018shing.",
    ],
    verdict: "Faqat kompaniyangizga cheksiz qahva iste\u2018moli kerak bo\u2018lsa ishga oling.",
    meters: { overconfidence: 99.9, stack: 100, coffee: "1 : 50" },
  },
  ru: {
    rank: "Senior StackOverflow Copy-Paster",
    intensity: 5,
    gender: "boy",
    developerLevel: "Senior",
    storyBadge: "CERTIFIED BUG GENERATOR",
    roast: [
      "\u041f\u0440\u043e\u0447\u0438\u0442\u0430\u043b \u0432\u0430\u0448\u0435 \u0440\u0435\u0437\u044e\u043c\u0435 \u0438 \u043f\u043e\u0447\u0443\u0432\u0441\u0442\u0432\u043e\u0432\u0430\u043b, \u0447\u0442\u043e \u043f\u043e\u0437\u043d\u0430\u043a\u043e\u043c\u0438\u043b\u0441\u044f \u0441 \u0441\u0430\u043c\u044b\u043c \u0430\u043a\u0442\u0438\u0432\u043d\u044b\u043c \u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0435\u043c StackOverflow \u2014 \u043f\u043e \u0447\u0430\u0441\u0442\u0438 \u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u0438\u044f \u043e\u0442\u0432\u0435\u0442\u043e\u0432, \u0430 \u043d\u0435 \u0432\u043e\u043f\u0440\u043e\u0441\u043e\u0432.",
      "\u201c\u0420\u0430\u0431\u043e\u0442\u0430 \u0432 \u043a\u043e\u043c\u0430\u043d\u0434\u0435\u201d, \u201c\u043d\u0430\u0446\u0435\u043b\u0435\u043d \u043d\u0430 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u201d \u0438 \u201c\u0431\u044b\u0441\u0442\u0440\u043e \u0443\u0447\u0443\u0441\u044c\u201d \u2014 \u043c\u043e\u0439 \u043a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440 \u043a\u043b\u0438\u0448\u0435 \u043f\u0435\u0440\u0435\u0433\u0440\u0435\u043b\u0441\u044f. 15 \u043d\u0430\u0432\u044b\u043a\u043e\u0432, \u043d\u043e 12 \u0438\u0437 \u043d\u0438\u0445 \u043d\u0430 \u0443\u0440\u043e\u0432\u043d\u0435 \u201cMicrosoft Word\u201d.",
      "\u201c5 \u043b\u0435\u0442 \u043e\u043f\u044b\u0442\u0430\u201d, \u043d\u043e \u043f\u0440\u043e\u0435\u043a\u0442\u044b \u2014 \u044d\u0442\u043e \u043e\u0434\u043d\u043e to-do \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u0438 \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0439 \u0448\u0430\u0431\u043b\u043e\u043d. HR \u0432\u044b\u043f\u0438\u043b \u0441\u043b\u0451\u0437\u044b \u0432\u043c\u0435\u0441\u0442\u043e \u043a\u043e\u0444\u0435.",
    ],
    salaryUsd: "$800 \u2013 $1,200",
    salaryUzs: "10.1M \u2013 15.2M UZS",
    fixes: [
      "\u0412\u043c\u0435\u0441\u0442\u043e \u201c\u0431\u044b\u0441\u0442\u0440\u043e \u0443\u0447\u0443\u0441\u044c\u201d \u043f\u043e\u043a\u0430\u0436\u0438\u0442\u0435 \u043a\u043e\u043d\u043a\u0440\u0435\u0442\u043d\u044b\u0435 \u043f\u0440\u043e\u0435\u043a\u0442\u044b \u0438 \u0438\u0437\u043c\u0435\u0440\u0438\u043c\u044b\u0435 \u0440\u0435\u0437\u0443\u043b\u044c\u0442\u0430\u0442\u044b.",
      "\u0421\u043e\u043a\u0440\u0430\u0442\u0438\u0442\u0435 \u0441\u043f\u0438\u0441\u043e\u043a \u043d\u0430\u0432\u044b\u043a\u043e\u0432 \u2014 \u0441 15 \u0434\u043e 6 \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u0445.",
      "\u041a \u043a\u0430\u0436\u0434\u043e\u043c\u0443 \u043c\u0435\u0441\u0442\u0443 \u0440\u0430\u0431\u043e\u0442\u044b \u0434\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u043e\u0434\u043d\u043e \u0434\u043e\u0441\u0442\u0438\u0436\u0435\u043d\u0438\u0435 \u0441 \u0446\u0438\u0444\u0440\u0430\u043c\u0438.",
    ],
    verdict: "\u041d\u0430\u043d\u0438\u043c\u0430\u0439\u0442\u0435 \u0442\u043e\u043b\u044c\u043a\u043e \u0435\u0441\u043b\u0438 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438 \u043d\u0443\u0436\u043d\u043e \u0431\u0435\u0437\u043b\u0438\u043c\u0438\u0442\u043d\u043e\u0435 \u043f\u043e\u0442\u0440\u0435\u0431\u043b\u0435\u043d\u0438\u0435 \u043a\u043e\u0444\u0435.",
    meters: { overconfidence: 99.9, stack: 100, coffee: "1 : 50" },
  },
  en: {
    rank: "Senior StackOverflow Copy-Paster",
    intensity: 5,
    gender: "boy",
    developerLevel: "Senior",
    storyBadge: "CERTIFIED BUG GENERATOR",
    roast: [
      "I read your resume and felt like I just met StackOverflow's most active user \u2014 not for asking questions, but for copying the answers.",
      "\u201cTeam player\u201d, \u201cresults-oriented\u201d and \u201cfast learner\u201d \u2014 my cliche calculator overheated. You listed 15 skills, but 12 of them are basically \u201cMicrosoft Word\u201d level.",
      "You wrote \u201c5 years of experience\u201d, but the projects section is one to-do app and one copy-pasted template. The HR manager drank tears instead of coffee reading this.",
    ],
    salaryUsd: "$800 \u2013 $1,200",
    salaryUzs: "10.1M \u2013 15.2M UZS",
    fixes: [
      "Replace \u201cfast learner\u201d with concrete projects and measurable outcomes.",
      "Trim the skills list \u2014 from 15 down to 6 real skills.",
      "Add one specific, number-backed achievement to each role.",
    ],
    verdict: "Hire only if your company needs unlimited coffee consumption.",
    meters: { overconfidence: 99.9, stack: 100, coffee: "1 : 50" },
  },
}

export function getRoast(lang: Lang): RoastResult {
  return DATA[lang]
}
