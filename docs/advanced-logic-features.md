# الميزات المنطقية المتقدمة في لغة البيان
# Advanced Logic Features in Bayan Language

## 📋 جدول المحتويات | Table of Contents

1. [النفي كفشل (Negation as Failure)](#negation-as-failure)
2. [عامل القطع (Cut Operator)](#cut-operator)
3. [جمع الحلول (FindAll/BagOf/SetOf)](#collecting-solutions)
4. [التعديل الديناميكي (Assert/Retract)](#dynamic-modification)
5. [التقييم الحسابي (Arithmetic Evaluation)](#arithmetic-evaluation)
6. [مطابقة أنماط القوائم (List Pattern Matching)](#list-pattern-matching)
7. [أمثلة متقدمة (Advanced Examples)](#advanced-examples)

---

## 1. النفي كفشل (Negation as Failure) {#negation-as-failure}

### الوصف | Description

النفي كفشل هو آلية منطقية تسمح بالتحقق من عدم إمكانية إثبات هدف معين. إذا فشل إثبات الهدف، يُعتبر النفي ناجحاً.

Negation as failure is a logic mechanism that allows checking if a goal cannot be proven. If proving the goal fails, the negation succeeds.

### البنية النحوية | Syntax

```bayan
// العربية
ليس <هدف>
not <goal>

// الإنجليزية  
not <goal>
\+ <goal>  // Prolog-style
```

### أمثلة | Examples

#### مثال 1: التحقق من عدم الزواج
```bayan
// تعريف الحقائق
حقيقة متزوج("أحمد");
fact married("Ahmed");

حقيقة متزوج("سارة");
fact married("Sara");

// تعريف قاعدة الأعزب
قاعدة أعزب(?س) :- ليس متزوج(?س);
rule single(?x) :- not married(?x);

// استعلامات
استعلام أعزب("محمد");  // true - محمد ليس متزوجاً
query single("Mohamed");  // true - Mohamed is not married

استعلام أعزب("أحمد");   // false - أحمد متزوج
query single("Ahmed");    // false - Ahmed is married
```

#### مثال 2: التحقق من عدم وجود تعارض
```bayan
حقيقة محجوز("قاعة_أ", "10:00");
fact booked("room_a", "10:00");

قاعدة متاح(?قاعة, ?وقت) :- ليس محجوز(?قاعة, ?وقت);
rule available(?room, ?time) :- not booked(?room, ?time);

استعلام متاح("قاعة_أ", "11:00");  // true
query available("room_a", "11:00");  // true
```

### الاستخدامات | Use Cases

- ✅ التحقق من عدم وجود بيانات
- ✅ تطبيق القيود السلبية
- ✅ الاستثناءات في القواعد
- ✅ التحقق من الشروط المعاكسة

---

## 2. عامل القطع (Cut Operator) {#cut-operator}

### الوصف | Description

عامل القطع يمنع التراجع (backtracking) بعد نقطة معينة في القاعدة، مما يحسن الأداء ويمنع الحلول غير المرغوبة.

The cut operator prevents backtracking after a certain point in a rule, improving performance and preventing unwanted solutions.

### البنية النحوية | Syntax

```bayan
// العربية
قطع
اقطع
!

// الإنجليزية
cut
!
```

### أمثلة | Examples

#### مثال 1: إيجاد الأكبر بين رقمين
```bayan
// مع القطع - أداء أفضل
قاعدة أكبر(?س, ?ص, ?س) :- ?س >= ?ص, قطع;
rule max(?x, ?y, ?x) :- ?x >= ?y, cut;

قاعدة أكبر(?س, ?ص, ?ص);
rule max(?x, ?y, ?y);

استعلام أكبر(10, 5, ?نتيجة);  // ?نتيجة = 10 (حل واحد فقط)
query max(10, 5, ?result);       // ?result = 10 (only one solution)
```

#### مثال 2: التصنيف مع القطع
```bayan
قاعدة تقدير(?درجة, "ممتاز") :- ?درجة >= 90, قطع;
rule grade(?score, "excellent") :- ?score >= 90, cut;

قاعدة تقدير(?درجة, "جيد_جداً") :- ?درجة >= 80, قطع;
rule grade(?score, "very_good") :- ?score >= 80, cut;

قاعدة تقدير(?درجة, "جيد") :- ?درجة >= 70, قطع;
rule grade(?score, "good") :- ?score >= 70, cut;

قاعدة تقدير(?درجة, "مقبول");
rule grade(?score, "pass");
```

### الفوائد | Benefits

- ⚡ تحسين الأداء بشكل كبير
- 🎯 منع الحلول المكررة
- 🔒 التحكم في التراجع
- 💡 كود أكثر وضوحاً

---

## 3. جمع الحلول (FindAll/BagOf/SetOf) {#collecting-solutions}

### الوصف | Description

هذه الميزات تسمح بجمع جميع الحلول الممكنة لاستعلام معين في قائمة واحدة.

These features allow collecting all possible solutions to a query into a single list.

### البنية النحوية | Syntax

```bayan
// FindAll - جمع كل الحلول (مع التكرار)
اجمع_كل(<قالب>, <هدف>, <نتيجة>)
findall(<template>, <goal>, <result>)

// BagOf - جمع الحلول (مع التكرار)
كيس_من(<قالب>, <هدف>, <نتيجة>)
bagof(<template>, <goal>, <result>)

// SetOf - جمع الحلول الفريدة (بدون تكرار)
مجموعة_من(<قالب>, <هدف>, <نتيجة>)
setof(<template>, <goal>, <result>)
```

### أمثلة | Examples

#### مثال 1: جمع أسماء الطلاب
```bayan
حقيقة طالب("أحمد", "حاسب");
fact student("Ahmed", "CS");

حقيقة طالب("سارة", "حاسب");
fact student("Sara", "CS");

حقيقة طالب("علي", "رياضيات");
fact student("Ali", "Math");

// جمع كل طلاب الحاسب
دع طلاب_حاسب = اجمع_كل(?س, استعلام طالب(?س, "حاسب"));
let cs_students = findall(?x, query student(?x, "CS"));

اطبع(طلاب_حاسب);  // ["أحمد", "سارة"]
console.log(cs_students);  // ["Ahmed", "Sara"]
```

#### مثال 2: الفرق بين BagOf و SetOf
```bayan
حقيقة يحب("أحمد", "برمجة");
fact likes("Ahmed", "programming");

حقيقة يحب("سارة", "برمجة");
fact likes("Sara", "programming");

حقيقة يحب("علي", "برمجة");
fact likes("Ali", "programming");

// BagOf - يحتفظ بالتكرارات
دع كيس = كيس_من(?هواية, استعلام يحب(?شخص, ?هواية));
let bag = bagof(?hobby, query likes(?person, ?hobby));
// النتيجة: ["برمجة", "برمجة", "برمجة"]

// SetOf - يزيل التكرارات
دع مجموعة = مجموعة_من(?هواية, استعلام يحب(?شخص, ?هواية));
let set = setof(?hobby, query likes(?person, ?hobby));
// النتيجة: ["برمجة"]
```

### الاستخدامات | Use Cases

- 📊 جمع البيانات للتحليل
- 🔍 البحث عن جميع الحلول
- 📈 إنشاء التقارير
- 🎯 تجميع النتائج

---

## 4. التعديل الديناميكي (Assert/Retract) {#dynamic-modification}

### الوصف | Description

تسمح هذه الميزات بإضافة وحذف الحقائق والقواعد أثناء تنفيذ البرنامج، مما يجعل قاعدة المعرفة ديناميكية.

These features allow adding and removing facts and rules during program execution, making the knowledge base dynamic.

### البنية النحوية | Syntax

```bayan
// إضافة حقيقة
أضف <حقيقة>
assert <fact>

// حذف حقيقة
احذف <حقيقة>
retract <fact>
```

### أمثلة | Examples

#### مثال 1: إدارة الموظفين
```bayan
// إضافة موظف جديد
أضف موظف("محمد", "مهندس");
assert employee("Mohamed", "engineer");

// التحقق من وجوده
استعلام موظف("محمد", ?وظيفة);  // ?وظيفة = "مهندس"
query employee("Mohamed", ?job);   // ?job = "engineer"

// حذف الموظف
احذف موظف("محمد", "مهندس");
retract employee("Mohamed", "engineer");

// التحقق من عدم وجوده
استعلام موظف("محمد", ?وظيفة);  // false
query employee("Mohamed", ?job);   // false
```

#### مثال 2: نظام الحجوزات
```bayan
دالة احجز_قاعة(قاعة: نص, وقت: نص): منطقي {
  // التحقق من التوفر
  إذا (ليس استعلام محجوز(قاعة, وقت)) {
    // إضافة الحجز
    أضف محجوز(قاعة, وقت);
    أرجع صحيح;
  }
  أرجع خطأ;
}

function bookRoom(room: string, time: string): boolean {
  if (not query booked(room, time)) {
    assert booked(room, time);
    return true;
  }
  return false;
}

دالة ألغ_حجز(قاعة: نص, وقت: نص): منطقي {
  أرجع احذف محجوز(قاعة, وقت);
}

function cancelBooking(room: string, time: string): boolean {
  return retract booked(room, time);
}
```

### الاستخدامات | Use Cases

- 🔄 قواعد المعرفة الديناميكية
- 💾 أنظمة قواعد البيانات
- 🎮 الألعاب والمحاكاة
- 🤖 أنظمة الذكاء الاصطناعي

---

## 5. التقييم الحسابي (Arithmetic Evaluation) {#arithmetic-evaluation}

### الوصف | Description

تسمح بتقييم التعبيرات الحسابية في السياق المنطقي وإجراء المقارنات الرياضية.

Allows evaluating arithmetic expressions in logic context and performing mathematical comparisons.

### البنية النحوية | Syntax

```bayan
// التقييم الحسابي
?متغير هو <تعبير>
?variable is <expression>

// المقارنات
?س > ?ص   // أكبر من | greater than
?س < ?ص   // أصغر من | less than
?س >= ?ص  // أكبر من أو يساوي | greater than or equal
?س <= ?ص  // أصغر من أو يساوي | less than or equal
?س === ?ص // يساوي | equal
?س !== ?ص // لا يساوي | not equal
```

### أمثلة | Examples

#### مثال 1: حساب المضروب (Factorial)
```bayan
قاعدة مضروب(0, 1) :- قطع;
rule factorial(0, 1) :- cut;

قاعدة مضروب(?ن, ?نتيجة) :-
  ?ن > 0,
  ?ن1 هو ?ن - 1,
  استعلام مضروب(?ن1, ?نتيجة1),
  ?نتيجة هو ?ن * ?نتيجة1;

rule factorial(?n, ?result) :-
  ?n > 0,
  ?n1 is ?n - 1,
  query factorial(?n1, ?result1),
  ?result is ?n * ?result1;

استعلام مضروب(5, ?نتيجة);  // ?نتيجة = 120
query factorial(5, ?result);   // ?result = 120
```

#### مثال 2: متتالية فيبوناتشي
```bayan
قاعدة فيبوناتشي(0, 0) :- قطع;
rule fibonacci(0, 0) :- cut;

قاعدة فيبوناتشي(1, 1) :- قطع;
rule fibonacci(1, 1) :- cut;

قاعدة فيبوناتشي(?ن, ?نتيجة) :-
  ?ن > 1,
  ?ن1 هو ?ن - 1,
  ?ن2 هو ?ن - 2,
  استعلام فيبوناتشي(?ن1, ?ف1),
  استعلام فيبوناتشي(?ن2, ?ف2),
  ?نتيجة هو ?ف1 + ?ف2;

rule fibonacci(?n, ?result) :-
  ?n > 1,
  ?n1 is ?n - 1,
  ?n2 is ?n - 2,
  query fibonacci(?n1, ?f1),
  query fibonacci(?n2, ?f2),
  ?result is ?f1 + ?f2;
```

---

## 6. مطابقة أنماط القوائم (List Pattern Matching) {#list-pattern-matching}

### الوصف | Description

تسمح بمطابقة أنماط القوائم باستخدام بنية [Head|Tail] المشابهة لـ Prolog.

Allows list pattern matching using [Head|Tail] syntax similar to Prolog.

### البنية النحوية | Syntax

```bayan
[<رأس>|<ذيل>]
[<head>|<tail>]
```

### أمثلة | Examples

```bayan
// مطابقة أول عنصر
قاعدة أول([?رأس|?ذيل], ?رأس);
rule first([?head|?tail], ?head);

// طول القائمة
قاعدة طول_قائمة([], 0) :- قطع;
rule list_length([], 0) :- cut;

قاعدة طول_قائمة([?رأس|?ذيل], ?طول) :-
  استعلام طول_قائمة(?ذيل, ?طول_ذيل),
  ?طول هو ?طول_ذيل + 1;

rule list_length([?head|?tail], ?length) :-
  query list_length(?tail, ?tail_length),
  ?length is ?tail_length + 1;
```

---

## 7. أمثلة متقدمة (Advanced Examples) {#advanced-examples}

### نظام خبير للتشخيص الطبي

راجع ملف `examples/advanced-logic.bn` للاطلاع على مثال كامل لنظام خبير للتشخيص الطبي يستخدم جميع الميزات المتقدمة.

See `examples/advanced-logic.bn` for a complete medical diagnosis expert system example using all advanced features.

### نظام إدارة طلاب متكامل

راجع ملف `examples/bilingual-advanced-logic.bn` لمثال يجمع بين البرمجة المنطقية والإجرائية والكائنية.

See `examples/bilingual-advanced-logic.bn` for an example combining logic, procedural, and object-oriented programming.

---

## 🎯 الخلاصة | Summary

لغة البيان توفر ميزات منطقية متقدمة تفوق Prolog في عدة جوانب:

Bayan provides advanced logic features that surpass Prolog in several aspects:

✅ **النفي كفشل** - للتحقق من عدم إمكانية الإثبات  
✅ **عامل القطع** - لتحسين الأداء ومنع التراجع  
✅ **جمع الحلول** - FindAll, BagOf, SetOf  
✅ **التعديل الديناميكي** - Assert/Retract  
✅ **التقييم الحسابي** - عمليات حسابية متقدمة  
✅ **مطابقة القوائم** - [Head|Tail] pattern matching  
✅ **ثنائية اللغة** - دعم العربية والإنجليزية معاً  
✅ **التكامل الهجين** - دمج OOP والبرمجة الإجرائية والمنطقية

---

## 📚 مراجع إضافية | Additional References

- [دليل البرمجة المنطقية](./logic-programming-guide.md)
- [أمثلة متقدمة](../examples/advanced-logic.bn)
- [دليل API](./api-reference.md)

