/**
 * بيئة التشغيل الذكية - Intelligent Runtime
 * Intelligent runtime environment with dynamic causal inference and real-time learning
 */

import { CausalNetwork } from '../parser/intelligentAST.js';
import { DynamicCausalInferenceEngine } from './dynamicCausalInference.js';
import { RealTimeLearningSystem } from './realTimeLearning.js';
import {
  ExecutionState,
  CausalEffect,
  IntelligentExecutionResult,
  RuntimeStatistics,
  IntelligentRuntimeSettings,
  DEFAULT_INTELLIGENT_RUNTIME_SETTINGS,
  InferenceContext,
  ExecutionExample,
  IntelligentRuntimeTypeHelpers
} from './intelligentRuntimeTypes.js';

/**
 * بيئة التشغيل الذكية - Intelligent Runtime
 */
export class IntelligentRuntime {
  private settings: IntelligentRuntimeSettings;
  private inferenceEngine: DynamicCausalInferenceEngine;
  private learningSystem: RealTimeLearningSystem;
  private executionState: ExecutionState;
  private causalNetwork: CausalNetwork;
  private stats: RuntimeStatistics;
  private executionTimes: number[] = [];
  private confidences: number[] = [];
  
  constructor(
    causalNetwork: CausalNetwork,
    settings: Partial<IntelligentRuntimeSettings> = {}
  ) {
    this.settings = { ...DEFAULT_INTELLIGENT_RUNTIME_SETTINGS, ...settings };
    this.inferenceEngine = new DynamicCausalInferenceEngine();
    this.learningSystem = new RealTimeLearningSystem(
      this.settings.maxPatternsToStore,
      this.settings.maxBehaviorsToStore
    );
    this.executionState = IntelligentRuntimeTypeHelpers.createEmptyExecutionState();
    this.causalNetwork = causalNetwork;
    this.stats = IntelligentRuntimeTypeHelpers.createEmptyStatistics();
  }
  
  /**
   * تنفيذ ذكي - Execute Intelligently
   * Executes code with full AI intelligence
   */
  executeIntelligent(
    code: Function,
    args: Map<string, any> = new Map()
  ): IntelligentExecutionResult {
    const startTime = performance.now();
    const warnings: string[] = [];
    const suggestions: string[] = [];
    
    // Update execution state
    this.executionState.executionCount++;
    this.executionState.timestamp = Date.now();
    
    // Set arguments as variables
    for (const [key, value] of args) {
      this.executionState.variables.set(key, value);
    }
    
    // Track causal effects during execution
    const causalEffects: CausalEffect[] = [];
    
    // Execute the code
    let output: any;
    try {
      output = code();
    } catch (error) {
      warnings.push(`خطأ في التنفيذ: ${error}`);
      output = null;
    }
    
    const executionTime = performance.now() - startTime;
    this.executionTimes.push(executionTime);
    
    // Create execution example
    const executionExample: ExecutionExample = {
      id: `exec_${Date.now()}`,
      input: new Map(args),
      output,
      executionTime,
      causalEffects,
      timestamp: Date.now()
    };
    
    // 1. Dynamic Causal Inference
    let inferenceResult;
    if (this.settings.enableCausalInference) {
      const inferenceContext: InferenceContext = {
        executionState: this.executionState,
        causalNetwork: this.causalNetwork,
        recentEffects: causalEffects,
        knownPatterns: this.learningSystem.getAllPatterns(),
        activeBehaviors: this.learningSystem.getAllBehaviors()
      };
      
      inferenceResult = this.inferenceEngine.infer(
        inferenceContext,
        this.settings.maxInferencesPerExecution
      );
      
      // Add new edges to causal network
      this.causalNetwork.edges.push(...inferenceResult.newCausalEdges);
      
      this.stats.totalInferences += inferenceResult.inferences.length;
      
      if (inferenceResult.inferences.length > 0) {
        suggestions.push(`تم استنتاج ${inferenceResult.inferences.length} علاقة سببية جديدة`);
      }
    }
    
    // 2. Real-time Learning
    let learningResult;
    if (this.settings.enableRealTimeLearning) {
      learningResult = this.learningSystem.learn(executionExample, causalEffects);
      
      this.stats.totalPatternsLearned += learningResult.patternsLearned.length;
      
      suggestions.push(...learningResult.improvements);
    }
    
    // 3. Adaptive Behavior
    let behaviorsActivated;
    if (this.settings.enableAdaptiveBehavior) {
      behaviorsActivated = this.learningSystem.adaptBehavior(this.executionState);
      
      this.stats.totalBehaviorsActivated += behaviorsActivated.length;
      
      if (behaviorsActivated.length > 0) {
        suggestions.push(`تم تفعيل ${behaviorsActivated.length} سلوك تكيفي`);
      }
    }
    
    // Calculate confidence
    const confidence = this.calculateConfidence(inferenceResult, learningResult);
    this.confidences.push(confidence);
    
    // Update statistics
    this.updateStatistics();
    
    return {
      output,
      executionTime,
      causalEffects,
      inferences: inferenceResult?.inferences || [],
      patternsLearned: learningResult?.patternsLearned || [],
      behaviorsActivated: behaviorsActivated || [],
      causalNetwork: this.causalNetwork,
      confidence,
      statistics: { ...this.stats },
      warnings,
      suggestions
    };
  }
  
