/**
 * عرض تفاعلي شامل لتحليل النصوص العربية
 * Interactive Comprehensive Demo for Arabic Text Analysis
 * 
 * هذا الملف يوفر واجهة تفاعلية لتشغيل جميع الأمثلة
 */

import * as readline from 'readline';
import { runAllWordExamples } from './word-analysis-examples';
import { runAllSentenceExamples } from './sentence-analysis-examples';
import { runAllPoetryExamples } from './poetry-analysis-examples';
import { runAllProseExamples } from './prose-analysis-examples';
import { LetterEngine } from '../../linguistics/letterEngine';

const letterEngine = new LetterEngine();

// إنشاء واجهة القراءة من المستخدم
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * عرض القائمة الرئيسية
 */
function showMainMenu() {
  console.clear();
  console.log('\n' + '█'.repeat(80));
  console.log('🌟 نظام تحليل النصوص العربية باستخدام سيماء الحروف');
  console.log('Arabic Text Analysis System using Letter Semiotics');
  console.log('█'.repeat(80));
  console.log('\n📋 القائمة الرئيسية - Main Menu:\n');
  console.log('  1️⃣  تحليل كلمات مفردة (Word Analysis Examples)');
  console.log('  2️⃣  تحليل جمل وعبارات (Sentence Analysis Examples)');
  console.log('  3️⃣  تحليل أبيات شعرية (Poetry Analysis Examples)');
  console.log('  4️⃣  تحليل نصوص أدبية (Prose Analysis Examples)');
  console.log('  5️⃣  تحليل نص مخصص (Custom Text Analysis)');
  console.log('  6️⃣  تشغيل جميع الأمثلة (Run All Examples)');
  console.log('  7️⃣  معلومات عن النظام (System Information)');
  console.log('  0️⃣  خروج (Exit)');
  console.log('\n' + '─'.repeat(80));
}

/**
 * تحليل نص مخصص من المستخدم
 */
function analyzeCustomText() {
  console.log('\n' + '='.repeat(80));
  console.log('✍️  تحليل نص مخصص - Custom Text Analysis');
  console.log('='.repeat(80));
  
  rl.question('\n📝 أدخل الكلمة أو الجملة للتحليل: ', (input) => {
    if (!input || input.trim().length === 0) {
      console.log('\n❌ لم تدخل أي نص!');
      waitForUser();
      return;
    }

    const text = input.trim();
    console.log(`\n🔍 تحليل: "${text}"`);
    console.log('─'.repeat(80));

    // تقسيم النص إلى كلمات
    const words = text.split(/\s+/).filter(w => w.length > 0);
    
    if (words.length === 1) {
      // تحليل كلمة واحدة
      const word = words[0].replace(/[.,!?;:،؛]/g, '');
      analyzeWord(word);
    } else {
      // تحليل جملة
      analyzeSentence(words);
    }

    waitForUser();
  });
}

/**
 * تحليل كلمة واحدة
 */
function analyzeWord(word: string) {
  console.log(`\n📖 تحليل كلمة: "${word}"`);
  
  const analysis = letterEngine.analyzeWord(word);
  
  console.log(`\n🔤 الحروف (${analysis.letters.length}): ${analysis.letters.join(', ')}`);
  
  console.log('\n📚 معاني الحروف:');
  for (const [letter, meanings] of analysis.letterMeanings.entries()) {
    console.log(`  ${letter}:`);
    meanings.slice(0, 3).forEach((meaning, i) => {
      console.log(`    ${i + 1}. ${meaning}`);
    });
  }
  
  if (analysis.causalChain && analysis.causalChain.length > 0) {
    console.log('\n🔗 السلسلة السببية:');
    analysis.causalChain.forEach((link, index) => {
      console.log(`  ${index + 1}. ${link}`);
    });
  }
  
  if (analysis.wordMeanings && analysis.wordMeanings.length > 0) {
    console.log('\n💡 المعاني المستنتجة:');
    analysis.wordMeanings.forEach((meaning, index) => {
      console.log(`  ${index + 1}. ${meaning}`);
    });
  }
  
  console.log(`\n📊 درجة الثقة: ${analysis.confidence}%`);
}

/**
 * تحليل جملة
 */
function analyzeSentence(words: string[]) {
  console.log(`\n📝 تحليل جملة (${words.length} كلمة)`);
  
  words.forEach((word, index) => {
    const cleanWord = word.replace(/[.,!?;:،؛]/g, '');
    if (cleanWord.length > 0) {
      console.log(`\n${index + 1}. "${cleanWord}"`);
      const analysis = letterEngine.analyzeWord(cleanWord);
      console.log(`   الحروف: ${analysis.letters.join(' - ')}`);

      console.log(`   المعاني الرئيسية:`);
      let count = 0;
      for (const [letter, meanings] of analysis.letterMeanings.entries()) {
        if (count >= 3) break;
        console.log(`     ${letter}: ${meanings[0] || '؟'}`);
        count++;
      }
    }
  });
}

/**
 * عرض معلومات عن النظام
 */
