/**
 * المحلل المعجمي الذكي - Intelligent Lexer
 * Extends traditional lexer with AI intelligence from Baserah systems
 */

import { Lexer } from './lexer.js';
import { Token, TokenType } from './tokens.js';
import {
  IntelligentToken,
  IntelligentAnalysisSettings,
  IntelligentAnalysisResult,
  IntelligentAnalysisStats,
  SemanticType,
  TokenLanguage,
  LetterAnalysis,
  RootInfo,
  DerivationsInfo,
  CausalInfo,
  DEFAULT_INTELLIGENT_SETTINGS,
  IntelligentTokenHelpers
} from './intelligentTokens.js';

// Import Baserah AI systems
import { LetterMeaningsManager } from '../letterMeanings/letterMeaningsManager.js';
import { RootAnalyzer } from '../lexicon/rootAnalyzer.js';
import { DerivationGenerator } from '../lexicon/derivationGenerator.js';
import { EnglishRootAnalyzer } from '../lexicon/englishRootAnalyzer.js';
import { EnglishDerivationGenerator } from '../lexicon/englishDerivationGenerator.js';
import { MultilingualLexiconManager } from '../lexicon/multilingualLexiconManager.js';

/**
 * المحلل المعجمي الذكي
 * Intelligent Lexer - extends traditional lexer with AI
 */
export class IntelligentLexer extends Lexer {
  private settings: IntelligentAnalysisSettings;
  private cache: Map<string, IntelligentToken>;
  private stats: IntelligentAnalysisStats;
  
  // Baserah AI systems
  private letterMeaningsManager: LetterMeaningsManager;
  private arabicRootAnalyzer: RootAnalyzer;
  private arabicDerivationGenerator: DerivationGenerator;
  private englishRootAnalyzer: EnglishRootAnalyzer;
  private englishDerivationGenerator: EnglishDerivationGenerator;
  private lexiconManager: MultilingualLexiconManager;
  
  constructor(source: string, settings?: Partial<IntelligentAnalysisSettings>) {
    super(source);
    
    this.settings = { ...DEFAULT_INTELLIGENT_SETTINGS, ...settings };
    this.cache = new Map();
    
    // Initialize statistics
    this.stats = {
      totalTokens: 0,
      intelligentTokens: 0,
      cacheHits: 0,
      cacheMisses: 0,
      averageAnalysisTime: 0,
      totalAnalysisTime: 0,
      languageDistribution: {
        arabic: 0,
        english: 0,
        mixed: 0,
        neutral: 0
      },
      semanticDistribution: new Map()
    };
    
    // Initialize Baserah AI systems
    this.letterMeaningsManager = new LetterMeaningsManager();
    this.arabicRootAnalyzer = new RootAnalyzer();
    this.arabicDerivationGenerator = new DerivationGenerator();
    this.englishRootAnalyzer = new EnglishRootAnalyzer();
    this.englishDerivationGenerator = new EnglishDerivationGenerator();
    this.lexiconManager = new MultilingualLexiconManager();
  }
  
  /**
   * تحليل ذكي - يرجع رموز ذكية
   * Intelligent tokenization - returns intelligent tokens
   */
  tokenizeIntelligent(): IntelligentToken[] {
    // 1. Traditional tokenization
    const traditionalTokens = super.tokenize();
    
    // 2. Enrich each token with intelligence
    const intelligentTokens: IntelligentToken[] = [];
    
    for (const token of traditionalTokens) {
      const result = this.enrichToken(token);
      intelligentTokens.push(result.token);
      
      // Update statistics
      this.updateStats(result);
    }
    
    return intelligentTokens;
  }
  
