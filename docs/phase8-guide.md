# المرحلة 8: التحسينات منخفضة الأولوية
# Phase 8: Low Priority Improvements

دليل شامل للأنظمة منخفضة الأولوية في لغة البيان

---

## 📋 المحتويات - Table of Contents

1. [واجهة REST API](#rest-api)
2. [أدوات التطوير](#dev-tools)
3. [الميزات المتقدمة](#advanced-features)

---

## 🌐 واجهة REST API {#rest-api}

### نظرة عامة

واجهة REST API تتيح التكامل مع أنظمة خارجية عبر HTTP.

### الميزات الرئيسية

#### 1. **المصادقة - Authentication**

```typescript
import { RestAPIEngine } from './src/api/restAPI';

const api = new RestAPIEngine();

// إنشاء مفتاح API
const apiKey = api.createAPIKey(
  'my-app',                           // الاسم
  ['logic:read', 'logic:write'],      // الصلاحيات
  100,                                // الحد الأقصى للطلبات في الدقيقة
  7 * 24 * 60 * 60 * 1000            // تنتهي بعد أسبوع
);

console.log('API Key:', apiKey.key);
```

#### 2. **معالجة الطلبات - Request Handling**

```typescript
// إرسال طلب
const request = {
  method: RequestMethod.POST,
  endpoint: '/logic/query',
  headers: new Map([
    ['Authorization', `Bearer ${apiKey.key}`]
  ]),
  body: {
    query: 'إنسان(سقراط)'
  },
  timestamp: Date.now()
};

const response = await api.handleRequest(request);

if (response.status === ResponseStatus.SUCCESS) {
  console.log('النتيجة:', response.data);
}
```

#### 3. **تحديد المعدل - Rate Limiting**

```typescript
// تلقائياً يتم فرض حد المعدل
// إذا تجاوز المستخدم الحد، سيحصل على:
// ResponseStatus.RATE_LIMITED (429)
```

### نقاط النهاية المتاحة - Available Endpoints

#### Logic Engine
- `POST /logic/query` - استعلام منطقي
- `POST /logic/fact` - إضافة حقيقة
- `POST /logic/rule` - إضافة قاعدة

#### Causal Engine
- `POST /causal/node` - إضافة عقدة سببية
- `POST /causal/relation` - إضافة علاقة سببية
- `GET /causal/path` - الحصول على مسار سببي

#### Linguistics
- `POST /linguistics/analyze` - تحليل كلمة
- `GET /linguistics/letter` - معاني حرف

#### Knowledge System
- `POST /knowledge/thing` - إنشاء شيء
- `GET /knowledge/thing` - الحصول على شيء
- `PUT /knowledge/thing/property` - تعيين خاصية

#### Probability
- `POST /probability/fact` - إضافة حقيقة احتمالية
- `POST /probability/infer` - استدلال احتمالي

#### Planning
- `POST /planning/goal` - إنشاء هدف
- `POST /planning/plan` - التخطيط لهدف

#### System
- `GET /api/status` - حالة النظام
- `GET /api/stats` - إحصائيات API

---

## 🛠️ أدوات التطوير {#dev-tools}

### نظرة عامة

مجموعة أدوات لتسهيل التطوير والتنقيح.

### 1. **المنقح - Debugger**

```typescript
import { DevToolsEngine } from './src/devtools/devTools';

const devTools = new DevToolsEngine();

// إضافة نقطة توقف
devTools.debugger.addBreakpoint('main.bn', 10);

// إضافة نقطة توقف مشروطة
devTools.debugger.addBreakpoint('main.bn', 20, 'x > 10');

// إدارة المكدس
devTools.debugger.pushFrame('main', 'main.bn', 1);
devTools.debugger.pushFrame('foo', 'main.bn', 5);

// طباعة المكدس
devTools.debugger.printCallStack();

// الإحصائيات
const stats = devTools.debugger.getStatistics();
console.log('نقاط التوقف:', stats.totalBreakpoints);
```

### 2. **قياس الأداء - Profiler**

```typescript
// قياس دالة
const result = devTools.profiler.measure('myFunction', () => {
  // كود الدالة
  return 42;
});

// قياس دالة async
const asyncResult = await devTools.profiler.measureAsync('asyncFunction', async () => {
  // كود async
  return await fetchData();
});

// الحصول على الإحصائيات
const stats = devTools.profiler.getStatistics('myFunction');
console.log('عدد المرات:', stats.calls);
console.log('المتوسط:', stats.average, 'ms');
console.log('الأدنى:', stats.min, 'ms');
console.log('الأقصى:', stats.max, 'ms');

// طباعة تقرير شامل
devTools.profiler.printReport();
```

### 3. **منسق الكود - Code Formatter**

```typescript
const code = `
function test() {
console.log('hello');
if (true) {
return 42;
}
}
`;

const formatted = devTools.formatter.format(code);
console.log(formatted);
```

### 4. **REPL تفاعلي**

```typescript
// تقييم كود
const result = devTools.repl.eval('2 + 2');
console.log(result); // 4

// طباعة النتيجة
devTools.repl.print(result);

// السجل
const history = devTools.repl.getHistory();
console.log('السجل:', history);
```

---

## ⚡ الميزات المتقدمة {#advanced-features}

### نظرة عامة

ميزات إضافية لتحسين تجربة التطوير.

### 1. **محرك الأحداث - Event Engine**

```typescript
import { AdvancedFeaturesEngine, Event, EventType } from './src/advanced/advancedFeatures';

const features = new AdvancedFeaturesEngine();

// الاستماع لحدث
features.events.on('user-login', (event) => {
  console.log('مستخدم دخل:', event.data.username);
});

// إطلاق حدث
features.events.emit(new Event(
  EventType.USER,
  'user-login',
  { username: 'أحمد' }
));

// الاستماع لجميع الأحداث
features.events.on('*', (event) => {
  console.log('حدث:', event.name);
});

// سجل الأحداث
const history = features.events.getHistory('user-login', 10);
console.log('آخر 10 أحداث:', history);
```

### 2. **محرك الإشعارات - Notification Engine**

```typescript
// إنشاء إشعار
features.notifications.notify(
  NotificationLevel.INFO,
  'مرحباً',
  'تم تسجيل الدخول بنجاح'
);

features.notifications.notify(
  NotificationLevel.ERROR,
  'خطأ',
  'فشل الاتصال بقاعدة البيانات'
);

// الحصول على الإشعارات غير المقروءة
const unread = features.notifications.getNotifications(true);
console.log('إشعارات غير مقروءة:', unread.length);

// تحديد الكل كمقروء
features.notifications.markAllAsRead();

// الإحصائيات
const stats = features.notifications.getStatistics();
console.log('إجمالي:', stats.total);
console.log('غير مقروء:', stats.unread);
console.log('حسب المستوى:', stats.byLevel);
```

### 3. **محرك التسجيل - Logging Engine**

```typescript
// تسجيل رسائل
features.logging.debug('رسالة تنقيح');
features.logging.info('رسالة معلومات');
features.logging.warn('رسالة تحذير');
features.logging.error('رسالة خطأ');

// مع بيانات إضافية
features.logging.info('طلب HTTP', { method: 'GET', url: '/api/users' });

// مع مصدر
features.logging.error('خطأ في قاعدة البيانات', null, 'DatabaseService');

// تعيين المستوى الأدنى
features.logging.setMinLevel(LogLevel.WARN);
// الآن فقط WARN و ERROR سيتم تسجيلهم

// الحصول على السجلات
const errors = features.logging.getLogs(LogLevel.ERROR);
console.log('الأخطاء:', errors);

// آخر 100 سجل
const recent = features.logging.getLogs(undefined, 100);
```

### 4. **محرك التكوين - Configuration Engine**

```typescript
// تعيين قيم
features.config.set('app.name', 'البيان');
features.config.set('app.version', '1.0.0');
features.config.set('database.host', 'localhost');
features.config.set('database.port', 5432);

// الحصول على قيم
const appName = features.config.get('app.name');
console.log('اسم التطبيق:', appName);

// قيم افتراضية
features.config.setDefault('timeout', 5000);
features.config.setDefault('retries', 3);

// إذا لم يتم تعيين القيمة، سيتم استخدام الافتراضية
const timeout = features.config.get('timeout'); // 5000

// تحميل من كائن
features.config.load({
  'feature.x': true,
  'feature.y': false,
  'max.connections': 100
});

// تصدير إلى كائن
const config = features.config.export();
console.log('التكوين الكامل:', config);
```

---

## 📊 الإحصائيات الشاملة

```typescript
// الحصول على إحصائيات جميع الأنظمة
const stats = features.getOverallStatistics();

console.log('الأحداث:', stats.events);
console.log('الإشعارات:', stats.notifications);
console.log('السجلات:', stats.logging);
console.log('التكوين:', stats.config);
```

---

## 🎯 أمثلة متقدمة

### مثال 1: نظام مراقبة شامل

```typescript
// إعداد نظام مراقبة
const monitor = new AdvancedFeaturesEngine();

// تسجيل جميع الأحداث
monitor.events.on('*', (event) => {
  monitor.logging.info(`حدث: ${event.name}`, event.data);
});

// إشعار عند الأخطاء
monitor.events.on('error', (event) => {
  monitor.notifications.notify(
    NotificationLevel.ERROR,
    'خطأ في النظام',
    event.data.message
  );
});

// إطلاق حدث
monitor.events.emit(new Event(EventType.ERROR, 'error', {
  message: 'فشل الاتصال'
}));
```

### مثال 2: API مع مراقبة

```typescript
const api = new RestAPIEngine();
const monitor = new AdvancedFeaturesEngine();

// مراقبة جميع الطلبات
const originalHandle = api.handleRequest.bind(api);
api.handleRequest = async (req) => {
  monitor.logging.info('طلب API', {
    method: req.method,
    endpoint: req.endpoint
  });
  
  const response = await originalHandle(req);
  
  if (response.status >= 400) {
    monitor.notifications.notify(
      NotificationLevel.ERROR,
      'خطأ في API',
      `${req.endpoint}: ${response.status}`
    );
  }
  
  return response;
};
```

---

## ✅ الخلاصة

المرحلة 8 أضافت:
- ✅ واجهة REST API كاملة
- ✅ أدوات تطوير متقدمة
- ✅ نظام أحداث وإشعارات
- ✅ نظام تسجيل وتكوين

**النظام الآن جاهز للإنتاج!** 🚀