function showSystemInfo() {
  console.log('\n' + '='.repeat(80));
  console.log('ℹ️  معلومات عن النظام - System Information');
  console.log('='.repeat(80));
  
  console.log('\n📊 إحصائيات قاعدة البيانات:');
  console.log('  • عدد الحروف العربية: 30 حرف');
  console.log('  • المعاني المضافة من بحث 40 سنة: 58 معنى');
  console.log('  • إصدار قاعدة البيانات: 1.2');
  
  console.log('\n🎯 المبادئ الأساسية:');
  console.log('  1. دلالة الشكل (Shape Semantics)');
  console.log('     كل حرف له شكل يحمل معنى');
  console.log('');
  console.log('  2. دلالة الصوت (Sound Semantics)');
  console.log('     صوت الحرف يعبر عن معناه');
  console.log('');
  console.log('  3. المخارج والمعاني (Articulation-Meaning Mapping)');
  console.log('     • الحروف الحلقية/الجوفية → معاني نفسية/انفعالية');
  console.log('     • الحروف الشفوية/الخارجية → معاني مادية/واقعية');
  console.log('     • الحروف المتوسطة → معاني مختلطة');
  console.log('');
  console.log('  4. الحرف كمعيار (Letter as Criterion)');
  console.log('     كل حرف يحمل معنى وضده');
  
  console.log('\n📚 المصادر:');
  console.log('  • hurof.md - بحث 40 سنة في سيماء الحروف العربية');
  console.log('  • unified_letters_database_complete.json - قاعدة البيانات الكاملة');
  console.log('  • baserah-bayan - نظام سيماء الحروف الأصلي');
  
  console.log('\n🔬 الأمثلة المتوفرة:');
  console.log('  • 8 أمثلة لتحليل كلمات مفردة');
  console.log('  • 8 أمثلة لتحليل جمل وعبارات');
  console.log('  • 8 أمثلة لتحليل أبيات شعرية (من 8 شعراء عظام)');
  console.log('  • 8 أمثلة لتحليل نصوص أدبية (من 7 كتّاب عظام)');
  console.log('  • المجموع: 32 مثال تطبيقي');
  
  console.log('\n✨ الميزات:');
  console.log('  ✅ تحليل الكلمات إلى حروف');
  console.log('  ✅ استخراج معاني الحروف');
  console.log('  ✅ بناء السلاسل السببية');
  console.log('  ✅ استنتاج معاني الكلمات');
  console.log('  ✅ حساب درجة الثقة');
  console.log('  ✅ تحليل تفاعلي للنصوص المخصصة');
  
  waitForUser();
}

/**
 * الانتظار حتى يضغط المستخدم Enter
 */
function waitForUser() {
  rl.question('\n⏎ اضغط Enter للعودة للقائمة الرئيسية...', () => {
    handleMainMenu();
  });
}

/**
 * معالجة اختيار المستخدم من القائمة الرئيسية
 */
function handleMainMenu() {
  showMainMenu();
  
  rl.question('\n👉 اختر رقماً من القائمة: ', (answer) => {
    const choice = answer.trim();
    
    switch (choice) {
      case '1':
        console.log('\n🔄 تشغيل أمثلة تحليل الكلمات...\n');
        runAllWordExamples();
        waitForUser();
        break;
        
      case '2':
        console.log('\n🔄 تشغيل أمثلة تحليل الجمل...\n');
        runAllSentenceExamples();
        waitForUser();
        break;
        
      case '3':
        console.log('\n🔄 تشغيل أمثلة تحليل الشعر...\n');
        runAllPoetryExamples();
        waitForUser();
        break;
        
      case '4':
        console.log('\n🔄 تشغيل أمثلة تحليل النثر...\n');
        runAllProseExamples();
        waitForUser();
        break;
        
      case '5':
        analyzeCustomText();
        break;
        
      case '6':
        console.log('\n🔄 تشغيل جميع الأمثلة...\n');
        runAllWordExamples();
        runAllSentenceExamples();
        runAllPoetryExamples();
        runAllProseExamples();
        
        console.log('\n' + '█'.repeat(80));
        console.log('🎉 تم تشغيل جميع الأمثلة بنجاح!');
        console.log('🎉 All examples executed successfully!');
        console.log('   • 8 أمثلة كلمات');
        console.log('   • 8 أمثلة جمل');
        console.log('   • 8 أمثلة شعر');
        console.log('   • 8 أمثلة نثر');
        console.log('   • المجموع: 32 مثال');
        console.log('█'.repeat(80));
        
        waitForUser();
        break;
        
      case '7':
        showSystemInfo();
        break;
        
      case '0':
        console.log('\n' + '█'.repeat(80));
        console.log('👋 شكراً لاستخدامك نظام تحليل النصوص العربية!');
        console.log('Thank you for using the Arabic Text Analysis System!');
        console.log('█'.repeat(80) + '\n');
        rl.close();
        process.exit(0);
        break;
        
      default:
        console.log('\n❌ اختيار غير صحيح! الرجاء اختيار رقم من 0 إلى 7');
        setTimeout(() => handleMainMenu(), 2000);
        break;
    }
  });
}

/**
 * بدء البرنامج
 */
function start() {
  console.log('\n' + '█'.repeat(80));
  console.log('🚀 مرحباً بك في نظام تحليل النصوص العربية');
  console.log('Welcome to the Arabic Text Analysis System');
  console.log('█'.repeat(80));
  console.log('\n💡 هذا النظام يستخدم سيماء الحروف العربية لتحليل النصوص');
  console.log('   This system uses Arabic letter semiotics to analyze texts');
  console.log('\n📚 مبني على بحث 40 سنة في معاني الحروف العربية');
  console.log('   Built on 40 years of research in Arabic letter meanings');
  console.log('\n✨ يحتوي على 32 مثال تطبيقي من الأدب والشعر العربي');
  console.log('   Contains 32 practical examples from Arabic literature and poetry');
  
  setTimeout(() => handleMainMenu(), 2000);
}

// تشغيل البرنامج
if (require.main === module) {
  start();
}

export { start, analyzeWord, analyzeSentence };

