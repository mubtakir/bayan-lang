/**
 * المترجم الذكي - Intelligent Compiler
 * Extends traditional compiler with AI intelligence for semantic compilation
 */

import { Compiler, CompilerOptions } from './compiler.js';
import * as AST from '../ast/index.js';
import { IntelligentProgram, CausalNetwork, Event } from '../parser/intelligentAST.js';
import { IntelligentToken } from '../lexer/intelligentTokens.js';
import { SemanticOptimizer } from './semanticOptimizer.js';
import { LinguisticOperatorInjector } from './linguisticOperatorInjector.js';
import {
  IntelligentCompilerSettings,
  IntelligentCompilationResult,
  CompilationStatistics,
  DEFAULT_INTELLIGENT_COMPILER_SETTINGS
} from './intelligentCompilerTypes.js';

/**
 * المترجم الذكي - Intelligent Compiler
 * Extends Compiler with AI intelligence from Baserah systems
 */
export class IntelligentCompiler extends Compiler {
  private settings: IntelligentCompilerSettings;
  private semanticOptimizer: SemanticOptimizer;
  private linguisticInjector: LinguisticOperatorInjector;
  private stats: CompilationStatistics;
  
  constructor(
    compilerOptions: CompilerOptions = {},
    intelligentSettings: Partial<IntelligentCompilerSettings> = {}
  ) {
    super(compilerOptions);
    this.settings = { ...DEFAULT_INTELLIGENT_COMPILER_SETTINGS, ...intelligentSettings };
    this.semanticOptimizer = new SemanticOptimizer();
    this.linguisticInjector = new LinguisticOperatorInjector();
    this.stats = {
      originalLines: 0,
      compiledLines: 0,
      optimizationsApplied: 0,
      linguisticOperatorsInjected: 0,
      causalNodesOptimized: 0,
      eventsReordered: 0,
      performanceGain: 0,
      memoryReduction: 0,
      confidence: 0
    };
  }
  
  /**
   * ترجمة ذكية - Intelligent Compile
   * Compiles code with full AI intelligence
   */
  compileIntelligent(
    program: IntelligentProgram | AST.Program,
    tokens?: IntelligentToken[]
  ): IntelligentCompilationResult {
    const startTime = performance.now();
    const warnings: string[] = [];
    const suggestions: string[] = [];
    
    // Extract intelligence from program if available
    const causalNetwork = program instanceof IntelligentProgram ? program.causalNetwork : undefined;
    const events = program instanceof IntelligentProgram ? program.events : undefined;
    
    // Count original lines
    this.stats.originalLines = this.countStatements(program);
    
    // 1. Semantic Optimization
    let optimizationResult;
    if (this.settings.enableSemanticOptimization) {
      optimizationResult = this.semanticOptimizer.optimize(
        program,
        causalNetwork,
        events
      );
      
      this.stats.optimizationsApplied = optimizationResult.optimizations.length;
      
      if (causalNetwork) {
        this.stats.causalNodesOptimized = causalNetwork.nodes.length;
      }
      
      if (events) {
        this.stats.eventsReordered = events.length;
      }
      
      warnings.push(...optimizationResult.warnings);
      suggestions.push(...optimizationResult.suggestions);
      
      // Calculate performance gain
      this.stats.performanceGain = optimizationResult.totalImpact.performance;
      this.stats.memoryReduction = optimizationResult.totalImpact.memory;
    }
    
    // 2. Linguistic Operator Injection
    let injectionResult;
    if (this.settings.enableLinguisticInjection) {
      injectionResult = this.linguisticInjector.inject(
        program,
        causalNetwork,
        tokens
      );
      
      this.stats.linguisticOperatorsInjected = injectionResult.operators.length;
      
      warnings.push(...injectionResult.warnings);
      
      if (injectionResult.operators.length > 0) {
        suggestions.push(`تم حقن ${injectionResult.operators.length} مشغل لغوي`);
        suggestions.push(`Injected ${injectionResult.operators.length} linguistic operators`);
      }
    }
    
    // 3. Traditional Compilation
    let compiledCode = super.compile(program);
    
    // 4. Inject linguistic operators into compiled code
    if (injectionResult && injectionResult.injectedCode) {
      compiledCode = this.injectLinguisticCode(compiledCode, injectionResult.injectedCode);
    }
    
    // Count compiled lines
    this.stats.compiledLines = compiledCode.split('\n').length;
    
    // Calculate overall confidence
    const confidences: number[] = [];
    if (optimizationResult) {
      confidences.push(...optimizationResult.optimizations.map(o => o.confidence));
    }
    if (injectionResult) {
      confidences.push(injectionResult.confidence);
    }
    if (program instanceof IntelligentProgram) {
      confidences.push(program.confidence);
    }
    
    this.stats.confidence = confidences.length > 0
      ? confidences.reduce((sum, c) => sum + c, 0) / confidences.length
      : 0.5;
    
    const compilationTime = performance.now() - startTime;
    
    return {
      code: compiledCode,
      optimizations: optimizationResult?.optimizations || [],
      linguisticOperators: injectionResult?.operators || [],
      causalNetwork,
      events,
      compilationTime,
      warnings,
      suggestions,
      statistics: { ...this.stats }
    };
  }
  
