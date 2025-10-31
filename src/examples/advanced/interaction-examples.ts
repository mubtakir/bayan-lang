/**
 * أمثلة تطبيقية لنظام التفاعل بين الحروف
 * Application Examples for Letter Interaction System
 * 
 * @module examples/advanced/interaction-examples
 */

import { LetterInteractionEngine, InteractionType } from '../../linguistics/letterInteractionEngine';

const engine = new LetterInteractionEngine();

/**
 * مثال 1: تحليل التآزر بين الحروف في كلمة "حياة"
 */
export function exampleSynergyHayah() {
  console.log('\n' + '='.repeat(60));
  console.log('📊 مثال 1: تحليل التآزر في كلمة "حياة"');
  console.log('='.repeat(60));
  
  const analysis = engine.analyzeWordInteraction('حياة');
  
  console.log(`\n🔤 الكلمة: ${analysis.word}`);
  console.log(`\n⚡ التفاعلات بين الحروف:`);
  
  for (const interaction of analysis.interactions) {
    const typeEmoji = getInteractionEmoji(interaction.type);
    console.log(`\n  ${typeEmoji} ${interaction.letter1} + ${interaction.letter2}`);
    console.log(`     النوع: ${interaction.type}`);
    console.log(`     القوة: ${(interaction.strength * 100).toFixed(1)}%`);
    console.log(`     الوصف: ${interaction.description}`);
  }
  
  console.log(`\n📈 الدرجة الكلية: ${(analysis.overallScore * 100).toFixed(1)}%`);
}

/**
 * مثال 2: تحليل التوازن في كلمات مختلفة
 */
export function exampleBalance() {
  console.log('\n' + '='.repeat(60));
  console.log('⚖️  مثال 2: تحليل التوازن في كلمات مختلفة');
  console.log('='.repeat(60));
  
  const words = ['حياة', 'غضب', 'سلام', 'نور', 'ظلام'];
  
  console.log('\n| الكلمة | إيجابي | سلبي | مادي | نفسي | التوازن | الوصف |');
  console.log('|--------|--------|------|------|------|---------|-------|');
  
  for (const word of words) {
    const balance = engine.calculateBalance(word);
    
    console.log(`| ${word.padEnd(6)} | ${(balance.positiveScore * 100).toFixed(0).padStart(4)}% | ${(balance.negativeScore * 100).toFixed(0).padStart(4)}% | ${(balance.materialScore * 100).toFixed(0).padStart(4)}% | ${(balance.psychologicalScore * 100).toFixed(0).padStart(4)}% | ${balance.overallBalance.toFixed(2).padStart(5)} | ${balance.description} |`);
  }
}

/**
 * مثال 3: تحليل التدفق السببي
 */
export function exampleCausalFlow() {
  console.log('\n' + '='.repeat(60));
  console.log('🌊 مثال 3: تحليل التدفق السببي في كلمة "نور"');
  console.log('='.repeat(60));
  
  const flow = engine.analyzeCausalFlow('نور');
  
  console.log(`\n🔤 الكلمة: ${flow.word}`);
  console.log(`\n📍 مراحل التدفق:`);
  
  for (const stage of flow.stages) {
    const bar = '█'.repeat(Math.floor(stage.contribution * 20));
    console.log(`\n  ${stage.position + 1}. ${stage.letter}`);
    console.log(`     المعنى: ${stage.meaning}`);
    console.log(`     المساهمة: ${bar} ${(stage.contribution * 100).toFixed(1)}%`);
  }
  
  console.log(`\n💪 قوة التدفق: ${(flow.flowStrength * 100).toFixed(1)}%`);
  console.log(`🔗 التماسك: ${(flow.coherence * 100).toFixed(1)}%`);
}

/**
 * مثال 4: مقارنة كلمات متضادة
 */
