# شركة الفاروق — نظام إدارة محطة الوقود (React + Vite + Supabase)

نظام إدارة متعدد الفروع: تقفيل الوردية اليومي، والتقارير الشهرية بتتجمّع تلقائي من اليومي،
الديجيتال والميكانيكي، العمولة، قنوات التحصيل، حساب المورد، حسابات الموظفين، والمخزون.

الدخول المبدئي: **admin / admin**

================================================================
الخطوات بالترتيب (اكتبها في CMD / Terminal)
================================================================

## 1) تجهيز المشروع محليًا
```
npm install
npm run dev
```
افتح الرابط اللي هيظهر (غالبًا http://localhost:5173) — هيشتغل "وضع محلي" بدون سحابة.

## 2) إنشاء مشروع Supabase
- ادخل https://supabase.com  →  New project  (اختار باسورد لقاعدة البيانات).
- من القائمة: **SQL Editor → New query** → افتح ملف `supabase_schema.sql`،
  انسخ كل محتواه، الصقه، واضغط **Run**.  (بيعمل الجداول والصلاحيات وحساب admin/admin)
- من **Settings ▸ API** خُد:
  - Project URL        (زي https://xxxx.supabase.co)
  - anon public key    (نص طويل بيبدأ بـ eyJ...)

## 3) ربط المفاتيح (.env.local)
انسخ ملف المثال وسمّيه .env.local:
```
copy .env.example .env.local        (على ويندوز)
cp .env.example .env.local          (على ماك/لينكس)
```
افتح `.env.local` وحط فيه:
```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ....
```
شغّل من تاني للتجربة مع السحابة:
```
npm run dev
```
المفروض شاشة الدخول تكتب "● متصل بالسحابة".

## 4) الرفع على GitHub
```
git init
git add .
git commit -m "Al Farouk management system"
git branch -M main
git remote add origin https://github.com/USERNAME/REPO.git
git push -u origin main
```
(غيّر USERNAME و REPO باسمك واسم الريبو. ملف .env.local مش بيترفع — ده مقصود للأمان.)

## 5) البناء (اختياري للتأكد محليًا)
```
npm run build
npm run preview
```

## 6) الرفع على Vercel
الأسهل من الموقع:
- ادخل https://vercel.com → **Add New ▸ Project** → اختر ريبو GitHub بتاعك.
- Vercel هيكتشف Vite لوحده (Build: `npm run build` ، Output: `dist`).
- **مهم:** في **Settings ▸ Environment Variables** ضيف:
  - `VITE_SUPABASE_URL`       = نفس الرابط
  - `VITE_SUPABASE_ANON_KEY`  = نفس المفتاح
- اضغط **Deploy**.

أو بالـ CLI:
```
npm i -g vercel
vercel
vercel env add VITE_SUPABASE_URL
vercel env add VITE_SUPABASE_ANON_KEY
vercel --prod
```

================================================================
ملاحظات
================================================================
- مدخل البيانات يضيف بس ومايعدّلش بعد الحفظ؛ مدير الفرع هو اللي يعدّل؛ المدير العام يشوف كل الفروع.
- السعر والعمولة والنسب يحددها المدير العام من "الإعدادات".
- لو شغّلت من غير .env.local → بيشتغل "وضع محلي" (تخزين بالمتصفح) للتجربة.
