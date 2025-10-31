/**
 * أمثلة متقدمة لتحليل النصوص الأدبية النثرية
 * Advanced Prose Analysis Examples
 * 
 * تحليل نصوص نثرية عربية واستخراج المعاني العميقة
 */

import { LetterEngine } from '../../linguistics/letterEngine';

const letterEngine = new LetterEngine();

/**
 * تحليل نص نثري
 */
function analyzeProseText(text: string, author: string, title: string, keyWords: string[]) {
  console.log('\n' + '='.repeat(80));
  console.log(`📚 ${title}`);
  console.log('='.repeat(80));
  console.log(`المؤلف: ${author}`);
  console.log(`النص: "${text}"`);
  console.log('');
  console.log(`🔑 الكلمات المفتاحية المختارة: ${keyWords.join(', ')}`);
  console.log('');

  keyWords.forEach((word, index) => {
    console.log(`${index + 1}. تحليل: "${word}"`);
    const analysis = letterEngine.analyzeWord(word);
    
    console.log(`   الحروف: ${analysis.letters.join(' - ')}`);

    let count = 0;
    for (const [letter, letterMeanings] of analysis.letterMeanings.entries()) {
      if (count >= 3) break;
      console.log(`     ${letter}: ${letterMeanings[0] || '؟'}`);
      count++;
    }
    console.log('');
  });
}

/**
 * مثال 1: من كتاب "الأيام" لطه حسين
 */
export function analyzeAlAyyam() {
  const text = 'كان يحس أنه ليس كإخوته وأخواته، كان يحس أن لهم مكاناً ليس له مثله';
  const author = 'طه حسين';
  const keyWords = ['يحس', 'إخوته', 'مكاناً'];
  
  analyzeProseText(text, author, 'من "الأيام" - الإحساس بالاختلاف', keyWords);
  
  console.log('💡 التحليل العميق:');
  console.log('  "يحس" = ي (ألم) + ح (مشقة) + س (زحف)');
  console.log('    → الإحساس ألم يزحف بمشقة في النفس');
  console.log('');
  console.log('  "إخوته" = ا (وحدة) + خ (خفاء) + و (مباغتة) + ة (نهاية)');
  console.log('    → الإخوة وحدة خفية تباغت بنهايتها (الانفصال)');
  console.log('');
  console.log('  "مكاناً" = م (ضم) + ك (كثرة) + ا (وحدة) + ن (ظهور)');
  console.log('    → المكان ضم كثير يظهر الوحدة');
  console.log('');
  console.log('  🎯 المعنى: طه حسين يصف إحساسه المؤلم بالاختلاف عن إخوته');
  console.log('  🎯 الألم في "يحس" يعكس معاناته مع فقدان البصر');
}

/**
 * مثال 2: من "زينب" لمحمد حسين هيكل
 */
export function analyzeZainab() {
  const text = 'كانت زينب تنظر إلى الحقول الخضراء وتحلم بمستقبل أفضل';
  const author = 'محمد حسين هيكل';
  const keyWords = ['زينب', 'تنظر', 'تحلم', 'مستقبل'];
  
  analyzeProseText(text, author, 'من "زينب" - الحلم بالمستقبل', keyWords);
  
  console.log('💡 التحليل العميق:');
  console.log('  "زينب" = ز (حركة) + ي (ألم) + ن (ظهور) + ب (حمل)');
  console.log('    → زينب حركة مؤلمة تظهر حملاً (المسؤولية)');
  console.log('');
  console.log('  "تنظر" = ت (ثبات) + ن (ظهور) + ظ (ظهور قوي) + ر (تدفق)');
  console.log('    → النظر ثبات على ظهور متدفق');
  console.log('');
  console.log('  "تحلم" = ت (ثبات) + ح (تودد) + ل (إحاطة) + م (كتم)');
  console.log('    → الحلم ثبات على تودد محيط مكتوم');
  console.log('');
  console.log('  "مستقبل" = م (ضم) + س (زحف) + ت (ثبات) + ق (دقة) + ب (حمل) + ل (إحاطة)');
  console.log('    → المستقبل ضم يزحف بثبات ودقة ليحيط بالحمل');
  console.log('');
  console.log('  🎯 المعنى: زينب تحمل ألمها وتنظر بثبات نحو مستقبل يحيط بأحلامها');
}

/**
 * مثال 3: من "دعاء الكروان" لطه حسين
 */
