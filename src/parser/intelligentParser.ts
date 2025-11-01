/**
 * المحلل النحوي الذكي - Intelligent Parser
 * Extends traditional parser with AI intelligence
 */

import { Parser } from './parser.js';
import { IntelligentToken } from '../lexer/intelligentTokens.js';
import { Token } from '../lexer/tokens.js';
import * as AST from '../ast/index.js';
import {
  IntelligentProgram,
  IntelligentASTNode,
  CausalNetwork,
  Event,
  Relationship,
  Context,
  Scope,
  createEmptyCausalNetwork
} from './intelligentAST.js';
import { CausalNetworkBuilder } from './causalNetworkBuilder.js';
import { EventDetector } from './eventDetector.js';

/**
 * إعدادات التحليل الذكي - Intelligent Parsing Settings
 */
export interface IntelligentParsingSettings {
  enableCausalNetworks: boolean;
  enableEventDetection: boolean;
  enableRelationshipMapping: boolean;
  enableContextAnalysis: boolean;
  cacheResults: boolean;
}

/**
 * الإعدادات الافتراضية - Default Settings
 */
export const DEFAULT_INTELLIGENT_PARSING_SETTINGS: IntelligentParsingSettings = {
  enableCausalNetworks: true,
  enableEventDetection: true,
  enableRelationshipMapping: true,
  enableContextAnalysis: true,
  cacheResults: true
};

/**
 * نتيجة التحليل الذكي - Intelligent Parsing Result
 */
export interface IntelligentParsingResult {
  ast: IntelligentProgram;
  causalNetwork?: CausalNetwork;
  events?: Event[];
  relationships?: Relationship[];
  context?: Context;
  parsingTime: number;
  warnings: string[];
  suggestions: string[];
}

/**
 * إحصائيات التحليل الذكي - Intelligent Parsing Statistics
 */
export interface IntelligentParsingStats {
  totalNodes: number;
  causalNodes: number;
  causalEdges: number;
  eventsDetected: number;
  relationshipsFound: number;
  averageConfidence: number;
  parsingTime: number;
}

/**
 * المحلل النحوي الذكي - Intelligent Parser
 * Extends Parser with AI intelligence from Baserah systems
 */
export class IntelligentParser extends Parser {
  private settings: IntelligentParsingSettings;
  private causalNetworkBuilder: CausalNetworkBuilder;
  private eventDetector: EventDetector;
  private stats: IntelligentParsingStats;
  
  constructor(
    tokens: Token[] | IntelligentToken[],
    settings: Partial<IntelligentParsingSettings> = {}
  ) {
    super(tokens);
    this.settings = { ...DEFAULT_INTELLIGENT_PARSING_SETTINGS, ...settings };
    this.causalNetworkBuilder = new CausalNetworkBuilder();
    this.eventDetector = new EventDetector();
    this.stats = {
      totalNodes: 0,
      causalNodes: 0,
      causalEdges: 0,
      eventsDetected: 0,
      relationshipsFound: 0,
      averageConfidence: 0,
      parsingTime: 0
    };
  }
  
