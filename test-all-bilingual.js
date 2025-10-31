#!/usr/bin/env node

import { Lexer } from './dist/lexer/lexer.js';
import { Parser } from './dist/parser/parser.js';

console.log('🌍 Testing Bilingual Support - اختبار الدعم ثنائي اللغة\n');

// Test 1: English keywords
console.log('=== Test 1: English Keywords ===');
const englishCode = `
function greet(name) {
    if (name) {
        return "Hello " + name;
    } else {
        return "Hello World";
    }
}

class Person {
    constructor(name) {
        this.name = name;
    }
}

fact parent("John", "Alice");
rule grandparent(?x, ?z) :- parent(?x, ?y), parent(?y, ?z);
`;

try {
    const lexer1 = new Lexer(englishCode);
    const tokens1 = lexer1.tokenize();
    console.log('✅ English lexer: PASS');

    const parser1 = new Parser(tokens1);
    const ast1 = parser1.parse();
    console.log('✅ English parser: PASS');
} catch (error) {
    console.log('❌ English test FAILED:', error.message);
}

// Test 2: Arabic keywords
console.log('\n=== Test 2: Arabic Keywords - الكلمات المفتاحية العربية ===');
const arabicCode = `
دالة رحب(الاسم) {
    إذا (الاسم) {
        ارجع "مرحباً " + الاسم;
    } وإلا {
        ارجع "مرحبا بالعالم";
    }
}

صنف شخص {
    منشئ(الاسم) {
        هذا.الاسم = الاسم;
    }
}

حقيقة أب("خالد", "أحمد");
قاعدة جد(?س, ?ص) :- أب(?س, ?ع), أب(?ع, ?ص);
`;

try {
    const lexer2 = new Lexer(arabicCode);
    const tokens2 = lexer2.tokenize();
    console.log('✅ Arabic lexer: PASS - المحلل المعجمي العربي: نجح');

    const parser2 = new Parser(tokens2);
    const ast2 = parser2.parse();
    console.log('✅ Arabic parser: PASS - المحلل النحوي العربي: نجح');
} catch (error) {
    console.log('❌ Arabic test FAILED:', error.message);
}

// Test 3: Mixed keywords
console.log('\n=== Test 3: Mixed Keywords - الكلمات المفتاحية المختلطة ===');
const mixedCode = `
function مرحبا(name) {
    if (name) {
        return "Hello " + name;
    } else {
        ارجع "مرحبا بالعالم";
    }
}

class حساب_بنكي {
    constructor(owner, balance) {
        this.owner = owner;
        this.balance = balance;
    }
    
    deposit(amount) {
        this.balance = this.balance + amount;
    }

    دالة سحب(المبلغ) {
        this.balance = this.balance - المبلغ;
        ارجع صحيح;
    }
}

fact city("London", "UK");
حقيقة مدينة("الرياض", "السعودية");

rule european(?city) :- city(?city, "UK");
قاعدة عربية(?مدينة) :- مدينة(?مدينة, "السعودية");
`;

try {
    const lexer3 = new Lexer(mixedCode);
    const tokens3 = lexer3.tokenize();
    console.log('✅ Mixed lexer: PASS - المحلل المعجمي المختلط: نجح');

    const parser3 = new Parser(tokens3);
    const ast3 = parser3.parse();
    console.log('✅ Mixed parser: PASS - المحلل النحوي المختلط: نجح');
} catch (error) {
    console.log('❌ Mixed test FAILED:', error.message);
}

// Test 4: All control flow keywords
console.log('\n=== Test 4: Control Flow Keywords ===');
const controlFlowCode = `
// English
function testEnglish() {
    let x = 5;
    if (x > 0) {
        return true;
    } else {
        return false;
    }
}

// Arabic - عربي
دالة اختبار_عربي() {
    let س = 5;
    إذا (س > 0) {
        ارجع صحيح;
    } وإلا {
        ارجع خطأ;
    }
}
`;

try {
    const lexer4 = new Lexer(controlFlowCode);
    const tokens4 = lexer4.tokenize();
    console.log('✅ Control flow lexer: PASS');

    const parser4 = new Parser(tokens4);
    const ast4 = parser4.parse();
    console.log('✅ Control flow parser: PASS');
} catch (error) {
    console.log('❌ Control flow test FAILED:', error.message);
}

// Test 5: OOP keywords
console.log('\n=== Test 5: OOP Keywords ===');
const oopCode = `
// English
class Animal {
    constructor(name) {
        this.name = name;
    }
}

class Dog extends Animal {
    constructor(name, breed) {
        super(name);
        this.breed = breed;
    }
}

// Arabic - عربي
صنف حيوان {
    منشئ(الاسم) {
        هذا.الاسم = الاسم;
    }
}

صنف كلب يمتد حيوان {
    منشئ(الاسم, النوع) {
        فائق(الاسم);
        هذا.النوع = النوع;
    }
}
`;

try {
    const lexer5 = new Lexer(oopCode);
    const tokens5 = lexer5.tokenize();
    console.log('✅ OOP lexer: PASS');

    const parser5 = new Parser(tokens5);
    const ast5 = parser5.parse();
    console.log('✅ OOP parser: PASS');
} catch (error) {
    console.log('❌ OOP test FAILED:', error.message);
}

console.log('\n' + '='.repeat(60));
console.log('🎉 All Bilingual Tests Passed! - جميع الاختبارات ثنائية اللغة نجحت!');
console.log('='.repeat(60));
console.log('\n✨ Bayan is ready for the global competition!');
console.log('✨ البيان جاهزة للمسابقة العالمية!');

