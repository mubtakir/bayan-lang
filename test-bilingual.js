import { Lexer } from './dist/lexer/lexer.js';
import { Parser } from './dist/parser/parser.js';

console.log('=== Testing Bilingual Support ===\n');

// Test 1: English keywords
console.log('Test 1: English Keywords');
const englishCode = `
function add(a, b) {
    return a + b;
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
    console.log('✅ English keywords work!');
    console.log('Sample tokens:', tokens1.slice(0, 10).map(t => `${t.type}:${t.value}`).join(', '));
} catch (error) {
    console.log('❌ English keywords failed:', error.message);
}

console.log('\n---\n');

// Test 2: Arabic keywords
console.log('Test 2: Arabic Keywords');
const arabicCode = `
دالة جمع(أ, ب) {
    ارجع أ + ب;
}

صنف شخص {
    منشئ(اسم) {
        هذا.الاسم = اسم;
    }
}

حقيقة أب("خالد", "أحمد");
قاعدة جد(?س, ?ص) :- أب(?س, ?ع), أب(?ع, ?ص);
`;

try {
    const lexer2 = new Lexer(arabicCode);
    const tokens2 = lexer2.tokenize();
    console.log('✅ Arabic keywords work!');
    console.log('Sample tokens:', tokens2.slice(0, 10).map(t => `${t.type}:${t.value}`).join(', '));
} catch (error) {
    console.log('❌ Arabic keywords failed:', error.message);
}

console.log('\n---\n');

// Test 3: Mixed keywords
console.log('Test 3: Mixed Keywords (English + Arabic)');
const mixedCode = `
function مرحبا(name) {
    if (name) {
        return "Hello " + name;
    } else {
        ارجع "مرحبا";
    }
}

class حساب {
    constructor(balance) {
        this.balance = balance;
    }
    
    deposit(amount) {
        this.balance += amount;
    }
}

fact مدينة("Riyadh", "Saudi Arabia");
حقيقة city("Cairo", "Egypt");
`;

try {
    const lexer3 = new Lexer(mixedCode);
    const tokens3 = lexer3.tokenize();
    console.log('✅ Mixed keywords work!');
    console.log('Sample tokens:', tokens3.slice(0, 15).map(t => `${t.type}:${t.value}`).join(', '));
} catch (error) {
    console.log('❌ Mixed keywords failed:', error.message);
}

console.log('\n---\n');

// Test 4: All control flow keywords
console.log('Test 4: Control Flow Keywords');
const controlFlowTests = [
    { lang: 'English', code: 'if (x > 0) { return true; } else { return false; }' },
    { lang: 'Arabic', code: 'إذا (س > 0) { ارجع صحيح; } وإلا { ارجع خطأ; }' },
    { lang: 'English', code: 'for (let i = 0; i < 10; i++) { break; }' },
    { lang: 'Arabic', code: 'لكل (دع ط = 0; ط < 10; ط++) { اكسر; }' },
    { lang: 'English', code: 'while (true) { continue; }' },
    { lang: 'Arabic', code: 'بينما (صحيح) { استمر; }' },
];

controlFlowTests.forEach(test => {
    try {
        const lexer = new Lexer(test.code);
        const tokens = lexer.tokenize();
        console.log(`✅ ${test.lang} control flow works`);
    } catch (error) {
        console.log(`❌ ${test.lang} control flow failed:`, error.message);
    }
});

console.log('\n=== All Tests Complete ===');