export function exampleOpposites() {
  console.log('\n' + '='.repeat(60));
  console.log('🔄 مثال 4: مقارنة كلمات متضادة');
  console.log('='.repeat(60));
  
  const pairs = [
    ['نور', 'ظلام'],
    ['فرح', 'حزن'],
    ['حب', 'كره']
  ];
  
  for (const [word1, word2] of pairs) {
    console.log(`\n━━━ ${word1} vs ${word2} ━━━`);
    
    const analysis1 = engine.analyzeWordInteraction(word1);
    const analysis2 = engine.analyzeWordInteraction(word2);
    
    console.log(`\n${word1}:`);
    console.log(`  التوازن: ${analysis1.balance.overallBalance.toFixed(2)}`);
    console.log(`  قوة التدفق: ${(analysis1.flow.flowStrength * 100).toFixed(1)}%`);
    console.log(`  الدرجة الكلية: ${(analysis1.overallScore * 100).toFixed(1)}%`);
    
    console.log(`\n${word2}:`);
    console.log(`  التوازن: ${analysis2.balance.overallBalance.toFixed(2)}`);
    console.log(`  قوة التدفق: ${(analysis2.flow.flowStrength * 100).toFixed(1)}%`);
    console.log(`  الدرجة الكلية: ${(analysis2.overallScore * 100).toFixed(1)}%`);
  }
}

/**
 * مثال 5: تحليل شامل لكلمة "بيان"
 */
export function exampleComprehensiveBayan() {
  console.log('\n' + '='.repeat(60));
  console.log('🎯 مثال 5: تحليل شامل لكلمة "بيان"');
  console.log('='.repeat(60));
  
  const analysis = engine.analyzeWordInteraction('بيان');
  
  console.log(`\n🔤 الكلمة: ${analysis.word}`);
  
  // التفاعلات
  console.log(`\n⚡ التفاعلات بين الحروف:`);
  for (const interaction of analysis.interactions) {
    const typeEmoji = getInteractionEmoji(interaction.type);
    console.log(`  ${typeEmoji} ${interaction.letter1} + ${interaction.letter2}: ${interaction.type} (${(interaction.strength * 100).toFixed(1)}%)`);
  }
  
  // التوازن
  console.log(`\n⚖️  التوازن:`);
  console.log(`  إيجابي: ${(analysis.balance.positiveScore * 100).toFixed(1)}%`);
  console.log(`  سلبي: ${(analysis.balance.negativeScore * 100).toFixed(1)}%`);
  console.log(`  مادي: ${(analysis.balance.materialScore * 100).toFixed(1)}%`);
  console.log(`  نفسي: ${(analysis.balance.psychologicalScore * 100).toFixed(1)}%`);
  console.log(`  التوازن الكلي: ${analysis.balance.overallBalance.toFixed(2)}`);
  console.log(`  الوصف: ${analysis.balance.description}`);
  
  // التدفق
  console.log(`\n🌊 التدفق السببي:`);
  console.log(`  قوة التدفق: ${(analysis.flow.flowStrength * 100).toFixed(1)}%`);
  console.log(`  التماسك: ${(analysis.flow.coherence * 100).toFixed(1)}%`);
  
  // الدرجة الكلية
  console.log(`\n📈 الدرجة الكلية: ${(analysis.overallScore * 100).toFixed(1)}%`);
}

/**
 * مثال 6: تحليل أنواع التفاعل
 */
export function exampleInteractionTypes() {
  console.log('\n' + '='.repeat(60));
  console.log('🔬 مثال 6: أنواع التفاعل بين الحروف');
  console.log('='.repeat(60));
  
  const words = ['حياة', 'سلام', 'غضب', 'فرح', 'نور'];
  
  const typeCount: Record<string, number> = {};
  
  for (const word of words) {
    const analysis = engine.analyzeWordInteraction(word);
    
    console.log(`\n${word}:`);
    for (const interaction of analysis.interactions) {
      console.log(`  ${interaction.letter1}+${interaction.letter2}: ${interaction.type}`);
      typeCount[interaction.type] = (typeCount[interaction.type] || 0) + 1;
    }
  }
  
  console.log(`\n📊 إحصائيات أنواع التفاعل:`);
  for (const [type, count] of Object.entries(typeCount)) {
    console.log(`  ${type}: ${count} مرة`);
  }
}

