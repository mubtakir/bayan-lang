/**
 * أنواع المترجم الذكي - Intelligent Compiler Types
 * Types for semantic optimization and intelligent compilation
 */

import { CausalNetwork, Event } from '../parser/intelligentAST.js';
import { SemanticType } from '../lexer/intelligentTokens.js';

/**
 * تحسين دلالي - Semantic Optimization
 */
export interface SemanticOptimization {
  id: string;
  type: OptimizationType;
  description: string;
  originalCode: string;
  optimizedCode: string;
  reason: string;
  confidence: number;
  impact: OptimizationImpact;
}

/**
 * نوع التحسين - Optimization Type
 */
export type OptimizationType =
  | 'dead_code_elimination'      // إزالة الكود الميت
  | 'constant_folding'           // طي الثوابت
  | 'causal_optimization'        // تحسين سببي
  | 'event_ordering'             // ترتيب الأحداث
  | 'redundancy_elimination'     // إزالة التكرار
  | 'semantic_inlining'          // دمج دلالي
  | 'linguistic_injection';      // حقن لغوي

/**
 * تأثير التحسين - Optimization Impact
 */
export interface OptimizationImpact {
  performance: number;    // -100 to +100 (negative = slower, positive = faster)
  memory: number;         // -100 to +100 (negative = more memory, positive = less)
  readability: number;    // -100 to +100 (negative = less readable, positive = more)
  correctness: number;    // 0 to 100 (confidence in correctness)
}

/**
 * مشغل لغوي - Linguistic Operator
 */
export interface LinguisticOperator {
  id: string;
  name: string;
  type: LinguisticOperatorType;
  targetVariable: string;
  sourceLetters: string[];
  letterMeanings: string[];
  operation: string;
  confidence: number;
  metadata: Map<string, any>;
}

/**
 * نوع المشغل اللغوي - Linguistic Operator Type
 */
export type LinguisticOperatorType =
  | 'letter_meaning_injection'   // حقن معنى الحرف
  | 'root_based_operation'       // عملية مبنية على الجذر
  | 'causal_trigger'             // مشغل سببي
  | 'semantic_transformation'    // تحويل دلالي
  | 'context_adaptation';        // تكيف سياقي

/**
 * كود بايت ذكي - Intelligent Bytecode
 */
export interface IntelligentBytecode {
  instructions: BytecodeInstruction[];
  causalNetwork?: CausalNetwork;
  events?: Event[];
  optimizations: SemanticOptimization[];
  linguisticOperators: LinguisticOperator[];
  metadata: BytecodeMetadata;
}

/**
 * تعليمة كود بايت - Bytecode Instruction
 */
export interface BytecodeInstruction {
  opcode: string;
  operands: any[];
  semanticType?: SemanticType;
  causalEffect?: CausalEffect;
  line?: number;
  column?: number;
}

/**
 * تأثير سببي - Causal Effect
 */
export interface CausalEffect {
  causes: string[];      // What this instruction causes
  prevents: string[];    // What this instruction prevents
  requires: string[];    // What this instruction requires
  strength: number;      // -100 to +100
}

/**
 * بيانات وصفية لكود البايت - Bytecode Metadata
 */
export interface BytecodeMetadata {
  sourceLanguage: 'bayan';
  targetLanguage: 'javascript' | 'wasm' | 'native';
  optimizationLevel: number;
  intelligenceLevel: number;
  compilationTime: number;
  confidence: number;
}

/**
 * نتيجة التحسين الدلالي - Semantic Optimization Result
 */
export interface SemanticOptimizationResult {
  optimizations: SemanticOptimization[];
  totalImpact: OptimizationImpact;
  warnings: string[];
  suggestions: string[];
}

/**
 * نتيجة حقن المشغلات اللغوية - Linguistic Injection Result
 */
export interface LinguisticInjectionResult {
  operators: LinguisticOperator[];
  injectedCode: string;
  confidence: number;
  warnings: string[];
}

/**
 * إعدادات المترجم الذكي - Intelligent Compiler Settings
 */
export interface IntelligentCompilerSettings {
  enableSemanticOptimization: boolean;
  enableLinguisticInjection: boolean;
  enableCausalOptimization: boolean;
  enableEventOrdering: boolean;
  optimizationLevel: number;        // 0-3 (0=none, 1=basic, 2=aggressive, 3=maximum)
  intelligenceLevel: number;        // 0-3 (0=none, 1=basic, 2=advanced, 3=maximum)
  targetLanguage: 'javascript' | 'wasm' | 'native';
  includeDebugInfo: boolean;
}

