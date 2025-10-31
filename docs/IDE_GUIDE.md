# 🎨 دليل بيئة التطوير المتكاملة للبيان

## 📖 نظرة عامة

بيئة تطوير متكاملة (IDE) حديثة وقوية للغة البرمجة البيان، مبنية باستخدام:
- **React** + **TypeScript** للواجهة
- **CodeMirror 6** للمحرر
- **دعم كامل للعربية** مع RTL

---

## 🚀 الميزات الرئيسية

### 1. المحرر المتقدم
- ✅ **إبراز الصيغة** - تلوين تلقائي للكود
- ✅ **الإكمال التلقائي** - اقتراحات ذكية للكلمات المفتاحية
- ✅ **أرقام الأسطر** - ترقيم تلقائي
- ✅ **طي الكود** - إخفاء/إظهار الأقسام
- ✅ **مطابقة الأقواس** - تمييز الأقواس المتطابقة
- ✅ **البحث والاستبدال** - بحث متقدم في الكود
- ✅ **التراجع/الإعادة** - تاريخ كامل للتغييرات

### 2. السمات (Themes)
- 🌞 **السمة الفاتحة** - مريحة للعين في النهار
- 🌙 **السمة الداكنة** - مثالية للعمل الليلي
- 🇸🇦 **السمة العربية** - محسّنة للغة العربية مع RTL

### 3. الإكمال التلقائي
- **80+ كلمة مفتاحية** عربية وإنجليزية
- **15+ دالة مدمجة** مع أمثلة
- **قوالب كود جاهزة** (snippets)
- **معلومات تفصيلية** لكل اقتراح

### 4. اختصارات لوحة المفاتيح
| الاختصار | الوظيفة |
|----------|---------|
| `Ctrl+S` / `Cmd+S` | حفظ الملف |
| `Ctrl+Z` / `Cmd+Z` | تراجع |
| `Ctrl+Shift+Z` / `Cmd+Shift+Z` | إعادة |
| `Ctrl+F` / `Cmd+F` | بحث |
| `Ctrl+H` / `Cmd+H` | استبدال |
| `Ctrl+/` / `Cmd+/` | تعليق/إلغاء تعليق |
| `Ctrl+Space` | إظهار الإكمال التلقائي |

---

## 📂 هيكل المشروع

```
src/ide/
├── components/
│   ├── BayanEditor.tsx          # المحرر الأساسي
│   ├── LogicPanel.tsx           # لوحة المنطق (قادم)
│   ├── ProjectExplorer.tsx      # مستكشف المشاريع (قادم)
│   └── OutputPanel.tsx          # لوحة المخرجات (قادم)
├── themes/
│   ├── bayanTheme.ts            # سمات المحرر
│   └── bayanSyntax.ts           # إبراز الصيغة
├── utils/
│   └── bayanAutocomplete.ts     # نظام الإكمال التلقائي
└── hooks/
    └── useBayanIDE.ts           # Hook رئيسي (قادم)
```

---

## 🎯 الاستخدام

### 1. استخدام المحرر الأساسي

```typescript
import { BayanEditor } from './ide/components/BayanEditor';

function App() {
  const [code, setCode] = useState('');

  return (
    <BayanEditor
      initialContent="اطبع('مرحباً')"
      theme="light"
      onChange={(content) => setCode(content)}
      onSave={(content) => console.log('Saved:', content)}
      showLineNumbers={true}
      height="600px"
    />
  );
}
```

### 2. تغيير السمة

```typescript
const [theme, setTheme] = useState<'light' | 'dark' | 'arabic'>('light');

<BayanEditor theme={theme} />

// تغيير السمة
<button onClick={() => setTheme('dark')}>داكن</button>
<button onClick={() => setTheme('arabic')}>عربي</button>
```

### 3. الحصول على المحتوى

```typescript
import { useBayanEditor } from './ide/components/BayanEditor';

function MyComponent() {
  const editorRef = useRef<HTMLDivElement>(null);
  const { getContent, setContent, focus } = useBayanEditor(editorRef);

  const handleRun = () => {
    const code = getContent();
    console.log('Running:', code);
  };

  return (
    <>
      <BayanEditor ref={editorRef} />
      <button onClick={handleRun}>تشغيل</button>
    </>
  );
}
```

---

## 🎨 تخصيص السمات

### إنشاء سمة مخصصة

```typescript
import { EditorView } from '@codemirror/view';

export const myCustomTheme = EditorView.theme({
  '&': {
    color: '#your-color',
    backgroundColor: '#your-bg',
    fontSize: '16px'
  },
  '.cm-gutters': {
    backgroundColor: '#your-gutter-bg',
    color: '#your-gutter-color'
  }
  // ... المزيد من التخصيصات
}, { dark: false });
```

---

