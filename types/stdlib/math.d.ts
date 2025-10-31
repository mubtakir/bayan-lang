/**
 * مكتبة الرياضيات المتقدمة للغة البيان
 */
/**
 * الثوابت الرياضية
 */
export declare const الثوابت: {
    باي: number;
    أويلر: number;
    النسبة_الذهبية: number;
    جذر_اثنين: number;
    جذر_نصف: number;
    لوغاريتم_طبيعي_اثنين: number;
    لوغاريتم_طبيعي_عشرة: number;
    لوغاريتم_عشري_أويلر: number;
    لوغاريتم_ثنائي_أويلر: number;
};
/**
 * الدوال الأساسية
 */
export declare const الدوال_الأساسية: {
    قيمة_مطلقة: (x: number) => number;
    جذر_تربيعي: (x: number) => number;
    جذر_تكعيبي: (x: number) => number;
    قوة: (x: number, y: number) => number;
    أس: (x: number) => number;
    لوغاريتم_طبيعي: (x: number) => number;
    لوغاريتم_عشري: (x: number) => number;
    لوغاريتم_ثنائي: (x: number) => number;
    تقريب: (x: number) => number;
    أرضية: (x: number) => number;
    سقف: (x: number) => number;
    اقتطاع: (x: number) => number;
    أدنى: (...values: number[]) => number;
    أقصى: (...values: number[]) => number;
    إشارة: (x: number) => number;
};
/**
 * الدوال المثلثية
 */
export declare const الدوال_المثلثية: {
    جيب: (x: number) => number;
    جيب_تمام: (x: number) => number;
    ظل: (x: number) => number;
    قاطع: (x: number) => number;
    قاطع_تمام: (x: number) => number;
    ظل_تمام: (x: number) => number;
    جيب_عكسي: (x: number) => number;
    جيب_تمام_عكسي: (x: number) => number;
    ظل_عكسي: (x: number) => number;
    ظل_عكسي_ثنائي: (y: number, x: number) => number;
    جيب_زائدي: (x: number) => number;
    جيب_تمام_زائدي: (x: number) => number;
    ظل_زائدي: (x: number) => number;
    جيب_زائدي_عكسي: (x: number) => number;
    جيب_تمام_زائدي_عكسي: (x: number) => number;
    ظل_زائدي_عكسي: (x: number) => number;
};
/**
 * تحويل الزوايا
 */
export declare const تحويل_الزوايا: {
    من_درجات_إلى_راديان: (درجات: number) => number;
    من_راديان_إلى_درجات: (راديان: number) => number;
};
/**
 * الإحصاء
 */
export declare const الإحصاء: {
    /**
     * المتوسط الحسابي
     */
    متوسط: (أرقام: number[]) => number;
    /**
     * الوسيط
     */
    وسيط: (أرقام: number[]) => number;
    /**
     * المنوال
     */
    منوال: (أرقام: number[]) => number;
    /**
     * التباين
     */
    تباين: (أرقام: number[]) => number;
    /**
     * الانحراف المعياري
     */
    انحراف_معياري: (أرقام: number[]) => number;
    /**
     * المدى
     */
    مدى: (أرقام: number[]) => number;
    /**
     * المجموع
     */
    مجموع: (أرقام: number[]) => number;
    /**
     * الضرب التراكمي
     */
    ضرب_تراكمي: (أرقام: number[]) => number;
};
/**
 * الجبر الخطي
 */
export declare const الجبر_الخطي: {
    /**
     * ضرب متجهين (الضرب النقطي)
     */
    ضرب_نقطي: (متجه1: number[], متجه2: number[]) => number;
    /**
     * طول المتجه (المعيار)
     */
    طول_متجه: (متجه: number[]) => number;
    /**
     * تطبيع المتجه
     */
    تطبيع_متجه: (متجه: number[]) => number[];
    /**
     * جمع متجهين
     */
    جمع_متجهات: (متجه1: number[], متجه2: number[]) => number[];
    /**
     * طرح متجهين
     */
    طرح_متجهات: (متجه1: number[], متجه2: number[]) => number[];
    /**
     * ضرب متجه في عدد
     */
    ضرب_متجه_في_عدد: (متجه: number[], عدد: number) => number[];
    /**
     * المسافة بين نقطتين
     */
    مسافة: (نقطة1: number[], نقطة2: number[]) => number;
};
/**
 * نظرية الأعداد
 */
export declare const نظرية_الأعداد: {
    /**
     * القاسم المشترك الأكبر
     */
    قاسم_مشترك_أكبر: (أ: number, ب: number) => number;
    /**
     * المضاعف المشترك الأصغر
     */
    مضاعف_مشترك_أصغر: (أ: number, ب: number) => number;
    /**
     * التحقق من عدد أولي
     */
    هل_أولي: (عدد: number) => boolean;
    /**
     * المضروب (Factorial)
     */
    مضروب: (عدد: number) => number;
    /**
     * التوافيق (Combinations)
     */
    توافيق: (ن: number, ر: number) => number;
    /**
     * التباديل (Permutations)
     */
    تباديل: (ن: number, ر: number) => number;
};
/**
 * الأعداد العشوائية
 */
export declare const عشوائي: {
    /**
     * عدد عشوائي بين 0 و 1
     */
    عدد: () => number;
    /**
     * عدد صحيح عشوائي بين حدين
     */
    عدد_صحيح: (أدنى: number, أقصى: number) => number;
    /**
     * اختيار عنصر عشوائي من مصفوفة
     */
    اختيار: <T>(مصفوفة: T[]) => T;
    /**
     * خلط مصفوفة
     */
    خلط: <T>(مصفوفة: T[]) => T[];
};