export function analyzeDuaaAlKarawan() {
  const text = 'كانت آمنة تسمع نداء الكروان في الليل فتشعر بالوحدة والحزن';
  const author = 'طه حسين';
  const keyWords = ['نداء', 'الكروان', 'الوحدة', 'الحزن'];
  
  analyzeProseText(text, author, 'من "دعاء الكروان" - نداء الوحدة', keyWords);
  
  console.log('💡 التحليل العميق:');
  console.log('  "نداء" = ن (ظهور) + د (بدء) + ا (وحدة)');
  console.log('    → النداء ظهور بدء الوحدة');
  console.log('');
  console.log('  "الكروان" = ك (كثرة) + ر (تكرار) + و (مباغتة) + ا (وحدة) + ن (ظهور)');
  console.log('    → الكروان تكرار كثير مباغت يظهر الوحدة');
  console.log('');
  console.log('  "الوحدة" = و (مباغتة) + ح (مشقة) + د (بدء) + ة (نهاية)');
  console.log('    → الوحدة مباغتة مشقة من البدء للنهاية');
  console.log('');
  console.log('  "الحزن" = ح (مشقة) + ز (حركة) + ن (ظهور)');
  console.log('    → الحزن مشقة تتحرك لتظهر');
  console.log('');
  console.log('  🎯 المعنى: نداء الكروان المتكرر يباغت آمنة بمشقة الوحدة والحزن');
}

/**
 * مثال 4: من "الخبز الحافي" لمحمد شكري
 */
export function analyzeAlKhubzAlHafi() {
  const text = 'كان الجوع يعذبني والبرد يقتلني والخوف يطاردني';
  const author = 'محمد شكري';
  const keyWords = ['الجوع', 'يعذبني', 'البرد', 'الخوف'];
  
  analyzeProseText(text, author, 'من "الخبز الحافي" - ثلاثية المعاناة', keyWords);
  
  console.log('💡 التحليل العميق:');
  console.log('  "الجوع" = ج (جمع) + و (مباغتة) + ع (عمق)');
  console.log('    → الجوع جمع مباغت لعمق الحاجة');
  console.log('');
  console.log('  "يعذبني" = ي (ألم) + ع (عمق) + ذ (لذة عكسية) + ب (حمل)');
  console.log('    → التعذيب ألم عميق يحمل عكس اللذة');
  console.log('');
  console.log('  "البرد" = ب (حمل) + ر (تكرار) + د (بدء)');
  console.log('    → البرد حمل متكرر يبدأ ولا ينتهي');
  console.log('');
  console.log('  "الخوف" = خ (خفاء) + و (مباغتة) + ف (فجوة)');
  console.log('    → الخوف خفاء يباغت بفجوة في الأمان');
  console.log('');
  console.log('  🎯 المعنى: ثلاثية المعاناة (جوع، برد، خوف) كلها تحمل المباغتة والألم');
}

/**
 * مثال 5: من "موسم الهجرة إلى الشمال" للطيب صالح
 */
export function analyzeMawsimAlHijra() {
  const text = 'عدت إلى أهلي يا سادتي بعد غيبة طويلة، سبعة أعوام على وجه التحديد';
  const author = 'الطيب صالح';
  const keyWords = ['عدت', 'غيبة', 'طويلة', 'أعوام'];
  
  analyzeProseText(text, author, 'من "موسم الهجرة إلى الشمال" - العودة', keyWords);
  
  console.log('💡 التحليل العميق:');
  console.log('  "عدت" = ع (عمق) + د (بدء) + ت (ثبات)');
  console.log('    → العودة عمق يبدأ بثبات');
  console.log('');
  console.log('  "غيبة" = غ (تغييب) + ي (ألم) + ب (حمل) + ة (نهاية)');
  console.log('    → الغيبة تغييب مؤلم محمول حتى نهايته');
  console.log('');
  console.log('  "طويلة" = ط (طمس) + و (مباغتة) + ي (ألم) + ل (إحاطة) + ة (نهاية)');
  console.log('    → الطول طمس مباغت مؤلم يحيط حتى النهاية');
  console.log('');
  console.log('  "أعوام" = ا (وحدة) + ع (عمق) + و (مباغتة) + ا (وحدة) + م (ضم)');
  console.log('    → الأعوام وحدة عميقة تضم المباغآت');
  console.log('');
  console.log('  🎯 المعنى: العودة بعد غيبة طويلة تحمل عمق الزمن وألم الانتظار');
}

/**
 * مثال 6: من "رجال في الشمس" لغسان كنفاني
 */
export function analyzeRijalFiAlShams() {
  const text = 'كانوا ثلاثة رجال في خزان الماء، يختنقون في الظلام والحر';
  const author = 'غسان كنفاني';
  const keyWords = ['ثلاثة', 'خزان', 'يختنقون', 'الظلام'];
  
  analyzeProseText(text, author, 'من "رجال في الشمس" - الاختناق', keyWords);
  
  console.log('💡 التحليل العميق:');
  console.log('  "ثلاثة" = ث (ثبات) + ل (إحاطة) + ا (وحدة) + ث (ثبات) + ة (نهاية)');
  console.log('    → الثلاثة ثبات يحيط بوحدة ثابتة حتى النهاية');
  console.log('');
  console.log('  "خزان" = خ (خفاء) + ز (حركة) + ا (وحدة) + ن (ظهور)');
  console.log('    → الخزان خفاء تتحرك فيه الوحدة لتظهر');
  console.log('');
  console.log('  "يختنقون" = ي (ألم) + خ (خفاء) + ت (ثبات) + ن (ظهور) + ق (دقة)');
  console.log('    → الاختناق ألم خفي ثابت يظهر بدقة');
  console.log('');
  console.log('  "الظلام" = ظ (ظهور قوي) + ل (إحاطة) + ا (وحدة) + م (كتم)');
  console.log('    → الظلام ظهور قوي يحيط بوحدة مكتومة');
  console.log('');
  console.log('  🎯 المعنى: الثلاثة في الخزان يختنقون في ظلام يحيط بهم');
  console.log('  🎯 رمزية المعاناة الفلسطينية واضحة في معاني الحروف');
}

