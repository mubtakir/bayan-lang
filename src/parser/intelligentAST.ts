/**
 * الشجرة التجريدية الذكية - Intelligent AST
 * Extends traditional AST with AI intelligence from Baserah systems
 */

import * as AST from '../ast/index.js';
import { IntelligentToken, SemanticType } from '../lexer/intelligentTokens.js';

// ============================================================================
// Intelligent AST Node Types
// ============================================================================

/**
 * العقدة الذكية الأساسية - Base Intelligent Node
 * Extends ASTNode with intelligence properties
 */
export interface IntelligentASTNode extends AST.ASTNode {
  // Traditional properties
  type: string;
  line?: number;
  column?: number;
  
  // Intelligence properties
  semanticType?: SemanticType;
  causalNetwork?: CausalNetwork;
  events?: Event[];
  relationships?: Relationship[];
  context?: Context;
  confidence: number;
  metadata: Map<string, any>;
}

// ============================================================================
// Causal Network Types
// ============================================================================

/**
 * الشبكة السببية - Causal Network
 * Represents causal relationships in code
 */
export interface CausalNetwork {
  nodes: CausalNode[];
  edges: CausalEdge[];
  confidence: number;
}

/**
 * عقدة سببية - Causal Node
 * Represents a state or variable in the causal network
 */
export interface CausalNode {
  id: string;
  name: string;
  type: 'state' | 'variable' | 'property' | 'event';
  initialValue?: any;
  currentValue?: any;
  semanticType?: SemanticType;
  confidence: number;
}

/**
 * حافة سببية - Causal Edge
 * Represents a causal relationship between nodes
 */
export interface CausalEdge {
  id: string;
  source: string;      // Source node ID
  target: string;      // Target node ID
  type: CausalEdgeType;
  strength: number;    // -100 to +100
  condition?: string;  // Optional condition for the edge
  confidence: number;
}

export type CausalEdgeType = 
  | 'causes'      // A causes B
  | 'prevents'    // A prevents B
  | 'enhances'    // A enhances B
  | 'requires'    // A requires B
  | 'enables'     // A enables B
  | 'disables';   // A disables B

// ============================================================================
// Event Types
// ============================================================================

/**
 * حدث - Event
 * Represents an event detected in code
 */
export interface Event {
  id: string;
  name: string;
  type: EventType;
  trigger?: string;        // What triggers this event
  effects: EventEffect[];  // What this event causes
  preconditions: string[]; // What must be true before this event
  postconditions: string[]; // What will be true after this event
  confidence: number;
}

export type EventType = 
  | 'function_call'
  | 'state_change'
  | 'object_creation'
  | 'object_destruction'
  | 'condition_check'
  | 'loop_iteration'
  | 'exception_throw'
  | 'return_value';

/**
 * تأثير الحدث - Event Effect
 * Represents the effect of an event
 */
export interface EventEffect {
  target: string;      // What is affected
  type: 'increase' | 'decrease' | 'set' | 'toggle' | 'create' | 'destroy';
  magnitude?: number;  // How much (for increase/decrease)
  value?: any;         // New value (for set)
  confidence: number;
}

// ============================================================================
// Relationship Types
// ============================================================================

/**
 * علاقة - Relationship
 * Represents a relationship between AST nodes
 */
export interface Relationship {
  id: string;
  type: RelationshipType;
  source: string;      // Source node ID
  target: string;      // Target node ID
  description?: string;
  confidence: number;
}

export type RelationshipType = 
  | 'calls'           // Function A calls function B
  | 'uses'            // A uses B
  | 'modifies'        // A modifies B
  | 'depends_on'      // A depends on B
  | 'inherits_from'   // A inherits from B
  | 'implements'      // A implements B
  | 'contains'        // A contains B
  | 'references';     // A references B

// ============================================================================
// Context Types
// ============================================================================

/**
 * السياق - Context
 * Represents the context of an AST node
 */
export interface Context {
  scope: Scope;
  variables: Map<string, VariableInfo>;
  functions: Map<string, FunctionInfo>;
  classes: Map<string, ClassInfo>;
  imports: Map<string, ImportInfo>;
  confidence: number;
}

export interface Scope {
  type: 'global' | 'function' | 'block' | 'class' | 'module';
  parent?: Scope;
  depth: number;
}

export interface VariableInfo {
  name: string;
  type?: string;
  semanticType?: SemanticType;
  initialValue?: any;
  mutable: boolean;
  usages: number;
  confidence: number;
}

export interface FunctionInfo {
  name: string;
  parameters: string[];
  returnType?: string;
  isAsync: boolean;
  isGenerator: boolean;
  calls: string[];      // Functions this function calls
  calledBy: string[];   // Functions that call this function
  confidence: number;
}

