# 🤖 Bayan Quick Reference for AI - مرجع البيان السريع للذكاء الاصطناعي

## Copy & Paste This to Any AI Model - انسخ والصق هذا في أي نموذج ذكاء اصطناعي

---

## What is Bayan? - ما هي البيان؟

**Bayan** is a **bilingual programming language** with **English + Arabic** keywords. It compiles to JavaScript.

**البيان** لغة برمجة **ثنائية اللغة** بكلمات مفتاحية **إنجليزية + عربية**. تُترجم إلى JavaScript.

---

## Keywords - الكلمات المفتاحية

### Core Keywords - الكلمات الأساسية

| English | Arabic | Usage |
|---------|--------|-------|
| `let` | `متغير` | Variables |
| `const` | `ثابت` | Constants |
| `function` | `دالة` | Functions |
| `return` | `ارجع` | Return |
| `if` | `إذا` | If condition |
| `else` | `وإلا` | Else |
| `else if` | `وإلا_إذا` | Else if |
| `for` | `لكل` | For loop |
| `while` | `بينما` | While loop |
| `class` | `صنف` | Class |
| `constructor` | `منشئ` | Constructor |
| `this` | `هذا` | This |
| `new` | `جديد` | New instance |
| `extends` | `يمتد` | Inheritance |
| `true` | `صحيح` | Boolean true |
| `false` | `خطأ` | Boolean false |
| `null` | `لاشيء` | Null |
| `async` | `غير_متزامن` | Async |
| `await` | `انتظر` | Await |

### Advanced Keywords - الكلمات المتقدمة

| English | Arabic | Usage |
|---------|--------|-------|
| `function*` | `دالة*` | Generator function |
| `yield` | `أنتج` | Yield value |
| `enum` | `تعداد` | Enumeration |
| `type` | `نوع_بيانات` | Type alias |
| `match` | `طابق` | Pattern matching |
| `case` | `حالة` | Match case |
| `when` | `عندما` | Guard condition |
| `namespace` | `نطاق` | Namespace |
| `readonly` | `للقراءة_فقط` | Readonly property |
| `@decorator` | `@مزخرف` | Decorator |

### Logic Keywords - كلمات البرمجة المنطقية

| English | Arabic | Usage |
|---------|--------|-------|
| `fact` | `حقيقة` | Logic fact |
| `rule` | `قاعدة` | Logic rule |
| `query` | `استعلام` | Logic query |
| `hybrid` | `هجين` | Hybrid block |

### Operators - العمليات

| Operator | Usage |
|----------|-------|
| `?.` | Optional chaining |
| `??` | Nullish coalescing |
| `...` | Spread/Rest |
| `::` | Namespace access |
| `:` | Type annotation |

---

## Code Examples - أمثلة

### 1. Variables & Functions

```javascript
// English
let x = 10;
function greet(name) {
    return "Hello, " + name;
}

// Arabic
متغير س = 10;
دالة رحب(الاسم) {
    ارجع "مرحباً، " + الاسم;
}

// Mixed
function مرحبا(name) {
    if (name) {
        return "Hello, " + name;
    }
    ارجع "مرحبا";
}
```

### 2. Classes

```javascript
// English
class Person {
    constructor(name) {
        this.name = name;
    }
    greet() {
        return "Hello, " + this.name;
    }
}

// Arabic
صنف شخص {
    منشئ(الاسم) {
        هذا.الاسم = الاسم;
    }
    دالة رحب() {
        ارجع "مرحباً، " + هذا.الاسم;
    }
}
```

### 3. Control Flow

```javascript
// English
if (x > 0) {
    console.log("Positive");
} else if (x < 0) {
    console.log("Negative");
} else {
    console.log("Zero");
}

// Arabic
إذا (س > 0) {
    console.log("موجب");
} وإلا_إذا (س < 0) {
    console.log("سالب");
} وإلا {
    console.log("صفر");
}
```

### 4. Loops

