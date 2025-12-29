const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

/* =========================
   بيانات الأذكار والأدعية
========================= */
const azkar = {
  morning: [
    "أصبحنا وأصبح الملك لله، والحمد لله",
    "اللهم بك أصبحنا وبك أمسينا",
    "اللهم إني أسألك خير هذا اليوم فتحه ونصره ونوره",
    "رضيت بالله ربًا وبالإسلام دينًا وبمحمد ﷺ نبيًا"
  ],
  evening: [
    "أمسينا وأمسى الملك لله، والحمد لله",
    "اللهم بك أمسينا وبك أصبحنا",
    "أعوذ بكلمات الله التامات من شر ما خلق",
    "اللهم إني أسألك خير هذه الليلة"
  ],
  duas: [
    "ربنا لا تزغ قلوبنا بعد إذ هديتنا",
    "اللهم اغفر لي ولوالدي",
    "اللهم إنك عفو تحب العفو فاعفُ عني",
    "اللهم ارزقني رزقًا حلالًا طيبًا"
  ]
};

/* =========================
   الصفحة الرئيسية
========================= */
app.get("/", (req, res) => {
  res.json({
    status: "API Azkar is running 🤲"
  });
});

/* =========================
   أذكار ثابتة
========================= */
app.get("/api/azkar/morning", (req, res) => {
  res.json({ type: "morning", data: azkar.morning });
});

app.get("/api/azkar/evening", (req, res) => {
  res.json({ type: "evening", data: azkar.evening });
});

app.get("/api/duas", (req, res) => {
  res.json({ type: "duas", data: azkar.duas });
});

/* =========================
   ذكر عشوائي
========================= */
app.get("/api/azkar/random", (req, res) => {
  const all = [...azkar.morning, ...azkar.evening, ...azkar.duas];
  const zekr = all[Math.floor(Math.random() * all.length)];
  res.json({ zekr });
});

/* =========================
   ذكر حسب الوقت
========================= */
function getTimeBasedZekr() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return { type: "morning", list: azkar.morning };
  } else if (hour >= 12 && hour < 18) {
    return { type: "general", list: azkar.duas };
  } else {
    return { type: "evening", list: azkar.evening };
  }
}

app.get("/api/azkar/by-time", (req, res) => {
  const result = getTimeBasedZekr();
  const zekr =
    result.list[Math.floor(Math.random() * result.list.length)];

  res.json({
    based_on: result.type,
    zekr
  });
});

/* =========================
   ذكر اليوم (ثابت 24 ساعة)
========================= */
app.get("/api/azkar/today", (req, res) => {
  const all = [...azkar.morning, ...azkar.evening, ...azkar.duas];
  const dayIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24));
  const zekr = all[dayIndex % all.length];

  res.json({
    date: new Date().toISOString().split("T")[0],
    zekr
  });
});

/* =========================
   تشغيل السيرفر
========================= */
app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});