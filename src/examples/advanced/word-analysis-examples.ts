/**
 * أمثلة متقدمة لتحليل الكلمات باستخدام معاني الحروف
 * Advanced Word Analysis Examples using Letter Meanings
 * 
 * هذا الملف يحتوي على أمثلة تطبيقية لتحليل كلمات عربية
 * واستخراج معانيها العميقة من خلال تحليل حروفها
 */

import { LetterEngine } from '../../linguistics/letterEngine';

// إنشاء محرك تحليل الحروف
const letterEngine = new LetterEngine();

/**
 * مثال 1: تحليل كلمة "حياة"
 * Analysis of the word "حياة" (Life)
 */
export function analyzeHayah() {
  console.log('\n' + '='.repeat(60));
  console.log('📖 تحليل كلمة: حياة (Life)');
  console.log('='.repeat(60));

  const analysis = letterEngine.analyzeWord('حياة');
  
  console.log('\n🔤 الحروف:', analysis.letters.join(', '));
  
  console.log('\n📚 معاني الحروف:');
  for (const [letter, meanings] of analysis.letterMeanings.entries()) {
    console.log(`  ${letter}: ${meanings.join(', ')}`);
  }
  
  console.log('\n🔗 السلسلة السببية:');
  analysis.causalChain.forEach((link, index) => {
    console.log(`  ${index + 1}. ${link}`);
  });
  
  console.log('\n💡 المعاني المستنتجة:');
  analysis.wordMeanings.forEach((meaning, index) => {
    console.log(`  ${index + 1}. ${meaning}`);
  });
  
  console.log(`\n📊 درجة الثقة: ${analysis.confidence}%`);
  
  console.log('\n✨ التفسير:');
  console.log('  ح: صوت المشقة والعطش → الحياة تحتاج جهد');
  console.log('  ي: تألم نفسي وحسرة → الحياة فيها ألم');
  console.log('  ا: الوحدة والبداية → كل حياة لها بداية');
  console.log('  ة: النهاية والثمرة → الحياة لها نهاية وثمرة');
  console.log('\n  🎯 المعنى الكلي: الحياة رحلة من البداية إلى النهاية، فيها مشقة وألم، لكن لها ثمرة');
  
  return analysis;
}

/**
 * مثال 2: تحليل كلمة "سلام"
 * Analysis of the word "سلام" (Peace)
 */
export function analyzeSalam() {
  console.log('\n' + '='.repeat(60));
  console.log('📖 تحليل كلمة: سلام (Peace)');
  console.log('='.repeat(60));

  const analysis = letterEngine.analyzeWord('سلام');
  
  console.log('\n🔤 الحروف:', analysis.letters.join(', '));
  
  console.log('\n📚 معاني الحروف:');
  for (const [letter, meanings] of analysis.letterMeanings.entries()) {
    console.log(`  ${letter}: ${meanings.join(', ')}`);
  }
  
  console.log('\n✨ التفسير:');
  console.log('  س: الزحف والاحتكاك الخفيف → التقارب الهادئ');
  console.log('  ل: السحل والإحاطة → الاحتواء والشمول');
  console.log('  ا: الوحدة والأساس → الأصل الواحد');
  console.log('  م: الضم والكتم → الاجتماع والتآلف');
  console.log('\n  🎯 المعنى الكلي: السلام هو التقارب الهادئ والاحتواء المتبادل على أساس واحد');
  
  return analysis;
}

/**
 * مثال 3: تحليل كلمة "غضب"
 * Analysis of the word "غضب" (Anger)
 */
export function analyzeGhadab() {
  console.log('\n' + '='.repeat(60));
  console.log('📖 تحليل كلمة: غضب (Anger)');
  console.log('='.repeat(60));

  const analysis = letterEngine.analyzeWord('غضب');
  
  console.log('\n🔤 الحروف:', analysis.letters.join(', '));
  
  console.log('\n📚 معاني الحروف:');
  for (const [letter, meanings] of analysis.letterMeanings.entries()) {
    console.log(`  ${letter}: ${meanings.join(', ')}`);
  }
  
  console.log('\n✨ التفسير:');
  console.log('  غ: صوت الغضب والغليان → الانفعال الداخلي');
  console.log('  ض: ضمور وتصاغر → الضيق والانكماش');
  console.log('  ب: امتلاء وتشبع → الامتلاء بالغضب');
  console.log('\n  🎯 المعنى الكلي: الغضب هو غليان داخلي مع ضيق وامتلاء بالانفعال');
  
  return analysis;
}

/**
 * مثال 4: تحليل كلمة "فرح"
 * Analysis of the word "فرح" (Joy)
 */
export function analyzeFarah() {
  console.log('\n' + '='.repeat(60));
  console.log('📖 تحليل كلمة: فرح (Joy)');
  console.log('='.repeat(60));

  const analysis = letterEngine.analyzeWord('فرح');
  
  console.log('\n🔤 الحروف:', analysis.letters.join(', '));
  
  console.log('\n📚 معاني الحروف:');
  for (const [letter, meanings] of analysis.letterMeanings.entries()) {
    console.log(`  ${letter}: ${meanings.join(', ')}`);
  }
  
  console.log('\n✨ التفسير:');
  console.log('  ف: فجوة وانفجار → الانفتاح المفاجئ');
  console.log('  ر: التدفق والحركة → الانسياب والتدفق');
  console.log('  ح: صوت المشقة والتودد → الراحة بعد المشقة');
  console.log('\n  🎯 المعنى الكلي: الفرح هو انفتاح مفاجئ يتدفق بعد مشقة');
  
  return analysis;
}

