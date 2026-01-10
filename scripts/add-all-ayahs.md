# إضافة جميع الآيات

لإضافة جميع الآيات الـ6236 آية، يمكنك:

## الطريقة الموصى بها: استخدام API

استخدم API من مصدر موثوق مثل:
- Tanzil.net: https://tanzil.net/
- Alquran.cloud: https://alquran.cloud/api
- Quran.com API

## مثال على استخدام API:

```javascript
// Fetch ayahs for a surah
fetch('https://api.alquran.cloud/v1/surah/1/ar.asad')
  .then(res => res.json())
  .then(data => {
    // data.data.ayahs contains all ayahs
  });
```

## أو إضافة يدوية:

أضف الآيات في ملف `data/surahs.ts` لكل سورة في حقل `ayahs`:

```typescript
ayahs: [
  { number: 1, text: 'نص الآية...' },
  { number: 2, text: 'نص الآية...' },
  // ...
]
```

## ملاحظة:

- تأكد من استخدام نص عثماني موثوق
- تحقق من صحة الآيات
- احترم حقوق النشر