```javascript
// English
for (let i = 0; i < 5; i++) {
    console.log(i);
}

while (count < 10) {
    count = count + 1;
}

// Arabic
لكل (متغير ع = 0; ع < 5; ع++) {
    console.log(ع);
}

بينما (العدد < 10) {
    العدد = العدد + 1;
}
```

### 5. Logic Programming

```javascript
// Facts
fact parent("Ali", "Sara");
حقيقة أب("أحمد", "فاطمة");

// Rules
rule grandparent(?x, ?z) :- parent(?x, ?y), parent(?y, ?z);
قاعدة جد(?س, ?ص) :- أب(?س, ?ع), أب(?ع, ?ص);

// Queries
query grandparent("Ali", ?who);
استعلام جد("أحمد", ?من);
```

---

## Rules - القواعد

1. **Semicolons required** - الفواصل المنقوطة مطلوبة
2. **File extension: `.bn`** - امتداد الملف: `.bn`
3. **Logic variables: `?name`** - متغيرات منطقية: `?الاسم`
4. **Can mix languages** - يمكن خلط اللغات
5. **Compiles to JavaScript** - تُترجم إلى JavaScript

---

## AI Instructions - تعليمات للذكاء الاصطناعي

When generating Bayan code:

1. Use keywords from the table above
2. Add semicolons at end of statements
3. Provide both English and Arabic versions if requested
4. Follow JavaScript syntax with Bayan keywords
5. For logic programming, use `?` for variables
6. **NEW:** Use generators with `function*` and `yield`
7. **NEW:** Use enums with `enum` keyword
8. **NEW:** Use pattern matching with `match`, `case`, `when`
9. **NEW:** Use decorators with `@decorator`
10. **NEW:** Use type annotations with `param: type`
11. **NEW:** Use named parameters with `func(name: value)`
12. **NEW:** Use namespaces with `namespace` and `::`
13. **NEW:** Use optional chaining `?.` and nullish coalescing `??`

### Example Response:

```javascript
// User: "Write a counter class in Bayan"

// English version
class Counter {
    constructor() {
        this.count = 0;
    }
    increment() {
        this.count = this.count + 1;
    }
}

// Arabic version
صنف عداد {
    منشئ() {
        هذا.العدد = 0;
    }
    دالة زيادة() {
        هذا.العدد = هذا.العدد + 1;
    }
}
```

---

## Complete Example - مثال كامل

```javascript
// Bilingual Student Management System
// نظام إدارة الطلاب ثنائي اللغة

class Student {
    constructor(id, name, grade) {
        this.id = id;
        this.name = name;
        this.grade = grade;
    }
    
    pass() {
        return this.grade >= 60;
    }
}

صنف طالب {
    منشئ(المعرف, الاسم, الدرجة) {
        هذا.المعرف = المعرف;
        هذا.الاسم = الاسم;
        هذا.الدرجة = الدرجة;
    }
    
    دالة نجح() {
        ارجع هذا.الدرجة >= 60;
    }
}

// Logic facts
fact enrolled("S001", "Math");
fact enrolled("S002", "Physics");

حقيقة مسجل("ط001", "رياضيات");
حقيقة مسجل("ط002", "فيزياء");

// Hybrid usage
function processStudent(id) {
    const student = new Student(id, "Ali", 85);
    
    if (student.pass()) {
        console.log("Passed");
    } else {
        console.log("Failed");
    }
    
    query enrolled(id, ?course);
    return student;
}
```

---

## 🚀 Advanced Features Examples - أمثلة الميزات المتقدمة

### 8. Generators - المولدات

```javascript
// English
function* numberGenerator(max) {
    let i = 0;
    while (i < max) {
        yield i;
        i++;
    }
}

// Arabic
دالة* مولد_الأرقام(الحد) {
    let ع = 0;
    بينما (ع < الحد) {
        أنتج ع;
        ع++;
    }
}
```

### 9. Enums - التعدادات

