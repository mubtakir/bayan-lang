/**
 * أمثلة التكامل مع بصيرة AI
 * Baserah AI Integration Examples
 * 
 * أمثلة شاملة لاستخدام API بصيرة
 * Comprehensive examples for using Baserah API
 */

import { baserahAPI } from '../api/baserahIntegration';

/**
 * مثال 1: تحليل نص أساسي
 * Example 1: Basic text analysis
 */
export async function exampleBasicAnalysis() {
    console.log('\n' + '='.repeat(80));
    console.log('مثال 1: تحليل نص أساسي');
    console.log('Example 1: Basic Text Analysis');
    console.log('='.repeat(80) + '\n');

    const text = 'الحياة جميلة والأمل موجود في كل مكان';
    
    const response = await baserahAPI.analyzeText({
        text,
        analysisType: 'basic'
    });

    if (response.success && response.data) {
        const analysis = response.data as any;
        console.log(`النص: ${text}`);
        console.log(`عدد الجمل: ${analysis.sentenceCount}`);
        console.log(`عدد الكلمات: ${analysis.wordCount}`);
        console.log(`الموضوع العام: ${analysis.overallTheme}`);
        console.log(`النبرة العاطفية: ${analysis.emotionalTone}`);
        console.log(`درجة الجودة: ${(analysis.qualityScore * 100).toFixed(1)}%`);
        console.log(`المعاني السائدة: ${analysis.dominantMeanings.slice(0, 5).join('، ')}`);
    }
}

/**
 * مثال 2: فهم عميق للنص
 * Example 2: Deep text understanding
 */
export async function exampleDeepUnderstanding() {
    console.log('\n' + '='.repeat(80));
    console.log('مثال 2: فهم عميق للنص');
    console.log('Example 2: Deep Text Understanding');
    console.log('='.repeat(80) + '\n');

    const text = 'في ظلمة الليل يبحث القلب عن نور الأمل';
    
    const response = await baserahAPI.analyzeText({
        text,
        analysisType: 'deep'
    });

    if (response.success && response.data) {
        const insight = response.data as any;
        console.log(`النص: ${text}`);
        console.log(`\nالمعنى السطحي: ${insight.surfaceMeaning}`);
        console.log(`\nالمعنى العميق: ${insight.deepMeaning}`);
        console.log(`\nالموضوعات المخفية:`);
        insight.hiddenThemes.forEach((theme: string, i: number) => {
            console.log(`  ${i + 1}. ${theme}`);
        });
        console.log(`\nالمعاني الرمزية:`);
        insight.symbolicMeanings.forEach((meaning: string, i: number) => {
            console.log(`  ${i + 1}. ${meaning}`);
        });
        console.log(`\nالملف النفسي:`);
        console.log(`  الحالة العاطفية: ${insight.psychologicalProfile.emotionalState}`);
        console.log(`  الحالة الذهنية: ${insight.psychologicalProfile.mentalState}`);
    }
}

/**
 * مثال 3: تفسير حلم
 * Example 3: Dream interpretation
 */
export async function exampleDreamInterpretation() {
    console.log('\n' + '='.repeat(80));
    console.log('مثال 3: تفسير حلم');
    console.log('Example 3: Dream Interpretation');
    console.log('='.repeat(80) + '\n');

    const dream = 'رأيت في المنام نوراً ساطعاً وماءً جارياً';
    
    const response = await baserahAPI.analyzeText({
        text: dream,
        analysisType: 'dream'
    });

    if (response.success && response.data) {
        const interpretation = response.data as any;
        console.log(`الحلم: ${dream}`);
        console.log(`\nالمعنى الكلي: ${interpretation.overallMeaning}`);
        console.log(`\nالرموز في الحلم:`);
        interpretation.symbols.slice(0, 5).forEach((symbol: any, i: number) => {
            console.log(`  ${i + 1}. ${symbol.word}: ${symbol.interpretation}`);
        });
        if (interpretation.goodOmens.length > 0) {
            console.log(`\nالبشارات:`);
            interpretation.goodOmens.forEach((omen: string, i: number) => {
                console.log(`  ${i + 1}. ${omen}`);
            });
        }
        console.log(`\nالتفسير النهائي:\n${interpretation.interpretation}`);
    }
}

/**
 * مثال 4: توليد نص بناءً على معاني محددة
 * Example 4: Generate text based on specific meanings
 */
export async function exampleTextGeneration() {
    console.log('\n' + '='.repeat(80));
    console.log('مثال 4: توليد نص بناءً على معاني محددة');
    console.log('Example 4: Generate Text Based on Specific Meanings');
    console.log('='.repeat(80) + '\n');

    const response = await baserahAPI.generateText({
        criteria: {
            targetMeanings: ['الحياة', 'النور', 'الأمل'],
            mood: 'positive',
            theme: 'psychological',
            minWords: 5,
            maxWords: 10
        },
        options: {
            returnAlternatives: true,
            alternativesCount: 3
        }
    });

    if (response.success && response.data) {
        console.log(`النص المولد: ${response.data.text}`);
        console.log(`درجة المطابقة: ${(response.data.matchScore * 100).toFixed(1)}%`);
        console.log(`درجة التماسك: ${(response.data.coherenceScore * 100).toFixed(1)}%`);
        console.log(`درجة الجودة: ${(response.data.qualityScore * 100).toFixed(1)}%`);
        
        if (response.alternatives && response.alternatives.length > 0) {
            console.log(`\nبدائل أخرى:`);
            response.alternatives.forEach((alt, i) => {
                console.log(`  ${i + 1}. ${alt.text} (جودة: ${(alt.qualityScore * 100).toFixed(1)}%)`);
            });
        }
    }
}

/**
 * مثال 5: البحث عن كلمات بمعنى محدد
 * Example 5: Search for words with specific meaning
 */
