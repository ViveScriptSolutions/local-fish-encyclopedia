# বাংলাদেশের ছোট ও শোভাবর্ধক মাছ — Interactive Web Encyclopedia

কিউরেটেড সংগ্রহে **১৪৭টি প্রজাতি-প্রোফাইল** — interactive, searchable, bilingual (বাংলা/English) web project।
কোনো build step নেই — শুধু HTML + CSS + vanilla JS।

> সর্বশেষ পর্যালোচনা: ৩ নভেম্বর ২০২৬ · ডেটা সংস্করণ 2026-11-03

## চালানো (Run)

```bash
cd fish-encyclopedia-web
python3 -m http.server 8000
```

তারপর ব্রাউজারে: **http://localhost:8000**

> সরাসরি `index.html` ডাবল-ক্লিক করে খুললে ডেটা লোড হবে না (browser security) —
> উপরের সার্ভার-কমান্ড ব্যবহার করুন।

## ফিচার

- 🔍 **Advanced search & filters** — বৈজ্ঞানিক/বাংলা/English নাম, family, habitat, verification status
- 🔬 **Evidence & Sources** — প্রতিটি প্রজাতিতে ৬-মাত্রার verification (taxonomy, Bangladesh occurrence, district records, habitat, photograph, conservation)
- ⛰️ **Hill-stream explorer** — ৪ ক্যাটাগরি (confirmed specialists / associated / general / needs verification)
- ⚖️ **Species comparison** — ২–৪টি প্রজাতি পাশাপাশি তুলনা
- ⭐ **Priority lists** — A/B/C + IE (Insufficient Evidence)
- 📍 **District index** — জেলা-ভিত্তিক রেকর্ড

## ফোল্ডার কাঠামো

```
fish-encyclopedia-web/
├── index.html          # মূল পেজ
├── css/style.css       # সব স্টাইল
├── js/app.js           # অ্যাপ লজিক (search, filter, routing)
├── data/
│   ├── species.json    # ★★ মূল ডেটা — ১৪৭ প্রজাতি (EN + BN)
│   ├── images.json     # ★ ছবির manifest — ফাইলনাম, বিবরণ, alt text, লাইসেন্স
│   └── meta.json       # পরিসংখ্যান
├── md/                 # ১৪৭টি দ্বিভাষিক markdown ফাইল (001-*.md … 147-*.md)
├── assets/thumbs/      # ৭৮টি অপ্টিমাইজড ছবি (বর্ণনামূলক ফাইলনাম, যেমন 032-oryzias-carnaticus.jpg)
├── docs/               # AUDIT_REPORT.md
└── README.md
```

## এডিট করা (Modify)

- **তথ্য বদলাতে:** `data/species.json` খুলে প্রজাতির `bn` (বাংলা) বা `en` (English)
  ফিল্ড এডিট করুন → পেজ রিলোড করলেই দেখা যাবে। কোনো rebuild লাগে না।
- **নতুন প্রজাতি যোগ:** JSON-এ নতুন object যোগ করুন (`serial` অনন্য হতে হবে)।
- **ডিজাইন বদলাতে:** `css/style.css`।
- **ফিচার যোগ করতে:** `js/app.js` — view ফাংশনগুলো (`vHome`, `vBrowse`, `vSpecies`…) দেখুন।

> **Single source of truth:** `data/species.json` গবেষণা-ডেটাবেজ থেকে generate হয় —
> সরাসরি এডিট করা যায়, কিন্তু স্থায়ী সংশোধন মূল ডেটাবেজে করা উচিত।

## ডেটা স্কিমা (প্রতি প্রজাতি)

```json
{
  "serial": 32,
  "permanent_id": "BD-FISH-032",
  "scientific_name": "Oryzias carnaticus",
  "bengali_name": "বেচি",
  "family": "Adrianichthyidae",
  "rarity": "R3", "breeding_potential": "Moderate", "priority": "B",
  "hill_category": null,
  "verification": {
    "taxonomy": {"status": "verified", "note": "..."},
    "bangladesh_occurrence": {"status": "reported", "note": "..."},
    "district_occurrence": {"status": "insufficient", "note": "..."},
    "habitat_classification": {"status": "general", "note": "..."},
    "photograph": {"status": "verified", "note": "..."},
    "conservation": {"status": "checked", "note": "..."}
  },
  "image": { "thumb": "assets/thumbs/032-oryzias-carnaticus.jpg", "url": "...", "photographer": "...", "license": "...", "page_url": "...", "alt": "..." },
  "en": { "identification": { "text": "...", "confidence": "High", "references": [...] }, ... },
  "bn": { "identification": "...", ... }
}
```

## নোট

- ছবিগুলো মূল উৎসের সম্পত্তি — প্রতিটি প্রজাতি-পৃষ্ঠায় photographer/license দেওয়া আছে।
- ১৭টি প্রজাতির ছবি নেই (সৎভাবে "ছবি নেই" দেখানো হয়)।
- সংরক্ষণ-সংবেদনশীল প্রজাতি (Priority C) বাণিজ্যের জন্য বন্য থেকে সংগ্রহ নিষেধ।