```javascript
// English
enum Color { Red = 0, Green = 1, Blue = 2 }

// Arabic
تعداد اللون { أحمر = 0, أخضر = 1, أزرق = 2 }
```

### 10. Pattern Matching - مطابقة الأنماط

```javascript
// English
match value {
    case 0 => "zero",
    case x when x > 10 => "big",
    default => "other"
}

// Arabic
طابق القيمة {
    حالة 0 => "صفر",
    حالة س عندما س > 10 => "كبير",
    افتراضي => "آخر"
}
```

### 11. Decorators - المزخرفات

```javascript
// English
@log
class User {
    @readonly
    id: number;
}

// Arabic
@سجل
صنف مستخدم {
    @للقراءة_فقط
    المعرف: رقم;
}
```

### 12. Type Annotations - تعليقات الأنواع

```javascript
// English
function add(a: number, b: number): number {
    return a + b;
}

// Arabic
دالة جمع(أ: رقم, ب: رقم): رقم {
    ارجع أ + ب;
}
```

### 13. Named Parameters - المعاملات المسماة

```javascript
// English - order doesn't matter!
createUser(age: 25, name: "Ali");

// Arabic
أنشئ_مستخدم(العمر: 25, الاسم: "علي");
```

### 14. Namespaces - النطاقات

```javascript
// English
namespace Math {
    export function add(a, b) { return a + b; }
}
Math::add(5, 3);

// Arabic
نطاق رياضيات {
    صدر دالة جمع(أ, ب) { ارجع أ + ب; }
}
رياضيات::جمع(5, 3);
```

### 15. Advanced Operators - عمليات متقدمة

```javascript
// Optional chaining
user?.profile?.city

// Nullish coalescing
value ?? "default"

// Spread/Rest
[...array]
{...object}
function(...args) { }
```

---

<div align="center">

## ✅ Ready! - جاهز!

**This is all you need to teach any AI model Bayan language with ALL features!**

**هذا كل ما تحتاجه لتعليم أي نموذج ذكاء اصطناعي لغة البيان بجميع الميزات!**

### Feature Checklist - قائمة الميزات

✅ Variables & Functions
✅ Classes & OOP
✅ Logic Programming
✅ Async/Await
✅ **Generators** ⭐ NEW
✅ **Enums** ⭐ NEW
✅ **Pattern Matching** ⭐ NEW
✅ **Decorators** ⭐ NEW
✅ **Type Annotations** ⭐ NEW
✅ **Named Parameters** ⭐ NEW
✅ **Namespaces** ⭐ NEW
✅ **Advanced Operators** ⭐ NEW
✅ **Baserah AI System** 🔥 NEW
✅ **Visual IDE** 🎨 NEW

**Bayan is 100% complete! - البيان مكتملة 100%!**

</div>

---

## 🔥 Baserah AI System - نظام بصيرة AI

### Mother Equation - المعادلة الأم

**Concept:** `O = (id, Φ, Ψ(t), Γ)`

- **id**: Unique identifier
- **Φ (Phi)**: Static properties (unchanging)
- **Ψ(t) (Psi)**: Dynamic states (time-dependent)
- **Γ (Gamma)**: Shape equation (geometry)

### Linguistic Operators - المشغلات اللغوية

| Operator | Arabic | Usage |
|----------|--------|-------|
| `Go` | `انتقل` | Movement from location to location |
| `Affect` | `أثر` | Actor affects object with intensity |
| `Transform` | `حول` | Transform object properties |
| `Create` | `أنشئ` | Create new object from components |
| `Merge` | `ادمج` | Merge multiple objects |
| `Decompose` | `فكك` | Break object into parts |
| `Interact` | `تفاعل` | Two objects interact |
| `Actor` | `فاعل` | Mark as actor role |
| `Object` | `مفعول` | Mark as object role |

### Example - مثال

