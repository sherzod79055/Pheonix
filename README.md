# Bag'dod tuman ixtisoslashtirilgan maktabi — veb-sayti

Ushbu loyiha to'liq ma'lumotlar bazasi bilan ishlaydigan, admin panel orqali boshqariladigan va
AI agent (Claude) orqali savollarga javob beradigan maktab saytidir.

Texnologiyalar: **Next.js** (frontend) + **Supabase** (ma'lumotlar bazasi, fayl saqlash, autentifikatsiya) +
**Anthropic API** (AI chatbot) + **Vercel** (hosting).

## 1-qadam: Supabase'ni sozlash

1. [supabase.com](https://supabase.com) da yangi loyiha (project) yarating.
2. Loyiha ichida **SQL Editor** bo'limini oching va `supabase/migrations/0001_init.sql`
   faylining butun mazmunini nusxalab, "Run" tugmasini bosing. Bu barcha jadvallarni yaratadi.
3. **Storage** bo'limiga o'ting va `media` nomli yangi bucket yarating. Uni **Public** qilib belgilang
   (rasm/fayllar saytda ko'rinishi uchun shart).
4. **Authentication → Users** bo'limiga o'ting va o'zingiz uchun bitta admin foydalanuvchi yarating
   (email + parol). Faqat shu login orqali admin panelga kirasiz.
5. **Project Settings → API** bo'limidan quyidagilarni nusxalab oling:
   - `Project URL` → bu `NEXT_PUBLIC_SUPABASE_URL`
   - `anon public` kaliti → bu `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` kaliti → bu `SUPABASE_SERVICE_ROLE_KEY` (MAXFIY, hech qachon oshkor qilmang)

## 2-qadam: Anthropic API kalitini olish

1. [console.anthropic.com](https://console.anthropic.com) da ro'yxatdan o'ting.
2. **API Keys** bo'limida yangi kalit yarating → bu `ANTHROPIC_API_KEY`.
3. Billingda kichik limit (masalan, oyiga $5-10) qo'yib qo'yish tavsiya etiladi — bu xarajatni nazorat qiladi.

## 3-qadam: Muhit o'zgaruvchilarini (environment variables) sozlash

`.env.example` faylidan nusxa oling va `.env.local` deb nomlang, so'ng yuqoridagi 4 ta qiymatni kiriting.

## 4-qadam: Lokal sinov (ixtiyoriy, agar kompyuteringizda Node.js bo'lsa)

```bash
npm install
npm run dev
```

Brauzerda `http://localhost:3000` ni oching.

## 5-qadam: GitHub'ga yuklash va Vercel'ga joylashtirish

1. Bu papkani GitHub repositoriyasiga yuklang (GitHub Desktop yoki `git push` orqali).
2. [vercel.com](https://vercel.com) da "Add New Project" → GitHub repositoriyangizni tanlang.
3. **Environment Variables** bo'limida `.env.local` dagi barcha 4 ta qiymatni kiriting.
4. "Deploy" tugmasini bosing. Bir necha daqiqadan so'ng saytingiz `sizning-loyiha.vercel.app`
   manzilida ishga tushadi.

## 6-qadam: Saytdan foydalanish

- Ommaviy sayt: `/` (bosh sahifa), `/about`, `/teachers`, `/achievements`, `/news`, `/events`,
  `/gallery`, `/admissions`, `/contact`
- Admin panel: `/login` orqali kiring (Supabase'da yaratgan admin email/parolingiz bilan),
  so'ng `/admin` sahifasida barcha bo'limlarni boshqarasiz.
- AI chatbot: saytning istalgan sahifasida, pastki o'ng burchakdagi tugma orqali ochiladi.
  U faqat siz admin panel orqali kiritgan real ma'lumotlarga asoslanib javob beradi.

## Loyiha tuzilmasi

```
app/                    -- ommaviy sahifalar va admin panel (Next.js App Router)
  admin/                -- admin panel (login talab qiladi)
  api/chat/             -- AI chatbot uchun server endpoint
components/
  AdminCrud.js           -- barcha admin bo'limlar uchun qayta ishlatiladigan CRUD komponent
  ChatWidget.js           -- saytning pastki o'ng burchagidagi AI chat oynasi
lib/supabase/            -- Supabase ulanish sozlamalari
supabase/migrations/     -- ma'lumotlar bazasi sxemasi (SQL)
```

## Keyingi qadamlar (tavsiya)

- O'z domeningiz bo'lganda (masalan, `bagdodmaktabi.uz`), Vercel loyihangizga
  **Settings → Domains** orqali ulashingiz mumkin.
- Telegram kanalingizdagi eski postlarni "Yangiliklar" bo'limiga qo'lda (yoki katta hajmda import
  skripti yordamida) o'tkazish mumkin — buni alohida so'rov bilan qilib berishim mumkin.
- O'quvchilar va o'qituvchilarning shaxsiy ma'lumotlari (surat, telefon) chop etilishidan oldin
  ota-onalar/xodimlardan roziligini olish tavsiya etiladi.
