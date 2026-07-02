# Open Budget Ovoz Yig'ish Telegram Boti & Enterprise Platforma

Ushbu loyiha O'zbekistonda **Open Budget** (Tashabbusli Budjet) bosqichlarida mahallalar o'rtasida ovoz yig'ish jarayonini avtomatlashtirish, foydalanuvchilarni rag'batlantirish (referal va moliya balans tizimi), hamda administratorlar uchun Telegram bot va Web Dashboard orqali boshqaruv platformasini taqdim etadi.

---

## 🚀 Asosiy Imkoniyatlar

### 📱 Telegram Foydalanuvchi Boti (User Bot):
1. **Asosiy Menyu (Reply Keyboard)**:
   - `🗳 Ovoz berish`: Telefon raqam kiritish + takroriy raqamlarni bloklash.
   - `Viloyat -> Tuman -> Mahalla`: Ma'muriy hududlar iyerarxiyasi bo'yicha navigatsiya.
   - `💰 Balans`: Asosiy, kutayotgan, referaldan topilgan va jami ishlab topilgan balans.
   - `📥 Pulni yechib olish`: Karta raqamiga pul yechish so'rovini yuborish.
   - `🔗 Referal ssilka`: Shaxsiy taklif havolasi orqali daromad olish.
   - `🎉 Aksiyalar` va `💸 To'lovlar isboti`: Shaffoflik va to'lovlar kanali.

### 👑 Telegram Admin Boti (Inline Admin Menu - 2 & 3 rasmlar asosida):
- `/admin` buyrug'i orqali kiriladi.
- **Statistika**: Kunlik ovozlar count, min/sec requests, uptime, haftalik statistika.
- **Loyihalar Menyusi ("Loyihalar 🔗")**:
  - `1. Shifokor`, `2. Ilg'or`, `3. Sebiston` kabi loyihalarni ko'rish.
  - `Loyiha qo'shish ➕`: (Viloyat -> Tuman -> Mahalla bo'yicha havola biriktirish).
- **Loyiha Boshqaruvi**:
  - `Auto stop qo'shish 💬` (Masalan, 5000 ga yetganda avtomatik to'xtatish va adminlarga xabar berish).
  - `Ovozlarni yuklab olish 🗳`
  - `Loyiha nomini o'zgartirish 🔤`
  - `Telegram bot havolasini o'zgartirish 🔗`
  - `Ovoz yig'ishni o'chirish / yoqish ❌ / ✅`
  - `Loyihani o'chirish 🗑`

### 💻 Web Admin Panel (React Dashboard):
- Real-vaqt ko'rsatkichlari (Total votes, Today votes, Total users, Referral expenses).
- Moliya va narxlarni boshqarish: Bir ovoz narxi, referal bonusi, min/max yechish limitlarini kodga tegmasdan o'zgartirish.
- Pul yechish so'rovlarini **Tasdiqlash** yoki **Rad etish**.

---

## 🛠 O'rnatish va Ishga Tushirish

### Backend (Node.js & Express / Grammy):
```bash
cd backend
npm install
npm run dev
```

### Frontend (React & Vite Admin Dashboard):
```bash
cd frontend
npm install
npm run dev
```
Dashboard `http://localhost:3000` manzilida ochiladi.

### Docker Compose Orqali Ishga Tushirish (PostgreSQL + Redis + Backend):
```bash
docker-compose up --build -d
```

---

## 🔒 Xavfsizlik va Anti-Cheat Tizimi
- Har bir telefon raqami tekshiriladi va faqat 1 marta ovoz berishga ruxsat beriladi.
- Auto-stop limiti bajarilganda bot avtomatik ravishda ovoz qabul qilishni to'xtatadi.
