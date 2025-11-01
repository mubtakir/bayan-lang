/**
 * حاقن المشغلات اللغوية - Linguistic Operator Injector
 * Injects linguistic operators based on letter meanings and causal relationships
 */

import * as AST from '../ast/index.js';
import { CausalNetwork } from '../parser/intelligentAST.js';
import { IntelligentToken } from '../lexer/intelligentTokens.js';
import { LetterMeaningAnalyzer } from '../letterMeanings/letterMeaningAnalyzer.js';
import {
  LinguisticOperator,
  LinguisticOperatorType,
  LinguisticInjectionResult,
  LinguisticInjectionRule,
  OptimizationContext,
  IntelligentCompilerTypeHelpers
} from './intelligentCompilerTypes.js';

/**
 * حاقن المشغلات اللغوية - Linguistic Operator Injector
 */
export class LinguisticOperatorInjector {
  private operators: LinguisticOperator[] = [];
  private rules: LinguisticInjectionRule[] = [];
  private letterAnalyzer: LetterMeaningAnalyzer;
  
  constructor() {
    this.letterAnalyzer = new LetterMeaningAnalyzer();
    this.initializeRules();
  }
  
  /**
   * حقن المشغلات - Inject Operators
   */
  inject(
    ast: AST.Program,
    causalNetwork?: CausalNetwork,
    tokens?: IntelligentToken[]
  ): LinguisticInjectionResult {
    this.operators = [];
    const warnings: string[] = [];
    
    // Build context
    const context: OptimizationContext = {
      causalNetwork,
      variables: new Map(),
      functions: new Map(),
      currentScope: 'global'
    };
    
    // Collect variables
    this.collectVariables(ast, context);
    
    // Apply injection rules for each variable
    for (const [varName, varCtx] of context.variables) {
      for (const rule of this.rules.sort((a, b) => b.priority - a.priority)) {
        if (rule.condition(context, varName)) {
          const operator = rule.inject(context, varName);
          if (operator) {
            this.operators.push(operator);
          }
        }
      }
    }
    
    // Generate injected code
    const injectedCode = this.generateInjectedCode();
    
    // Calculate confidence
    const confidence = this.operators.length > 0
      ? this.operators.reduce((sum, op) => sum + op.confidence, 0) / this.operators.length
      : 0.5;
    
    if (this.operators.length === 0) {
      warnings.push('لم يتم حقن أي مشغلات لغوية - No linguistic operators injected');
    }
    
    return {
      operators: this.operators,
      injectedCode,
      confidence,
      warnings
    };
  }
  
  /**
   * جمع المتغيرات - Collect Variables
   */
  private collectVariables(ast: AST.ASTNode, context: OptimizationContext): void {
    if (ast instanceof AST.Program) {
      for (const stmt of ast.body) {
        this.collectVariables(stmt, context);
      }
    } else if (ast instanceof AST.VariableDeclaration) {
      for (const declarator of ast.declarations) {
        const varName = declarator.id.name;
        
        // Analyze letter meanings
        const letters = varName.split('');
        const letterMeanings: string[] = [];

        for (const letter of letters) {
          const meanings = this.letterAnalyzer.getMeanings(letter);
          if (meanings.length > 0) {
            letterMeanings.push(meanings[0].meaning);
          }
        }
        
        context.variables.set(varName, {
          name: varName,
          isConstant: ast.kind === 'ثابت',
          usageCount: 0,
          causalEffects: [],
          letterMeanings
        });
      }
    } else if (ast instanceof AST.FunctionDeclaration) {
      for (const stmt of ast.body.body) {
        this.collectVariables(stmt, context);
      }
    }
  }
  
  /**
   * توليد الكود المحقون - Generate Injected Code
   */
  private generateInjectedCode(): string {
    if (this.operators.length === 0) {
      return '';
    }
    
    const lines: string[] = [];
    lines.push('// Linguistic Operators Injected by Baserah AI');
    lines.push('');
    
    for (const op of this.operators) {
      lines.push(`// Operator: ${op.name} (${op.type})`);
      lines.push(`// Target: ${op.targetVariable}`);
      lines.push(`// Letters: ${op.sourceLetters.join(', ')}`);
      lines.push(`// Meanings: ${op.letterMeanings.join(', ')}`);
      lines.push(`// Confidence: ${(op.confidence * 100).toFixed(0)}%`);
      lines.push(op.operation);
      lines.push('');
    }
    
    return lines.join('\n');
  }
  
