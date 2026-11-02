# Technical Inspection Report — `swopno1/local-fish-encyclopedia`

**Date:** 2026-11-02 · **Scope:** full repository (remote state, `main` branch)
**Method:** recursive tree fetch via GitHub API (238 entries), downloaded + validated
`data/species.json` (2.78 MB), `data/meta.json`, `js/app.js`, `index.html`, `css/style.css`;
schema, cross-reference and content checks run locally.
**Repo visibility:** public.

---

## 1. Project Structure — ✅ Accurate & Complete

| Path | Content | Status |
|---|---|---|
| `index.html` | App shell (1.7 KB) | ✅ |
| `css/style.css` | Styles (5.4 KB) | ✅ |
| `js/app.js` | App logic, hash routing (20 KB) | ✅ |
| `data/species.json` | 147 species, EN+BN (2.78 MB) | ✅ |
| `data/meta.json` | Stats (863 B) | ✅ |
| `md/` | 147 bilingual markdown files, serials 001–147 contiguous | ✅ |
| `assets/thumbs/` | 78 local thumbnails (jpg/png) | ✅ |
| `README.md` / `LICENSE` | Docs + license | ✅ |

No stray files, no missing directories, no orphan entries. The structure matches the
delivered web build 1:1.

---

## 2. Data Integrity — ✅ with one functional gap

- **Serials:** 147/147, contiguous 1–147, zero duplicates. ✅
- **Schema:** all required keys present on every record
  (`serial, scientific_name, family, rarity, en, bn, image`). ✅
- **Content:** every species has both BN and EN text; no empty profiles. ✅
- **meta.json:** counts verified against species.json
  (147 total · 31 hill-stream · 112 native / 35 exotic · 78 thumbs · A34/B65/C9). ✅
- **md/ files:** all 147 present, filenames match serials; spot-check content OK. ✅
- ⚠️ **Priority "IE":** 4 species carry priority `IE` (Insufficient Evidence) —
  #39 *Garra annandalei*, #40 *Garra gotyla*, #63 *Opsarius tileo*, #69 *Gagata cenia*.
  The value is legitimate (Prompt 4), **but the app's Priority view only renders
  A/B/C — these 4 species are invisible there.** Functional gap, easy fix.

---

## 3. Image Audit — ⚠️ the main focus area

| Category | Count | Detail |
|---|---|---|
| Local thumb, file verified in repo | 78 | all `image.thumb` refs resolve — zero broken refs ✅ |
| URL only (no local copy) | 52 | external dependency — image breaks if source page dies |
| **No image at all** | **17** | listed below — **12 of them are R1/R2** |
| URL present but photographer missing | 66 | attribution gap |
| URL present but license missing | 55 | re-use risk |

**Species with no image whatsoever (priority targets):**
R1 — #1 *Badis pallidus*, #2 *Badis rhabdotus*, #3 *Batasio tengana*, #5 *Chaca chaca*,
#10 *Devario coxi*, #12 *Rasbora rasbora*, #19 *Ompok pabda*, #20 *Dermogenys pusilla*;
R2 — #21 *Amblyceps laticeps*, #22 *Badis chittagongis*, #24 *Barilius barila*,
#27 *Schistura sikmaiensis*;
R3 — #39 *Garra annandalei*, #41 *Laubuka laubuca*, #44 *Conta conta*, #52 *Zenarchopterus ectuntio*;
R4 — #53 *Chanda baculis*.

**Thumbnail weight:** 78 files = **16.8 MB** (avg 216 KB). Outliers:
`99.jpg` 3.5 MB, `8.jpg` 1.8 MB, `97.jpg` 898 KB, `35.jpg` 892 KB, `100.jpg` 730 KB.
Unoptimized — slows first load, bloats the repo.

---

## 4. Code Review — ✅ solid, small issues noted

**`js/app.js`**
- ✅ All user/data interpolations go through `esc()` — no XSS holes found.
- ✅ Hash routing covers home / browse / hillstream / species / priority / districts / district / about; 404 handled.
- ✅ BN→EN fallback with honest "(বাংলা অনুবাদ নেই)" note.
- ⚠️ Priority view drops the 4 `IE` species (see §2).
- ⚠️ Fragile hack: `T('photoOnly').replace('শুধু ','').replace('With ','')` for the
  home stat label — breaks if the string changes; use a dedicated key.
- ⚠️ District list hardcoded in JS (`DIST`) — fine for now, but it duplicates data;
  consider deriving from species records later.
- ⚠️ `<html lang="bn">` is hardcoded — stays "bn" even in EN mode (screen-reader nit).
- 💡 No `onerror` fallback on `<img>` — a corrupt thumb shows a broken icon instead of
  the "no photo" placeholder.

**`index.html` / `css/style.css`**
- ✅ Clean, valid, responsive (`@media` breakpoint present).
- 💡 Missing Open Graph / Twitter meta tags (link previews will be bare).
- 💡 No `<meta name="description">`.

---

## 5. Gaps

1. **17 species imageless**, 12 of them rare/hill-stream — the exact species where
   photos matter most for ID.
2. **52 species depend on external image URLs** — link rot will silently degrade the site.
3. **Attribution metadata thin** — 66 missing photographer, 55 missing license.
4. **IE priority species invisible** in the Priority view.
5. **Thumbs unoptimized** (16.8 MB; 5 files > 700 KB).
6. No deployment yet — repo is public, so **GitHub Pages** would give free hosting
   in ~2 minutes, but it isn't enabled (no live URL found).
7. `data/species.json` has no version/changelog field — future edits are hard to track.

---

## 6. Improvement Suggestions (prioritized)

**P0 — correctness**
- [ ] Render an "Insufficient Evidence (IE)" section in the Priority view (4 species).
- [ ] Add `onerror` fallback on thumbnails → show the "no photo" placeholder.

**P1 — images (biggest value)**
- [ ] Photo drive for the 17 imageless species — prioritize the 12 R1/R2;
  sources: iNaturalist (licensed), BdFISH (with permission), field photography.
  Record photographer + license at capture time (fixes §3 attribution gaps too).
- [ ] Optimize thumbs: resize to max 800px, JPEG quality ~80 → target <150 KB each
  (saves ~10 MB; `99.jpg` alone saves 3.3 MB).
- [ ] For the 52 URL-only species: download local copies **where the license allows**,
  else keep the URL but add periodic link checking.

**P2 — polish & ops**
- [ ] Enable **GitHub Pages** (`Settings → Pages → main / root`) for a live site.
- [ ] Add OG/Twitter meta + description meta tags.
- [ ] Replace the `photoOnly` stat-label hack with a proper i18n key; set
  `<html lang>` dynamically on language toggle.
- [ ] Add `"version"` + `"updated"` fields to `species.json` and a `CHANGELOG.md`.
- [ ] Derive the district list from data instead of hardcoding.

---

## Verdict

**The project is in good shape.** Structure is accurate and complete, data validates
cleanly (147/147, no broken references), code is sound with no security issues.
The work ahead is concentrated in one place: **images** — 17 missing, 52 external,
metadata thin, files oversized. Fix the two P0 code items (~15 min), run the P1
image program, and this is publish-ready.
