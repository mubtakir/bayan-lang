/**
 * محرك الاستنتاج السببي الديناميكي - Dynamic Causal Inference Engine
 * Performs causal inference during runtime based on execution context
 */

import { CausalNetwork, CausalEdge } from '../parser/intelligentAST.js';
import {
  ExecutionState,
  CausalEffect,
  CausalInference,
  InferenceResult,
  InferenceContext,
  InferenceRule,
  IntelligentRuntimeTypeHelpers
} from './intelligentRuntimeTypes.js';

/**
 * محرك الاستنتاج السببي الديناميكي - Dynamic Causal Inference Engine
 */
export class DynamicCausalInferenceEngine {
  private inferences: CausalInference[] = [];
  private rules: InferenceRule[] = [];
  private inferenceCache: Map<string, CausalInference> = new Map();
  
  constructor() {
    this.initializeRules();
  }
  
  /**
   * استنتاج - Infer
   * Performs causal inference based on current execution context
   */
  infer(context: InferenceContext, maxInferences: number = 10): InferenceResult {
    const newInferences: CausalInference[] = [];
    const newCausalEdges: CausalEdge[] = [];
    const reasoning: string[] = [];
    
    // Apply inference rules
    for (const rule of this.rules.sort((a, b) => b.priority - a.priority)) {
      if (newInferences.length >= maxInferences) break;
      
      if (rule.condition(context)) {
        const inference = rule.infer(context);
        if (inference && inference.confidence >= 0.5) {
          newInferences.push(inference);
          this.inferences.push(inference);
          
          // Create new causal edge from inference
          const edge = this.inferenceToEdge(inference);
          if (edge) {
            newCausalEdges.push(edge);
          }
          
          reasoning.push(`قاعدة ${rule.name}: ${inference.reasoning}`);
        }
      }
    }
    
    // Calculate overall confidence
    const confidence = newInferences.length > 0
      ? newInferences.reduce((sum, inf) => sum + inf.confidence, 0) / newInferences.length
      : 0.5;
    
    return {
      inferences: newInferences,
      newCausalEdges,
      confidence,
      reasoning,
      timestamp: Date.now()
    };
  }
  
  /**
   * تحويل الاستنتاج إلى حافة سببية - Convert Inference to Causal Edge
   */
  private inferenceToEdge(inference: CausalInference): CausalEdge | null {
    if (inference.premise.length === 0) return null;
    
    return {
      id: `edge_from_${inference.id}`,
      from: inference.premise[0],
      to: inference.conclusion,
      type: 'causes',
      strength: inference.confidence,
      confidence: inference.confidence,
      metadata: new Map([
        ['source', 'dynamic_inference'],
        ['reasoning', inference.reasoning]
      ])
    };
  }
  