  /**
   * تهيئة قواعد الحقن - Initialize Injection Rules
   */
  private initializeRules(): void {
    // Rule 1: Letter Meaning Injection
    this.rules.push({
      id: 'letter_meaning_injection',
      name: 'حقن معنى الحرف',
      type: 'letter_meaning_injection',
      condition: (context, varName) => {
        const varCtx = context.variables.get(varName);
        return varCtx !== undefined && 
               varCtx.letterMeanings !== undefined && 
               varCtx.letterMeanings.length > 0;
      },
      inject: (context, varName) => {
        const varCtx = context.variables.get(varName);
        if (!varCtx || !varCtx.letterMeanings) return null;
        
        const op = IntelligentCompilerTypeHelpers.createEmptyLinguisticOperator('letter_meaning_injection');
        op.name = `معنى_${varName}`;
        op.targetVariable = varName;
        op.sourceLetters = varName.split('');
        op.letterMeanings = varCtx.letterMeanings;
        op.operation = `// ${varName} has letter meanings: ${varCtx.letterMeanings.join(', ')}`;
        op.confidence = 0.9;
        
        return op;
      },
      priority: 10,
      confidence: 0.9
    });
    
    // Rule 2: Root-Based Operation
    this.rules.push({
      id: 'root_based_operation',
      name: 'عملية مبنية على الجذر',
      type: 'root_based_operation',
      condition: (context, varName) => {
        // Check if variable name is Arabic and has a root
        return /[\u0600-\u06FF]/.test(varName) && varName.length >= 3;
      },
      inject: (context, varName) => {
        const op = IntelligentCompilerTypeHelpers.createEmptyLinguisticOperator('root_based_operation');
        op.name = `جذر_${varName}`;
        op.targetVariable = varName;
        op.sourceLetters = varName.split('');
        op.operation = `// ${varName} may have root-based operations`;
        op.confidence = 0.75;
        
        return op;
      },
      priority: 15,
      confidence: 0.75
    });
    
    // Rule 3: Causal Trigger
    this.rules.push({
      id: 'causal_trigger',
      name: 'مشغل سببي',
      type: 'causal_trigger',
      condition: (context, varName) => {
        if (!context.causalNetwork) return false;
        
        // Check if variable is part of causal network
        return context.causalNetwork.nodes.some(node => node.name === varName);
      },
      inject: (context, varName) => {
        if (!context.causalNetwork) return null;
        
        const node = context.causalNetwork.nodes.find(n => n.name === varName);
        if (!node) return null;
        
        const op = IntelligentCompilerTypeHelpers.createEmptyLinguisticOperator('causal_trigger');
        op.name = `سبب_${varName}`;
        op.targetVariable = varName;
        op.operation = `// ${varName} is part of causal network (${node.type})`;
        op.confidence = 0.85;
        
        return op;
      },
      priority: 20,
      confidence: 0.85
    });
    
    // Rule 4: Semantic Transformation
    this.rules.push({
      id: 'semantic_transformation',
      name: 'تحويل دلالي',
      type: 'semantic_transformation',
      condition: (context, varName) => {
        const varCtx = context.variables.get(varName);
        return varCtx !== undefined && varCtx.semanticType !== undefined;
      },
      inject: (context, varName) => {
        const varCtx = context.variables.get(varName);
        if (!varCtx || !varCtx.semanticType) return null;
        
        const op = IntelligentCompilerTypeHelpers.createEmptyLinguisticOperator('semantic_transformation');
        op.name = `تحويل_${varName}`;
        op.targetVariable = varName;
        op.operation = `// ${varName} has semantic type: ${varCtx.semanticType}`;
        op.confidence = 0.80;
        
        return op;
      },
      priority: 12,
      confidence: 0.80
    });
    
    // Rule 5: Context Adaptation
    this.rules.push({
      id: 'context_adaptation',
      name: 'تكيف سياقي',
      type: 'context_adaptation',
      condition: (context, varName) => {
        // Always applicable for context-aware adaptation
        return true;
      },
      inject: (context, varName) => {
        const op = IntelligentCompilerTypeHelpers.createEmptyLinguisticOperator('context_adaptation');
        op.name = `تكيف_${varName}`;
        op.targetVariable = varName;
        op.operation = `// ${varName} adapts to context: ${context.currentScope}`;
        op.confidence = 0.70;
        
        return op;
      },
      priority: 5,
      confidence: 0.70
    });
  }
}

