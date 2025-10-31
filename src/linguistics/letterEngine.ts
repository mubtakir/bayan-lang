/**
 * محرك تحليل الحروف والكلمات
 * Letter and Word Analysis Engine
 * 
 * يطبق نظرية العلاقات السببية بين معاني الحروف
 * Applies the theory of causal relationships between letter meanings
 */

import { CausalEngine, RelationType } from '../logic/causalEngine';

/**
 * نوع المعنى - Meaning Type
 */
export enum MeaningType {
  PRIMARY = 'أساسي',           // Primary meaning
  SECONDARY = 'ثانوي',         // Secondary meaning
  OPPOSITE = 'عكسي',           // Opposite meaning
  RESULT = 'نتيجة',            // Result/consequence
  CAUSE = 'سبب',               // Cause/reason
  MECHANISM = 'آلية'           // Mechanism/process
}

/**
 * موضع المعنى في الكلمة - Meaning Position
 */
export enum MeaningPosition {
  BEGINNING = 'بداية',         // At the beginning
  MIDDLE = 'وسط',              // In the middle
  END = 'نهاية',               // At the end
  THROUGHOUT = 'شامل'          // Throughout the word
}

/**
 * معنى الحرف - Letter Meaning
 */
export class LetterMeaning {
  constructor(
    public letter: string,              // الحرف - The letter
    public meaning: string,             // المعنى - The meaning
    public type: MeaningType,           // نوع المعنى - Meaning type
    public weight: number = 1.0,        // الوزن/القوة (0-1) - Weight/strength
    public examples: string[] = []      // أمثلة - Examples
  ) {}

  toString(): string {
    return `${this.letter} → ${this.meaning} (${this.type}, ${this.weight})`;
  }
}

/**
 * تحليل الكلمة - Word Analysis
 */
export class WordAnalysis {
  constructor(
    public word: string,                           // الكلمة - The word
    public letters: string[],                      // الحروف - The letters
    public letterMeanings: Map<string, string[]>,  // معاني كل حرف - Meanings of each letter
    public wordMeanings: string[],                 // معاني الكلمة المستنتجة - Inferred word meanings
    public causalChain: string[],                  // السلسلة السببية - Causal chain
    public confidence: number                      // درجة الثقة - Confidence score
  ) {}

  toString(): string {
    let result = `\n=== تحليل كلمة: ${this.word} ===\n`;
    result += `الحروف: ${this.letters.join(', ')}\n\n`;
    
    result += `معاني الحروف:\n`;
    for (const [letter, meanings] of this.letterMeanings.entries()) {
      result += `  ${letter}: ${meanings.join(', ')}\n`;
    }
    
    result += `\nالسلسلة السببية:\n  ${this.causalChain.join(' → ')}\n`;
    result += `\nمعاني الكلمة المستنتجة:\n  ${this.wordMeanings.join(', ')}\n`;
    result += `\nدرجة الثقة: ${(this.confidence * 100).toFixed(1)}%\n`;
    
    return result;
  }
}

/**
 * محرك تحليل الحروف
 * Letter Analysis Engine
 */
export class LetterEngine {
  private letterMeanings: Map<string, LetterMeaning[]> = new Map();
  private causalEngine: CausalEngine = new CausalEngine();

  constructor() {
    this.initializeArabicLetters();
  }