  /**
   * تحليل ذكي - Intelligent Parse
   * Parses code with full AI intelligence
   */
  parseIntelligent(): IntelligentParsingResult {
    const startTime = performance.now();
    const warnings: string[] = [];
    const suggestions: string[] = [];
    
    // 1. Traditional parsing
    const traditionalAST = super.parse();
    
    // 2. Convert to intelligent AST
    let intelligentAST = new IntelligentProgram(traditionalAST.body);
    
    // 3. Build causal network
    let causalNetwork: CausalNetwork | undefined;
    if (this.settings.enableCausalNetworks) {
      causalNetwork = this.causalNetworkBuilder.buildFromAST(traditionalAST);
      intelligentAST.causalNetwork = causalNetwork;
      
      this.stats.causalNodes = causalNetwork.nodes.length;
      this.stats.causalEdges = causalNetwork.edges.length;
      
      if (causalNetwork.nodes.length === 0) {
        warnings.push('لم يتم اكتشاف أي عقد سببية - No causal nodes detected');
      }
    }
    
    // 4. Detect events
    let events: Event[] | undefined;
    if (this.settings.enableEventDetection) {
      events = this.eventDetector.detectEvents(traditionalAST);
      intelligentAST.events = events;
      
      this.stats.eventsDetected = events.length;
      
      if (events.length === 0) {
        warnings.push('لم يتم اكتشاف أي أحداث - No events detected');
      } else {
        suggestions.push(`تم اكتشاف ${events.length} حدث - Detected ${events.length} events`);
      }
    }
    
    // 5. Map relationships
    let relationships: Relationship[] | undefined;
    if (this.settings.enableRelationshipMapping) {
      relationships = this.mapRelationships(traditionalAST);
      intelligentAST.relationships = relationships;
      
      this.stats.relationshipsFound = relationships.length;
      
      if (relationships.length > 0) {
        suggestions.push(`تم اكتشاف ${relationships.length} علاقة - Found ${relationships.length} relationships`);
      }
    }
    
    // 6. Analyze context
    let context: Context | undefined;
    if (this.settings.enableContextAnalysis) {
      context = this.analyzeContext(traditionalAST);
      intelligentAST.context = context;
      
      const varCount = context.variables.size;
      const funcCount = context.functions.size;
      const classCount = context.classes.size;
      
      suggestions.push(`السياق: ${varCount} متغير، ${funcCount} دالة، ${classCount} صنف`);
      suggestions.push(`Context: ${varCount} variables, ${funcCount} functions, ${classCount} classes`);
    }
    
    // 7. Calculate overall confidence
    const confidences: number[] = [];
    if (causalNetwork) confidences.push(causalNetwork.confidence);
    if (events) confidences.push(...events.map(e => e.confidence));
    if (relationships) confidences.push(...relationships.map(r => r.confidence));
    if (context) confidences.push(context.confidence);
    
    intelligentAST.confidence = confidences.length > 0
      ? confidences.reduce((sum, c) => sum + c, 0) / confidences.length
      : 0.5;
    
    this.stats.averageConfidence = intelligentAST.confidence;
    
    // 8. Count total nodes
    this.stats.totalNodes = this.countNodes(traditionalAST);
    
    const parsingTime = performance.now() - startTime;
    this.stats.parsingTime = parsingTime;
    
    return {
      ast: intelligentAST,
      causalNetwork,
      events,
      relationships,
      context,
      parsingTime,
      warnings,
      suggestions
    };
  }
  
  /**
   * خريطة العلاقات - Map Relationships
   * Maps relationships between AST nodes
   */
  private mapRelationships(ast: AST.ASTNode): Relationship[] {
    const relationships: Relationship[] = [];
    let relationshipIdCounter = 0;
    
    // Helper to generate relationship ID
    const generateId = () => `rel_${relationshipIdCounter++}`;
    
    // Traverse AST and find relationships
    const traverse = (node: AST.ASTNode, parentId?: string) => {
      if (node instanceof AST.FunctionDeclaration) {
        const funcId = node.name.name;
        
        // Find function calls in body
        const findCalls = (n: AST.ASTNode) => {
          if (n instanceof AST.CallExpression) {
            const calleeName = this.extractIdentifierName(n.callee);
            if (calleeName) {
              relationships.push({
                id: generateId(),
                type: 'calls',
                source: funcId,
                target: calleeName,
                confidence: 0.9
              });
            }
          }
          
          // Recursively search
          if (n instanceof AST.BlockStatement) {
            for (const stmt of n.body) {
              findCalls(stmt);
            }
          }
        };
        
        findCalls(node.body);
      } else if (node instanceof AST.ClassDeclaration) {
        const classId = node.name.name;
        
        // Inheritance relationship
        if (node.superClass) {
          relationships.push({
            id: generateId(),
            type: 'inherits_from',
            source: classId,
            target: node.superClass.name,
            confidence: 1.0
          });
        }
        
        // Interface implementation
        for (const iface of node.interfaces) {
          relationships.push({
            id: generateId(),
            type: 'implements',
            source: classId,
            target: iface.name,
            confidence: 1.0
          });
        }
      }
      
      // Traverse children
      if (node instanceof AST.Program) {
        for (const stmt of node.body) {
          traverse(stmt);
        }
      }
    };
    
    traverse(ast);
    return relationships;
  }
  
