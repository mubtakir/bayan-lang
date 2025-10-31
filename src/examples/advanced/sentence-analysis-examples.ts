/**
 * أمثلة متقدمة لتحليل الجمل والعبارات
 * Advanced Sentence Analysis Examples
 * 
 * تحليل جمل كاملة واستخراج المعاني المركبة من خلال تحليل كلماتها وحروفها
 */

import { LetterEngine } from '../../linguistics/letterEngine';

const letterEngine = new LetterEngine();

/**
 * تحليل جملة كاملة
 */
function analyzeSentence(sentence: string, title: string) {
  console.log('\n' + '='.repeat(70));
  console.log(`📝 ${title}`);
  console.log('='.repeat(70));
  console.log(`الجملة: "${sentence}"`);
  console.log('');

  // تقسيم الجملة إلى كلمات
  const words = sentence.split(/\s+/).filter(w => w.length > 0);
  
  console.log(`🔤 عدد الكلمات: ${words.length}`);
  console.log('');

  // تحليل كل كلمة
  const wordAnalyses: Array<{word: string, analysis: any}> = [];
  
  words.forEach((word, index) => {
    // إزالة علامات الترقيم
    const cleanWord = word.replace(/[.,!?;:،؛]/g, '');
    
    if (cleanWord.length > 0) {
      console.log(`${index + 1}. تحليل كلمة: "${cleanWord}"`);
      const analysis = letterEngine.analyzeWord(cleanWord);
      
      console.log(`   الحروف: ${analysis.letters.join(', ')}`);
      console.log(`   المعاني الرئيسية:`);

      let count = 0;
      for (const [letter, meanings] of analysis.letterMeanings.entries()) {
        if (count >= 3) break;
        const mainMeaning = meanings[0] || 'لا يوجد';
        console.log(`     ${letter}: ${mainMeaning}`);
        count++;
      }
      
      wordAnalyses.push({ word: cleanWord, analysis });
      console.log('');
    }
  });

  return wordAnalyses;
}

/**
 * مثال 1: تحليل جملة "الحياة جميلة"
 */
export function analyzeLifeIsBeautiful() {
  const sentence = 'الحياة جميلة';
  const analyses = analyzeSentence(sentence, 'تحليل: الحياة جميلة');
  
  console.log('💡 التفسير الكلي:');
  console.log('  "الحياة" = ح (مشقة) + ي (ألم) + ا (بداية) + ة (نهاية)');
  console.log('  "جميلة" = ج (جمع) + م (ضم) + ي (حسرة) + ل (إحاطة) + ة (ثمرة)');
  console.log('');
  console.log('  🎯 المعنى: رغم مشقة الحياة وألمها، فإن جمعها وضمها يحيط بنا بثمرة جميلة');
  
  return analyses;
}

/**
 * مثال 2: تحليل جملة "العلم نور"
 */
export function analyzeKnowledgeIsLight() {
  const sentence = 'العلم نور';
  const analyses = analyzeSentence(sentence, 'تحليل: العلم نور');
  
  console.log('💡 التفسير الكلي:');
  console.log('  "العلم" = ع (عمق) + ل (إحاطة) + م (كتم)');
  console.log('  "نور" = ن (ظهور) + و (مباغتة) + ر (تدفق)');
  console.log('');
  console.log('  🎯 المعنى: العلم المكتوم في العمق يظهر فجأة كنور متدفق');
  
  return analyses;
}

/**
 * مثال 3: تحليل جملة "الصبر مفتاح الفرج"
 */
export function analyzePatienceIsKey() {
  const sentence = 'الصبر مفتاح الفرج';
  const analyses = analyzeSentence(sentence, 'تحليل: الصبر مفتاح الفرج');
  
  console.log('💡 التفسير الكلي:');
  console.log('  "الصبر" = ص (صلابة) + ب (حمل) + ر (تكرار)');
  console.log('  "مفتاح" = م (ضم) + ف (فجوة) + ت (ثبات) + ا (أساس) + ح (تودد)');
  console.log('  "الفرج" = ف (فجوة) + ر (تدفق) + ج (جمع)');
  console.log('');
  console.log('  🎯 المعنى: الصبر (الصلابة المتكررة في الحمل) يفتح الفجوة التي يتدفق منها الفرج');
  
  return analyses;
}

/**
 * مثال 4: تحليل جملة "في الاتحاد قوة"
 */
export function analyzeUnityIsStrength() {
  const sentence = 'في الاتحاد قوة';
  const analyses = analyzeSentence(sentence, 'تحليل: في الاتحاد قوة');
  
  console.log('💡 التفسير الكلي:');
  console.log('  "الاتحاد" = ا (وحدة) + ت (ثبات) + ح (تودد) + ا (أساس) + د (بدء)');
  console.log('  "قوة" = ق (دقة) + و (هجوم) + ة (ثمرة)');
  console.log('');
  console.log('  🎯 المعنى: الوحدة الثابتة على أساس التودد تبدأ قوة دقيقة هجومية');
  
  return analyses;
}