  /**
   * تهيئة معاني الحروف العربية
   * Initialize Arabic letter meanings
   */
  private initializeArabicLetters(): void {
    // حرف الباء (ب) - Letter Ba
    this.addLetterMeaning('ب', 'دك', MeaningType.PRIMARY, 0.9, ['بطش', 'بطح']);
    this.addLetterMeaning('ب', 'امتلاء', MeaningType.PRIMARY, 0.95, ['بحر', 'بطن']);
    this.addLetterMeaning('ب', 'بلع', MeaningType.MECHANISM, 0.85, ['بلع', 'ابتلع']);
    this.addLetterMeaning('ب', 'حمل', MeaningType.MECHANISM, 0.9, ['باب', 'بريد']);
    this.addLetterMeaning('ب', 'نقل', MeaningType.MECHANISM, 0.9, ['نقل', 'حمل']);
    this.addLetterMeaning('ب', 'تشبع', MeaningType.RESULT, 0.85, ['شبع', 'امتلاء']);
    this.addLetterMeaning('ب', 'إشباع', MeaningType.RESULT, 0.85, ['إشباع']);

    // العلاقات السببية بين معاني الباء
    this.causalEngine.addRelation('دك', 'امتلاء', RelationType.CAUSES, 0.9);
    this.causalEngine.addRelation('امتلاء', 'بلع', RelationType.CAUSES, 0.8);
    this.causalEngine.addRelation('بلع', 'حمل', RelationType.REQUIRES, 0.85);
    this.causalEngine.addRelation('حمل', 'نقل', RelationType.ENABLES, 0.9);
    this.causalEngine.addRelation('امتلاء', 'تشبع', RelationType.CAUSES, 0.9);
    this.causalEngine.addRelation('بلع', 'إشباع', RelationType.LEADS_TO, 0.85);

    // حرف الشين (ش) - Letter Sheen
    this.addLetterMeaning('ش', 'تشتت', MeaningType.PRIMARY, 0.95, ['شتت', 'تشتت']);
    this.addLetterMeaning('ش', 'تشعب', MeaningType.PRIMARY, 0.95, ['شعب', 'تفرع']);
    this.addLetterMeaning('ش', 'انتشار', MeaningType.RESULT, 0.9, ['انتشار', 'شاع']);
    this.addLetterMeaning('ش', 'تفرق', MeaningType.MECHANISM, 0.85, ['تفرق']);

    this.causalEngine.addRelation('تشتت', 'تشعب', RelationType.CAUSES, 0.9);
    this.causalEngine.addRelation('تشعب', 'انتشار', RelationType.LEADS_TO, 0.85);
    this.causalEngine.addRelation('تشتت', 'تفرق', RelationType.CAUSES, 0.8);

    // حرف الجيم (ج) - Letter Jeem
    this.addLetterMeaning('ج', 'التحام', MeaningType.PRIMARY, 0.95, ['التحام']);
    this.addLetterMeaning('ج', 'تجمع', MeaningType.PRIMARY, 0.95, ['جمع', 'اجتمع']);
    this.addLetterMeaning('ج', 'وتد', MeaningType.MECHANISM, 0.85, ['جذر', 'جذع']);
    this.addLetterMeaning('ج', 'تماسك', MeaningType.RESULT, 0.9, ['تماسك']);

    this.causalEngine.addRelation('التحام', 'تجمع', RelationType.CAUSES, 0.9);
    this.causalEngine.addRelation('تجمع', 'وتد', RelationType.LEADS_TO, 0.85);
    this.causalEngine.addRelation('التحام', 'تماسك', RelationType.CAUSES, 0.9);

    // حرف الراء (ر) - Letter Ra
    this.addLetterMeaning('ر', 'تدفق', MeaningType.PRIMARY, 0.95, ['جرى', 'سار']);
    this.addLetterMeaning('ر', 'انطلاق', MeaningType.PRIMARY, 0.9, ['انطلق']);
    this.addLetterMeaning('ر', 'تحليق', MeaningType.MECHANISM, 0.85, ['طار']);
    this.addLetterMeaning('ر', 'انسيابية', MeaningType.MECHANISM, 0.9, ['انساب']);
    this.addLetterMeaning('ر', 'تكرار', MeaningType.RESULT, 0.85, ['كرر', 'رجع']);

    this.causalEngine.addRelation('تدفق', 'انطلاق', RelationType.CAUSES, 0.9);
    this.causalEngine.addRelation('انطلاق', 'تحليق', RelationType.ENABLES, 0.85);
    this.causalEngine.addRelation('تدفق', 'انسيابية', RelationType.CAUSES, 0.9);
    this.causalEngine.addRelation('انسيابية', 'تكرار', RelationType.LEADS_TO, 0.8);

    // التاء المربوطة (ة) - Letter Ta Marbuta
    this.addLetterMeaning('ة', 'ثمرة', MeaningType.PRIMARY, 0.95, ['ثمرة']);
    this.addLetterMeaning('ة', 'نتيجة', MeaningType.PRIMARY, 0.95, ['نتيجة']);
    this.addLetterMeaning('ة', 'حصيلة', MeaningType.RESULT, 0.9, ['حصيلة']);
    this.addLetterMeaning('ة', 'أثر_جهد', MeaningType.CAUSE, 0.85, ['جهد سابق']);

    this.causalEngine.addRelation('أثر_جهد', 'ثمرة', RelationType.CAUSES, 0.9);
    this.causalEngine.addRelation('ثمرة', 'نتيجة', RelationType.CAUSES, 0.95);
    this.causalEngine.addRelation('نتيجة', 'حصيلة', RelationType.LEADS_TO, 0.85);
  }

