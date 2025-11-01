/**
 * بناء الشبكات السببية - Causal Network Builder
 * Builds causal networks from AST automatically
 */

import * as AST from '../ast/index.js';
import {
  CausalNetwork,
  CausalNode,
  CausalEdge,
  CausalEdgeType,
  createEmptyCausalNetwork,
  addCausalNode,
  addCausalEdge
} from './intelligentAST.js';

/**
 * بناء الشبكة السببية - Causal Network Builder
 */
export class CausalNetworkBuilder {
  private nodeIdCounter = 0;
  private edgeIdCounter = 0;
  
  /**
   * بناء شبكة سببية من AST
   * Build causal network from AST
   */
  buildFromAST(ast: AST.ASTNode): CausalNetwork {
    let network = createEmptyCausalNetwork();
    
    // Build network based on AST node type
    if (ast instanceof AST.Program) {
      network = this.buildFromProgram(ast);
    } else if (ast instanceof AST.FunctionDeclaration) {
      network = this.buildFromFunction(ast);
    } else if (ast instanceof AST.VariableDeclaration) {
      network = this.buildFromVariableDeclaration(ast);
    } else if (ast instanceof AST.AssignmentExpression) {
      network = this.buildFromAssignment(ast);
    } else if (ast instanceof AST.CallExpression) {
      network = this.buildFromFunctionCall(ast);
    } else if (ast instanceof AST.IfStatement) {
      network = this.buildFromIfStatement(ast);
    } else if (ast instanceof AST.WhileStatement) {
      network = this.buildFromWhileStatement(ast);
    } else if (ast instanceof AST.ForStatement) {
      network = this.buildFromForStatement(ast);
    }
    
    return network;
  }
  
  /**
   * بناء شبكة من برنامج كامل
   * Build network from complete program
   */
  private buildFromProgram(program: AST.Program): CausalNetwork {
    let network = createEmptyCausalNetwork();
    
    // Process each statement
    for (const statement of program.body) {
      const statementNetwork = this.buildFromAST(statement);
      network = this.mergeNetworks(network, statementNetwork);
    }
    
    network.confidence = 0.8;
    return network;
  }
  
  /**
   * بناء شبكة من دالة
   * Build network from function
   */
  private buildFromFunction(func: AST.FunctionDeclaration): CausalNetwork {
    let network = createEmptyCausalNetwork();
    
    // Add function node
    const funcNode: CausalNode = {
      id: this.generateNodeId(),
      name: func.name.name,
      type: 'event',
      semanticType: 'EVENT_ACTION',
      confidence: 0.9
    };
    network = addCausalNode(network, funcNode);
    
    // Add parameter nodes
    for (const param of func.parameters) {
      const paramNode: CausalNode = {
        id: this.generateNodeId(),
        name: param.name.name,
        type: 'variable',
        confidence: 0.8
      };
      network = addCausalNode(network, paramNode);
      
      // Function requires parameters
      const edge: CausalEdge = {
        id: this.generateEdgeId(),
        source: funcNode.id,
        target: paramNode.id,
        type: 'requires',
        strength: 50,
        confidence: 0.9
      };
      network = addCausalEdge(network, edge);
    }
    
    // Process function body
    const bodyNetwork = this.buildFromBlockStatement(func.body);
    network = this.mergeNetworks(network, bodyNetwork);
    
    network.confidence = 0.85;
    return network;
  }
  
  /**
   * بناء شبكة من تصريح متغير
   * Build network from variable declaration
   */
  private buildFromVariableDeclaration(varDecl: AST.VariableDeclaration): CausalNetwork {
    let network = createEmptyCausalNetwork();
    
    for (const declarator of varDecl.declarations) {
      // Add variable node
      const varNode: CausalNode = {
        id: this.generateNodeId(),
        name: declarator.id.name,
        type: 'variable',
        initialValue: this.extractValue(declarator.init),
        confidence: 0.9
      };
      network = addCausalNode(network, varNode);
      
      // If there's an initializer, create dependency
      if (declarator.init) {
        const initNetwork = this.buildFromExpression(declarator.init);
        network = this.mergeNetworks(network, initNetwork);
        
        // Variable depends on initializer
        for (const node of initNetwork.nodes) {
          const edge: CausalEdge = {
            id: this.generateEdgeId(),
            source: node.id,
            target: varNode.id,
            type: 'causes',
            strength: 100,
            confidence: 0.9
          };
          network = addCausalEdge(network, edge);
        }
      }
    }
    
    network.confidence = 0.85;
    return network;
  }
  
