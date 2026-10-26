// All UI strings in Arabic (ar) and English (en).
// The JSON data fields (notes, otherSources) are always in English — only UI chrome is translated.

export const translations = {
  ar: {
    // Header
    'header.subtitle': 'قفل وتأمين',
    'lang.toggle': 'EN',
    'lang.label': 'English',

    // Breadcrumb
    'nav.aria': 'مسار التنقل',

    // Search
    'search.placeholder': 'ابحث بالقاطع أو الاسم… (مثال: Q70)',
    'search.noResults': 'لا نتائج لـ',

    // Machine page
    'section.chooseSystem': 'اختر النظام',
    'system.loads.suffix': 'أحمال',
    'system.empty.label': 'قريبًا',

    // System page
    'section.chooseLoad': 'اختر الحمل',
    'system.notes.title': 'ملاحظات النظام',
    'system.dataSoon.title': 'بيانات قيد الإعداد',
    'system.dataSoon.body': 'أحمال هذا النظام ستُضاف قريبًا. راجع مخطط الخط الأحادي حتى ذلك الحين.',

    // Load page — danger tag
    'load.danger.header': '⚡ DANGER · DO NOT OPERATE · خطر لا تشغّل ⚡',
    'load.open': 'افتح القاطع',
    'load.inPanel': 'في اللوحة',

    // Load page — info cards
    'load.safetyNotes': 'ملاحظات السلامة',
    'load.relatedBreakers': 'قواطع مرتبطة',
    'load.relatedBreakers.hint': 'اضغط للانتقال مباشرةً إلى تفاصيل القاطع:',
    'load.otherSources': 'مصادر الطاقة الأخرى',
    'load.otherSources.warning':
      'غير مُسجَّل — تحقق من مخطط الخط الأحادي للتأكد من عدم وجود مصادر طاقة إضافية (فولتية التحكم، مغذيات احتياطية، سخانات).',

    // Checklist
    'checklist.title': 'قائمة التحقق من العزل',
    'checklist.progress': 'التقدم',
    'checklist.complete': '✅ تم العزل — المنطقة آمنة للعمل',
    'checklist.aria.check': 'تحقق',
    'checklist.aria.uncheck': 'إلغاء التحقق',
    'checklist.step1': 'أخطر المشغّل واحصل على تصريح العمل',
    'checklist.step2': 'أوقف الحمل إيقافًا طبيعيًا وانتظر حتى يتوقف تمامًا',
    'checklist.step3': 'افتح القاطع {Q} في لوحة {panel}',
    'checklist.step4': 'ضع قفلك الشخصي وبطاقتك على {Q}',
    'checklist.step5': 'حاول التشغيل من نقطة التحكم وتأكد أن الجهاز لا يعمل',
    'checklist.step6':
      'تحقق من انعدام الفولتية عند أطراف الحمل (اختبر جهاز القياس على مصدر معروف قبل وبعد القياس)',
    'checklist.step6.warning': '⚠ إجباري — اختبر جهاز القياس على مصدر معروف قبل القياس وبعده',
    'checklist.step7': 'بعد الانتهاء: انزع قفلك وبطاقتك، ثم أبلغ المشغّل قبل إعادة التوصيل',

    // State cards
    'state.loading': 'جارٍ التحميل…',
    'state.error': 'خطأ في التحميل',
    'state.notFound.title': 'الصفحة غير موجودة',
    'state.notFound.body': 'تحقق من الرابط أو امسح رمز QR مجددًا.',
    'state.loadNotFound.title': 'الحمل غير موجود',
    'state.loadNotFound.body': 'تحقق من الرابط أو ابدأ من صفحة الجهاز.',
    'state.machineNotFound': 'الجهاز غير موجود',

    // Footer
    'footer.warning':
      '⚠ يجب التحقق من محتوى هذا الدليل مقابل مخطط الخط الأحادي وإجراءات LOTO المعتمدة لدى الشركة قبل تنفيذ أي عزل.',

    // QR page
    'qr.title': 'رموز QR للطباعة',
    'qr.urlNote': 'يجب تغيير SITE_URL في src/config.js قبل النشر. القيمة الحالية:',
    'qr.print': '🖨 طباعة الكل',
    'qr.homePage': 'الصفحة الرئيسية',
    'qr.link': 'توليد رموز QR',
  },

  en: {
    'header.subtitle': 'Lockout / Tagout',
    'lang.toggle': 'ع',
    'lang.label': 'العربية',

    'nav.aria': 'Breadcrumb navigation',

    'search.placeholder': 'Search by breaker or name… (e.g. Q70)',
    'search.noResults': 'No results for',

    'section.chooseSystem': 'Choose System',
    'system.loads.suffix': 'loads',
    'system.empty.label': 'Coming soon',

    'section.chooseLoad': 'Choose Load to Isolate',
    'system.notes.title': 'System Notes',
    'system.dataSoon.title': 'Data In Progress',
    'system.dataSoon.body':
      'Loads for this system will be added soon. Refer to the single line diagram in the meantime.',

    'load.danger.header': '⚡ DANGER · DO NOT OPERATE ⚡',
    'load.open': 'Open Breaker',
    'load.inPanel': 'In Panel',

    'load.safetyNotes': 'Safety Notes',
    'load.relatedBreakers': 'Related Breakers',
    'load.relatedBreakers.hint': 'Tap to go directly to that breaker:',
    'load.otherSources': 'Other Power Sources',
    'load.otherSources.warning':
      'Not recorded — check the single line diagram to confirm no additional energy sources (control voltage, backup feeders, heaters) are present.',

    'checklist.title': 'Isolation Checklist',
    'checklist.progress': 'Progress',
    'checklist.complete': '✅ Isolation complete — area safe to work',
    'checklist.aria.check': 'Check',
    'checklist.aria.uncheck': 'Uncheck',
    'checklist.step1': 'Notify the operator and obtain the work permit',
    'checklist.step2': 'Stop the load normally and wait for it to come to a complete stop',
    'checklist.step3': 'Open breaker {Q} in panel {panel}',
    'checklist.step4': 'Apply your personal lock and tag on {Q}',
    'checklist.step5': 'Try-start from the control point and confirm it does not run',
    'checklist.step6':
      'Verify zero voltage at the load terminals (test the tester on a known live source before and after measuring)',
    'checklist.step6.warning':
      '⚠ Mandatory — test your voltage tester on a known live source before and after measuring',
    'checklist.step7':
      'After work: remove your own lock and tag, then notify the operator before re-energising',

    'state.loading': 'Loading…',
    'state.error': 'Load error',
    'state.notFound.title': 'Page not found',
    'state.notFound.body': 'Check the link or scan the QR code again.',
    'state.loadNotFound.title': 'Load not found',
    'state.loadNotFound.body': 'Check the link or start from the machine page.',
    'state.machineNotFound': 'Machine not found',

    'footer.warning':
      '⚠ Contents must be verified against the single line diagram and the company\'s approved LOTO procedure before carrying out any isolation.',

    'qr.title': 'QR Codes for Printing',
    'qr.urlNote': 'Update SITE_URL in src/config.js before deploying. Current value:',
    'qr.print': '🖨 Print All',
    'qr.homePage': 'Home Page',
    'qr.link': 'Generate QR Codes',
  },
}
