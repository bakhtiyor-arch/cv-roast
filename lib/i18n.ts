export type Lang = "uz" | "ru" | "en"

export const LANGS: { code: Lang; label: string }[] = [
  { code: "uz", label: "UZ" },
  { code: "ru", label: "RU" },
  { code: "en", label: "EN" },
]

type Dict = {
  nav: { capabilities: string; samples: string; faq: string; bot: string }
  hero: {
    badge: string
    title1: string
    title2: string
    subtitle: string
    dropTitle: string
    dropHint: string
    maxSize: string
    roastMe: string
    tryDemo: string
    noReg: string
  }
  features: { analysis: string; humor: string; salary: string; story: string }
  featuresDesc: { analysis: string; humor: string; salary: string; story: string }
  how: {
    title: string
    subtitle: string
    step1Title: string
    step1Desc: string
    step2Title: string
    step2Desc: string
    step3Title: string
    step3Desc: string
  }
  samples: { title: string; subtitle: string }
  telegram: { title: string; desc: string; cta: string }
  faq: {
    title: string
    subtitle: string
    q1: string
    a1: string
    q2: string
    a2: string
    q3: string
    a3: string
  }
  footer: { tagline: string; rights: string; terms: string; privacy: string }
  loading: { title: string; steps: string[] }
  results: {
    back: string
    another: string
    done: string
    rankLabel: string
    roastTitle: string
    salaryTitle: string
    salaryMonthly: string
    fixTitle: string
    disclaimer: string
    storyBadge: string
    verdictLabel: string
    downloadCard: string
    shareTelegram: string
    skinLabel: string
    overconfidence: string
    stackReliance: string
    coffeeRatio: string
    roastLevelLabel: string
    storySalaryLabel: string
    headerBadges: string[]
  }
}