export interface ClassInfo {
  name: string;
  superClass?: string;
  interfaces: string[];
  methods: string[];
  properties: string[];
  confidence: number;
}

export interface ImportInfo {
  source: string;
  imports: string[];
  confidence: number;
}

// ============================================================================
// Intelligent Program
// ============================================================================

/**
 * البرنامج الذكي - Intelligent Program
 * Extends Program with intelligence
 */
export class IntelligentProgram extends AST.Program implements IntelligentASTNode {
  semanticType?: SemanticType;
  causalNetwork?: CausalNetwork;
  events?: Event[];
  relationships?: Relationship[];
  context?: Context;
  confidence: number;
  metadata: Map<string, any>;
  
  constructor(
    body: AST.Statement[],
    intelligence?: Partial<IntelligentASTNode>
  ) {
    super(body);
    this.confidence = intelligence?.confidence ?? 0.5;
    this.metadata = intelligence?.metadata ?? new Map();
    this.semanticType = intelligence?.semanticType;
    this.causalNetwork = intelligence?.causalNetwork;
    this.events = intelligence?.events;
    this.relationships = intelligence?.relationships;
    this.context = intelligence?.context;
  }
}

// ============================================================================
// Intelligent Statement Types
// ============================================================================

/**
 * عبارة ذكية - Intelligent Statement
 * Base type for intelligent statements
 */
export interface IntelligentStatement extends IntelligentASTNode {
  // Inherits all properties from IntelligentASTNode
}

/**
 * تصريح دالة ذكي - Intelligent Function Declaration
 */
export class IntelligentFunctionDeclaration extends AST.FunctionDeclaration implements IntelligentStatement {
  semanticType?: SemanticType;
  causalNetwork?: CausalNetwork;
  events?: Event[];
  relationships?: Relationship[];
  context?: Context;
  confidence: number;
  metadata: Map<string, any>;
  
  constructor(
    name: AST.Identifier,
    parameters: AST.FunctionParameter[],
    body: AST.BlockStatement,
    isAsync: boolean = false,
    isGenerator: boolean = false,
    intelligence?: Partial<IntelligentASTNode>
  ) {
    super(name, parameters, body, isAsync, isGenerator);
    this.confidence = intelligence?.confidence ?? 0.5;
    this.metadata = intelligence?.metadata ?? new Map();
    this.semanticType = intelligence?.semanticType;
    this.causalNetwork = intelligence?.causalNetwork;
    this.events = intelligence?.events;
    this.relationships = intelligence?.relationships;
    this.context = intelligence?.context;
  }
}

/**
 * تصريح متغير ذكي - Intelligent Variable Declaration
 */
export class IntelligentVariableDeclaration extends AST.VariableDeclaration implements IntelligentStatement {
  semanticType?: SemanticType;
  causalNetwork?: CausalNetwork;
  events?: Event[];
  relationships?: Relationship[];
  context?: Context;
  confidence: number;
  metadata: Map<string, any>;
  
  constructor(
    kind: 'دع' | 'ثابت' | 'متغير',
    declarations: AST.VariableDeclarator[],
    intelligence?: Partial<IntelligentASTNode>
  ) {
    super(kind, declarations);
    this.confidence = intelligence?.confidence ?? 0.5;
    this.metadata = intelligence?.metadata ?? new Map();
    this.semanticType = intelligence?.semanticType;
    this.causalNetwork = intelligence?.causalNetwork;
    this.events = intelligence?.events;
    this.relationships = intelligence?.relationships;
    this.context = intelligence?.context;
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

/**
 * إنشاء شبكة سببية فارغة - Create empty causal network
 */
export function createEmptyCausalNetwork(): CausalNetwork {
  return {
    nodes: [],
    edges: [],
    confidence: 0.5
  };
}

/**
 * إضافة عقدة سببية - Add causal node
 */
export function addCausalNode(
  network: CausalNetwork,
  node: CausalNode
): CausalNetwork {
  return {
    ...network,
    nodes: [...network.nodes, node]
  };
}

/**
 * إضافة حافة سببية - Add causal edge
 */
export function addCausalEdge(
  network: CausalNetwork,
  edge: CausalEdge
): CausalNetwork {
  return {
    ...network,
    edges: [...network.edges, edge]
  };
}

/**
 * دمج شبكات سببية - Merge causal networks
 */
export function mergeCausalNetworks(
  networks: CausalNetwork[]
): CausalNetwork {
  const merged: CausalNetwork = createEmptyCausalNetwork();
  
  for (const network of networks) {
    merged.nodes.push(...network.nodes);
    merged.edges.push(...network.edges);
  }
  
  // Calculate average confidence
  merged.confidence = networks.reduce((sum, n) => sum + n.confidence, 0) / networks.length;
  
  return merged;
}

