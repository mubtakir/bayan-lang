/**
 * نقطة الدخول لمكونات المحلل النحوي
 */

export { Parser, ParserError } from './parser.js';

// Intelligent Parser exports
export { IntelligentParser, IntelligentParserHelpers } from './intelligentParser.js';
export type {
  IntelligentParsingSettings,
  IntelligentParsingResult,
  IntelligentParsingStats
} from './intelligentParser.js';

// Intelligent AST exports
export {
  IntelligentProgram,
  IntelligentFunctionDeclaration,
  IntelligentVariableDeclaration,
  createEmptyCausalNetwork,
  addCausalNode,
  addCausalEdge,
  mergeCausalNetworks
} from './intelligentAST.js';
export type {
  IntelligentASTNode,
  IntelligentStatement,
  CausalNetwork,
  CausalNode,
  CausalEdge,
  CausalEdgeType,
  Event,
  EventType,
  EventEffect,
  Relationship,
  RelationshipType,
  Context,
  Scope,
  VariableInfo,
  FunctionInfo,
  ClassInfo,
  ImportInfo
} from './intelligentAST.js';

// Causal Network Builder exports
export { CausalNetworkBuilder } from './causalNetworkBuilder.js';

// Event Detector exports
export { EventDetector } from './eventDetector.js';

