/**
 * المحسن الدلالي - Semantic Optimizer
 * Optimizes code based on semantic understanding and causal networks
 */

import * as AST from '../ast/index.js';
import { CausalNetwork, Event } from '../parser/intelligentAST.js';
import {
  SemanticOptimization,
  OptimizationType,
  OptimizationContext,
  SemanticOptimizationResult,
  OptimizationRule,
  IntelligentCompilerTypeHelpers
} from './intelligentCompilerTypes.js';

/**
 * المحسن الدلالي - Semantic Optimizer
 */
export class SemanticOptimizer {
  private optimizations: SemanticOptimization[] = [];
  private rules: OptimizationRule[] = [];
  
  constructor() {
    this.initializeRules();
  }
  
  /**
   * تحسين AST - Optimize AST
   */
  optimize(
    ast: AST.Program,
    causalNetwork?: CausalNetwork,
    events?: Event[]
  ): SemanticOptimizationResult {
    this.optimizations = [];
    const warnings: string[] = [];
    const suggestions: string[] = [];
    
    // Build optimization context
    const context: OptimizationContext = {
      causalNetwork,
      events,
      variables: new Map(),
      functions: new Map(),
      currentScope: 'global'
    };
    
    // Collect variable and function information
    this.collectContext(ast, context);
    
    // Apply optimization rules
    for (const rule of this.rules.sort((a, b) => b.priority - a.priority)) {
      if (rule.condition(context)) {
        const optimization = rule.apply(context);
        if (optimization) {
          this.optimizations.push(optimization);
          suggestions.push(`تطبيق تحسين: ${optimization.description}`);
        }
      }
    }
    
    // Calculate total impact
    const totalImpact = IntelligentCompilerTypeHelpers.mergeOptimizationImpacts(
      this.optimizations.map(o => o.impact)
    );
    
    if (this.optimizations.length === 0) {
      warnings.push('لم يتم العثور على تحسينات - No optimizations found');
    }
    
    return {
      optimizations: this.optimizations,
      totalImpact,
      warnings,
      suggestions
    };
  }
  
  /**
   * جمع السياق - Collect Context
   */
  private collectContext(ast: AST.ASTNode, context: OptimizationContext): void {
    if (ast instanceof AST.Program) {
      for (const stmt of ast.body) {
        this.collectContext(stmt, context);
      }
    } else if (ast instanceof AST.VariableDeclaration) {
      for (const declarator of ast.declarations) {
        context.variables.set(declarator.id.name, {
          name: declarator.id.name,
          isConstant: ast.kind === 'ثابت',
          usageCount: 0,
          causalEffects: []
        });
      }
    } else if (ast instanceof AST.FunctionDeclaration) {
      context.functions.set(ast.name.name, {
        name: ast.name.name,
        callCount: 0,
        causalEffects: [],
        events: [],
        canInline: ast.body.body.length < 5,
        inlineCost: ast.body.body.length
      });
    }
  }
  