  /**
   * تهيئة القواعد - Initialize Rules
   */
  private initializeRules(): void {
    // Rule 1: Transitive Causality
    // If A causes B and B causes C, then A causes C
    this.rules.push({
      id: 'transitive_causality',
      name: 'السببية المتعدية',
      condition: (context) => {
        return context.causalNetwork !== undefined && 
               context.causalNetwork.edges.length >= 2;
      },
      infer: (context) => {
        if (!context.causalNetwork) return null;
        
        // Find transitive chains
        for (const edge1 of context.causalNetwork.edges) {
          for (const edge2 of context.causalNetwork.edges) {
            if (edge1.to === edge2.from && edge1.type === 'causes' && edge2.type === 'causes') {
              // Check if direct edge already exists
              const directExists = context.causalNetwork.edges.some(
                e => e.from === edge1.from && e.to === edge2.to
              );
              
              if (!directExists) {
                const confidence = Math.min(edge1.confidence, edge2.confidence) * 0.8;
                
                return IntelligentRuntimeTypeHelpers.createCausalInference(
                  [edge1.from, edge1.to, edge2.to],
                  `${edge1.from} يسبب ${edge2.to}`,
                  confidence,
                  `بما أن ${edge1.from} يسبب ${edge1.to} و ${edge1.to} يسبب ${edge2.to}، إذن ${edge1.from} يسبب ${edge2.to}`,
                  []
                );
              }
            }
          }
        }
        
        return null;
      },
      priority: 20,
      confidence: 0.8
    });
    
    // Rule 2: Frequent Co-occurrence
    // If two effects frequently occur together, infer causal relationship
    this.rules.push({
      id: 'frequent_cooccurrence',
      name: 'التزامن المتكرر',
      condition: (context) => {
        return context.recentEffects.length >= 2;
      },
      infer: (context) => {
        const effectPairs = new Map<string, number>();
        
        // Count co-occurrences
        for (let i = 0; i < context.recentEffects.length - 1; i++) {
          const effect1 = context.recentEffects[i];
          const effect2 = context.recentEffects[i + 1];
          
          const key = `${effect1.cause}_${effect2.effect}`;
          effectPairs.set(key, (effectPairs.get(key) || 0) + 1);
        }
        
        // Find most frequent pair
        let maxCount = 0;
        let maxPair = '';
        for (const [pair, count] of effectPairs) {
          if (count > maxCount) {
            maxCount = count;
            maxPair = pair;
          }
        }
        
        if (maxCount >= 3) {
          const [cause, effect] = maxPair.split('_');
          const confidence = Math.min(0.9, maxCount / context.recentEffects.length);
          
          return IntelligentRuntimeTypeHelpers.createCausalInference(
            [cause],
            effect,
            confidence,
            `لوحظ تزامن ${cause} و ${effect} ${maxCount} مرات`,
            context.recentEffects.filter(e => e.cause === cause || e.effect === effect)
          );
        }
        
        return null;
      },
      priority: 15,
      confidence: 0.75
    });
    
    // Rule 3: Pattern-Based Inference
    // Use learned patterns to infer causal relationships
    this.rules.push({
      id: 'pattern_based_inference',
      name: 'الاستنتاج المبني على الأنماط',
      condition: (context) => {
        return context.knownPatterns.length > 0;
      },
      infer: (context) => {
        // Find patterns that match current execution
        for (const pattern of context.knownPatterns) {
          if (pattern.type === 'causal_chain' && pattern.confidence >= 0.7) {
            // Check if pattern applies to current state
            const variables = Array.from(context.executionState.variables.keys());
            
            if (variables.some(v => pattern.pattern.includes(v))) {
              return IntelligentRuntimeTypeHelpers.createCausalInference(
                [pattern.pattern],
                `نمط ${pattern.name} ينطبق`,
                pattern.confidence,
                `النمط ${pattern.name} لوحظ ${pattern.frequency} مرة بثقة ${(pattern.confidence * 100).toFixed(0)}%`,
                []
              );
            }
          }
        }
        
        return null;
      },
      priority: 18,
      confidence: 0.85
    });
    
    // Rule 4: Temporal Causality
    // If A happens before B consistently, A might cause B
    this.rules.push({
      id: 'temporal_causality',
      name: 'السببية الزمنية',
      condition: (context) => {
        return context.recentEffects.length >= 2;
      },
      infer: (context) => {
        const temporalPairs: Array<{cause: string, effect: string, timeDiff: number}> = [];
        
        // Find temporal sequences
        for (let i = 0; i < context.recentEffects.length - 1; i++) {
          const effect1 = context.recentEffects[i];
          const effect2 = context.recentEffects[i + 1];
          
          const timeDiff = effect2.timestamp - effect1.timestamp;
          
          if (timeDiff > 0 && timeDiff < 1000) { // Within 1 second
            temporalPairs.push({
              cause: effect1.effect,
              effect: effect2.effect,
              timeDiff
            });
          }
        }
        
        if (temporalPairs.length > 0) {
          const pair = temporalPairs[0];
          const confidence = 0.7;
          
          return IntelligentRuntimeTypeHelpers.createCausalInference(
            [pair.cause],
            pair.effect,
            confidence,
            `${pair.cause} يحدث قبل ${pair.effect} بـ ${pair.timeDiff}ms`,
            []
          );
        }
        
        return null;
      },
      priority: 12,
      confidence: 0.7
    });
    
    // Rule 5: Contradiction Detection
    // Detect contradictory causal relationships
    this.rules.push({
      id: 'contradiction_detection',
      name: 'كشف التناقضات',
      condition: (context) => {
        return context.causalNetwork !== undefined && 
               context.causalNetwork.edges.length >= 2;
      },
      infer: (context) => {
        if (!context.causalNetwork) return null;
        
        // Find contradictions (A causes B and A prevents B)
        for (const edge1 of context.causalNetwork.edges) {
          for (const edge2 of context.causalNetwork.edges) {
            if (edge1.from === edge2.from && 
                edge1.to === edge2.to && 
                edge1.type === 'causes' && 
                edge2.type === 'prevents') {
              
              return IntelligentRuntimeTypeHelpers.createCausalInference(
                [edge1.from, edge1.to],
                `تناقض: ${edge1.from} يسبب ويمنع ${edge1.to}`,
                0.9,
                `تم اكتشاف تناقض في الشبكة السببية`,
                []
              );
            }
          }
        }
        
        return null;
      },
      priority: 25,
      confidence: 0.9
    });
  }
  
  /**
   * الحصول على جميع الاستنتاجات - Get All Inferences
   */
  getAllInferences(): CausalInference[] {
    return [...this.inferences];
  }
  
  /**
   * مسح الاستنتاجات - Clear Inferences
   */
  clearInferences(): void {
    this.inferences = [];
    this.inferenceCache.clear();
  }
}