/**
 * مثال 5: تحليل جملة "الأمل يصنع المعجزات"
 */
export function analyzeHopeCreatesMiracles() {
  const sentence = 'الأمل يصنع المعجزات';
  const analyses = analyzeSentence(sentence, 'تحليل: الأمل يصنع المعجزات');
  
  console.log('💡 التفسير الكلي:');
  console.log('  "الأمل" = ا (بداية) + م (ضم) + ل (إحاطة)');
  console.log('  "يصنع" = ي (ألم) + ص (صلابة) + ن (ظهور) + ع (عمق)');
  console.log('  "المعجزات" = م (ضم) + ع (عمق) + ج (جمع) + ز (حركة) + ا (أساس) + ت (ثبات)');
  console.log('');
  console.log('  🎯 المعنى: الأمل (البداية الشاملة) يصنع بألم وصلابة معجزات عميقة ثابتة');
  
  return analyses;
}

/**
 * مثال 6: تحليل حكمة "من جد وجد"
 */
export function analyzeWhoSeeksFinds() {
  const sentence = 'من جد وجد';
  const analyses = analyzeSentence(sentence, 'تحليل حكمة: من جد وجد');
  
  console.log('💡 التفسير الكلي:');
  console.log('  "جد" = ج (جمع) + د (بدء)');
  console.log('  "وجد" = و (مباغتة) + ج (جمع) + د (بدء)');
  console.log('');
  console.log('  🎯 المعنى: من جمع جهده وبدأ، وجد فجأة ما جمعه وبدأه');
  console.log('  🎯 التكرار في الحروف يعكس تكرار الجهد والنتيجة');
  
  return analyses;
}

/**
 * مثال 7: تحليل مثل "الطيور على أشكالها تقع"
 */
export function analyzeBirdsOfFeather() {
  const sentence = 'الطيور على أشكالها تقع';
  const analyses = analyzeSentence(sentence, 'تحليل مثل: الطيور على أشكالها تقع');
  
  console.log('💡 التفسير الكلي:');
  console.log('  "الطيور" = ط (طمس) + ي (ألم) + و (هجوم) + ر (تدفق)');
  console.log('  "أشكالها" = ش (تشتت) + ك (كثرة) + ل (إحاطة)');
  console.log('  "تقع" = ت (ثبات) + ق (دقة) + ع (عمق)');
  console.log('');
  console.log('  🎯 المعنى: الطيور المتدفقة تقع بدقة على ما يحيط بأشكالها المتشابهة');
  
  return analyses;
}

/**
 * مثال 8: تحليل دعاء "اللهم اهدنا"
 */
export function analyzeGuidanceSupplication() {
  const sentence = 'اللهم اهدنا';
  const analyses = analyzeSentence(sentence, 'تحليل دعاء: اللهم اهدنا');
  
  console.log('💡 التفسير الكلي:');
  console.log('  "اللهم" = ا (وحدة) + ل (إحاطة) + ل (إحاطة) + ه (نتيجة) + م (ضم)');
  console.log('  "اهدنا" = ا (بداية) + ه (نتيجة) + د (بدء) + ن (ظهور) + ا (أساس)');
  console.log('');
  console.log('  🎯 المعنى: يا من يحيط بكل شيء ويضمه، ابدأ بنا نتيجة الهداية لتظهر على أساس');
  
  return analyses;
}

/**
 * تشغيل جميع أمثلة الجمل
 */
export function runAllSentenceExamples() {
  console.log('\n' + '█'.repeat(70));
  console.log('🌟 أمثلة متقدمة لتحليل الجمل والعبارات العربية');
  console.log('Advanced Arabic Sentence Analysis Examples');
  console.log('█'.repeat(70));

  analyzeLifeIsBeautiful();
  analyzeKnowledgeIsLight();
  analyzePatienceIsKey();
  analyzeUnityIsStrength();
  analyzeHopeCreatesMiracles();
  analyzeWhoSeeksFinds();
  analyzeBirdsOfFeather();
  analyzeGuidanceSupplication();

  console.log('\n' + '█'.repeat(70));
  console.log('✅ تم تحليل 8 جمل وعبارات بنجاح!');
  console.log('✅ 8 sentences analyzed successfully!');
  console.log('█'.repeat(70) + '\n');
}

// تشغيل الأمثلة إذا تم تشغيل الملف مباشرة
if (require.main === module) {
  runAllSentenceExamples();
}