  /**
   * بناء شبكة من تعيين
   * Build network from assignment
   */
  private buildFromAssignment(assignment: AST.AssignmentExpression): CausalNetwork {
    let network = createEmptyCausalNetwork();
    
    // Get target variable name
    const targetName = this.extractIdentifierName(assignment.left);
    if (!targetName) return network;
    
    // Add target node
    const targetNode: CausalNode = {
      id: this.generateNodeId(),
      name: targetName,
      type: 'variable',
      confidence: 0.9
    };
    network = addCausalNode(network, targetNode);
    
    // Build network from right side
    const rightNetwork = this.buildFromExpression(assignment.right);
    network = this.mergeNetworks(network, rightNetwork);
    
    // Right side causes change in target
    for (const node of rightNetwork.nodes) {
      const edge: CausalEdge = {
        id: this.generateEdgeId(),
        source: node.id,
        target: targetNode.id,
        type: 'causes',
        strength: this.getAssignmentStrength(assignment.operator),
        confidence: 0.9
      };
      network = addCausalEdge(network, edge);
    }
    
    network.confidence = 0.85;
    return network;
  }
  
  /**
   * بناء شبكة من استدعاء دالة
   * Build network from function call
   */
  private buildFromFunctionCall(call: AST.CallExpression): CausalNetwork {
    let network = createEmptyCausalNetwork();
    
    // Get function name
    const funcName = this.extractIdentifierName(call.callee);
    if (!funcName) return network;
    
    // Add function call node
    const callNode: CausalNode = {
      id: this.generateNodeId(),
      name: funcName,
      type: 'event',
      semanticType: 'EVENT_ACTION',
      confidence: 0.9
    };
    network = addCausalNode(network, callNode);
    
    // Known causal patterns for common functions
    const causalPatterns = this.getKnownCausalPatterns(funcName);
    if (causalPatterns) {
      // Add nodes and edges based on known patterns
      for (const [effect, strength] of Object.entries(causalPatterns.causes || {})) {
        const effectNode: CausalNode = {
          id: this.generateNodeId(),
          name: effect,
          type: 'state',
          confidence: 0.9
        };
        network = addCausalNode(network, effectNode);
        
        const edge: CausalEdge = {
          id: this.generateEdgeId(),
          source: callNode.id,
          target: effectNode.id,
          type: 'causes',
          strength: strength as number,
          confidence: 0.9
        };
        network = addCausalEdge(network, edge);
      }
    }
    
    // Process arguments
    for (const arg of call.args) {
      const argNetwork = this.buildFromExpression(arg);
      network = this.mergeNetworks(network, argNetwork);
      
      // Arguments are required by function
      for (const node of argNetwork.nodes) {
        const edge: CausalEdge = {
          id: this.generateEdgeId(),
          source: callNode.id,
          target: node.id,
          type: 'requires',
          strength: 50,
          confidence: 0.8
        };
        network = addCausalEdge(network, edge);
      }
    }
    
    network.confidence = 0.8;
    return network;
  }
  
  /**
   * بناء شبكة من عبارة if
   * Build network from if statement
   */
  private buildFromIfStatement(ifStmt: AST.IfStatement): CausalNetwork {
    let network = createEmptyCausalNetwork();
    
    // Build network from condition
    const conditionNetwork = this.buildFromExpression(ifStmt.test);
    network = this.mergeNetworks(network, conditionNetwork);
    
    // Build network from consequent
    const consequentNetwork = this.buildFromBlockStatement(ifStmt.consequent);
    network = this.mergeNetworks(network, consequentNetwork);
    
    // Condition enables consequent
    for (const condNode of conditionNetwork.nodes) {
      for (const consNode of consequentNetwork.nodes) {
        const edge: CausalEdge = {
          id: this.generateEdgeId(),
          source: condNode.id,
          target: consNode.id,
          type: 'enables',
          strength: 75,
          confidence: 0.8
        };
        network = addCausalEdge(network, edge);
      }
    }
    
    // Build network from alternate if exists
    if (ifStmt.alternate) {
      const alternateNetwork = ifStmt.alternate instanceof AST.BlockStatement
        ? this.buildFromBlockStatement(ifStmt.alternate)
        : this.buildFromAST(ifStmt.alternate);
      network = this.mergeNetworks(network, alternateNetwork);
    }
    
    network.confidence = 0.75;
    return network;
  }
  
  /**
   * بناء شبكة من عبارة while
   * Build network from while statement
   */
  private buildFromWhileStatement(whileStmt: AST.WhileStatement): CausalNetwork {
    let network = createEmptyCausalNetwork();

    // Build network from condition
    const conditionNetwork = this.buildFromExpression(whileStmt.test);
    network = this.mergeNetworks(network, conditionNetwork);

    // Build network from body
    const bodyNetwork = this.buildFromBlockStatement(whileStmt.body);
    network = this.mergeNetworks(network, bodyNetwork);

    // Condition enables body (loop)
    for (const condNode of conditionNetwork.nodes) {
      for (const bodyNode of bodyNetwork.nodes) {
        const edge: CausalEdge = {
          id: this.generateEdgeId(),
          source: condNode.id,
          target: bodyNode.id,
          type: 'enables',
          strength: 80,
          confidence: 0.8
        };
        network = addCausalEdge(network, edge);
      }
    }

    network.confidence = 0.75;
    return network;
  }

