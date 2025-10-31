/**
 * أمثلة متقدمة لتحليل الشعر العربي
 * Advanced Arabic Poetry Analysis Examples
 * 
 * تحليل أبيات شعرية عربية واستخراج المعاني العميقة من خلال سيماء الحروف
 */

import { LetterEngine } from '../../linguistics/letterEngine';

const letterEngine = new LetterEngine();

/**
 * تحليل بيت شعري
 */
function analyzePoetryVerse(verse: string, poet: string, title: string) {
  console.log('\n' + '='.repeat(80));
  console.log(`🎭 ${title}`);
  console.log('='.repeat(80));
  console.log(`الشاعر: ${poet}`);
  console.log(`البيت: "${verse}"`);
  console.log('');

  // تقسيم البيت إلى كلمات رئيسية
  const words = verse.split(/\s+/).filter(w => w.length > 0);
  
  // تحليل الكلمات المفتاحية (نتجاهل حروف العطف والأدوات)
  const stopWords = ['و', 'في', 'من', 'إلى', 'على', 'عن', 'ال', 'لا', 'ما', 'أن', 'إن'];
  const keyWords = words.filter(w => {
    const clean = w.replace(/[.,!?;:،؛]/g, '');
    return clean.length > 1 && !stopWords.includes(clean);
  });

  console.log(`🔑 الكلمات المفتاحية: ${keyWords.length} كلمة`);
  console.log('');

  keyWords.slice(0, 5).forEach((word, index) => {
    const cleanWord = word.replace(/[.,!?;:،؛]/g, '');
    console.log(`${index + 1}. "${cleanWord}"`);
    
    const analysis = letterEngine.analyzeWord(cleanWord);
    console.log(`   الحروف: ${analysis.letters.join(' - ')}`);
    
    // عرض أول معنى لكل حرف
    const meanings: string[] = [];
    for (const [letter, letterMeanings] of analysis.letterMeanings.entries()) {
      meanings.push(`${letter}:${letterMeanings[0] || '؟'}`);
    }
    console.log(`   المعاني: ${meanings.join(' | ')}`);
    console.log('');
  });
}

/**
 * مثال 1: المتنبي - على قدر أهل العزم
 */
export function analyzeMutanabbi1() {
  const verse = 'على قدر أهل العزم تأتي العزائم';
  const poet = 'أبو الطيب المتنبي';
  
  analyzePoetryVerse(verse, poet, 'تحليل: على قدر أهل العزم تأتي العزائم');
  
  console.log('💡 التحليل العميق:');
  console.log('  "العزم" = ع (عمق) + ز (حركة) + م (ضم)');
  console.log('    → العزم هو حركة عميقة مضمومة في النفس');
  console.log('');
  console.log('  "العزائم" = نفس الجذر مع زيادة');
  console.log('    → العزائم هي نتائج العزم المتعددة');
  console.log('');
  console.log('  🎯 المعنى: العمق في العزم ينتج عزائم بقدره');
  console.log('  🎯 التناسب بين السبب والنتيجة واضح في تكرار الجذر');
}

/**
 * مثال 2: المتنبي - الخيل والليل
 */
export function analyzeMutanabbi2() {
  const verse = 'الخيل والليل والبيداء تعرفني والسيف والرمح والقرطاس والقلم';
  const poet = 'أبو الطيب المتنبي';
  
  analyzePoetryVerse(verse, poet, 'تحليل: الخيل والليل والبيداء تعرفني');
  
  console.log('💡 التحليل العميق:');
  console.log('  "الخيل" = خ (خفاء) + ي (ألم) + ل (إحاطة)');
  console.log('    → الخيل تحيط بالمعركة بحركة خفية مؤلمة للعدو');
  console.log('');
  console.log('  "الليل" = ل (إحاطة) + ي (ألم) + ل (إحاطة)');
  console.log('    → الليل يحيط بإحاطة مضاعفة مع ألم الوحدة');
  console.log('');
  console.log('  "البيداء" = ب (امتلاء) + ي (ألم) + د (بدء) + ا (وحدة)');
  console.log('    → الصحراء الممتلئة بالوحدة المؤلمة');
  console.log('');
  console.log('  "السيف" = س (زحف) + ي (ألم) + ف (فجوة)');
  console.log('    → السيف يزحف ليفتح فجوة مؤلمة');
  console.log('');
  console.log('  "القلم" = ق (دقة) + ل (إحاطة) + م (كتم)');
  console.log('    → القلم يحيط بالمعاني بدقة ويكتمها في الكتابة');
  console.log('');
  console.log('  🎯 المعنى: الشاعر يجمع بين الحرب (الخيل، السيف) والعلم (القلم)');
  console.log('  🎯 كلاهما يحيط ويؤثر، لكن بطرق مختلفة');
}