/**
 * الإعدادات الافتراضية - Default Settings
 */
export const DEFAULT_INTELLIGENT_COMPILER_SETTINGS: IntelligentCompilerSettings = {
  enableSemanticOptimization: true,
  enableLinguisticInjection: true,
  enableCausalOptimization: true,
  enableEventOrdering: true,
  optimizationLevel: 2,
  intelligenceLevel: 2,
  targetLanguage: 'javascript',
  includeDebugInfo: false
};

/**
 * نتيجة الترجمة الذكية - Intelligent Compilation Result
 */
export interface IntelligentCompilationResult {
  code: string;
  bytecode?: IntelligentBytecode;
  optimizations: SemanticOptimization[];
  linguisticOperators: LinguisticOperator[];
  causalNetwork?: CausalNetwork;
  events?: Event[];
  compilationTime: number;
  warnings: string[];
  suggestions: string[];
  statistics: CompilationStatistics;
}

/**
 * إحصائيات الترجمة - Compilation Statistics
 */
export interface CompilationStatistics {
  originalLines: number;
  compiledLines: number;
  optimizationsApplied: number;
  linguisticOperatorsInjected: number;
  causalNodesOptimized: number;
  eventsReordered: number;
  performanceGain: number;      // Estimated percentage
  memoryReduction: number;      // Estimated percentage
  confidence: number;
}

/**
 * سياق التحسين - Optimization Context
 */
export interface OptimizationContext {
  causalNetwork?: CausalNetwork;
  events?: Event[];
  variables: Map<string, VariableContext>;
  functions: Map<string, FunctionContext>;
  currentScope: string;
}

/**
 * سياق المتغير - Variable Context
 */
export interface VariableContext {
  name: string;
  semanticType?: SemanticType;
  isConstant: boolean;
  usageCount: number;
  causalEffects: CausalEffect[];
  letterMeanings?: string[];
}

/**
 * سياق الدالة - Function Context
 */
export interface FunctionContext {
  name: string;
  semanticType?: SemanticType;
  callCount: number;
  causalEffects: CausalEffect[];
  events: Event[];
  canInline: boolean;
  inlineCost: number;
}

/**
 * قاعدة تحسين - Optimization Rule
 */
export interface OptimizationRule {
  id: string;
  name: string;
  type: OptimizationType;
  condition: (context: OptimizationContext) => boolean;
  apply: (context: OptimizationContext) => SemanticOptimization | null;
  priority: number;
  confidence: number;
}

/**
 * قاعدة حقن لغوي - Linguistic Injection Rule
 */
export interface LinguisticInjectionRule {
  id: string;
  name: string;
  type: LinguisticOperatorType;
  condition: (context: OptimizationContext, variableName: string) => boolean;
  inject: (context: OptimizationContext, variableName: string) => LinguisticOperator | null;
  priority: number;
  confidence: number;
}

/**
 * مساعدات أنواع المترجم الذكي - Intelligent Compiler Type Helpers
 */
export class IntelligentCompilerTypeHelpers {
  /**
   * إنشاء تحسين فارغ
   */
  static createEmptyOptimization(type: OptimizationType): SemanticOptimization {
    return {
      id: `opt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      description: '',
      originalCode: '',
      optimizedCode: '',
      reason: '',
      confidence: 0.5,
      impact: {
        performance: 0,
        memory: 0,
        readability: 0,
        correctness: 100
      }
    };
  }
  
  /**
   * إنشاء مشغل لغوي فارغ
   */
  static createEmptyLinguisticOperator(type: LinguisticOperatorType): LinguisticOperator {
    return {
      id: `ling_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name: '',
      type,
      targetVariable: '',
      sourceLetters: [],
      letterMeanings: [],
      operation: '',
      confidence: 0.5,
      metadata: new Map()
    };
  }
  
  /**
   * دمج تأثيرات التحسين
   */
  static mergeOptimizationImpacts(impacts: OptimizationImpact[]): OptimizationImpact {
    if (impacts.length === 0) {
      return { performance: 0, memory: 0, readability: 0, correctness: 100 };
    }
    
    return {
      performance: impacts.reduce((sum, i) => sum + i.performance, 0) / impacts.length,
      memory: impacts.reduce((sum, i) => sum + i.memory, 0) / impacts.length,
      readability: impacts.reduce((sum, i) => sum + i.readability, 0) / impacts.length,
      correctness: Math.min(...impacts.map(i => i.correctness))
    };
  }
}

