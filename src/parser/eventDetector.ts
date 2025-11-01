/**
 * كاشف الأحداث - Event Detector
 * Detects events and their relationships in code
 */

import * as AST from '../ast/index.js';
import { Event, EventType, EventEffect } from './intelligentAST.js';

/**
 * كاشف الأحداث - Event Detector
 */
export class EventDetector {
  private eventIdCounter = 0;
  
  /**
   * كشف الأحداث من AST
   * Detect events from AST
   */
  detectEvents(ast: AST.ASTNode): Event[] {
    const events: Event[] = [];
    
    if (ast instanceof AST.Program) {
      for (const statement of ast.body) {
        events.push(...this.detectEvents(statement));
      }
    } else if (ast instanceof AST.FunctionDeclaration) {
      events.push(...this.detectEventsInFunction(ast));
    } else if (ast instanceof AST.CallExpression) {
      const event = this.detectEventInFunctionCall(ast);
      if (event) events.push(event);
    } else if (ast instanceof AST.AssignmentExpression) {
      const event = this.detectEventInAssignment(ast);
      if (event) events.push(event);
    } else if (ast instanceof AST.IfStatement) {
      events.push(...this.detectEventsInIfStatement(ast));
    } else if (ast instanceof AST.WhileStatement) {
      events.push(...this.detectEventsInWhileStatement(ast));
    } else if (ast instanceof AST.ForStatement) {
      events.push(...this.detectEventsInForStatement(ast));
    } else if (ast instanceof AST.NewExpression) {
      const event = this.detectEventInObjectCreation(ast);
      if (event) events.push(event);
    } else if (ast instanceof AST.ReturnStatement) {
      const event = this.detectEventInReturn(ast);
      if (event) events.push(event);
    } else if (ast instanceof AST.ThrowStatement) {
      const event = this.detectEventInThrow(ast);
      if (event) events.push(event);
    }
    
    return events;
  }
  
  /**
   * كشف الأحداث في دالة
   * Detect events in function
   */
  private detectEventsInFunction(func: AST.FunctionDeclaration): Event[] {
    const events: Event[] = [];
    
    // Function declaration itself is an event
    const funcEvent: Event = {
      id: this.generateEventId(),
      name: func.name.name,
      type: 'function_call',
      effects: [],
      preconditions: func.parameters.map(p => p.name.name),
      postconditions: [],
      confidence: 0.9
    };
    events.push(funcEvent);
    
    // Detect events in function body
    for (const statement of func.body.body) {
      events.push(...this.detectEvents(statement));
    }
    
    return events;
  }
  
  /**
   * كشف حدث في استدعاء دالة
   * Detect event in function call
   */
  private detectEventInFunctionCall(call: AST.CallExpression): Event | null {
    const funcName = this.extractFunctionName(call.callee);
    if (!funcName) return null;
    
    // Get known event patterns
    const pattern = this.getKnownEventPattern(funcName);
    
    const event: Event = {
      id: this.generateEventId(),
      name: funcName,
      type: 'function_call',
      effects: pattern?.effects || [],
      preconditions: pattern?.preconditions || [],
      postconditions: pattern?.postconditions || [],
      confidence: pattern ? 0.9 : 0.6
    };
    
    return event;
  }
  
  /**
   * كشف حدث في تعيين
   * Detect event in assignment
   */
  private detectEventInAssignment(assignment: AST.AssignmentExpression): Event | null {
    const targetName = this.extractIdentifierName(assignment.left);
    if (!targetName) return null;
    
    const event: Event = {
      id: this.generateEventId(),
      name: `تعيين_${targetName}`,
      type: 'state_change',
      effects: [{
        target: targetName,
        type: 'set',
        confidence: 0.9
      }],
      preconditions: [],
      postconditions: [targetName],
      confidence: 0.9
    };
    
    return event;
  }
  
  /**
   * كشف الأحداث في عبارة if
   * Detect events in if statement
   */
  private detectEventsInIfStatement(ifStmt: AST.IfStatement): Event[] {
    const events: Event[] = [];
    
    // Condition check is an event
    const conditionEvent: Event = {
      id: this.generateEventId(),
      name: 'فحص_شرط',
      type: 'condition_check',
      effects: [],
      preconditions: [],
      postconditions: [],
      confidence: 0.8
    };
    events.push(conditionEvent);
    
    // Detect events in consequent
    for (const statement of ifStmt.consequent.body) {
      events.push(...this.detectEvents(statement));
    }
    
    // Detect events in alternate
    if (ifStmt.alternate) {
      if (ifStmt.alternate instanceof AST.BlockStatement) {
        for (const statement of ifStmt.alternate.body) {
          events.push(...this.detectEvents(statement));
        }
      } else {
        events.push(...this.detectEvents(ifStmt.alternate));
      }
    }
    
    return events;
  }
  
