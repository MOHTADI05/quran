# دليل النشر على Vercel

## خطوات النشر السريع

### 1. إعداد المشروع على GitHub

```bash
# تهيئة Git (إذا لم تكن مهيأ)
git init
git add .
git commit -m "Initial commit"

# إنشاء مستودع على GitHub ثم:
git remote add origin https://github.com/YOUR_USERNAME/quran.git
git branch -M main
git push -u origin main
```

### 2. النشر على Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل الدخول بحساب GitHub
3. اضغط على **"Add New Project"**
4. اختر المستودع `quran`
5. Vercel سيكتشف Next.js تلقائياً
6. اضغط **"Deploy"**

### 3. إضافة ملف PDF (اختياري)

بعد النشر، يمكنك:

**الطريقة 1: رفع الملف عبر Vercel**
- اذهب إلى إعدادات المشروع
- استخدم Vercel CLI لرفع الملف إلى `public/quran.pdf`

**الطريقة 2: إضافة الملف للمستودع**
```bash
# ضع ملف PDF في مجلد public
cp /path/to/your/quran.pdf ./public/quran.pdf

git add public/quran.pdf
git commit -m "Add Quran PDF"
git push
```

**الطريقة 3: رفع الملف من الموقع**
- استخدم ميزة رفع الملف في صفحة PDF

### 4. متغيرات البيئة (إن وجدت)

إذا أضفت متغيرات بيئة لاحقاً:
- اذهب إلى Project Settings → Environment Variables
- أضف المتغيرات المطلوبة

### 5. تحديثات تلقائية

Vercel يحدث الموقع تلقائياً عند:
- Push جديد إلى `main` branch
- Pull Request يتم دمجه

## استكشاف الأخطاء

### المشكلة: PDF لا يعمل
- تأكد من أن ملف PDF موجود في `public/quran.pdf`
- تحقق من حجم الملف (Vercel له حد 100MB للملفات الثابتة)
- استخدم CDN خارجي للملفات الكبيرة

### المشكلة: الخطوط العربية لا تظهر
- الخطوط محملة من Google Fonts
- تأكد من اتصال الإنترنت

### المشكلة: البناء يفشل
- تحقق من سجلات البناء في Vercel
- تأكد من أن جميع المكتبات مثبتة في `package.json`

## نصائح الأداء

- استخدم Vercel Edge Functions للصفحات الديناميكية
- ضغط الصور والملفات الكبيرة
- استخدم CDN للملفات الثابتة الكبيرة