  /**
   * حساب الثقة - Calculate Confidence
   */
  private calculateConfidence(inferenceResult: any, learningResult: any): number {
    const confidences: number[] = [];
    
    if (inferenceResult) {
      confidences.push(inferenceResult.confidence);
    }
    
    if (learningResult) {
      confidences.push(learningResult.confidence);
    }
    
    return confidences.length > 0
      ? confidences.reduce((sum, c) => sum + c, 0) / confidences.length
      : 0.5;
  }
  
  /**
   * تحديث الإحصائيات - Update Statistics
   */
  private updateStatistics(): void {
    this.stats.totalExecutions = this.executionState.executionCount;
    
    this.stats.averageExecutionTime = this.executionTimes.length > 0
      ? this.executionTimes.reduce((sum, t) => sum + t, 0) / this.executionTimes.length
      : 0;
    
    this.stats.averageConfidence = this.confidences.length > 0
      ? this.confidences.reduce((sum, c) => sum + c, 0) / this.confidences.length
      : 0;
    
    this.stats.causalNetworkSize = this.causalNetwork.nodes.length + this.causalNetwork.edges.length;
    
    this.stats.learningRate = this.stats.totalExecutions > 0
      ? this.stats.totalPatternsLearned / this.stats.totalExecutions
      : 0;
  }
  
  /**
   * الحصول على الإحصائيات - Get Statistics
   */
  getStats(): RuntimeStatistics {
    return { ...this.stats };
  }
  
  /**
   * إعادة تعيين - Reset
   */
  reset(): void {
    this.executionState = IntelligentRuntimeTypeHelpers.createEmptyExecutionState();
    this.stats = IntelligentRuntimeTypeHelpers.createEmptyStatistics();
    this.executionTimes = [];
    this.confidences = [];
    this.inferenceEngine.clearInferences();
  }
}

/**
 * مساعدات بيئة التشغيل الذكية - Intelligent Runtime Helpers
 */
export class IntelligentRuntimeHelpers {
  /**
   * طباعة ملخص النتيجة - Print Result Summary
   */
  static printSummary(result: IntelligentExecutionResult): string {
    const lines: string[] = [];
    
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('📊 ملخص التنفيذ الذكي - Intelligent Execution Summary');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('');
    
    lines.push(`⏱️  وقت التنفيذ - Execution Time: ${result.executionTime.toFixed(2)} ms`);
    lines.push(`🎯 الثقة - Confidence: ${(result.confidence * 100).toFixed(1)}%`);
    lines.push('');
    
    if (result.inferences.length > 0) {
      lines.push(`🧠 الاستنتاجات - Inferences: ${result.inferences.length}`);
      for (const inf of result.inferences.slice(0, 3)) {
        lines.push(`   - ${inf.conclusion} (ثقة: ${(inf.confidence * 100).toFixed(0)}%)`);
      }
      if (result.inferences.length > 3) {
        lines.push(`   ... و ${result.inferences.length - 3} استنتاج آخر`);
      }
      lines.push('');
    }
    
    if (result.patternsLearned.length > 0) {
      lines.push(`📚 الأنماط المتعلمة - Patterns Learned: ${result.patternsLearned.length}`);
      for (const pattern of result.patternsLearned.slice(0, 3)) {
        lines.push(`   - ${pattern.name} (تكرار: ${pattern.frequency})`);
      }
      if (result.patternsLearned.length > 3) {
        lines.push(`   ... و ${result.patternsLearned.length - 3} نمط آخر`);
      }
      lines.push('');
    }
    
    if (result.behaviorsActivated.length > 0) {
      lines.push(`🎭 السلوكيات المفعلة - Behaviors Activated: ${result.behaviorsActivated.length}`);
      for (const behavior of result.behaviorsActivated) {
        lines.push(`   - ${behavior.name} (أولوية: ${behavior.priority})`);
      }
      lines.push('');
    }
    
    lines.push(`📈 الإحصائيات - Statistics:`);
    lines.push(`   - إجمالي التنفيذات - Total Executions: ${result.statistics.totalExecutions}`);
    lines.push(`   - إجمالي الاستنتاجات - Total Inferences: ${result.statistics.totalInferences}`);
    lines.push(`   - إجمالي الأنماط - Total Patterns: ${result.statistics.totalPatternsLearned}`);
    lines.push(`   - حجم الشبكة السببية - Causal Network Size: ${result.statistics.causalNetworkSize}`);
    lines.push(`   - معدل التعلم - Learning Rate: ${(result.statistics.learningRate * 100).toFixed(1)}%`);
    lines.push('');
    
    if (result.suggestions.length > 0) {
      lines.push(`💡 الاقتراحات - Suggestions:`);
      for (const suggestion of result.suggestions.slice(0, 5)) {
        lines.push(`   - ${suggestion}`);
      }
      if (result.suggestions.length > 5) {
        lines.push(`   ... و ${result.suggestions.length - 5} اقتراح آخر`);
      }
      lines.push('');
    }
    
    lines.push('═══════════════════════════════════════════════════════════════');
    
    return lines.join('\n');
  }
}