export async function exampleSearchByMeaning() {
    console.log('\n' + '='.repeat(80));
    console.log('مثال 5: البحث عن كلمات بمعنى محدد');
    console.log('Example 5: Search for Words with Specific Meaning');
    console.log('='.repeat(80) + '\n');

    const meaning = 'الحياة';
    const response = await baserahAPI.searchWordsByMeaning(meaning);

    if (response.success && response.data) {
        console.log(`البحث عن كلمات تحتوي على معنى: ${meaning}`);
        console.log(`عدد الكلمات المطابقة: ${response.data.count}`);
        console.log(`الكلمات: ${response.data.matchingWords.join('، ')}`);
    }
}

/**
 * مثال 6: مقارنة بين نصين
 * Example 6: Compare two texts
 */
export async function exampleCompareTexts() {
    console.log('\n' + '='.repeat(80));
    console.log('مثال 6: مقارنة بين نصين');
    console.log('Example 6: Compare Two Texts');
    console.log('='.repeat(80) + '\n');

    const text1 = 'الحياة جميلة والأمل موجود';
    const text2 = 'الحياة صعبة والألم حاضر';

    const response = await baserahAPI.compareTexts(text1, text2);

    if (response.success && response.data) {
        console.log(`النص الأول: ${text1}`);
        console.log(`  الموضوع: ${response.data.text1.theme}`);
        console.log(`  النبرة: ${response.data.text1.tone}`);
        console.log(`  الجودة: ${(response.data.text1.quality * 100).toFixed(1)}%`);
        
        console.log(`\nالنص الثاني: ${text2}`);
        console.log(`  الموضوع: ${response.data.text2.theme}`);
        console.log(`  النبرة: ${response.data.text2.tone}`);
        console.log(`  الجودة: ${(response.data.text2.quality * 100).toFixed(1)}%`);
        
        console.log(`\nالتشابه: ${(response.data.similarity * 100).toFixed(1)}%`);
        
        if (response.data.differences.length > 0) {
            console.log(`\nالفروقات:`);
            response.data.differences.forEach((diff: string, i: number) => {
                console.log(`  ${i + 1}. ${diff}`);
            });
        }
    }
}

/**
 * مثال 7: معالجة دفعة من النصوص
 * Example 7: Process batch of texts
 */
export async function exampleBatchProcessing() {
    console.log('\n' + '='.repeat(80));
    console.log('مثال 7: معالجة دفعة من النصوص');
    console.log('Example 7: Process Batch of Texts');
    console.log('='.repeat(80) + '\n');

    const texts = [
        'الحياة جميلة',
        'الأمل موجود',
        'النور ساطع',
        'القلب فرحان'
    ];

    const response = await baserahAPI.processBatch(texts, 'basic');

    if (response.success && response.data) {
        console.log(`معالجة ${texts.length} نصوص:\n`);
        response.data.forEach((result: any, i: number) => {
            if (result.success && result.data) {
                console.log(`${i + 1}. "${texts[i]}"`);
                console.log(`   الموضوع: ${result.data.overallTheme}`);
                console.log(`   النبرة: ${result.data.emotionalTone}`);
                console.log(`   الجودة: ${(result.data.qualityScore * 100).toFixed(1)}%\n`);
            }
        });
    }
}

/**
 * مثال 8: إحصائيات النظام
 * Example 8: System statistics
 */
export async function exampleSystemStats() {
    console.log('\n' + '='.repeat(80));
    console.log('مثال 8: إحصائيات النظام');
    console.log('Example 8: System Statistics');
    console.log('='.repeat(80) + '\n');

    const response = await baserahAPI.getSystemStats();

    if (response.success && response.data) {
        console.log(`إحصائيات نظام بصيرة AI:\n`);
        console.log(`الإصدار: ${response.data.version}`);
        console.log(`عدد الحروف: ${response.data.totalLetters}`);
        console.log(`عدد المعاني: ${response.data.totalMeanings}`);
        console.log(`حجم القاموس: ${response.data.vocabularySize} كلمة`);
        console.log(`\nالقدرات:`);
        response.data.capabilities.forEach((cap: string, i: number) => {
            console.log(`  ${i + 1}. ${cap}`);
        });
    }
}

/**
 * تشغيل جميع الأمثلة
 * Run all examples
 */
export async function runAllBaserahExamples() {
    console.log('\n' + '█'.repeat(80));
    console.log('█' + ' '.repeat(78) + '█');
    console.log('█' + ' '.repeat(20) + 'أمثلة التكامل مع بصيرة AI' + ' '.repeat(20) + '█');
    console.log('█' + ' '.repeat(15) + 'Baserah AI Integration Examples' + ' '.repeat(15) + '█');
    console.log('█' + ' '.repeat(78) + '█');
    console.log('█'.repeat(80) + '\n');

    await exampleBasicAnalysis();
    await exampleDeepUnderstanding();
    await exampleDreamInterpretation();
    await exampleTextGeneration();
    await exampleSearchByMeaning();
    await exampleCompareTexts();
    await exampleBatchProcessing();
    await exampleSystemStats();

    console.log('\n' + '█'.repeat(80));
    console.log('█' + ' '.repeat(78) + '█');
    console.log('█' + ' '.repeat(25) + 'تم إكمال جميع الأمثلة!' + ' '.repeat(25) + '█');
    console.log('█' + ' '.repeat(22) + 'All Examples Completed!' + ' '.repeat(22) + '█');
    console.log('█' + ' '.repeat(78) + '█');
    console.log('█'.repeat(80) + '\n');
}

// تشغيل الأمثلة إذا تم تنفيذ الملف مباشرة
if (require.main === module) {
    runAllBaserahExamples().catch(console.error);
}

