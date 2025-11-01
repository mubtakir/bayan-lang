/**
 * الرموز الذكية - Intelligent Tokens
 * Extended tokens with AI intelligence from Baserah systems
 */

import { Token, TokenType } from './tokens.js';
import { LetterMeaning, LetterProfile } from '../letterMeanings/letterMeaningAnalyzer.js';
import { WordRoot, RootType } from '../lexicon/rootAnalyzer.js';
import { Derivation } from '../lexicon/derivationGenerator.js';
import { EnglishWordRoot } from '../lexicon/englishRootAnalyzer.js';
import { EnglishDerivation } from '../lexicon/englishDerivationGenerator.js';

/**
 * نوع دلالي للرمز
 * Semantic type of the token
 */
export type SemanticType = 
  | 'PERSON_NAME'      // اسم شخص
  | 'PLACE_NAME'       // اسم مكان
  | 'OBJECT_THING'     // شيء/كائن
  | 'OBJECT_FOOD'      // طعام
  | 'EVENT_ACTION'     // حدث/فعل
  | 'STATE_CONDITION'  // حالة
  | 'PROPERTY_TRAIT'   // خاصية/صفة
  | 'CONCEPT_ABSTRACT' // مفهوم مجرد
  | 'KEYWORD'          // كلمة مفتاحية
  | 'OPERATOR'         // عامل
  | 'LITERAL'          // قيمة حرفية
  | 'UNKNOWN';         // غير معروف

/**
 * لغة الرمز
 * Token language
 */
export type TokenLanguage = 'arabic' | 'english' | 'mixed' | 'neutral';

/**
 * تحليل الحروف للرمز
 * Letter analysis for the token
 */
export interface LetterAnalysis {
  letters: string[];                    // الحروف
  meanings: string[];                   // المعاني
  profiles: (LetterProfile | null)[];   // ملفات الحروف
  letterMeanings: LetterMeaning[][];    // معاني كل حرف
  combinedMeaning: string;              // المعنى المركب
  personality?: string;                 // الشخصية (للأسماء)
  confidence: number;                   // مستوى الثقة
}

/**
 * معلومات الجذر
 * Root information
 */
export interface RootInfo {
  root: string;                         // الجذر
  type: RootType | string;              // نوع الجذر
  confidence: number;                   // مستوى الثقة
  language: TokenLanguage;              // اللغة
  arabicRoot?: WordRoot;                // جذر عربي
  englishRoot?: EnglishWordRoot;        // جذر إنجليزي
}

/**
 * معلومات الاشتقاقات
 * Derivations information
 */
export interface DerivationsInfo {
  derivations: string[];                // الاشتقاقات
  count: number;                        // العدد
  language: TokenLanguage;              // اللغة
  arabicDerivations?: Derivation[];     // اشتقاقات عربية
  englishDerivations?: EnglishDerivation[]; // اشتقاقات إنجليزية
}

/**
 * معلومات سببية
 * Causal information
 */
export interface CausalInfo {
  isEvent: boolean;                     // هل هو حدث؟
  causes: Map<string, number>;          // ما يسببه (التأثير، القوة)
  prevents: Map<string, number>;        // ما يمنعه
  enhances: Map<string, number>;        // ما يعززه
  requires: string[];                   // ما يتطلبه
  confidence: number;                   // مستوى الثقة
}

/**
 * الرمز الذكي - Intelligent Token
 * Extended token with AI intelligence
 */
export interface IntelligentToken extends Token {
  // Traditional token properties inherited
  // type, value, line, column
  
  // Intelligence properties
  semanticType: SemanticType;           // النوع الدلالي
  language: TokenLanguage;              // اللغة
  letterAnalysis?: LetterAnalysis;      // تحليل الحروف
  rootInfo?: RootInfo;                  // معلومات الجذر
  derivationsInfo?: DerivationsInfo;    // معلومات الاشتقاقات
  causalInfo?: CausalInfo;              // معلومات سببية
  relatedTokens?: string[];             // رموز مرتبطة
  confidence: number;                   // مستوى الثقة الإجمالي
  metadata: Map<string, any>;           // بيانات إضافية
}

/**
 * إعدادات التحليل الذكي
 * Intelligent analysis settings
 */
export interface IntelligentAnalysisSettings {
  enableLetterAnalysis: boolean;        // تفعيل تحليل الحروف
  enableRootAnalysis: boolean;          // تفعيل تحليل الجذور
  enableDerivations: boolean;           // تفعيل الاشتقاقات
  enableCausalAnalysis: boolean;        // تفعيل التحليل السببي
  enableSemanticDetection: boolean;     // تفعيل كشف الدلالات
  minConfidence: number;                // الحد الأدنى للثقة
  maxDerivations: number;               // الحد الأقصى للاشتقاقات
  cacheResults: boolean;                // تخزين النتائج مؤقتاً
  parallelProcessing: boolean;          // معالجة متوازية
}