  /**
   * كشف الأحداث في عبارة while
   * Detect events in while statement
   */
  private detectEventsInWhileStatement(whileStmt: AST.WhileStatement): Event[] {
    const events: Event[] = [];
    
    // Loop iteration is an event
    const loopEvent: Event = {
      id: this.generateEventId(),
      name: 'تكرار_حلقة',
      type: 'loop_iteration',
      effects: [],
      preconditions: [],
      postconditions: [],
      confidence: 0.8
    };
    events.push(loopEvent);
    
    // Detect events in body
    for (const statement of whileStmt.body.body) {
      events.push(...this.detectEvents(statement));
    }
    
    return events;
  }
  
  /**
   * كشف الأحداث في عبارة for
   * Detect events in for statement
   */
  private detectEventsInForStatement(forStmt: AST.ForStatement): Event[] {
    const events: Event[] = [];
    
    // Loop iteration is an event
    const loopEvent: Event = {
      id: this.generateEventId(),
      name: 'تكرار_for',
      type: 'loop_iteration',
      effects: [],
      preconditions: [],
      postconditions: [],
      confidence: 0.8
    };
    events.push(loopEvent);
    
    // Detect events in body
    for (const statement of forStmt.body.body) {
      events.push(...this.detectEvents(statement));
    }
    
    return events;
  }
  
  /**
   * كشف حدث في إنشاء كائن
   * Detect event in object creation
   */
  private detectEventInObjectCreation(newExpr: AST.NewExpression): Event | null {
    const className = this.extractIdentifierName(newExpr.callee);
    if (!className) return null;
    
    const event: Event = {
      id: this.generateEventId(),
      name: `إنشاء_${className}`,
      type: 'object_creation',
      effects: [{
        target: className,
        type: 'create',
        confidence: 0.9
      }],
      preconditions: [],
      postconditions: [className],
      confidence: 0.9
    };
    
    return event;
  }
  
  /**
   * كشف حدث في return
   * Detect event in return
   */
  private detectEventInReturn(returnStmt: AST.ReturnStatement): Event | null {
    const event: Event = {
      id: this.generateEventId(),
      name: 'إرجاع_قيمة',
      type: 'return_value',
      effects: [],
      preconditions: [],
      postconditions: [],
      confidence: 0.9
    };
    
    return event;
  }
  
  /**
   * كشف حدث في throw
   * Detect event in throw
   */
  private detectEventInThrow(throwStmt: AST.ThrowStatement): Event | null {
    const event: Event = {
      id: this.generateEventId(),
      name: 'رمي_استثناء',
      type: 'exception_throw',
      effects: [],
      preconditions: [],
      postconditions: [],
      confidence: 0.9
    };
    
    return event;
  }
  
  // ============================================================================
  // Helper Methods
  // ============================================================================
  
  /**
   * توليد معرف حدث
   * Generate event ID
   */
  private generateEventId(): string {
    return `event_${this.eventIdCounter++}`;
  }
  
  /**
   * استخراج اسم الدالة
   * Extract function name
   */
  private extractFunctionName(expr: AST.Expression): string | null {
    return this.extractIdentifierName(expr);
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
   * الحصول على نمط حدث معروف
   * Get known event pattern
   */
  private getKnownEventPattern(funcName: string): any {
    const patterns: Record<string, any> = {
      'يأكل': {
        effects: [
          { target: 'جوع', type: 'decrease', magnitude: 20, confidence: 0.9 },
          { target: 'طاقة', type: 'increase', magnitude: 15, confidence: 0.9 }
        ],
        preconditions: ['طعام'],
        postconditions: ['جوع_أقل', 'طاقة_أكثر']
      },
      'eat': {
        effects: [
          { target: 'hunger', type: 'decrease', magnitude: 20, confidence: 0.9 },
          { target: 'energy', type: 'increase', magnitude: 15, confidence: 0.9 }
        ],
        preconditions: ['food'],
        postconditions: ['less_hungry', 'more_energy']
      },
      'يشرب': {
        effects: [
          { target: 'عطش', type: 'decrease', magnitude: 20, confidence: 0.9 },
          { target: 'ترطيب', type: 'increase', magnitude: 15, confidence: 0.9 }
        ],
        preconditions: ['شراب'],
        postconditions: ['عطش_أقل']
      },
      'drink': {
        effects: [
          { target: 'thirst', type: 'decrease', magnitude: 20, confidence: 0.9 },
          { target: 'hydration', type: 'increase', magnitude: 15, confidence: 0.9 }
        ],
        preconditions: ['beverage'],
        postconditions: ['less_thirsty']
      }
    };
    
    return patterns[funcName];
  }
}

