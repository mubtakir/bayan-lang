# التكامل مع بصيرة AI
# Baserah AI Integration

## 🌟 نظرة عامة - Overview

نظام متكامل للتحليل العميق للنصوص العربية باستخدام سيماء الحروف، مع إمكانية التكامل الكامل مع بصيرة AI.

A comprehensive system for deep analysis of Arabic texts using letter semiotics, with full integration capabilities with Baserah AI.

---

## 📦 المكونات الرئيسية - Main Components

### 1. محلل النصوص (Text Analyzer)
**الملف:** `src/ai/textAnalyzer.ts`

يحلل النصوص العربية على مستويات متعددة:
- تحليل الكلمات والجمل
- استخراج المعاني السائدة
- تحديد النبرة العاطفية
- حساب التماسك والجودة

**الاستخدام:**
```typescript
import { TextAnalyzer } from './src/ai/textAnalyzer';

const analyzer = new TextAnalyzer();
const analysis = analyzer.analyzeText('النص العربي هنا');

console.log(analysis.overallTheme);      // الموضوع العام
console.log(analysis.emotionalTone);     // النبرة العاطفية
console.log(analysis.qualityScore);      // درجة الجودة
```

### 2. مولد النصوص (Text Generator)
**الملف:** `src/ai/textGenerator.ts`

يولد نصوصاً عربية بناءً على معايير محددة:
- المعاني المطلوبة
- المزاج (إيجابي/سلبي/محايد)
- الطابع (نفسي/مادي/متوازن)
- عدد الكلمات

**الاستخدام:**
```typescript
import { TextGenerator } from './src/ai/textGenerator';

const generator = new TextGenerator();
const result = generator.generateText({
    targetMeanings: ['الحياة', 'النور', 'الأمل'],
    mood: 'positive',
    minWords: 5,
    maxWords: 10
});

console.log(result.text);           // النص المولد
console.log(result.matchScore);     // درجة المطابقة
```

### 3. محرك الفهم العميق (Deep Understanding Engine)
**الملف:** `src/ai/deepUnderstandingEngine.ts`

يوفر فهماً عميقاً للنصوص:
- المعنى السطحي والعميق
- الموضوعات المخفية
- الطبقات العاطفية
- المعاني الرمزية
- الملف النفسي
- تفسير الأحلام

**الاستخدام:**
```typescript
import { DeepUnderstandingEngine } from './src/ai/deepUnderstandingEngine';

const engine = new DeepUnderstandingEngine();

// فهم عميق
const insight = engine.analyzeDeep('النص العربي هنا');
console.log(insight.deepMeaning);
console.log(insight.hiddenThemes);

// تفسير حلم
const dream = engine.interpretDream('رأيت في المنام...');
console.log(dream.interpretation);
```

### 4. API بصيرة (Baserah API)
**الملف:** `src/api/baserahIntegration.ts`

واجهة برمجية موحدة للتكامل مع بصيرة AI:
- تحليل النصوص
- توليد النصوص
- الحصول على معاني الحروف
- تحليل التفاعلات
- معالجة دفعات
- مقارنة النصوص

**الاستخدام:**
```typescript
import { baserahAPI } from './src/api/baserahIntegration';

// تحليل نص
const response = await baserahAPI.analyzeText({
    text: 'النص العربي',
    analysisType: 'deep'
});

// توليد نص
const generated = await baserahAPI.generateText({
    criteria: {
        targetMeanings: ['الحياة', 'الأمل'],
        mood: 'positive'
    }
});

// مقارنة نصين
const comparison = await baserahAPI.compareTexts(text1, text2);
```

---

## 🚀 البدء السريع - Quick Start

### التثبيت - Installation

```bash
# استنساخ المشروع
git clone https://github.com/mubtakir/bayan-lang.git
cd bayan-lang

# تثبيت الاعتماديات
npm install

# بناء المشروع
npm run build
```

### الاستخدام الأساسي - Basic Usage

```typescript
import { baserahAPI } from './src/api/baserahIntegration';

// تحليل نص بسيط
const analysis = await baserahAPI.analyzeText({
    text: 'الحياة جميلة والأمل موجود',
    analysisType: 'basic'
});

console.log(analysis.data);
```

### تشغيل الأمثلة - Run Examples

```bash
# بناء المشروع
npm run build

# تشغيل أمثلة التكامل
node dist/examples/baserah-integration-examples.js
```

---

## 📚 الأمثلة - Examples

### مثال 1: تحليل نص أساسي

```typescript
const response = await baserahAPI.analyzeText({
    text: 'الحياة جميلة والأمل موجود في كل مكان',
    analysisType: 'basic'
});

// النتيجة:
// - عدد الجمل: 1
// - عدد الكلمات: 6
// - الموضوع العام: الحياة والطبيعة
// - النبرة العاطفية: متفائل
// - درجة الجودة: 75%
```