  /**
   * تحليل السياق - Analyze Context
   * Analyzes the context of the code
   */
  private analyzeContext(ast: AST.ASTNode): Context {
    const context: Context = {
      scope: { type: 'global', depth: 0 },
      variables: new Map(),
      functions: new Map(),
      classes: new Map(),
      imports: new Map(),
      confidence: 0.8
    };
    
    // Traverse AST and collect context information
    const traverse = (node: AST.ASTNode) => {
      if (node instanceof AST.VariableDeclaration) {
        for (const declarator of node.declarations) {
          context.variables.set(declarator.id.name, {
            name: declarator.id.name,
            mutable: node.kind !== 'ثابت',
            usages: 0,
            confidence: 0.9
          });
        }
      } else if (node instanceof AST.FunctionDeclaration) {
        context.functions.set(node.name.name, {
          name: node.name.name,
          parameters: node.parameters.map(p => p.name.name),
          isAsync: node.isAsync,
          isGenerator: node.isGenerator,
          calls: [],
          calledBy: [],
          confidence: 0.9
        });
      } else if (node instanceof AST.ClassDeclaration) {
        context.classes.set(node.name.name, {
          name: node.name.name,
          superClass: node.superClass?.name,
          interfaces: node.interfaces.map(i => i.name),
          methods: [],
          properties: [],
          confidence: 0.9
        });
      }
      
      // Traverse children
      if (node instanceof AST.Program) {
        for (const stmt of node.body) {
          traverse(stmt);
        }
      } else if (node instanceof AST.FunctionDeclaration) {
        for (const stmt of node.body.body) {
          traverse(stmt);
        }
      }
    };
    
    traverse(ast);
    return context;
  }
  
  /**
   * عد العقد - Count Nodes
   * Counts total nodes in AST
   */
  private countNodes(ast: AST.ASTNode): number {
    let count = 1;

    const traverse = (node: AST.ASTNode) => {
      if (node instanceof AST.Program) {
        for (const stmt of node.body) {
          count++;
          traverse(stmt);
        }
      } else if (node instanceof AST.FunctionDeclaration) {
        for (const stmt of node.body.body) {
          count++;
          traverse(stmt);
        }
      } else if (node instanceof AST.BlockStatement) {
        for (const stmt of node.body) {
          count++;
          traverse(stmt);
        }
      }
    };

    traverse(ast);
    return count;
  }

  /**
   * استخراج اسم المعرف - Extract Identifier Name
   */
  private extractIdentifierName(expr: AST.Expression): string | null {
    if (expr instanceof AST.Identifier) {
      return expr.name;
    } else if (expr instanceof AST.MemberExpression) {
      const objectName = this.extractIdentifierName(expr.object);
      const propertyName = expr.property instanceof AST.Identifier
        ? expr.property.name
        : null;
      return objectName && propertyName ? `${objectName}.${propertyName}` : null;
    }
    return null;
  }

  /**
   * الحصول على الإحصائيات - Get Statistics
   */
  getStats(): IntelligentParsingStats {
    return { ...this.stats };
  }

  /**
   * إعادة تعيين الإحصائيات - Reset Statistics
   */
  resetStats(): void {
    this.stats = {
      totalNodes: 0,
      causalNodes: 0,
      causalEdges: 0,
      eventsDetected: 0,
      relationshipsFound: 0,
      averageConfidence: 0,
      parsingTime: 0
    };
  }
}

/**
 * مساعدات المحلل الذكي - Intelligent Parser Helpers
 */
export class IntelligentParserHelpers {
  /**
   * تحويل AST تقليدي إلى ذكي
   * Convert traditional AST to intelligent
   */
  static convertToIntelligent(ast: AST.Program): IntelligentProgram {
    return new IntelligentProgram(ast.body);
  }