/**
 * مثال 3: امرؤ القيس - قفا نبك
 */
export function analyzeImruAlQais() {
  const verse = 'قفا نبك من ذكرى حبيب ومنزل';
  const poet = 'امرؤ القيس';
  
  analyzePoetryVerse(verse, poet, 'تحليل: قفا نبك من ذكرى حبيب ومنزل');
  
  console.log('💡 التحليل العميق:');
  console.log('  "نبك" = ن (ظهور) + ب (حمل) + ك (كثرة)');
  console.log('    → البكاء هو ظهور حمل كثير من الحزن');
  console.log('');
  console.log('  "ذكرى" = ذ (لذة) + ك (كثرة) + ر (تكرار)');
  console.log('    → الذكرى لذة متكررة كثيرة');
  console.log('');
  console.log('  "حبيب" = ح (تودد) + ب (حمل) + ي (ألم) + ب (حمل)');
  console.log('    → الحبيب تودد محمول بألم محمول');
  console.log('');
  console.log('  🎯 المعنى: البكاء من ذكرى الحبيب يجمع اللذة والألم');
  console.log('  🎯 تكرار حرف الباء في "حبيب" يعكس ثقل الحمل العاطفي');
}

/**
 * مثال 4: أحمد شوقي - سلوا قلبي
 */
export function analyzeShawqi() {
  const verse = 'سلوا قلبي غداة سلا وتابا لعل على الجمال له عتابا';
  const poet = 'أحمد شوقي';
  
  analyzePoetryVerse(verse, poet, 'تحليل: سلوا قلبي غداة سلا وتابا');
  
  console.log('💡 التحليل العميق:');
  console.log('  "سلوا" = س (زحف) + ل (إحاطة) + و (مباغتة)');
  console.log('    → السؤال يزحف ليحيط بالحقيقة فجأة');
  console.log('');
  console.log('  "قلبي" = ق (دقة) + ل (إحاطة) + ب (حمل)');
  console.log('    → القلب يحيط بدقة بما يحمل');
  console.log('');
  console.log('  "سلا" = س (زحف) + ل (إحاطة) + ا (وحدة)');
  console.log('    → النسيان يزحف ليحيط بالوحدة');
  console.log('');
  console.log('  "تابا" = ت (ثبات) + ا (وحدة) + ب (حمل)');
  console.log('    → التوبة ثبات على حمل الوحدة (مع الله)');
  console.log('');
  console.log('  🎯 المعنى: القلب الذي نسي وتاب يحمل سراً يستحق السؤال');
}

/**
 * مثال 5: نزار قباني - قصيدة الحب
 */
export function analyzeQabbani() {
  const verse = 'أحبك جداً وأعرف أني سأبقى أحبك جداً';
  const poet = 'نزار قباني';
  
  analyzePoetryVerse(verse, poet, 'تحليل: أحبك جداً');
  
  console.log('💡 التحليل العميق:');
  console.log('  "أحبك" = ا (بداية) + ح (تودد) + ب (حمل) + ك (كثرة)');
  console.log('    → الحب بداية تودد محمول بكثرة');
  console.log('');
  console.log('  "جداً" = ج (جمع) + د (بدء)');
  console.log('    → الشدة هي جمع البدايات (التجدد المستمر)');
  console.log('');
  console.log('  "سأبقى" = س (زحف) + ا (وحدة) + ب (حمل) + ق (دقة)');
  console.log('    → البقاء زحف دقيق يحمل الوحدة');
  console.log('');
  console.log('  🎯 المعنى: الحب المتجدد (جداً) يبقى بدقة وثبات');
  console.log('  🎯 تكرار "أحبك جداً" في البيت يعكس التجدد والاستمرار');
}

/**
 * مثال 6: إيليا أبو ماضي - فلسفة الحياة
 */