  /**
   * إثراء رمز واحد بالذكاء
   * Enrich a single token with intelligence
   */
  private enrichToken(token: Token): IntelligentAnalysisResult {
    const startTime = performance.now();
    const warnings: string[] = [];
    const suggestions: string[] = [];
    
    // Check cache first
    const cacheKey = this.getCacheKey(token);
    if (this.settings.cacheResults && this.cache.has(cacheKey)) {
      const cachedToken = this.cache.get(cacheKey)!;
      const analysisTime = performance.now() - startTime;
      
      return {
        token: cachedToken,
        analysisTime,
        cacheHit: true,
        warnings,
        suggestions
      };
    }
    
    // Create intelligent token
    let intelligentToken = IntelligentTokenHelpers.createIntelligentToken(token);
    
    // Skip intelligence for operators and punctuation
    if (this.shouldSkipIntelligence(token)) {
      intelligentToken.semanticType = this.getBasicSemanticType(token);
      intelligentToken.language = 'neutral';
      intelligentToken.confidence = 1.0;
      
      const analysisTime = performance.now() - startTime;
      return {
        token: intelligentToken,
        analysisTime,
        cacheHit: false,
        warnings,
        suggestions
      };
    }
    
    // Detect language
    const language = this.detectLanguage(token.value.toString());
    intelligentToken.language = language;
    
    // Apply intelligence based on settings
    if (this.settings.enableLetterAnalysis && language !== 'neutral') {
      intelligentToken.letterAnalysis = this.analyzeLetters(token.value.toString(), language);
    }
    
    if (this.settings.enableRootAnalysis && language !== 'neutral') {
      intelligentToken.rootInfo = this.analyzeRoot(token.value.toString(), language);
    }
    
    if (this.settings.enableDerivations && intelligentToken.rootInfo) {
      intelligentToken.derivationsInfo = this.generateDerivations(
        token.value.toString(),
        language,
        intelligentToken.rootInfo
      );
    }
    
    if (this.settings.enableSemanticDetection) {
      intelligentToken.semanticType = this.detectSemanticType(
        token,
        intelligentToken.letterAnalysis,
        intelligentToken.rootInfo
      );
    }
    
    if (this.settings.enableCausalAnalysis && intelligentToken.semanticType === 'EVENT_ACTION') {
      intelligentToken.causalInfo = this.analyzeCausal(
        token.value.toString(),
        intelligentToken.rootInfo
      );
    }
    
    // Calculate overall confidence
    intelligentToken.confidence = IntelligentTokenHelpers.calculateOverallConfidence(intelligentToken);
    
    // Generate suggestions
    if (intelligentToken.confidence < this.settings.minConfidence) {
      warnings.push(`Low confidence (${(intelligentToken.confidence * 100).toFixed(1)}%) for token "${token.value}"`);
    }
    
    if (intelligentToken.derivationsInfo && intelligentToken.derivationsInfo.count > 5) {
      suggestions.push(`Token "${token.value}" has ${intelligentToken.derivationsInfo.count} derivations`);
    }
    
    // Cache the result
    if (this.settings.cacheResults) {
      this.cache.set(cacheKey, intelligentToken);
    }
    
    const analysisTime = performance.now() - startTime;
    
    return {
      token: intelligentToken,
      analysisTime,
      cacheHit: false,
      warnings,
      suggestions
    };
  }
  
  /**
   * تحليل الحروف
   * Analyze letters
   */
  private analyzeLetters(value: string, language: TokenLanguage): LetterAnalysis {
    const letters = value.split('');
    const meanings: string[] = [];
    const profiles = [];
    const letterMeanings = [];
    
    for (const letter of letters) {
      const analysis = this.letterMeaningsManager.analyzeLetter(letter);
      profiles.push(analysis.profile);
      letterMeanings.push(analysis.meanings);
      
      // Collect meanings
      for (const meaning of analysis.meanings) {
        meanings.push(meaning.meaning);
      }
    }
    
    // Combine meanings
    const combinedMeaning = meanings.slice(0, 3).join(', ');
    
    // Calculate confidence
    const confidence = profiles.filter(p => p !== null).length / letters.length;
    
    return {
      letters,
      meanings,
      profiles,
      letterMeanings,
      combinedMeaning,
      confidence
    };
  }
  
  /**
   * تحليل الجذر
   * Analyze root
   */
  private analyzeRoot(value: string, language: TokenLanguage): RootInfo | undefined {
    try {
      if (language === 'arabic') {
        const arabicRoot = this.arabicRootAnalyzer.analyzeRoot(value);
        return {
          root: arabicRoot.root,
          type: arabicRoot.type,
          confidence: arabicRoot.confidence,
          language: 'arabic',
          arabicRoot
        };
      } else if (language === 'english') {
        const englishRoot = this.englishRootAnalyzer.analyzeRoot(value);
        return {
          root: englishRoot.stem,
          type: englishRoot.type,
          confidence: englishRoot.confidence,
          language: 'english',
          englishRoot
        };
      }
    } catch (error) {
      // Root analysis failed, return undefined
      return undefined;
    }
  }
  