  /**
   * بناء شبكة من عبارة for
   * Build network from for statement
   */
  private buildFromForStatement(forStmt: AST.ForStatement): CausalNetwork {
    let network = createEmptyCausalNetwork();

    // Build network from init
    if (forStmt.init) {
      const initNetwork = forStmt.init instanceof AST.VariableDeclaration
        ? this.buildFromVariableDeclaration(forStmt.init)
        : this.buildFromExpression(forStmt.init);
      network = this.mergeNetworks(network, initNetwork);
    }

    // Build network from test
    if (forStmt.test) {
      const testNetwork = this.buildFromExpression(forStmt.test);
      network = this.mergeNetworks(network, testNetwork);
    }

    // Build network from update
    if (forStmt.update) {
      const updateNetwork = this.buildFromExpression(forStmt.update);
      network = this.mergeNetworks(network, updateNetwork);
    }

    // Build network from body
    const bodyNetwork = this.buildFromBlockStatement(forStmt.body);
    network = this.mergeNetworks(network, bodyNetwork);

    network.confidence = 0.75;
    return network;
  }

  /**
   * بناء شبكة من كتلة عبارات
   * Build network from block statement
   */
  private buildFromBlockStatement(block: AST.BlockStatement): CausalNetwork {
    let network = createEmptyCausalNetwork();

    for (const statement of block.body) {
      const stmtNetwork = this.buildFromAST(statement);
      network = this.mergeNetworks(network, stmtNetwork);
    }

    return network;
  }

  /**
   * بناء شبكة من تعبير
   * Build network from expression
   */
  private buildFromExpression(expr: AST.Expression): CausalNetwork {
    let network = createEmptyCausalNetwork();

    if (expr instanceof AST.Identifier) {
      const node: CausalNode = {
        id: this.generateNodeId(),
        name: expr.name,
        type: 'variable',
        confidence: 0.8
      };
      network = addCausalNode(network, node);
    } else if (expr instanceof AST.Literal) {
      // Literals don't create nodes in causal network
      return network;
    } else if (expr instanceof AST.BinaryExpression) {
      const leftNetwork = this.buildFromExpression(expr.left);
      const rightNetwork = this.buildFromExpression(expr.right);
      network = this.mergeNetworks(network, leftNetwork);
      network = this.mergeNetworks(network, rightNetwork);
    } else if (expr instanceof AST.CallExpression) {
      network = this.buildFromFunctionCall(expr);
    } else if (expr instanceof AST.AssignmentExpression) {
      network = this.buildFromAssignment(expr);
    } else if (expr instanceof AST.MemberExpression) {
      const objectNetwork = this.buildFromExpression(expr.object);
      network = this.mergeNetworks(network, objectNetwork);
    }

    return network;
  }

  // ============================================================================
  // Helper Methods
  // ============================================================================

  /**
   * دمج شبكتين سببيتين
   * Merge two causal networks
   */
  private mergeNetworks(network1: CausalNetwork, network2: CausalNetwork): CausalNetwork {
    return {
      nodes: [...network1.nodes, ...network2.nodes],
      edges: [...network1.edges, ...network2.edges],
      confidence: (network1.confidence + network2.confidence) / 2
    };
  }

  /**
   * توليد معرف عقدة
   * Generate node ID
   */
  private generateNodeId(): string {
    return `node_${this.nodeIdCounter++}`;
  }

  /**
   * توليد معرف حافة
   * Generate edge ID
   */
  private generateEdgeId(): string {
    return `edge_${this.edgeIdCounter++}`;
  }

  /**
   * استخراج اسم المعرف
   * Extract identifier name
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
   * استخراج قيمة
   * Extract value
   */
  private extractValue(expr: AST.Expression | null): any {
    if (!expr) return undefined;
    if (expr instanceof AST.Literal) return expr.value;
    return undefined;
  }

  /**
   * الحصول على قوة التعيين
   * Get assignment strength
   */
  private getAssignmentStrength(operator: string): number {
    switch (operator) {
      case '=': return 100;
      case '+=': return 50;
      case '-=': return -50;
      case '*=': return 75;
      case '/=': return -25;
      default: return 50;
    }
  }

  /**
   * الحصول على الأنماط السببية المعروفة
   * Get known causal patterns
   */
  private getKnownCausalPatterns(funcName: string): any {
    const patterns: Record<string, any> = {
      'يأكل': { causes: { 'جوع': -20, 'طاقة': 15 } },
      'eat': { causes: { 'hunger': -20, 'energy': 15 } },
      'يشرب': { causes: { 'عطش': -20, 'ترطيب': 15 } },
      'drink': { causes: { 'thirst': -20, 'hydration': 15 } },
      'ينام': { causes: { 'تعب': -30, 'طاقة': 20 } },
      'sleep': { causes: { 'tiredness': -30, 'energy': 20 } },
      'يمشي': { causes: { 'طاقة': -10, 'صحة': 5 } },
      'walk': { causes: { 'energy': -10, 'health': 5 } },
      'يركض': { causes: { 'طاقة': -20, 'صحة': 10 } },
      'run': { causes: { 'energy': -20, 'health': 10 } }
    };

    return patterns[funcName];
  }
}