/**
 * الإعدادات الافتراضية
 * Default settings
 */
export const DEFAULT_INTELLIGENT_SETTINGS: IntelligentAnalysisSettings = {
  enableLetterAnalysis: true,
  enableRootAnalysis: true,
  enableDerivations: true,
  enableCausalAnalysis: true,
  enableSemanticDetection: true,
  minConfidence: 0.5,
  maxDerivations: 10,
  cacheResults: true,
  parallelProcessing: false  // سنفعلها لاحقاً
};

/**
 * نتيجة التحليل الذكي
 * Intelligent analysis result
 */
export interface IntelligentAnalysisResult {
  token: IntelligentToken;
  analysisTime: number;                 // وقت التحليل (ms)
  cacheHit: boolean;                    // هل من الذاكرة المؤقتة؟
  warnings: string[];                   // تحذيرات
  suggestions: string[];                // اقتراحات
}

/**
 * إحصائيات التحليل الذكي
 * Intelligent analysis statistics
 */
export interface IntelligentAnalysisStats {
  totalTokens: number;                  // إجمالي الرموز
  intelligentTokens: number;            // الرموز الذكية
  cacheHits: number;                    // نجاحات الذاكرة المؤقتة
  cacheMisses: number;                  // إخفاقات الذاكرة المؤقتة
  averageAnalysisTime: number;          // متوسط وقت التحليل
  totalAnalysisTime: number;            // إجمالي وقت التحليل
  languageDistribution: {               // توزيع اللغات
    arabic: number;
    english: number;
    mixed: number;
    neutral: number;
  };
  semanticDistribution: Map<SemanticType, number>; // توزيع الأنواع الدلالية
}

/**
 * مساعدات للرموز الذكية
 * Intelligent token helpers
 */
export class IntelligentTokenHelpers {
  /**
   * إنشاء رمز ذكي من رمز تقليدي
   */
  static createIntelligentToken(token: Token): IntelligentToken {
    return {
      ...token,
      semanticType: 'UNKNOWN',
      language: 'neutral',
      confidence: 0.0,
      metadata: new Map()
    };
  }
  
  /**
   * التحقق من أن الرمز ذكي
   */
  static isIntelligent(token: Token | IntelligentToken): token is IntelligentToken {
    return 'semanticType' in token && 'confidence' in token;
  }
  
  /**
   * دمج معلومات ذكية في رمز
   */
  static enrichToken(
    token: Token,
    semanticType: SemanticType,
    language: TokenLanguage,
    confidence: number,
    additionalInfo?: Partial<IntelligentToken>
  ): IntelligentToken {
    return {
      ...token,
      semanticType,
      language,
      confidence,
      metadata: new Map(),
      ...additionalInfo
    };
  }
  
  /**
   * حساب مستوى الثقة الإجمالي
   */
  static calculateOverallConfidence(token: IntelligentToken): number {
    const confidences: number[] = [token.confidence];
    
    if (token.letterAnalysis) {
      confidences.push(token.letterAnalysis.confidence);
    }
    
    if (token.rootInfo) {
      confidences.push(token.rootInfo.confidence);
    }
    
    if (token.causalInfo) {
      confidences.push(token.causalInfo.confidence);
    }
    
    return confidences.reduce((sum, c) => sum + c, 0) / confidences.length;
  }
  
  /**
   * الحصول على ملخص نصي للرمز الذكي
   */
  static getSummary(token: IntelligentToken): string {
    const parts: string[] = [
      `Token: "${token.value}"`,
      `Type: ${token.type}`,
      `Semantic: ${token.semanticType}`,
      `Language: ${token.language}`,
      `Confidence: ${(token.confidence * 100).toFixed(1)}%`
    ];
    
    if (token.letterAnalysis) {
      parts.push(`Letters: [${token.letterAnalysis.letters.join(', ')}]`);
      parts.push(`Meanings: [${token.letterAnalysis.meanings.join(', ')}]`);
    }
    
    if (token.rootInfo) {
      parts.push(`Root: ${token.rootInfo.root}`);
    }
    
    if (token.derivationsInfo && token.derivationsInfo.count > 0) {
      parts.push(`Derivations: ${token.derivationsInfo.count}`);
    }
    
    if (token.causalInfo && token.causalInfo.isEvent) {
      parts.push(`Event: causes ${token.causalInfo.causes.size} effects`);
    }
    
    return parts.join('\n');
  }
}