  /**
   * حقن الكود اللغوي - Inject Linguistic Code
   */
  private injectLinguisticCode(compiledCode: string, linguisticCode: string): string {
    const lines = compiledCode.split('\n');
    
    // Find the position after imports and before main code
    let insertPosition = 0;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes('import') || lines[i].includes('require') || 
          lines[i].includes('Generated by') || lines[i].trim() === '') {
        insertPosition = i + 1;
      } else {
        break;
      }
    }
    
    // Insert linguistic code
    lines.splice(insertPosition, 0, '', linguisticCode);
    
    return lines.join('\n');
  }
  
  /**
   * عد العبارات - Count Statements
   */
  private countStatements(program: AST.Program): number {
    let count = 0;
    
    const traverse = (node: AST.ASTNode) => {
      count++;
      
      if (node instanceof AST.Program) {
        for (const stmt of node.body) {
          traverse(stmt);
        }
      } else if (node instanceof AST.FunctionDeclaration) {
        for (const stmt of node.body.body) {
          traverse(stmt);
        }
      } else if (node instanceof AST.BlockStatement) {
        for (const stmt of node.body) {
          traverse(stmt);
        }
      }
    };
    
    traverse(program);
    return count;
  }
  
  /**
   * الحصول على الإحصائيات - Get Statistics
   */
  getStats(): CompilationStatistics {
    return { ...this.stats };
  }
  
  /**
   * إعادة تعيين الإحصائيات - Reset Statistics
   */
  resetStats(): void {
    this.stats = {
      originalLines: 0,
      compiledLines: 0,
      optimizationsApplied: 0,
      linguisticOperatorsInjected: 0,
      causalNodesOptimized: 0,
      eventsReordered: 0,
      performanceGain: 0,
      memoryReduction: 0,
      confidence: 0
    };
  }
}

/**
 * مساعدات المترجم الذكي - Intelligent Compiler Helpers
 */
export class IntelligentCompilerHelpers {
  /**
   * طباعة ملخص النتيجة - Print Result Summary
   */
  static printSummary(result: IntelligentCompilationResult): string {
    const lines: string[] = [];
    
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('📊 ملخص الترجمة الذكية - Intelligent Compilation Summary');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('');
    
    lines.push(`⏱️  وقت الترجمة - Compilation Time: ${result.compilationTime.toFixed(2)} ms`);
    lines.push(`🎯 الثقة - Confidence: ${(result.statistics.confidence * 100).toFixed(1)}%`);
    lines.push('');
    
    lines.push(`📝 الأسطر - Lines:`);
    lines.push(`   - الأصلية - Original: ${result.statistics.originalLines}`);
    lines.push(`   - المترجمة - Compiled: ${result.statistics.compiledLines}`);
    lines.push('');
    
    if (result.optimizations.length > 0) {
      lines.push(`🔧 التحسينات - Optimizations: ${result.optimizations.length}`);
      const optTypes = new Map<string, number>();
      for (const opt of result.optimizations) {
        optTypes.set(opt.type, (optTypes.get(opt.type) || 0) + 1);
      }
      for (const [type, count] of optTypes) {
        lines.push(`   - ${type}: ${count}`);
      }
      lines.push('');
    }
    
    if (result.linguisticOperators.length > 0) {
      lines.push(`🔤 المشغلات اللغوية - Linguistic Operators: ${result.linguisticOperators.length}`);
      const opTypes = new Map<string, number>();
      for (const op of result.linguisticOperators) {
        opTypes.set(op.type, (opTypes.get(op.type) || 0) + 1);
      }
      for (const [type, count] of opTypes) {
        lines.push(`   - ${type}: ${count}`);
      }
      lines.push('');
    }
    
    lines.push(`📈 التحسين - Performance:`);
    lines.push(`   - مكسب الأداء - Performance Gain: ${result.statistics.performanceGain.toFixed(1)}%`);
    lines.push(`   - تقليل الذاكرة - Memory Reduction: ${result.statistics.memoryReduction.toFixed(1)}%`);
    lines.push('');
    
    if (result.warnings.length > 0) {
      lines.push(`⚠️  التحذيرات - Warnings:`);
      for (const warning of result.warnings) {
        lines.push(`   - ${warning}`);
      }
      lines.push('');
    }
    
    if (result.suggestions.length > 0) {
      lines.push(`💡 الاقتراحات - Suggestions:`);
      for (const suggestion of result.suggestions) {
        lines.push(`   - ${suggestion}`);
      }
      lines.push('');
    }
    
    lines.push('═══════════════════════════════════════════════════════════════');
    
    return lines.join('\n');
  }
}