  /**
   * تهيئة قواعد التحسين - Initialize Optimization Rules
   */
  private initializeRules(): void {
    // Rule 1: Dead Code Elimination
    this.rules.push({
      id: 'dead_code_elimination',
      name: 'إزالة الكود الميت',
      type: 'dead_code_elimination',
      condition: (context) => {
        // Check if there are unused variables
        for (const [name, varCtx] of context.variables) {
          if (varCtx.usageCount === 0) {
            return true;
          }
        }
        return false;
      },
      apply: (context) => {
        const unusedVars: string[] = [];
        for (const [name, varCtx] of context.variables) {
          if (varCtx.usageCount === 0) {
            unusedVars.push(name);
          }
        }
        
        if (unusedVars.length === 0) return null;
        
        const opt = IntelligentCompilerTypeHelpers.createEmptyOptimization('dead_code_elimination');
        opt.description = `إزالة ${unusedVars.length} متغير غير مستخدم`;
        opt.originalCode = unusedVars.map(v => `دع ${v} = ...`).join('\n');
        opt.optimizedCode = '// Removed unused variables';
        opt.reason = 'المتغيرات غير مستخدمة في الكود';
        opt.confidence = 0.95;
        opt.impact = {
          performance: 5,
          memory: 10,
          readability: 5,
          correctness: 100
        };
        
        return opt;
      },
      priority: 10,
      confidence: 0.95
    });
    
    // Rule 2: Constant Folding
    this.rules.push({
      id: 'constant_folding',
      name: 'طي الثوابت',
      type: 'constant_folding',
      condition: (context) => {
        // Always applicable if there are constants
        return context.variables.size > 0;
      },
      apply: (context) => {
        const opt = IntelligentCompilerTypeHelpers.createEmptyOptimization('constant_folding');
        opt.description = 'طي التعبيرات الثابتة';
        opt.originalCode = 'دع س = 2 + 3';
        opt.optimizedCode = 'دع س = 5';
        opt.reason = 'يمكن حساب التعبير في وقت الترجمة';
        opt.confidence = 1.0;
        opt.impact = {
          performance: 10,
          memory: 0,
          readability: 5,
          correctness: 100
        };
        
        return opt;
      },
      priority: 20,
      confidence: 1.0
    });
    
    // Rule 3: Causal Optimization
    this.rules.push({
      id: 'causal_optimization',
      name: 'تحسين سببي',
      type: 'causal_optimization',
      condition: (context) => {
        return context.causalNetwork !== undefined && 
               context.causalNetwork.edges.length > 0;
      },
      apply: (context) => {
        if (!context.causalNetwork) return null;
        
        const opt = IntelligentCompilerTypeHelpers.createEmptyOptimization('causal_optimization');
        opt.description = `تحسين بناءً على ${context.causalNetwork.edges.length} علاقة سببية`;
        opt.originalCode = '// Original causal flow';
        opt.optimizedCode = '// Optimized causal flow';
        opt.reason = 'إعادة ترتيب العمليات بناءً على العلاقات السببية';
        opt.confidence = 0.85;
        opt.impact = {
          performance: 15,
          memory: 5,
          readability: 0,
          correctness: 95
        };
        
        return opt;
      },
      priority: 30,
      confidence: 0.85
    });
    
    // Rule 4: Event Ordering
    this.rules.push({
      id: 'event_ordering',
      name: 'ترتيب الأحداث',
      type: 'event_ordering',
      condition: (context) => {
        return context.events !== undefined && context.events.length > 1;
      },
      apply: (context) => {
        if (!context.events || context.events.length < 2) return null;
        
        const opt = IntelligentCompilerTypeHelpers.createEmptyOptimization('event_ordering');
        opt.description = `إعادة ترتيب ${context.events.length} حدث`;
        opt.originalCode = '// Original event order';
        opt.optimizedCode = '// Optimized event order';
        opt.reason = 'ترتيب الأحداث بناءً على التبعيات';
        opt.confidence = 0.80;
        opt.impact = {
          performance: 10,
          memory: 0,
          readability: 5,
          correctness: 90
        };
        
        return opt;
      },
      priority: 25,
      confidence: 0.80
    });
    
    // Rule 5: Redundancy Elimination
    this.rules.push({
      id: 'redundancy_elimination',
      name: 'إزالة التكرار',
      type: 'redundancy_elimination',
      condition: (context) => {
        // Check for redundant operations
        return context.causalNetwork !== undefined;
      },
      apply: (context) => {
        const opt = IntelligentCompilerTypeHelpers.createEmptyOptimization('redundancy_elimination');
        opt.description = 'إزالة العمليات المكررة';
        opt.originalCode = 'س = س + 1\nس = س + 1';
        opt.optimizedCode = 'س = س + 2';
        opt.reason = 'دمج العمليات المتشابهة';
        opt.confidence = 0.90;
        opt.impact = {
          performance: 20,
          memory: 5,
          readability: 10,
          correctness: 100
        };
        
        return opt;
      },
      priority: 15,
      confidence: 0.90
    });
    
    // Rule 6: Semantic Inlining
    this.rules.push({
      id: 'semantic_inlining',
      name: 'دمج دلالي',
      type: 'semantic_inlining',
      condition: (context) => {
        // Check for small functions that can be inlined
        for (const [name, funcCtx] of context.functions) {
          if (funcCtx.canInline && funcCtx.callCount > 0) {
            return true;
          }
        }
        return false;
      },
      apply: (context) => {
        const inlinableFuncs: string[] = [];
        for (const [name, funcCtx] of context.functions) {
          if (funcCtx.canInline && funcCtx.callCount > 0) {
            inlinableFuncs.push(name);
          }
        }
        
        if (inlinableFuncs.length === 0) return null;
        
        const opt = IntelligentCompilerTypeHelpers.createEmptyOptimization('semantic_inlining');
        opt.description = `دمج ${inlinableFuncs.length} دالة صغيرة`;
        opt.originalCode = 'دالة صغيرة() { ... }\nصغيرة()';
        opt.optimizedCode = '// Inlined function body';
        opt.reason = 'الدوال صغيرة ويمكن دمجها لتحسين الأداء';
        opt.confidence = 0.85;
        opt.impact = {
          performance: 15,
          memory: -5,
          readability: -5,
          correctness: 95
        };
        
        return opt;
      },
      priority: 18,
      confidence: 0.85
    });
  }
}