  /**
   * توليد الاشتقاقات
   * Generate derivations
   */
  private generateDerivations(
    value: string,
    language: TokenLanguage,
    rootInfo: RootInfo
  ): DerivationsInfo | undefined {
    try {
      if (language === 'arabic' && rootInfo.arabicRoot) {
        const derivations = this.arabicDerivationGenerator.generateAllDerivations(rootInfo.arabicRoot.root);
        return {
          derivations: derivations.map(d => d.word).slice(0, this.settings.maxDerivations),
          count: derivations.length,
          language: 'arabic',
          arabicDerivations: derivations
        };
      } else if (language === 'english' && rootInfo.englishRoot) {
        const derivations = this.englishDerivationGenerator.generateAllDerivations(value);
        return {
          derivations: derivations.map(d => d.word).slice(0, this.settings.maxDerivations),
          count: derivations.length,
          language: 'english',
          englishDerivations: derivations
        };
      }
    } catch (error) {
      return undefined;
    }
  }

  /**
   * كشف النوع الدلالي
   * Detect semantic type
   */
  private detectSemanticType(
    token: Token,
    letterAnalysis?: LetterAnalysis,
    rootInfo?: RootInfo
  ): SemanticType {
    // Keywords and operators
    if (this.isKeyword(token.type)) {
      return 'KEYWORD';
    }

    if (this.isOperator(token.type)) {
      return 'OPERATOR';
    }

    // Literals
    if (token.type === TokenType.NUMBER ||
        token.type === TokenType.STRING ||
        token.type === TokenType.BOOLEAN) {
      return 'LITERAL';
    }

    // Identifiers - use AI to detect
    if (token.type === TokenType.IDENTIFIER) {
      const value = token.value.toString();

      // Check if it's a verb (event/action)
      if (this.isVerb(value, rootInfo)) {
        return 'EVENT_ACTION';
      }

      // Check if it's a name (person)
      if (this.isPersonName(value, letterAnalysis)) {
        return 'PERSON_NAME';
      }

      // Check if it's food
      if (this.isFood(value)) {
        return 'OBJECT_FOOD';
      }

      // Default to thing/object
      return 'OBJECT_THING';
    }

    return 'UNKNOWN';
  }

  /**
   * تحليل سببي
   * Analyze causal relationships
   */
  private analyzeCausal(value: string, rootInfo?: RootInfo): CausalInfo {
    const causalInfo: CausalInfo = {
      isEvent: true,
      causes: new Map(),
      prevents: new Map(),
      enhances: new Map(),
      requires: [],
      confidence: 0.7
    };

    // Known causal patterns for common verbs
    const causalPatterns: Record<string, any> = {
      'يأكل': { causes: { 'جوع': -20, 'طاقة': 15 }, requires: ['طعام'] },
      'eat': { causes: { 'hunger': -20, 'energy': 15 }, requires: ['food'] },
      'يشرب': { causes: { 'عطش': -20, 'ترطيب': 15 }, requires: ['شراب'] },
      'drink': { causes: { 'thirst': -20, 'hydration': 15 }, requires: ['beverage'] },
      'ينام': { causes: { 'تعب': -30, 'طاقة': 20 }, requires: [] },
      'sleep': { causes: { 'tiredness': -30, 'energy': 20 }, requires: [] }
    };

    if (causalPatterns[value]) {
      const pattern = causalPatterns[value];

      if (pattern.causes) {
        for (const [effect, strength] of Object.entries(pattern.causes)) {
          causalInfo.causes.set(effect, strength as number);
        }
      }

      if (pattern.requires) {
        causalInfo.requires = pattern.requires;
      }

      causalInfo.confidence = 0.9;
    }

    return causalInfo;
  }

  /**
   * كشف اللغة
   * Detect language
   */
  private detectLanguage(value: string): TokenLanguage {
    const hasArabic = /[\u0600-\u06FF]/.test(value);
    const hasEnglish = /[a-zA-Z]/.test(value);

    if (hasArabic && hasEnglish) return 'mixed';
    if (hasArabic) return 'arabic';
    if (hasEnglish) return 'english';
    return 'neutral';
  }

  /**
   * هل يجب تخطي الذكاء؟
   * Should skip intelligence?
   */
  private shouldSkipIntelligence(token: Token): boolean {
    // Skip operators, punctuation, etc.
    const skipTypes = [
      TokenType.PLUS, TokenType.MINUS, TokenType.MULTIPLY, TokenType.DIVIDE,
      TokenType.LPAREN, TokenType.RPAREN, TokenType.LBRACE, TokenType.RBRACE,
      TokenType.COMMA, TokenType.DOT, TokenType.SEMICOLON, TokenType.COLON,
      TokenType.EOF, TokenType.NEWLINE
    ];

    return skipTypes.includes(token.type);
  }

