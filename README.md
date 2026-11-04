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
├── index.html          # মূল পেজ (+ SEO meta/OG tags)
├── css/style.css       # সব স্টাইল
├── js/app.js           # অ্যাপ লজিক (search, filter, routing, lazy-load)
├── data/
│   ├── species-index.json  # ★ হালকা ইনডেক্স — ১৪৭ প্রজাতি (~125KB, প্রথমে লোড হয়)
│   ├── species/            # ★ পূর্ণ প্রোফাইল — 001.json … 147.json (প্রয়োজনমতো লোড)
│   ├── species.json        # পূর্ণ ডাম্প (রেফারেন্স; অ্যাপ এটি লোড করে না)
│   └── meta.json           # পরিসংখ্যান + last_reviewed
├── docs/species-md/    # ১৪৭টি দ্বিভাষিক markdown ফাইল (001-*.md … 147-*.md)
├── assets/thumbs/      # ৪৭৯টি অপ্টিমাইজড ছবি (বর্ণনামূলক ফাইলনাম)
├── assets/illustrations/ # কমিশন্ড illustration (#17)
├── sitemap.xml         # SEO সাইটম্যাপ
├── robots.txt
└── README.md
```

## এডিট করা (Modify)

- **তথ্য বদলাতে:** research database এডিট করে `build_web_data.py` চালান —
  `data/species-index.json`, `data/species/*.json` ও `docs/species-md/` নতুন করে তৈরি হবে।
  সরাসরি `data/*.json` এডিট করবেন না (পরের build-এ মুছে যাবে)।
- **নতুন প্রজাতি যোগ:** research database-এ যোগ করে builder চালান।
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
- ১৭টি প্রজাতির যাচাইকৃত ছবি নেই (সৎভাবে "ছবি নেই" দেখানো হয়)।
- সংরক্ষণ-সংবেদনশীল প্রজাতি (Priority C) বাণিজ্যের জন্য বন্য থেকে সংগ্রহ নিষেধ।