/**
 * مثال 7: من "عصفور من الشرق" لتوفيق الحكيم
 */
export function analyzeUsfurMinAlSharq() {
  const text = 'أنا عصفور من الشرق، جئت إلى الغرب أبحث عن الحرية';
  const author = 'توفيق الحكيم';
  const keyWords = ['عصفور', 'الشرق', 'الغرب', 'الحرية'];
  
  analyzeProseText(text, author, 'من "عصفور من الشرق" - البحث عن الحرية', keyWords);
  
  console.log('💡 التحليل العميق:');
  console.log('  "عصفور" = ع (عمق) + ص (صلابة) + ف (فجوة) + و (مباغتة) + ر (تدفق)');
  console.log('    → العصفور عمق صلب يفتح فجوة ليتدفق فجأة');
  console.log('');
  console.log('  "الشرق" = ش (تشتت) + ر (تدفق) + ق (دقة)');
  console.log('    → الشرق تشتت متدفق بدقة');
  console.log('');
  console.log('  "الغرب" = غ (غليان) + ر (تدفق) + ب (حمل)');
  console.log('    → الغرب غليان متدفق يحمل');
  console.log('');
  console.log('  "الحرية" = ح (مشقة) + ر (تدفق) + ي (ألم) + ة (ثمرة)');
  console.log('    → الحرية مشقة متدفقة مؤلمة لكن لها ثمرة');
  console.log('');
  console.log('  🎯 المعنى: العصفور يطير من الشرق للغرب بحثاً عن حرية تستحق المشقة');
}

/**
 * مثال 8: من "ذاكرة الجسد" لأحلام مستغانمي
 */
export function analyzeZakiratAlJasad() {
  const text = 'كنت أكتب لك وأنت تقرأ في جسدي ما لم أكتبه';
  const author = 'أحلام مستغانمي';
  const keyWords = ['أكتب', 'تقرأ', 'جسدي', 'ذاكرة'];
  
  analyzeProseText(text, author, 'من "ذاكرة الجسد" - الكتابة والقراءة', keyWords);
  
  console.log('💡 التحليل العميق:');
  console.log('  "أكتب" = ا (بداية) + ك (كثرة) + ت (ثبات) + ب (حمل)');
  console.log('    → الكتابة بداية كثيرة ثابتة محمولة');
  console.log('');
  console.log('  "تقرأ" = ت (ثبات) + ق (دقة) + ر (تدفق) + ا (وحدة)');
  console.log('    → القراءة ثبات دقيق على تدفق الوحدة');
  console.log('');
  console.log('  "جسدي" = ج (جمع) + س (زحف) + د (بدء)');
  console.log('    → الجسد جمع يزحف من البدء');
  console.log('');
  console.log('  "ذاكرة" = ذ (لذة) + ا (وحدة) + ك (كثرة) + ر (تكرار) + ة (ثمرة)');
  console.log('    → الذاكرة لذة وحدة كثيرة متكررة لها ثمرة');
  console.log('');
  console.log('  🎯 المعنى: الكتابة والقراءة تتجاوز الكلمات إلى ذاكرة الجسد');
  console.log('  🎯 التواصل العميق بين الكاتب والقارئ');
}

/**
 * تشغيل جميع أمثلة النثر
 */
export function runAllProseExamples() {
  console.log('\n' + '█'.repeat(80));
  console.log('📚 أمثلة متقدمة لتحليل النصوص الأدبية النثرية');
  console.log('Advanced Arabic Prose Analysis Examples');
  console.log('█'.repeat(80));

  analyzeAlAyyam();
  analyzeZainab();
  analyzeDuaaAlKarawan();
  analyzeAlKhubzAlHafi();
  analyzeMawsimAlHijra();
  analyzeRijalFiAlShams();
  analyzeUsfurMinAlSharq();
  analyzeZakiratAlJasad();

  console.log('\n' + '█'.repeat(80));
  console.log('✅ تم تحليل 8 نصوص أدبية من 7 كتّاب عظام!');
  console.log('✅ 8 prose texts from 7 great writers analyzed successfully!');
  console.log('█'.repeat(80) + '\n');
}

// تشغيل الأمثلة إذا تم تشغيل الملف مباشرة
if (require.main === module) {
  runAllProseExamples();
}