  /**
   * الحصول على النوع الدلالي الأساسي
   * Get basic semantic type
   */
  private getBasicSemanticType(token: Token): SemanticType {
    if (this.isOperator(token.type)) return 'OPERATOR';
    if (this.isKeyword(token.type)) return 'KEYWORD';
    if (token.type === TokenType.NUMBER ||
        token.type === TokenType.STRING ||
        token.type === TokenType.BOOLEAN) {
      return 'LITERAL';
    }
    return 'UNKNOWN';
  }

  /**
   * هل هو كلمة مفتاحية؟
   */
  private isKeyword(type: TokenType): boolean {
    const keywords = [
      TokenType.IF, TokenType.ELSE, TokenType.WHILE, TokenType.FOR,
      TokenType.FUNCTION, TokenType.CLASS, TokenType.RETURN,
      TokenType.LET, TokenType.CONST, TokenType.VAR,
      TokenType.FACT, TokenType.RULE, TokenType.QUERY
    ];
    return keywords.includes(type);
  }

  /**
   * هل هو عامل؟
   */
  private isOperator(type: TokenType): boolean {
    const operators = [
      TokenType.PLUS, TokenType.MINUS, TokenType.MULTIPLY, TokenType.DIVIDE,
      TokenType.EQUALS, TokenType.NOT_EQUALS, TokenType.LESS_THAN, TokenType.GREATER_THAN,
      TokenType.AND, TokenType.OR, TokenType.NOT
    ];
    return operators.includes(type);
  }

  /**
   * هل هو فعل؟
   */
  private isVerb(value: string, rootInfo?: RootInfo): boolean {
    // Simple heuristic: starts with ي in Arabic
    if (/^ي/.test(value)) return true;

    // Check root pattern
    if (rootInfo?.arabicRoot?.pattern === 'فعل') return true;

    // English: common verb patterns
    if (/^(eat|drink|sleep|run|walk|talk)/.test(value.toLowerCase())) return true;

    return false;
  }

  /**
   * هل هو اسم شخص؟
   */
  private isPersonName(value: string, letterAnalysis?: LetterAnalysis): boolean {
    // Common Arabic names
    const arabicNames = ['محمد', 'أحمد', 'علي', 'فاطمة', 'عائشة', 'خديجة'];
    if (arabicNames.includes(value)) return true;

    // Common English names
    const englishNames = ['john', 'mary', 'ahmed', 'fatima'];
    if (englishNames.includes(value.toLowerCase())) return true;

    // Check if first letter is uppercase (English convention)
    if (/^[A-Z]/.test(value)) return true;

    return false;
  }

  /**
   * هل هو طعام؟
   */
  private isFood(value: string): boolean {
    const foods = ['تفاحة', 'موز', 'خبز', 'ماء', 'apple', 'banana', 'bread', 'water'];
    return foods.includes(value.toLowerCase());
  }

  /**
   * مفتاح الذاكرة المؤقتة
   */
  private getCacheKey(token: Token): string {
    return `${token.type}:${token.value}`;
  }

  /**
   * تحديث الإحصائيات
   */
  private updateStats(result: IntelligentAnalysisResult): void {
    this.stats.totalTokens++;
    this.stats.intelligentTokens++;
    this.stats.totalAnalysisTime += result.analysisTime;
    this.stats.averageAnalysisTime = this.stats.totalAnalysisTime / this.stats.intelligentTokens;

    if (result.cacheHit) {
      this.stats.cacheHits++;
    } else {
      this.stats.cacheMisses++;
    }

    // Update language distribution
    this.stats.languageDistribution[result.token.language]++;

    // Update semantic distribution
    const count = this.stats.semanticDistribution.get(result.token.semanticType) || 0;
    this.stats.semanticDistribution.set(result.token.semanticType, count + 1);
  }

  /**
   * الحصول على الإحصائيات
   */
  getStats(): IntelligentAnalysisStats {
    return { ...this.stats };
  }

  /**
   * مسح الذاكرة المؤقتة
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * الحصول على حجم الذاكرة المؤقتة
   */
  getCacheSize(): number {
    return this.cache.size;
  }
}

