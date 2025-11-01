/**
 * نظام المعاجم - Lexicon System
 * Complete lexicon management system
 *
 * Supports both Arabic and English
 * يدعم العربية والإنجليزية
 */

// Arabic lexicon components
export * from './rootAnalyzer';
export * from './derivationGenerator';

// English lexicon components
export * from './englishRootAnalyzer';
export * from './englishDerivationGenerator';

// Shared components
export * from './lexiconEngine';
export * from './lexiconManager';

// Multilingual manager
export * from './multilingualLexiconManager';