  /**
   * إضافة معنى لحرف
   * Add meaning to a letter
   */
  addLetterMeaning(
    letter: string,
    meaning: string,
    type: MeaningType,
    weight: number = 1.0,
    examples: string[] = []
  ): void {
    if (!this.letterMeanings.has(letter)) {
      this.letterMeanings.set(letter, []);
    }
    
    const meanings = this.letterMeanings.get(letter)!;
    meanings.push(new LetterMeaning(letter, meaning, type, weight, examples));
  }

  /**
   * الحصول على معاني حرف
   * Get meanings of a letter
   */
  getLetterMeanings(letter: string): LetterMeaning[] {
    return this.letterMeanings.get(letter) || [];
  }

  /**
   * تحليل كلمة
   * Analyze a word
   */
  analyzeWord(word: string): WordAnalysis {
    const letters = word.split('');
    const letterMeaningsMap = new Map<string, string[]>();
    const allMeanings: string[] = [];

    // جمع معاني كل حرف
    for (const letter of letters) {
      const meanings = this.getLetterMeanings(letter);
      const meaningStrings = meanings.map(m => m.meaning);
      letterMeaningsMap.set(letter, meaningStrings);
      allMeanings.push(...meaningStrings);
    }

    // بناء السلسلة السببية
    const causalChain = this.buildCausalChain(allMeanings);

    // استنتاج معاني الكلمة
    const wordMeanings = this.inferWordMeanings(word, letters, causalChain);

    // حساب درجة الثقة
    const confidence = this.calculateConfidence(letters, causalChain);

    return new WordAnalysis(
      word,
      letters,
      letterMeaningsMap,
      wordMeanings,
      causalChain,
      confidence
    );
  }

  /**
   * بناء السلسلة السببية من المعاني
   * Build causal chain from meanings
   */
  private buildCausalChain(meanings: string[]): string[] {
    if (meanings.length === 0) return [];

    // إيجاد أطول مسار سببي يربط المعاني
    let longestChain: string[] = [];

    for (let i = 0; i < meanings.length; i++) {
      for (let j = i + 1; j < meanings.length; j++) {
        const paths = this.causalEngine.findAllPaths(meanings[i], meanings[j]);
        
        for (const path of paths) {
          if (path.nodes.length > longestChain.length) {
            longestChain = path.nodes;
          }
        }
      }
    }

    return longestChain.length > 0 ? longestChain : meanings.slice(0, 3);
  }

  /**
   * استنتاج معاني الكلمة من معاني حروفها
   * Infer word meanings from letter meanings
   */
  private inferWordMeanings(word: string, _letters: string[], causalChain: string[]): string[] {
    const meanings: string[] = [];

    // المعنى الأخير في السلسلة السببية هو غالباً المعنى الرئيسي
    if (causalChain.length > 0) {
      meanings.push(causalChain[causalChain.length - 1]);
    }

    // إضافة معاني خاصة بكلمات معروفة
    if (word === 'شجرة') {
      meanings.push('نبات متفرع الأغصان ذو جذع وثمار');
    }

    return meanings;
  }

  /**
   * حساب درجة الثقة في التحليل
   * Calculate confidence in the analysis
   */
  private calculateConfidence(letters: string[], causalChain: string[]): number {
    let confidence = 0.5; // قيمة أساسية

    // زيادة الثقة بناءً على عدد الحروف المعروفة
    const knownLetters = letters.filter(l => this.letterMeanings.has(l)).length;
    confidence += (knownLetters / letters.length) * 0.3;

    // زيادة الثقة بناءً على طول السلسلة السببية
    if (causalChain.length > 2) {
      confidence += 0.2;
    }

    return Math.min(confidence, 1.0);
  }

  /**
   * الحصول على المحرك السببي
   * Get the causal engine
   */
  getCausalEngine(): CausalEngine {
    return this.causalEngine;
  }
}