## 🔧 الإكمال التلقائي المخصص

### إضافة اقتراحات جديدة

```typescript
import { Completion } from '@codemirror/autocomplete';

const myCompletions: Completion[] = [
  {
    label: 'دالتي',
    type: 'function',
    detail: 'دالة مخصصة',
    info: 'دالتي(معامل1, معامل2)',
    apply: 'دالتي(${1:معامل1}, ${2:معامل2})'
  }
];
```

---

## 📊 الكلمات المفتاحية المدعومة

### التحكم في التدفق
```
إذا، وإلا، وإلا_إذا، بينما، لكل، في، كرر، توقف، استمر
if, else, else_if, while, for, in, repeat, break, continue
```

### التصريحات
```
دالة، ليكن، متغير، ثابت، صنف، واجهة، تعداد، نطاق
function, let, var, const, class, interface, enum, namespace
```

### البرمجة الكائنية
```
هذا، جديد، يمتد، ينفذ، منشئ، عام، خاص، محمي
this, new, extends, implements, constructor, public, private, protected
```

### البرمجة المنطقية
```
حقيقة، قاعدة، استعلام، أضف_حقيقة، أضف_قاعدة
fact, rule, query, assert, retract
```

### نظام بصيرة AI
```
معادلة_أم، انتقل، أثر، حول، أنشئ، ادمج، فكك، تفاعل
mother_equation, go, affect, transform, create, merge, decompose, interact
```

---

## 🌟 أمثلة عملية

### مثال 1: برنامج بسيط

```typescript
// كود عربي
دالة مرحبا(اسم) {
  اطبع("مرحباً " + اسم + "!")
}

مرحبا("أحمد")

// English code
function hello(name) {
  print("Hello " + name + "!")
}

hello("Ahmed")
```

### مثال 2: استخدام نظام بصيرة

```typescript
// إنشاء معادلة أم
متغير كرة = معادلة_أم("كرة_1")

// تعيين خصائص
كرة.خاصية_ثابتة("مادة", "جلد")
كرة.حالة("موقع", "أرض")

// تطبيق مشغل
انتقل(كرة, "أرض", "هواء")

اطبع(كرة.حالة("موقع")) // "هواء"
```

### مثال 3: برمجة منطقية

```typescript
// تعريف حقائق
حقيقة أب("خالد", "أحمد")
حقيقة أب("أحمد", "محمد")

// تعريف قاعدة
قاعدة جد(X, Z) ← أب(X, Y) ∧ أب(Y, Z)

// استعلام
استعلام جد("خالد", ?Z)
// النتيجة: Z = "محمد"
```

---

## 🔮 الميزات القادمة

### المرحلة التالية
- [ ] **لوحة المنطق التفاعلية** - تنفيذ استعلامات منطقية
- [ ] **مدير المشاريع** - إنشاء وحفظ المشاريع
- [ ] **لوحة المخرجات** - عرض نتائج التنفيذ
- [ ] **المنقح (Debugger)** - تصحيح الأخطاء خطوة بخطوة
- [ ] **مصمم المعادلات المرئي** - رسم المعادلات بصرياً
- [ ] **إصدار سطح المكتب** - Electron
- [ ] **إصدار الويب** - PWA
- [ ] **إصدار الجوال** - React Native

---

## 🛠️ التطوير

### تثبيت المكتبات

```bash
npm install react react-dom @codemirror/state @codemirror/view \
  @codemirror/commands @codemirror/language @codemirror/autocomplete \
  @codemirror/lint @codemirror/search @codemirror/lang-javascript \
  @lezer/highlight

npm install --save-dev @types/react @types/react-dom
```

### تشغيل المحرر

```bash
# تطوير
npm run dev

# بناء
npm run build

# اختبار
npm test
```

---

## 📝 ملاحظات

### دعم RTL
- السمة العربية تدعم RTL بشكل كامل
- أرقام الأسطر على اليسار
- النص يبدأ من اليمين
- الإكمال التلقائي يظهر من اليمين

### الأداء
- المحرر محسّن للملفات الكبيرة
- الإكمال التلقائي سريع وفعال
- لا تأخير في الكتابة

### التوافق
- ✅ Chrome/Edge (أحدث إصدارين)
- ✅ Firefox (أحدث إصدارين)
- ✅ Safari (أحدث إصدارين)
- ✅ Mobile browsers

---

## 🤝 المساهمة

نرحب بمساهماتكم! يمكنكم:
1. فتح Issue للإبلاغ عن مشكلة
2. إرسال Pull Request لإضافة ميزة
3. تحسين التوثيق
4. اقتراح أفكار جديدة

---

## 📄 الترخيص

MIT License - حرية الاستخدام والتعديل

---

**تم التطوير بواسطة فريق البيان 💙**