export function analyzeAbuMadi() {
  const verse = 'قال السماء كئيبة وتجهما قلت ابتسم يكفي التجهم في السما';
  const poet = 'إيليا أبو ماضي';
  
  analyzePoetryVerse(verse, poet, 'تحليل: قال السماء كئيبة');
  
  console.log('💡 التحليل العميق:');
  console.log('  "السماء" = س (زحف) + م (ضم) + ا (وحدة)');
  console.log('    → السماء تضم كل شيء في وحدة شاملة');
  console.log('');
  console.log('  "كئيبة" = ك (كثرة) + ء (مفاجأة) + ي (ألم) + ب (حمل)');
  console.log('    → الكآبة كثرة مفاجئة من الألم المحمول');
  console.log('');
  console.log('  "ابتسم" = ا (بداية) + ب (حمل) + ت (ثبات) + س (زحف) + م (ضم)');
  console.log('    → الابتسامة بداية حمل ثابت يزحف ليضم الآخرين');
  console.log('');
  console.log('  🎯 المعنى: رغم كآبة السماء، الابتسامة تبدأ تغييراً ثابتاً');
  console.log('  🎯 التضاد بين "كئيبة" و "ابتسم" واضح في معاني الحروف');
}

/**
 * مثال 7: محمود درويش - على هذه الأرض
 */
export function analyzeDarwish() {
  const verse = 'على هذه الأرض ما يستحق الحياة';
  const poet = 'محمود درويش';
  
  analyzePoetryVerse(verse, poet, 'تحليل: على هذه الأرض ما يستحق الحياة');
  
  console.log('💡 التحليل العميق:');
  console.log('  "الأرض" = ا (وحدة) + ر (تدفق) + ض (ضمور)');
  console.log('    → الأرض وحدة متدفقة رغم ضمورها');
  console.log('');
  console.log('  "يستحق" = ي (ألم) + س (زحف) + ت (ثبات) + ح (تودد) + ق (دقة)');
  console.log('    → الاستحقاق ألم يزحف بثبات نحو التودد الدقيق');
  console.log('');
  console.log('  "الحياة" = ح (مشقة) + ي (ألم) + ا (بداية) + ة (نهاية)');
  console.log('    → الحياة مشقة وألم من البداية للنهاية');
  console.log('');
  console.log('  🎯 المعنى: رغم مشقة الحياة، على الأرض ما يستحق هذا الألم');
  console.log('  🎯 الأمل يولد من رحم المعاناة');
}

/**
 * مثال 8: جبران خليل جبران - النبي
 */
export function analyzeGibran() {
  const verse = 'في قلب كل شتاء ربيع يختلج وخلف كل ليل فجر يبتسم';
  const poet = 'جبران خليل جبران';
  
  analyzePoetryVerse(verse, poet, 'تحليل: في قلب كل شتاء ربيع يختلج');
  
  console.log('💡 التحليل العميق:');
  console.log('  "شتاء" = ش (تشتت) + ت (ثبات) + ا (وحدة)');
  console.log('    → الشتاء تشتت ثابت في وحدة الزمن');
  console.log('');
  console.log('  "ربيع" = ر (تدفق) + ب (حمل) + ي (ألم) + ع (عمق)');
  console.log('    → الربيع تدفق يحمل عمق الحياة بعد ألم الشتاء');
  console.log('');
  console.log('  "يختلج" = ي (ألم) + خ (خفاء) + ت (ثبات) + ل (إحاطة) + ج (جمع)');
  console.log('    → الاختلاج حركة خفية ثابتة تجمع وتحيط');
  console.log('');
  console.log('  "فجر" = ف (فجوة) + ج (جمع) + ر (تدفق)');
  console.log('    → الفجر فجوة تجمع النور المتدفق');
  console.log('');
  console.log('  🎯 المعنى: في قلب الظلام والبرد، الأمل يختلج كربيع وفجر');
  console.log('  🎯 التضاد بين "شتاء/ليل" و "ربيع/فجر" يعكس دورة الحياة');
}

/**
 * تشغيل جميع أمثلة الشعر
 */
export function runAllPoetryExamples() {
  console.log('\n' + '█'.repeat(80));
  console.log('🎭 أمثلة متقدمة لتحليل الشعر العربي');
  console.log('Advanced Arabic Poetry Analysis Examples');
  console.log('█'.repeat(80));

  analyzeMutanabbi1();
  analyzeMutanabbi2();
  analyzeImruAlQais();
  analyzeShawqi();
  analyzeQabbani();
  analyzeAbuMadi();
  analyzeDarwish();
  analyzeGibran();

  console.log('\n' + '█'.repeat(80));
  console.log('✅ تم تحليل 8 أبيات شعرية من 8 شعراء عظام!');
  console.log('✅ 8 poetry verses from 8 great poets analyzed successfully!');
  console.log('█'.repeat(80) + '\n');
}

// تشغيل الأمثلة إذا تم تشغيل الملف مباشرة
if (require.main === module) {
  runAllPoetryExamples();
}