### مثال 2: فهم عميق

```typescript
const response = await baserahAPI.analyzeText({
    text: 'في ظلمة الليل يبحث القلب عن نور الأمل',
    analysisType: 'deep'
});

// النتيجة:
// - المعنى السطحي: النص يتحدث عن البحث عن الأمل
// - المعنى العميق: صراع نفسي بين اليأس والأمل
// - الموضوعات المخفية: قلق وجودي، بحث عن المعنى
// - المعاني الرمزية: الظلمة = الجهل، النور = الهداية
```

### مثال 3: تفسير حلم

```typescript
const response = await baserahAPI.analyzeText({
    text: 'رأيت في المنام نوراً ساطعاً وماءً جارياً',
    analysisType: 'dream'
});

// النتيجة:
// - الرموز: نور (هداية)، ماء (حياة)
// - البشارات: بشارة من نور، بشارة من ماء
// - التفسير: الحلم يبشر بالخير والهداية
```

### مثال 4: توليد نص

```typescript
const response = await baserahAPI.generateText({
    criteria: {
        targetMeanings: ['الحياة', 'النور', 'الأمل'],
        mood: 'positive',
        theme: 'psychological',
        minWords: 5,
        maxWords: 10
    }
});

// النتيجة:
// - النص المولد: "حياة نور أمل سعادة فرح"
// - درجة المطابقة: 85%
// - درجة التماسك: 78%
```

### مثال 5: البحث بالمعنى

```typescript
const response = await baserahAPI.searchWordsByMeaning('الحياة');

// النتيجة:
// - عدد الكلمات: 5
// - الكلمات: حياة، نور، ماء، شجر، طير
```

### مثال 6: مقارنة نصين

```typescript
const response = await baserahAPI.compareTexts(
    'الحياة جميلة والأمل موجود',
    'الحياة صعبة والألم حاضر'
);

// النتيجة:
// - التشابه: 45%
// - الفروقات:
//   * النبرة: إيجابي مقابل سلبي
//   * الجودة: 75% مقابل 60%
```

---

## 🎯 حالات الاستخدام - Use Cases

### 1. تحليل المحتوى
- تحليل المقالات والنصوص الأدبية
- تقييم جودة المحتوى
- استخراج الموضوعات الرئيسية

### 2. توليد المحتوى
- كتابة نصوص بناءً على معايير محددة
- توليد عناوين جذابة
- إنشاء محتوى متوازن عاطفياً

### 3. الفهم العميق
- تحليل النصوص الدينية
- فهم الشعر والأدب
- تفسير الأحلام والرؤى

### 4. التطبيقات التعليمية
- تعليم اللغة العربية
- تحليل النصوص الأدبية
- فهم البلاغة والبيان

### 5. البحث والتطوير
- دراسة سيماء الحروف
- تطوير نماذج لغوية
- تحليل الخطاب

---

## 🔧 التخصيص - Customization

### إضافة كلمات جديدة للقاموس

```typescript
import { TextGenerator } from './src/ai/textGenerator';

const generator = new TextGenerator();
generator.addWords(['كلمة1', 'كلمة2', 'كلمة3']);
```

### تخصيص معايير التوليد

```typescript
const customCriteria = {
    targetMeanings: ['معنى1', 'معنى2'],
    mood: 'neutral',
    theme: 'balanced',
    minWords: 3,
    maxWords: 7,
    coherenceLevel: 0.8
};

const result = generator.generateText(customCriteria);
```

---

## 📊 الأداء - Performance

- **سرعة التحليل**: ~100ms لكل نص (متوسط 50 كلمة)
- **سرعة التوليد**: ~200ms لكل نص
- **الذاكرة**: ~50MB للنظام الكامل
- **التوسع**: يدعم معالجة دفعات كبيرة

---

## 🔮 التطويرات المستقبلية - Future Enhancements

- [ ] دعم المزيد من اللهجات العربية
- [ ] تحسين دقة تفسير الأحلام
- [ ] إضافة نماذج تعلم آلي
- [ ] دعم التحليل الصوتي
- [ ] واجهة ويب تفاعلية
- [ ] API REST كامل
- [ ] دعم اللغات الأخرى

---

## 📝 الترخيص - License

MIT License - انظر ملف LICENSE

---

## 🤝 المساهمة - Contributing

نرحب بالمساهمات! يرجى:
1. Fork المشروع
2. إنشاء فرع للميزة الجديدة
3. Commit التغييرات
4. Push إلى الفرع
5. فتح Pull Request

---

<div align="center">

**صُنع بـ ❤️ لخدمة اللغة العربية**

**Made with ❤️ to serve the Arabic language**

**https://github.com/mubtakir/bayan-lang**

</div>