export const t: Record<Lang, Dict> = {
  uz: {
    nav: { capabilities: "Nima qila oladi?", samples: "Namunalar", faq: "FAQ", bot: "Telegram Bot" },
    hero: {
      badge: "AI asosidagi rezyume tahlili",
      title1: "AI CV Roaster",
      title2: "& Local Salary Check",
      subtitle: "Yuklang, kulamiz va bozor qiymatingizni bilib olasiz!",
      dropTitle: "PDF rezyumeingizni bu yerga tashlang",
      dropHint: "yoki tanlash uchun bosing",
      maxSize: "MAX 5MB \u00b7 faqat PDF",
      roastMe: "ROAST ME!",
      tryDemo: "Sinov CV bilan sinash",
      noReg: "Ro\u2018yxatdan o\u2018tish shart emas",
    },
    features: { analysis: "AI Tahlil", humor: "O\u2018tkir Yumor", salary: "UZB Bozori Maoshi", story: "Viral Story Card" },
    featuresDesc: {
      analysis: "Har bir qatorni shavqatsiz o\u2018qiydi",
      humor: "Kulmasdan o\u2018qib bo\u2018lmaydi",
      salary: "Real oylik diapazon",
      story: "9:16 Instagram uchun tayyor",
    },
    how: {
      title: "Nima qila oladi?",
      subtitle: "Uch qadamda rezyumeingiz kul bo\u2018ladi",
      step1Title: "PDF Yuklaysiz",
      step1Desc: "Bir bosishda yuklang. Ro\u2018yxatdan o\u2018tish yoki karta kerak emas.",
      step2Title: "AI Shavqatsiz Tahlil Qiladi",
      step2Desc: "Klishelar, ko\u2018chirilgan ko\u2018nikmalar va bo\u2018rttirilgan tajribani aniqlaydi.",
      step3Title: "Bozor Boshini va Story Card'ni Olasiz",
      step3Desc: "Real UZB maosh diapazoni va 9:16 Instagram Story kartasi.",
    },
    samples: { title: "O\u2018tkir Unvonlar va Namunalar", subtitle: "AI qanday unvonlar berishini ko\u2018ring" },
    telegram: {
      title: "Telegram WebApp bilan 100% integratsiya",
      desc: "Saytimiz Telegram WebApp bilan 100% integratsiya qilingan. Botingiz orqali ilovani chiqmasdan ishlatishingiz mumkin!",
      cta: "Telegram'da ochish",
    },
    faq: {
      title: "Tez-tez beriladigan savollar",
      subtitle: "Bilishingiz kerak bo\u2018lgan hamma narsa",
      q1: "Rezyumem va shaxsiy ma\u2018lumotlarim xavfsizdami?",
      a1: "Ha. Fayllar faqat tahlil uchun ishlatiladi va serverda saqlanmaydi. Barchasi brauzeringizda qayta ishlanadi.",
      q2: "O\u2018zbekiston maosh diapazoni qanday hisoblanadi?",
      a2: "Biz mahalliy IT bozori ma\u2018lumotlari, lavozim, tajriba va ko\u2018nikmalar asosida taxminiy diapazonni hisoblaymiz.",
      q3: "Servisdan foydalanish bepulmi?",
      a3: "Ha, asosiy roast va maosh tekshiruvi mutlaqo bepul. Faqat kulishga tayyor bo\u2018ling.",
    },
    footer: { tagline: "Made for Uzbekistan Tech Market", rights: "Barcha huquqlar himoyalangan.", terms: "Shartlar", privacy: "Maxfiylik" },
    loading: {
      title: "AI ishga tushdi...",
      steps: [
        "Rezyume bo\u2018rttirishlarini filtrlash...",
        "HR menejer burchakda yig\u2018lamoqda...",
        "UZB maosh qiymatini hisoblash...",
        "Klishelarni sanash...",
        "Story Card'ni chizish...",
      ],
    },
    results: {
      back: "Bosh sahifa",
      another: "Boshqa CV yuklash",
      done: "AI Tahlil Bajarildi",
      rankLabel: "Sizning unvoningiz",
      roastTitle: "Shavqatsiz AI Roast",
      salaryTitle: "UZB Bozori Maoshi",
      salaryMonthly: "Oylik taxminiy bozor qiymati",
      fixTitle: "AI Tuzatish Tavsiyalari",
      disclaimer: "Eslatma: bu taxminiy diapazon bo\u2018lib, yumor uchun mo\u2018ljallangan. Real maosh kompaniya va intervyuga bog\u2018liq.",
      storyBadge: "AI TOMONIDAN ROAST QILINDI",
      verdictLabel: "AI Xulosa",
      downloadCard: "Story Card yuklab olish (PNG)",
      shareTelegram: "Telegram'ga ulashish",
      skinLabel: "Karta uslubi",
      overconfidence: "O'ziga bo'lgan ishonch",
      stackReliance: "Stack Overflow'ga qaramlik",
      coffeeRatio: "Kofe va Kod nisbati",
      roastLevelLabel: "Roast Darajasi",
      storySalaryLabel: "Taxminiy Bozor Maoshi",
      headerBadges: ["SERTIFIKATLANGAN BUG GENERATORI \uD83D\uDC1B", "AI TARAFIDAN SHAVQATSIZ ROAST QILINDI \uD83D\uDD25"],
    },
  },
  ru: {
    nav: { capabilities: "\u0427\u0442\u043e \u0443\u043c\u0435\u0435\u0442?", samples: "\u041f\u0440\u0438\u043c\u0435\u0440\u044b", faq: "FAQ", bot: "Telegram \u0411\u043e\u0442" },
    hero: {
      badge: "\u0410\u043d\u0430\u043b\u0438\u0437 \u0440\u0435\u0437\u044e\u043c\u0435 \u043d\u0430 \u0431\u0430\u0437\u0435 AI",
      title1: "AI CV Roaster",
      title2: "& Local Salary Check",
      subtitle: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435, \u043f\u043e\u0441\u043c\u0435\u0451\u043c\u0441\u044f \u0438 \u0443\u0437\u043d\u0430\u0435\u0442\u0435 \u0432\u0430\u0448\u0443 \u0440\u044b\u043d\u043e\u0447\u043d\u0443\u044e \u0446\u0435\u043d\u0443!",
      dropTitle: "\u041f\u0435\u0440\u0435\u0442\u0430\u0449\u0438\u0442\u0435 PDF-\u0440\u0435\u0437\u044e\u043c\u0435 \u0441\u044e\u0434\u0430",
      dropHint: "\u0438\u043b\u0438 \u043d\u0430\u0436\u043c\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u0432\u044b\u0431\u0440\u0430\u0442\u044c",
      maxSize: "MAX 5MB \u00b7 \u0442\u043e\u043b\u044c\u043a\u043e PDF",
      roastMe: "ROAST ME!",
      tryDemo: "\u041f\u043e\u043f\u0440\u043e\u0431\u043e\u0432\u0430\u0442\u044c \u0434\u0435\u043c\u043e",
      noReg: "\u0411\u0435\u0437 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438",
    },
    features: { analysis: "AI \u0410\u043d\u0430\u043b\u0438\u0437", humor: "\u0416\u0451\u0441\u0442\u043a\u0438\u0439 \u044e\u043c\u043e\u0440", salary: "\u0417\u0430\u0440\u043f\u043b\u0430\u0442\u0430 \u0440\u044b\u043d\u043a\u0430 UZB", story: "\u0412\u0438\u0440\u0443\u0441\u043d\u0430\u044f Story Card" },
    featuresDesc: {
      analysis: "\u0427\u0438\u0442\u0430\u0435\u0442 \u043a\u0430\u0436\u0434\u0443\u044e \u0441\u0442\u0440\u043e\u043a\u0443 \u0431\u0435\u0437 \u043f\u043e\u0449\u0430\u0434\u044b",
      humor: "\u041d\u0435\u0432\u043e\u0437\u043c\u043e\u0436\u043d\u043e \u0447\u0438\u0442\u0430\u0442\u044c \u0431\u0435\u0437 \u0441\u043c\u0435\u0445\u0430",
      salary: "\u0420\u0435\u0430\u043b\u044c\u043d\u044b\u0439 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d \u0437\u0430\u0440\u043f\u043b\u0430\u0442\u044b",
      story: "\u0413\u043e\u0442\u043e\u0432\u043e \u0434\u043b\u044f Instagram 9:16",
    },
    how: {
      title: "\u0427\u0442\u043e \u0443\u043c\u0435\u0435\u0442?",
      subtitle: "\u0422\u0440\u0438 \u0448\u0430\u0433\u0430 \u0434\u043e \u043f\u0435\u043f\u043b\u0430 \u0432\u0430\u0448\u0435\u0433\u043e \u0440\u0435\u0437\u044e\u043c\u0435",
      step1Title: "\u0417\u0430\u0433\u0440\u0443\u0436\u0430\u0435\u0442\u0435 PDF",
      step1Desc: "\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430 \u0432 \u043e\u0434\u0438\u043d \u043a\u043b\u0438\u043a. \u0411\u0435\u0437 \u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0430\u0446\u0438\u0438 \u0438 \u043a\u0430\u0440\u0442.",
      step2Title: "AI \u0431\u0435\u0441\u043f\u043e\u0449\u0430\u0434\u043d\u043e \u0430\u043d\u0430\u043b\u0438\u0437\u0438\u0440\u0443\u0435\u0442",
      step2Desc: "\u041d\u0430\u0445\u043e\u0434\u0438\u0442 \u043a\u043b\u0438\u0448\u0435, \u0441\u043a\u043e\u043f\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u043d\u0430\u0432\u044b\u043a\u0438 \u0438 \u0440\u0430\u0437\u0434\u0443\u0442\u044b\u0439 \u043e\u043f\u044b\u0442.",
      step3Title: "\u041f\u043e\u043b\u0443\u0447\u0430\u0435\u0442\u0435 \u0437\u0430\u0440\u043f\u043b\u0430\u0442\u0443 \u0438 Story Card",
      step3Desc: "\u0420\u0435\u0430\u043b\u044c\u043d\u044b\u0439 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d UZB \u0438 \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0430 Story 9:16.",
    },
    samples: { title: "\u0416\u0451\u0441\u0442\u043a\u0438\u0435 \u0437\u0432\u0430\u043d\u0438\u044f \u0438 \u043f\u0440\u0438\u043c\u0435\u0440\u044b", subtitle: "\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0438\u0442\u0435, \u043a\u0430\u043a\u0438\u0435 \u0437\u0432\u0430\u043d\u0438\u044f \u0434\u0430\u0451\u0442 AI" },
    telegram: {
      title: "100% \u0438\u043d\u0442\u0435\u0433\u0440\u0430\u0446\u0438\u044f \u0441 Telegram WebApp",
      desc: "\u041d\u0430\u0448 \u0441\u0430\u0439\u0442 \u043d\u0430 100% \u0438\u043d\u0442\u0435\u0433\u0440\u0438\u0440\u043e\u0432\u0430\u043d \u0441 Telegram WebApp. \u0418\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0439\u0442\u0435 \u043f\u0440\u0438\u043b\u043e\u0436\u0435\u043d\u0438\u0435 \u043f\u0440\u044f\u043c\u043e \u0432 \u0431\u043e\u0442\u0435!",
      cta: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c \u0432 Telegram",
    },
    faq: {
      title: "\u0427\u0430\u0441\u0442\u043e \u0437\u0430\u0434\u0430\u0432\u0430\u0435\u043c\u044b\u0435 \u0432\u043e\u043f\u0440\u043e\u0441\u044b",
      subtitle: "\u0412\u0441\u0451, \u0447\u0442\u043e \u043d\u0443\u0436\u043d\u043e \u0437\u043d\u0430\u0442\u044c",
      q1: "\u041c\u043e\u0451 \u0440\u0435\u0437\u044e\u043c\u0435 \u0438 \u0434\u0430\u043d\u043d\u044b\u0435 \u0432 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438?",
      a1: "\u0414\u0430. \u0424\u0430\u0439\u043b\u044b \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u044e\u0442\u0441\u044f \u0442\u043e\u043b\u044c\u043a\u043e \u0434\u043b\u044f \u0430\u043d\u0430\u043b\u0438\u0437\u0430 \u0438 \u043d\u0435 \u0445\u0440\u0430\u043d\u044f\u0442\u0441\u044f \u043d\u0430 \u0441\u0435\u0440\u0432\u0435\u0440\u0435.",
      q2: "\u041a\u0430\u043a \u0440\u0430\u0441\u0441\u0447\u0438\u0442\u044b\u0432\u0430\u0435\u0442\u0441\u044f \u0437\u0430\u0440\u043f\u043b\u0430\u0442\u0430 \u0432 \u0423\u0437\u0431\u0435\u043a\u0438\u0441\u0442\u0430\u043d\u0435?",
      a2: "\u041c\u044b \u0441\u0447\u0438\u0442\u0430\u0435\u043c \u043f\u0440\u0438\u043c\u0435\u0440\u043d\u044b\u0439 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u043c\u0435\u0441\u0442\u043d\u043e\u0433\u043e IT-\u0440\u044b\u043d\u043a\u0430, \u0434\u043e\u043b\u0436\u043d\u043e\u0441\u0442\u0438 \u0438 \u043e\u043f\u044b\u0442\u0430.",
      q3: "\u0421\u0435\u0440\u0432\u0438\u0441 \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0439?",
      a3: "\u0414\u0430, \u0431\u0430\u0437\u043e\u0432\u044b\u0439 roast \u0438 \u043f\u0440\u043e\u0432\u0435\u0440\u043a\u0430 \u0437\u0430\u0440\u043f\u043b\u0430\u0442\u044b \u0430\u0431\u0441\u043e\u043b\u044e\u0442\u043d\u043e \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b.",
    },
    footer: { tagline: "Made for Uzbekistan Tech Market", rights: "\u0412\u0441\u0435 \u043f\u0440\u0430\u0432\u0430 \u0437\u0430\u0449\u0438\u0449\u0435\u043d\u044b.", terms: "\u0423\u0441\u043b\u043e\u0432\u0438\u044f", privacy: "\u041a\u043e\u043d\u0444\u0438\u0434\u0435\u043d\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c" },
    loading: {
      title: "AI \u0437\u0430\u043f\u0443\u0449\u0435\u043d...",
      steps: [
        "\u0424\u0438\u043b\u044c\u0442\u0440\u0443\u0435\u043c \u043f\u0440\u0435\u0443\u0432\u0435\u043b\u0438\u0447\u0435\u043d\u0438\u044f \u0432 \u0440\u0435\u0437\u044e\u043c\u0435...",
        "HR-\u043c\u0435\u043d\u0435\u0434\u0436\u0435\u0440 \u043f\u043b\u0430\u0447\u0435\u0442 \u0432 \u0443\u0433\u043b\u0443...",
        "\u0421\u0447\u0438\u0442\u0430\u0435\u043c \u0446\u0435\u043d\u043d\u043e\u0441\u0442\u044c \u0437\u0430\u0440\u043f\u043b\u0430\u0442\u044b UZB...",
        "\u041f\u043e\u0434\u0441\u0447\u0451\u0442 \u043a\u043b\u0438\u0448\u0435...",
        "\u0420\u0438\u0441\u0443\u0435\u043c Story Card...",
      ],
    },
    results: {
      back: "\u041d\u0430 \u0433\u043b\u0430\u0432\u043d\u0443\u044e",
      another: "\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u044c \u0434\u0440\u0443\u0433\u043e\u0435 CV",
      done: "AI \u0410\u043d\u0430\u043b\u0438\u0437 \u0437\u0430\u0432\u0435\u0440\u0448\u0451\u043d",
      rankLabel: "\u0412\u0430\u0448\u0435 \u0437\u0432\u0430\u043d\u0438\u0435",
      roastTitle: "\u0411\u0435\u0441\u043f\u043e\u0449\u0430\u0434\u043d\u044b\u0439 AI Roast",
      salaryTitle: "\u0417\u0430\u0440\u043f\u043b\u0430\u0442\u0430 \u0440\u044b\u043d\u043a\u0430 UZB",
      salaryMonthly: "\u041f\u0440\u0438\u043c\u0435\u0440\u043d\u0430\u044f \u043c\u0435\u0441\u044f\u0447\u043d\u0430\u044f \u0446\u0435\u043d\u0430 \u043d\u0430 \u0440\u044b\u043d\u043a\u0435",
      fixTitle: "AI \u0440\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0430\u0446\u0438\u0438",
      disclaimer: "\u041f\u0440\u0438\u043c\u0435\u0447\u0430\u043d\u0438\u0435: \u044d\u0442\u043e \u043f\u0440\u0438\u043c\u0435\u0440\u043d\u044b\u0439 \u0434\u0438\u0430\u043f\u0430\u0437\u043e\u043d \u0434\u043b\u044f \u044e\u043c\u043e\u0440\u0430. \u0420\u0435\u0430\u043b\u044c\u043d\u0430\u044f \u0437\u0430\u0440\u043f\u043b\u0430\u0442\u0430 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043e\u0442 \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438.",
      storyBadge: "ОФИЦИАЛЬНО ПРОРОАЩЕН AI",
      verdictLabel: "AI Вердикт",
      downloadCard: "\u0421\u043a\u0430\u0447\u0430\u0442\u044c Story Card (PNG)",
      shareTelegram: "\u041f\u043e\u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f \u0432 Telegram",
      skinLabel: "\u0421\u0442\u0438\u043b\u044c \u043a\u0430\u0440\u0442\u044b",
      overconfidence: "\u0421\u0430\u043c\u043e\u0443\u0432\u0435\u0440\u0435\u043d\u043d\u043e\u0441\u0442\u044c",
      stackReliance: "\u0417\u0430\u0432\u0438\u0441\u0438\u043c\u043e\u0441\u0442\u044c \u043e\u0442 Stack Overflow",
      coffeeRatio: "\u0421\u043e\u043e\u0442\u043d\u043e\u0448\u0435\u043d\u0438\u0435 \u041a\u043e\u0444\u0435 \u0438 \u041a\u043e\u0434\u0430",
      roastLevelLabel: "\u0423\u0440\u043e\u0432\u0435\u043d\u044c Roast",
      storySalaryLabel: "\u041f\u0440\u0438\u043c\u0435\u0440\u043d\u0430\u044f \u0437\u0430\u0440\u043f\u043b\u0430\u0442\u0430 \u043d\u0430 \u0440\u044b\u043d\u043a\u0435",
      headerBadges: ["\u0421\u0415\u0420\u0422\u0418\u0424\u0418\u0426\u0418\u0420\u041e\u0412\u0410\u041d\u041d\u042b\u0419 \u0413\u0415\u041d\u0415\u0420\u0410\u0422\u041e\u0420 \u0411\u0410\u0413\u041e\u0412 \uD83D\uDC1B", "\u0411\u0415\u0421\u041f\u041e\u0429\u0410\u0414\u041d\u041e \u041e\u0411\u0416\u0410\u0420\u0415\u041d AI \uD83D\uDD25"],
    },
  },
  en: {
    nav: { capabilities: "What can it do?", samples: "Samples", faq: "FAQ", bot: "Telegram Bot" },
    hero: {
      badge: "AI-powered resume analysis",
      title1: "AI CV Roaster",
      title2: "& Local Salary Check",
      subtitle: "Upload it, we laugh, and you find out your market value!",
      dropTitle: "Drop your PDF resume here",
      dropHint: "or click to browse",
      maxSize: "MAX 5MB \u00b7 PDF only",
      roastMe: "ROAST ME!",
      tryDemo: "Try with a demo CV",
      noReg: "No registration required",
    },
    features: { analysis: "AI Analysis", humor: "Savage Humor", salary: "UZB Market Salary", story: "Viral Story Card" },
    featuresDesc: {
      analysis: "Reads every line mercilessly",
      humor: "Impossible to read without laughing",
      salary: "Real monthly range",
      story: "Ready for Instagram 9:16",
    },
    how: {
      title: "What can it do?",
      subtitle: "Three steps to roast your resume",
      step1Title: "Upload a PDF",
      step1Desc: "One-click upload. No registration or card required.",
      step2Title: "AI analyzes mercilessly",
      step2Desc: "Detects cliches, copy-pasted skills, and overblown experience.",
      step3Title: "Get salary & Story Card",
      step3Desc: "Real UZB salary range and a 9:16 Instagram Story card.",
    },
    samples: { title: "Savage Ranks & Samples", subtitle: "See the kind of ranks the AI hands out" },
    telegram: {
      title: "100% integrated with Telegram WebApp",
      desc: "Our site is 100% integrated with Telegram WebApp. Use the app right inside your bot without leaving!",
      cta: "Open in Telegram",
    },
    faq: {
      title: "Frequently asked questions",
      subtitle: "Everything you need to know",
      q1: "Is my resume and personal data safe?",
      a1: "Yes. Files are used only for analysis and are not stored on our servers.",
      q2: "How is the Uzbekistan salary range calculated?",
      a2: "We estimate a range based on the local IT market, role, experience, and skills.",
      q3: "Is the service free?",
      a3: "Yes, the core roast and salary check are completely free. Just be ready to laugh.",
    },
    footer: { tagline: "Made for Uzbekistan Tech Market", rights: "All rights reserved.", terms: "Terms", privacy: "Privacy" },
    loading: {
      title: "AI is running...",
      steps: [
        "Filtering resume exaggerations...",
        "HR manager crying in the corner...",
        "Calculating UZB salary worth...",
        "Counting the cliches...",
        "Drawing your Story Card...",
      ],
    },
    results: {
      back: "Back to Home",
      another: "Upload Another CV",
      done: "AI Analysis Complete",
      rankLabel: "Your rank",
      roastTitle: "Savage AI Roast",
      salaryTitle: "UZB Market Salary",
      salaryMonthly: "Estimated monthly market value",
      fixTitle: "AI Fix Recommendations",
      disclaimer: "Note: this is an estimated range meant for humor. Real salary depends on the company and interview.",
      storyBadge: "OFFICIALLY ROASTED BY AI",
      verdictLabel: "AI Verdict",
      downloadCard: "Download Story Card (PNG)",
      shareTelegram: "Share to Telegram",
      skinLabel: "Card style",
      overconfidence: "Overconfidence Rating",
      stackReliance: "Stack Overflow Reliance",
      coffeeRatio: "Coffee to Code Ratio",
      roastLevelLabel: "Roast Level",
      storySalaryLabel: "Estimated Market Salary",
      headerBadges: ["CERTIFIED BUG GENERATOR \uD83D\uDC1B", "OFFICIALLY ROASTED BY AI \uD83D\uDD25"],
    },
  },
}