  /**
   * دمج نتائج التحليل
   * Merge parsing results
   */
  static mergeResults(
    results: IntelligentParsingResult[]
  ): IntelligentParsingResult {
    if (results.length === 0) {
      throw new Error('No results to merge');
    }

    if (results.length === 1) {
      return results[0];
    }

    // Merge ASTs
    const mergedBody = results.flatMap(r => r.ast.body);
    const mergedAST = new IntelligentProgram(mergedBody);

    // Merge causal networks
    const causalNetworks = results
      .map(r => r.causalNetwork)
      .filter((n): n is CausalNetwork => n !== undefined);

    if (causalNetworks.length > 0) {
      mergedAST.causalNetwork = {
        nodes: causalNetworks.flatMap(n => n.nodes),
        edges: causalNetworks.flatMap(n => n.edges),
        confidence: causalNetworks.reduce((sum, n) => sum + n.confidence, 0) / causalNetworks.length
      };
    }

    // Merge events
    const events = results
      .map(r => r.events)
      .filter((e): e is Event[] => e !== undefined)
      .flat();

    if (events.length > 0) {
      mergedAST.events = events;
    }

    // Merge relationships
    const relationships = results
      .map(r => r.relationships)
      .filter((r): r is Relationship[] => r !== undefined)
      .flat();

    if (relationships.length > 0) {
      mergedAST.relationships = relationships;
    }

    // Calculate total parsing time
    const totalParsingTime = results.reduce((sum, r) => sum + r.parsingTime, 0);

    // Merge warnings and suggestions
    const warnings = results.flatMap(r => r.warnings);
    const suggestions = results.flatMap(r => r.suggestions);

    return {
      ast: mergedAST,
      causalNetwork: mergedAST.causalNetwork,
      events: mergedAST.events,
      relationships: mergedAST.relationships,
      context: results[0].context, // Use first context
      parsingTime: totalParsingTime,
      warnings,
      suggestions
    };
  }

  /**
   * طباعة ملخص النتيجة
   * Print result summary
   */
  static printSummary(result: IntelligentParsingResult): string {
    const lines: string[] = [];

    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('📊 ملخص التحليل الذكي - Intelligent Parsing Summary');
    lines.push('═══════════════════════════════════════════════════════════════');
    lines.push('');

    lines.push(`⏱️  وقت التحليل - Parsing Time: ${result.parsingTime.toFixed(2)} ms`);
    lines.push(`🎯 الثقة - Confidence: ${(result.ast.confidence * 100).toFixed(1)}%`);
    lines.push('');

    if (result.causalNetwork) {
      lines.push(`🔗 الشبكة السببية - Causal Network:`);
      lines.push(`   - العقد - Nodes: ${result.causalNetwork.nodes.length}`);
      lines.push(`   - الحواف - Edges: ${result.causalNetwork.edges.length}`);
      lines.push(`   - الثقة - Confidence: ${(result.causalNetwork.confidence * 100).toFixed(1)}%`);
      lines.push('');
    }

    if (result.events) {
      lines.push(`🎬 الأحداث - Events: ${result.events.length}`);
      if (result.events.length > 0) {
        const eventTypes = new Map<string, number>();
        for (const event of result.events) {
          eventTypes.set(event.type, (eventTypes.get(event.type) || 0) + 1);
        }
        for (const [type, count] of eventTypes) {
          lines.push(`   - ${type}: ${count}`);
        }
      }
      lines.push('');
    }

    if (result.relationships) {
      lines.push(`🔀 العلاقات - Relationships: ${result.relationships.length}`);
      if (result.relationships.length > 0) {
        const relTypes = new Map<string, number>();
        for (const rel of result.relationships) {
          relTypes.set(rel.type, (relTypes.get(rel.type) || 0) + 1);
        }
        for (const [type, count] of relTypes) {
          lines.push(`   - ${type}: ${count}`);
        }
      }
      lines.push('');
    }

    if (result.context) {
      lines.push(`📚 السياق - Context:`);
      lines.push(`   - المتغيرات - Variables: ${result.context.variables.size}`);
      lines.push(`   - الدوال - Functions: ${result.context.functions.size}`);
      lines.push(`   - الأصناف - Classes: ${result.context.classes.size}`);
      lines.push('');
    }

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

