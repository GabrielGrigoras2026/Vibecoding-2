# Session Log — vibe-website-demo

## Sesiunea 1 — 2026-03-17
- Clonat repo-ul `vibe-website` (branch `starter`) de la danutmitrut
- Redenumit folderul în `vibe-website-demo`
- Instalat dependențe (`npm install`)
- Rezolvat erori server (font Google + lock file)
- Modificat `HeroStarter.tsx`: titlu și subtitlu personalizate
- Adăugat fonturi via Google Fonts CDN în `layout.tsx`

## Sesiunea 2 — 2026-03-17 (continuare)
- Adăugat imagine de fundal Hero (`hero-cafe.jpg`) din foto locală
- Refactorizat layout Hero cu poziționare absolută
- Adăugat butoane CTA: "Vezi Meniul" + "Vizitează-ne"
- Adăugat scroll indicator (săgeată animată)
- Adăugat animații `fadeInUp` în `globals.css`

## Sesiunea 3 — 2026-03-18
- Rezolvat problema animațiilor (trigger pe `visibilitychange` + scroll)
- Mărit și îngroșat subtitlul Hero

## Sesiunea 4 — 2026-03-18 (continuare)
- Creat `AboutStarter.tsx` cu imagine interior + text + badge-uri dotări
- Fix imagine Americano în secțiunea Meniu
- Structură `page.tsx`: Hero → Features → About → Menu → Footer

## Sesiunea 5 — 2026-03-19
- Fix afișare imagine Cold Brew cu Lapte (`bautura3.png`)
- Adăugat proprietatea opțională `bg` pe itemele din meniu
- Commit: `b3a833d`

## Sesiunea 6 — 2026-03-23
- Urcat proiectul pe GitHub (GabrielGrigoras2026/Vibecoding-2, branch starter)
- Deploy pe Vercel: `vibecoding-2-pi.vercel.app`
- Fix TypeScript: proprietate `bg?` opțională pe tipul `MenuItem`
- Push toate fișierele lipsă (About, Footer, Features, Hero, RezervaModal, imagini)

## Sesiunea 7 — 2026-03-24
- Instalat Scoop (manager pachete Windows)
- Instalat Supabase CLI via Scoop
- Creat proiect `vibe-coffee` pe Supabase (Frankfurt)
- Conectat proiectul local la Supabase (`supabase link`)
- Instalat `@supabase/supabase-js`
- Creat tabelul `rezervari` cu câmpurile: id, nume, email, telefon, numar_persoane, data, ora, status, created_at
- Trimis migrarea pe serverul Supabase (`supabase db push`)
- Salvat cheile API în `.env.local`

## Sesiunea 8 — 2026-03-25
- Creat fișierul `session-log.md`
- Actualizare formular rezervări (în curs)
