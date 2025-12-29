const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// بيانات الأذكار
const azkar = {
  morning: [
    "أصبحنا وأصبح الملك لله، والحمد لله",
    "اللهم بك أصبحنا وبك أمسينا"
  ],
  evening: [
    "أمسينا وأمسى الملك لله",
    "اللهم إني أمسيت أشهدك"
  ],
  duas: [
    "ربنا لا تزغ قلوبنا بعد إذ هديتنا",
    "اللهم اغفر لي ولوالدي"
  ]
};

// الصفحة الرئيسية
app.get("/", (req, res) => {
  res.json({
    status: "API Azkar is running 🤲"
  });
});

// أذكار الصباح
app.get("/api/azkar/morning", (req, res) => {
  res.json({
    type: "morning",
    data: azkar.morning
  });
});

// أذكار المساء
app.get("/api/azkar/evening", (req, res) => {
  res.json({
    type: "evening",
    data: azkar.evening
  });
});

// أدعية
app.get("/api/duas", (req, res) => {
  res.json({
    type: "duas",
    data: azkar.duas
  });
});

// ذكر عشوائي
app.get("/api/azkar/random", (req, res) => {
  const all = [...azkar.morning, ...azkar.evening, ...azkar.duas];
  const random = all[Math.floor(Math.random() * all.length)];
  res.json({ zekr: random });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