/**
 * مثال 5: تحليل كلمة "نور"
 * Analysis of the word "نور" (Light)
 */
export function analyzeNoor() {
  console.log('\n' + '='.repeat(60));
  console.log('📖 تحليل كلمة: نور (Light)');
  console.log('='.repeat(60));

  const analysis = letterEngine.analyzeWord('نور');
  
  console.log('\n🔤 الحروف:', analysis.letters.join(', '));
  
  console.log('\n📚 معاني الحروف:');
  for (const [letter, meanings] of analysis.letterMeanings.entries()) {
    console.log(`  ${letter}: ${meanings.join(', ')}`);
  }
  
  console.log('\n✨ التفسير:');
  console.log('  ن: الظهور والنشوء → البروز والوضوح');
  console.log('  و: تعجب ومباغتة → المفاجأة السارة');
  console.log('  ر: التدفق والحركة → الانتشار');
  console.log('\n  🎯 المعنى الكلي: النور هو ظهور مفاجئ يتدفق وينتشر');
  
  return analysis;
}

/**
 * مثال 6: تحليل كلمة "ظلام"
 * Analysis of the word "ظلام" (Darkness)
 */
export function analyzeZalam() {
  console.log('\n' + '='.repeat(60));
  console.log('📖 تحليل كلمة: ظلام (Darkness)');
  console.log('='.repeat(60));

  const analysis = letterEngine.analyzeWord('ظلام');
  
  console.log('\n🔤 الحروف:', analysis.letters.join(', '));
  
  console.log('\n📚 معاني الحروف:');
  for (const [letter, meanings] of analysis.letterMeanings.entries()) {
    console.log(`  ${letter}: ${meanings.join(', ')}`);
  }
  
  console.log('\n✨ التفسير:');
  console.log('  ظ: الظهور القوي → الوضوح الشديد (للظلام)');
  console.log('  ل: الإحاطة والالتفاف → الشمول والتغطية');
  console.log('  ا: الوحدة → الكلية');
  console.log('  م: الكتم والإخفاء → الإخفاء التام');
  console.log('\n  🎯 المعنى الكلي: الظلام هو إحاطة شاملة تخفي كل شيء');
  
  return analysis;
}

/**
 * مثال 7: تحليل كلمة "حب"
 * Analysis of the word "حب" (Love)
 */
export function analyzeHubb() {
  console.log('\n' + '='.repeat(60));
  console.log('📖 تحليل كلمة: حب (Love)');
  console.log('='.repeat(60));

  const analysis = letterEngine.analyzeWord('حب');
  
  console.log('\n🔤 الحروف:', analysis.letters.join(', '));
  
  console.log('\n📚 معاني الحروف:');
  for (const [letter, meanings] of analysis.letterMeanings.entries()) {
    console.log(`  ${letter}: ${meanings.join(', ')}`);
  }
  
  console.log('\n✨ التفسير:');
  console.log('  ح: صوت المشقة والتودد → الجهد في التقرب');
  console.log('  ب: امتلاء وحمل → الامتلاء بالمشاعر');
  console.log('\n  🎯 المعنى الكلي: الحب هو جهد في التودد مع امتلاء بالمشاعر');
  
  return analysis;
}

/**
 * مثال 8: تحليل كلمة "بيان"
 * Analysis of the word "بيان" (Statement/Clarity)
 */
export function analyzeBayan() {
  console.log('\n' + '='.repeat(60));
  console.log('📖 تحليل كلمة: بيان (Statement/Clarity)');
  console.log('='.repeat(60));

  const analysis = letterEngine.analyzeWord('بيان');
  
  console.log('\n🔤 الحروف:', analysis.letters.join(', '));
  
  console.log('\n📚 معاني الحروف:');
  for (const [letter, meanings] of analysis.letterMeanings.entries()) {
    console.log(`  ${letter}: ${meanings.join(', ')}`);
  }
  
  console.log('\n✨ التفسير:');
  console.log('  ب: الاتصال والربط → الربط بين المعاني');
  console.log('  ي: تألم نفسي → الجهد في الفهم');
  console.log('  ا: الوحدة والأساس → الأصل الواحد');
  console.log('  ن: الظهور والنشوء → الإظهار والوضوح');
  console.log('\n  🎯 المعنى الكلي: البيان هو ربط المعاني بجهد لإظهار الأصل الواحد بوضوح');
  console.log('  🎯 هذا هو اسم لغتنا البرمجية! 🚀');
  
  return analysis;
}

/**
 * تشغيل جميع الأمثلة
 * Run all examples
 */
export function runAllWordExamples() {
  console.log('\n' + '█'.repeat(60));
  console.log('🌟 أمثلة متقدمة لتحليل الكلمات العربية');
  console.log('Advanced Arabic Word Analysis Examples');
  console.log('█'.repeat(60));

  analyzeHayah();
  analyzeSalam();
  analyzeGhadab();
  analyzeFarah();
  analyzeNoor();
  analyzeZalam();
  analyzeHubb();
  analyzeBayan();

  console.log('\n' + '█'.repeat(60));
  console.log('✅ تم تحليل 8 كلمات بنجاح!');
  console.log('✅ 8 words analyzed successfully!');
  console.log('█'.repeat(60) + '\n');
}

// تشغيل الأمثلة إذا تم تشغيل الملف مباشرة
if (require.main === module) {
  runAllWordExamples();
}

