/**
 * نقطة الدخول لمكونات بيئة التشغيل الذكية
 * Entry point for intelligent runtime components
 */

// Intelligent Runtime exports
export { IntelligentRuntime, IntelligentRuntimeHelpers } from './intelligentRuntime.js';
export { DynamicCausalInferenceEngine } from './dynamicCausalInference.js';
export { RealTimeLearningSystem } from './realTimeLearning.js';

// Intelligent Runtime Types
export type {
  ExecutionState,
  CallFrame,
  CausalEffect,
  CausalEffectType,
  CausalInference,
  LearningPattern,
  LearningPatternType,
  ExecutionExample,
  AdaptiveBehavior,
  BehaviorImpact,
  InferenceResult,
  LearningResult,
  IntelligentExecutionResult,
  RuntimeStatistics,
  IntelligentRuntimeSettings,
  InferenceContext,
  LearningContext,
  InferenceRule,
  LearningRule,
  BehaviorRule
} from './intelligentRuntimeTypes.js';

export {
  DEFAULT_INTELLIGENT_RUNTIME_SETTINGS,
  IntelligentRuntimeTypeHelpers
} from './intelligentRuntimeTypes.js';

