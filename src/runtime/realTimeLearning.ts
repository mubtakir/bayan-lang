/**
 * نظام التعلم الفوري - Real-time Learning System
 * Learns from execution patterns and adapts behavior dynamically
 */

import {
  ExecutionExample,
  LearningPattern,
  LearningPatternType,
  AdaptiveBehavior,
  LearningResult,
  LearningContext,
  LearningRule,
  BehaviorRule,
  ExecutionState,
  CausalEffect
} from './intelligentRuntimeTypes.js';

/**
 * نظام التعلم الفوري - Real-time Learning System
 */
export class RealTimeLearningSystem {
  private patterns: LearningPattern[] = [];
  private behaviors: AdaptiveBehavior[] = [];
  private executionHistory: ExecutionExample[] = [];
  private learningRules: LearningRule[] = [];
  private behaviorRules: BehaviorRule[] = [];
  private maxPatterns: number;
  private maxBehaviors: number;
  
  constructor(maxPatterns: number = 100, maxBehaviors: number = 50) {
    this.maxPatterns = maxPatterns;
    this.maxBehaviors = maxBehaviors;
    this.initializeLearningRules();
    this.initializeBehaviorRules();
  }
  
  /**
   * تعلم - Learn
   * Learns patterns from execution and adapts behaviors
   */
  learn(
    executionExample: ExecutionExample,
    causalEffects: CausalEffect[]
  ): LearningResult {
    // Add to history
    this.executionHistory.push(executionExample);
    
    // Limit history size
    if (this.executionHistory.length > this.maxPatterns * 2) {
      this.executionHistory = this.executionHistory.slice(-this.maxPatterns);
    }
    
    const patternsLearned: LearningPattern[] = [];
    const behaviorsAdapted: AdaptiveBehavior[] = [];
    const improvements: string[] = [];
    
    // Build learning context
    const context: LearningContext = {
      executionHistory: this.executionHistory,
      causalEffects,
      existingPatterns: this.patterns,
      performanceMetrics: new Map([
        ['executionTime', executionExample.executionTime],
        ['causalEffectCount', causalEffects.length]
      ])
    };
    
    // Apply learning rules
    for (const rule of this.learningRules.sort((a, b) => b.priority - a.priority)) {
      if (rule.condition(context)) {
        const pattern = rule.learn(context);
        if (pattern) {
          this.addOrUpdatePattern(pattern);
          patternsLearned.push(pattern);
          improvements.push(`تعلم نمط جديد: ${pattern.name}`);
        }
      }
    }
    
    // Calculate confidence
    const confidence = patternsLearned.length > 0
      ? patternsLearned.reduce((sum, p) => sum + p.confidence, 0) / patternsLearned.length
      : 0.5;
    
    return {
      patternsLearned,
      behaviorsAdapted,
      confidence,
      improvements,
      timestamp: Date.now()
    };
  }
  
  /**
   * تكييف السلوك - Adapt Behavior
   * Adapts behavior based on current execution state
   */
  adaptBehavior(state: ExecutionState): AdaptiveBehavior[] {
    const activatedBehaviors: AdaptiveBehavior[] = [];
    
    for (const rule of this.behaviorRules.sort((a, b) => b.priority - a.priority)) {
      if (rule.condition(state)) {
        const behavior = rule.adapt(state);
        if (behavior) {
          this.addOrUpdateBehavior(behavior);
          activatedBehaviors.push(behavior);
        }
      }
    }
    
    return activatedBehaviors;
  }
  
  /**
   * إضافة أو تحديث نمط - Add or Update Pattern
   */
  private addOrUpdatePattern(pattern: LearningPattern): void {
    const existing = this.patterns.find(p => p.pattern === pattern.pattern);
    
    if (existing) {
      // Update existing pattern
      existing.frequency++;
      existing.lastSeen = Date.now();
      existing.confidence = Math.min(1.0, existing.confidence + 0.05);
      existing.examples.push(...pattern.examples);
      
      // Limit examples
      if (existing.examples.length > 10) {
        existing.examples = existing.examples.slice(-10);
      }
    } else {
      // Add new pattern
      this.patterns.push(pattern);
      
      // Limit patterns
      if (this.patterns.length > this.maxPatterns) {
        // Remove least confident pattern
        this.patterns.sort((a, b) => a.confidence - b.confidence);
        this.patterns.shift();
      }
    }
  }
  
  /**
   * إضافة أو تحديث سلوك - Add or Update Behavior
   */
  private addOrUpdateBehavior(behavior: AdaptiveBehavior): void {
    const existing = this.behaviors.find(b => b.name === behavior.name);
    
    if (existing) {
      // Update existing behavior
      existing.activationCount++;
      existing.lastActivated = Date.now();
      existing.confidence = Math.min(1.0, existing.confidence + 0.03);
    } else {
      // Add new behavior
      this.behaviors.push(behavior);
      
      // Limit behaviors
      if (this.behaviors.length > this.maxBehaviors) {
        // Remove least used behavior
        this.behaviors.sort((a, b) => a.activationCount - b.activationCount);
        this.behaviors.shift();
      }
    }
  }
  
