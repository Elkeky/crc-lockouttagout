# دليل العزل الكهربائي LOTO — RTG CRC

> تطبيق ويب تدريجي (PWA) للهواتف — يعمل بدون إنترنت بعد أول تحميل.

---

## 🚀 تشغيل التطبيق محليًا

```bash
npm install
npm run dev
```

افتح المتصفح على `http://localhost:5173/m/rtg-crc`

---

## ✏️ كيف تعدل البيانات

**ملف البيانات الوحيد:** `public/data/machines.json`

### هيكل الملف

```json
{
  "machines": [
    {
      "id": "rtg-crc",           // معرّف فريد (يُستخدم في الرابط)
      "name": "RTG CRC",          // الاسم المعروض
      "systems": [
        {
          "id": "hoist",
          "name": "Hoist",
          "notes": ["ملاحظة على مستوى النظام"],
          "loads": [
            {
              "id": "q70",              // معرّف فريد (يُستخدم في رابط الحمل والهاش)
              "breaker": "Q70",         // رقم القاطع (يظهر كبيرًا في بطاقة الخطر)
              "name": "Hoist Working Brake", // اسم الحمل
              "panel": "EH2",           // اللوحة التي يتواجد فيها القاطع
              "notes": [                // ملاحظات السلامة (قائمة)
                "ملاحظة 1",
                "ملاحظة 2"
              ],
              "relatedBreakers": ["Q71"], // قواطع مرتبطة (ستصبح chips تفاعلية)
              "otherSources": [           // مصادر طاقة أخرى — اتركها فارغة [] إن لم تكن
                {
                  "label": "فولتية التحكم",
                  "description": "تحقق من UPS لوحة التحكم"
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}
```

### إضافة حمل جديد

افتح `public/data/machines.json` وأضف كائنًا جديدًا داخل مصفوفة `loads` للنظام المناسب:

```json
{
  "id": "q99",
  "breaker": "Q99",
  "name": "اسم الحمل الجديد",
  "panel": "EH2",
  "notes": [],
  "relatedBreakers": [],
  "otherSources": []
}
```

### إضافة نظام جديد

أضف كائنًا داخل مصفوفة `systems` للجهاز المناسب:

```json
{
  "id": "cooling",
  "name": "Cooling",
  "notes": [],
  "loads": []
}
```

لإضافة أيقونة للنظام الجديد، افتح `src/pages/MachinePage.jsx` وأضف إلى `SYSTEM_ICONS`:
```js
const SYSTEM_ICONS = {
  cooling: '❄️',
  // ...
}
```

### إضافة جهاز (machine) جديد

أضف كائنًا جديدًا داخل مصفوفة `machines` في `machines.json`، ثم أنشئ رمز QR من صفحة `/qr`.

---

## 🌐 النشر

### 1. تحديث عنوان الموقع

قبل البناء، افتح `src/config.js` وحدّث:

```js
export const SITE_URL = 'https://your-actual-domain.com';
```

هذا العنوان يُستخدم تلقائيًا في رموز QR.

### 2. بناء الإنتاج

```bash
npm run build
```

ستجد الملفات الجاهزة في مجلد `dist/`.

### النشر على Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

أو اسحب مجلد `dist/` إلى [netlify.com/drop](https://netlify.com/drop).

### النشر على Vercel

```bash
npm install -g vercel
vercel --prod
```

### النشر على GitHub Pages

1. تأكد من ضبط `base` في `vite.config.js` إن كان الموقع على مسار فرعي:
   ```js
   export default defineConfig({ base: '/repo-name/', ... })
   ```
2. استخدم [gh-pages](https://github.com/tschaub/gh-pages):
   ```bash
   npm install --save-dev gh-pages
   npx gh-pages -d dist
   ```

---

## 📱 روابط مهمة

| الرابط | الوصف |
|--------|--------|
| `/m/rtg-crc` | صفحة جهاز RTG CRC |
| `/m/rtg-crc#q70` | يقفز مباشرة إلى تفاصيل Q70 |
| `/qr` | صفحة توليد رموز QR للطباعة |

---

## 🔧 بنية المشروع

```
public/
  data/
    machines.json   ← ملف البيانات الوحيد
src/
  config.js         ← عنوان الموقع لرموز QR
  components/
    Breadcrumb.jsx
    Checklist.jsx
    Header.jsx
    SearchBox.jsx
  pages/
    MachinePage.jsx  ← صفحة اختيار النظام
    SystemPage.jsx   ← صفحة اختيار الحمل
    LoadPage.jsx     ← صفحة نتيجة العزل (بطاقة الخطر + قائمة التحقق)
    QrPage.jsx       ← توليد رموز QR
    NotFound.jsx
```

---

## ⚠️ تنبيه قانوني / إخلاء مسؤولية

يجب التحقق من جميع المعلومات الواردة في هذا التطبيق مقابل **مخطط الخط الأحادي (Single Line Diagram)** وإجراءات LOTO المعتمدة رسميًا لدى الشركة قبل تنفيذ أي عزل كهربائي.

هذا التطبيق مساعد فقط ولا يُغني عن التدريب والمراجع الرسمية.