```javascript
// Create a ball - إنشاء كرة
let ball = mother_equation("ball_1");

// Set static properties - تعيين خصائص ثابتة
ball.static_property("material", "leather");
ball.static_property("color", "white");

// Set dynamic states - تعيين حالات متغيرة
ball.state("location", "ground");
ball.state("speed", 0);

// Apply Go operator - تطبيق مشغل الانتقال
Go(ball, "ground", "air");

// Apply Affect operator - تطبيق مشغل التأثير
let player = mother_equation("player_1");
Affect(player, ball, "kick", 0.8);

// Print state - طباعة الحالة
print("Location: " + ball.state("location")); // "air"
print("Speed: " + ball.state("speed")); // 0.8
```

---

## 🎨 Visual IDE - بيئة التطوير المرئية

Bayan comes with **TWO IDE options**:

### 1. 🎨 Visual Drag-and-Drop IDE (Recommended for Beginners) ⭐⭐⭐

**File:** `public/ide/visual-ide.html`

**Features:**
- ✅ **Drag & Drop** - سحب وإفلات
- ✅ **No Coding Required** - بدون كتابة كود
- ✅ **8 Block Types** - 8 أنواع من الكتل
- ✅ **Visual Programming** - برمجة مرئية
- ✅ **Auto Code Generation** - توليد كود تلقائي
- ✅ **Properties Panel** - لوحة خصائص
- ✅ **Professional Dark Theme** - سمة داكنة احترافية

**Block Types:**
1. 🖨️ **Print** - اطبع
2. 📦 **Variable** - متغير
3. 🔧 **Function** - دالة
4. ❓ **If** - إذا
5. 🔄 **Loop** - حلقة
6. 📦 **Class** - صنف
7. 🧮 **Mother Equation** - معادلة أم (Baserah AI)
8. ⚡ **Operator** - مشغل (Baserah AI)

**How to Use:**
1. Open `visual-ide.html` in browser
2. Drag blocks from toolbox (right)
3. Drop on canvas (center)
4. Edit properties (left panel)
5. Click "Generate Code"

---

### 2. 📝 Text Editor IDE (For Advanced Users)

**File:** `public/ide/standalone.html`

**Features:**
- ✅ **Syntax Highlighting** - إبراز الصيغة (100+ keywords)
- ✅ **Smart Autocomplete** - إكمال تلقائي ذكي (60+ suggestions)
- ✅ **Line Numbers** - أرقام الأسطر
- ✅ **Code Folding** - طي الكود
- ✅ **Bracket Matching** - مطابقة الأقواس
- ✅ **Search & Replace** - بحث واستبدال
- ✅ **3 Themes** - 3 سمات (Light, Dark, Arabic)
- ✅ **RTL Support** - دعم RTL كامل للعربية

**Themes:**
1. **Light Theme** - سمة فاتحة (for daytime)
2. **Dark Theme** - سمة داكنة (for nighttime)
3. **Arabic Theme** - سمة عربية (with RTL support)

**Keyboard Shortcuts:**
- `Ctrl+S` / `Cmd+S` - Save file - حفظ
- `Ctrl+Z` / `Cmd+Z` - Undo - تراجع
- `Ctrl+F` / `Cmd+F` - Search - بحث
- `Ctrl+Space` - Autocomplete - إكمال تلقائي

---

## 📝 Updated Generation Guidelines - إرشادات التوليد المحدثة

When generating Bayan code with **Baserah AI**:

1. Use `mother_equation()` to create objects
2. Use `.static_property()` for unchanging properties
3. Use `.state()` for time-dependent states
4. Use linguistic operators: `Go`, `Affect`, `Transform`, etc.
5. Track state changes over time
6. Use both English and Arabic versions

### Example Request - مثال طلب

```
Write a Bayan program using Baserah AI to model:
- A car moving from home to work
- The car's speed changes during the journey
- Use both English and Arabic versions
```

---

**🎉 Bayan now includes AI-powered mathematical modeling! 🎉**
**🎉 البيان الآن تتضمن نمذجة رياضية مدعومة بالذكاء الاصطناعي! 🎉**

</div>