/**
 * مثال 7: تحليل قوة الكلمات
 */
export function exampleWordStrength() {
  console.log('\n' + '='.repeat(60));
  console.log('💪 مثال 7: قوة الكلمات');
  console.log('='.repeat(60));
  
  const words = ['حياة', 'سلام', 'غضب', 'فرح', 'نور', 'ظلام', 'حب', 'بيان'];
  
  const results = words.map(word => ({
    word,
    analysis: engine.analyzeWordInteraction(word)
  }));
  
  // ترتيب حسب الدرجة الكلية
  results.sort((a, b) => b.analysis.overallScore - a.analysis.overallScore);
  
  console.log('\n🏆 ترتيب الكلمات حسب القوة:');
  console.log('\n| المرتبة | الكلمة | الدرجة | التوازن | التدفق | التماسك |');
  console.log('|---------|--------|--------|---------|--------|---------|');
  
  for (let i = 0; i < results.length; i++) {
    const { word, analysis } = results[i];
    console.log(`| ${(i + 1).toString().padStart(7)} | ${word.padEnd(6)} | ${(analysis.overallScore * 100).toFixed(1).padStart(4)}% | ${analysis.balance.overallBalance.toFixed(2).padStart(7)} | ${(analysis.flow.flowStrength * 100).toFixed(1).padStart(4)}% | ${(analysis.flow.coherence * 100).toFixed(1).padStart(5)}% |`);
  }
}

/**
 * مثال 8: تحليل التدفق في جملة
 */
export function exampleSentenceFlow() {
  console.log('\n' + '='.repeat(60));
  console.log('📝 مثال 8: تحليل التدفق في جملة');
  console.log('='.repeat(60));
  
  const words = ['الحياة', 'نور', 'وأمل'];
  
  console.log('\n🔤 الجملة: الحياة نور وأمل');
  console.log('\n📊 تحليل كل كلمة:');
  
  for (const word of words) {
    const flow = engine.analyzeCausalFlow(word);
    
    console.log(`\n  ${word}:`);
    console.log(`    قوة التدفق: ${(flow.flowStrength * 100).toFixed(1)}%`);
    console.log(`    التماسك: ${(flow.coherence * 100).toFixed(1)}%`);
    console.log(`    المراحل: ${flow.stages.length}`);
  }
}

/**
 * دالة مساعدة للحصول على رمز تعبيري لنوع التفاعل
 */
function getInteractionEmoji(type: InteractionType): string {
  switch (type) {
    case InteractionType.SYNERGY:
      return '🤝';
    case InteractionType.CONFLICT:
      return '⚔️';
    case InteractionType.NEUTRAL:
      return '➖';
    case InteractionType.AMPLIFICATION:
      return '📈';
    case InteractionType.WEAKENING:
      return '📉';
    default:
      return '❓';
  }
}

/**
 * تشغيل جميع الأمثلة
 */
export function runAllInteractionExamples() {
  console.log('\n');
  console.log('█'.repeat(60));
  console.log('🌟 أمثلة نظام التفاعل بين الحروف');
  console.log('Letter Interaction System Examples');
  console.log('█'.repeat(60));
  
  exampleSynergyHayah();
  exampleBalance();
  exampleCausalFlow();
  exampleOpposites();
  exampleComprehensiveBayan();
  exampleInteractionTypes();
  exampleWordStrength();
  exampleSentenceFlow();
  
  console.log('\n' + '█'.repeat(60));
  console.log('✅ تم تشغيل جميع الأمثلة بنجاح!');
  console.log('█'.repeat(60) + '\n');
}

// تشغيل الأمثلة إذا تم استدعاء الملف مباشرة
if (require.main === module) {
  runAllInteractionExamples();
}

