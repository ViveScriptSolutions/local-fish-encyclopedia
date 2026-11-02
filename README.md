# বাংলাদেশের ছোট ও শোভাবর্ধক মাছ — Interactive Web Encyclopedia

১৪৭টি যাচাইকৃত প্রজাতির interactive, searchable, bilingual (বাংলা/English) web project।
কোনো build step নেই — শুধু HTML + CSS + vanilla JS।

## চালানো (Run)

```bash
cd fish-encyclopedia-web
python3 -m http.server 8000
```

তারপর ব্রাউজারে: **http://localhost:8000**

> সরাসরি `index.html` ডাবল-ক্লিক করে খুললে ডেটা লোড হবে না (browser security) —
> উপরের সার্ভার-কমান্ড ব্যবহার করুন।

## ফোল্ডার কাঠামো

```
fish-encyclopedia-web/
├── index.html          # মূল পেজ
├── css/style.css       # সব স্টাইল
├── js/app.js           # অ্যাপ লজিক (search, filter, routing)
├── data/
│   ├── species.json    # ★★ মূল ডেটা — ১৪৭ প্রজাতি (EN + BN)
│   └── meta.json       # পরিসংখ্যান
├── md/                 # ১৪৭টি দ্বিভাষিক markdown ফাইল (001-*.md … 147-*.md)
├── assets/thumbs/      # ৭৮টি লোকাল ছবি (বাকিগুলো source URL-এ লিংক)
└── README.md
```

## এডিট করা (Modify)

- **তথ্য বদলাতে:** `data/species.json` খুলে প্রজাতির `bn` (বাংলা) বা `en` (English)
  ফিল্ড এডিট করুন → পেজ রিলোড করলেই দেখা যাবে। কোনো rebuild লাগে না।
- **নতুন প্রজাতি যোগ:** JSON-এ নতুন object যোগ করুন (`serial` অনন্য হতে হবে)।
- **ডিজাইন বদলাতে:** `css/style.css`।
- **ফিচার যোগ করতে:** `js/app.js` — view ফাংশনগুলো (`vHome`, `vBrowse`, `vSpecies`…) দেখুন।

## ডেটা স্কিমা (প্রতি প্রজাতি)

```json
{
  "serial": 32,
  "scientific_name": "Oryzias carnaticus",
  "bengali_name": "বেচি",
  "family": "Adrianichthyidae",
  "rarity": "R3", "breeding_potential": "Moderate", "priority": "B",
  "image": { "thumb": "assets/thumbs/32.jpg", "url": "...", "photographer": "...", "license": "...", "page_url": "..." },
  "en": { "identification": { "text": "...", "confidence": "High", "references": [...] }, ... },
  "bn": { "identification": "...", ... }
}
```

## নোট

- ছবিগুলো মূল উৎসের সম্পত্তি — প্রতিটি প্রজাতি-পৃষ্ঠায় photographer/license দেওয়া আছে।
- ২০টি প্রজাতির যাচাইকৃত ছবি নেই (সৎভাবে "ছবি নেই" দেখানো হয়)।
- সংরক্ষণ-সংবেদনশীল প্রজাতি (Priority C) বাণিজ্যের জন্য বন্য থেকে সংগ্রহ নিষেধ।