  /**
   * تهيئة قواعد التعلم - Initialize Learning Rules
   */
  private initializeLearningRules(): void {
    // Rule 1: Execution Sequence Pattern
    this.learningRules.push({
      id: 'execution_sequence',
      name: 'نمط تسلسل التنفيذ',
      type: 'execution_sequence',
      condition: (context) => context.executionHistory.length >= 3,
      learn: (context) => {
        // Find repeated sequences
        const sequences = new Map<string, number>();
        
        for (let i = 0; i < context.executionHistory.length - 2; i++) {
          const seq = `${context.executionHistory[i].id}_${context.executionHistory[i+1].id}_${context.executionHistory[i+2].id}`;
          sequences.set(seq, (sequences.get(seq) || 0) + 1);
        }
        
        // Find most frequent sequence
        let maxFreq = 0;
        let maxSeq = '';
        for (const [seq, freq] of sequences) {
          if (freq > maxFreq) {
            maxFreq = freq;
            maxSeq = seq;
          }
        }
        
        if (maxFreq >= 2) {
          return {
            id: `pattern_${Date.now()}`,
            name: 'تسلسل متكرر',
            type: 'execution_sequence',
            pattern: maxSeq,
            frequency: maxFreq,
            lastSeen: Date.now(),
            confidence: Math.min(0.9, maxFreq / context.executionHistory.length),
            examples: context.executionHistory.slice(-3),
            metadata: new Map([['sequence', maxSeq]])
          };
        }
        
        return null;
      },
      priority: 15,
      confidence: 0.8
    });
    
    // Rule 2: Variable Usage Pattern
    this.learningRules.push({
      id: 'variable_usage',
      name: 'نمط استخدام المتغيرات',
      type: 'variable_usage',
      condition: (context) => context.executionHistory.length >= 2,
      learn: (context) => {
        const variableUsage = new Map<string, number>();
        
        for (const example of context.executionHistory) {
          for (const [varName] of example.input) {
            variableUsage.set(varName, (variableUsage.get(varName) || 0) + 1);
          }
        }
        
        // Find most used variable
        let maxUsage = 0;
        let maxVar = '';
        for (const [varName, usage] of variableUsage) {
          if (usage > maxUsage) {
            maxUsage = usage;
            maxVar = varName;
          }
        }
        
        if (maxUsage >= 2) {
          return {
            id: `pattern_${Date.now()}`,
            name: `استخدام ${maxVar}`,
            type: 'variable_usage',
            pattern: maxVar,
            frequency: maxUsage,
            lastSeen: Date.now(),
            confidence: Math.min(0.85, maxUsage / context.executionHistory.length),
            examples: context.executionHistory.filter(e => e.input.has(maxVar)),
            metadata: new Map([['variable', maxVar]])
          };
        }
        
        return null;
      },
      priority: 12,
      confidence: 0.75
    });
    
    // Rule 3: Causal Chain Pattern
    this.learningRules.push({
      id: 'causal_chain',
      name: 'نمط السلسلة السببية',
      type: 'causal_chain',
      condition: (context) => context.causalEffects.length >= 2,
      learn: (context) => {
        // Find causal chains
        const chains: string[] = [];
        
        for (let i = 0; i < context.causalEffects.length - 1; i++) {
          const effect1 = context.causalEffects[i];
          const effect2 = context.causalEffects[i + 1];
          
          if (effect1.effect === effect2.cause) {
            chains.push(`${effect1.cause} -> ${effect1.effect} -> ${effect2.effect}`);
          }
        }
        
        if (chains.length > 0) {
          return {
            id: `pattern_${Date.now()}`,
            name: 'سلسلة سببية',
            type: 'causal_chain',
            pattern: chains[0],
            frequency: 1,
            lastSeen: Date.now(),
            confidence: 0.8,
            examples: context.executionHistory.slice(-1),
            metadata: new Map([['chain', chains[0]]])
          };
        }
        
        return null;
      },
      priority: 18,
      confidence: 0.85
    });
  }
  
  /**
   * تهيئة قواعد السلوك - Initialize Behavior Rules
   */
  private initializeBehaviorRules(): void {
    // Rule 1: Performance Optimization
    this.behaviorRules.push({
      id: 'performance_optimization',
      name: 'تحسين الأداء',
      condition: (state) => state.executionCount > 10,
      adapt: (state) => {
        return {
          id: `behavior_${Date.now()}`,
          name: 'تحسين الأداء',
          condition: 'executionCount > 10',
          action: 'enable caching',
          priority: 20,
          confidence: 0.85,
          activationCount: 1,
          lastActivated: Date.now(),
          impact: {
            performance: 15,
            memory: -5,
            correctness: 0,
            userSatisfaction: 10
          }
        };
      },
      priority: 20,
      confidence: 0.85
    });
  }
  
  /**
   * الحصول على جميع الأنماط - Get All Patterns
   */
  getAllPatterns(): LearningPattern[] {
    return [...this.patterns];
  }
  
  /**
   * الحصول على جميع السلوكيات - Get All Behaviors
   */
  getAllBehaviors(): AdaptiveBehavior[] {
    return [...this.behaviors];
  }
}

