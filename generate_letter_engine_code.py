#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
توليد كود TypeScript لـ LetterEngine من قاعدة البيانات
Generate TypeScript code for LetterEngine from database
"""

import json

def load_json(filepath):
    """تحميل ملف JSON"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def generate_letter_initialization_code():
    """توليد كود تهيئة الحروف"""
    
    # تحميل قاعدة البيانات
    print("📖 تحميل قاعدة البيانات...")
    db = load_json('unified_letters_database_complete.json')
    
    code_lines = []
    code_lines.append("  /**")
    code_lines.append("   * تهيئة معاني الحروف العربية")
    code_lines.append("   * Initialize Arabic letter meanings")
    code_lines.append("   * ")
    code_lines.append("   * المعاني مستمدة من بحث 40 سنة في سيماء الحروف")
    code_lines.append("   * Meanings derived from 40 years of research in letter semiotics")
    code_lines.append("   */")
    code_lines.append("  private initializeArabicLetters(): void {")
    
    # ترتيب الحروف
    letters_order = ['ء', 'آ', 'ا', 'ب', 'ت', 'ث', 'ج', 'ح', 'خ', 'د', 'ذ', 'ر', 'ز', 'س', 'ش', 'ص', 'ض', 'ط', 'ظ', 'ع', 'غ', 'ف', 'ق', 'ك', 'ل', 'م', 'ن', 'ه', 'و', 'ي']
    
    for letter in letters_order:
        if letter not in db['letters']:
            continue
        
        letter_data = db['letters'][letter]
        letter_name = letter_data['name']
        
        code_lines.append(f"")
        code_lines.append(f"    // {letter} - {letter_name}")
        
        # معاني المطور
        dev_meanings = letter_data.get('developer_meanings', [])
        for i, meaning_obj in enumerate(dev_meanings):
            meaning = meaning_obj['meaning']
            strength = meaning_obj.get('strength', 1.0)
            examples = meaning_obj.get('examples', [])
            
            # تحديد نوع المعنى
            if i == 0:
                meaning_type = "MeaningType.PRIMARY"
            elif i == 1:
                meaning_type = "MeaningType.SECONDARY"
            else:
                meaning_type = "MeaningType.PRIMARY"
            
            # تنظيف الأمثلة
            examples_str = ", ".join([f"'{ex}'" for ex in examples[:3]])
            if examples_str:
                examples_str = f"[{examples_str}]"
            else:
                examples_str = "[]"
            
            code_lines.append(f"    this.addLetterMeaning('{letter}', '{meaning}', {meaning_type}, {strength}, {examples_str});")
    
    code_lines.append("  }")
    
    # حفظ الكود
    output_file = 'letter_engine_initialization.ts'
    with open(output_file, 'w', encoding='utf-8') as f:
        f.write('\n'.join(code_lines))
    
    print(f"\n✅ تم توليد الكود بنجاح!")
    print(f"📁 الملف: {output_file}")
    print(f"📊 عدد الأسطر: {len(code_lines)}")
    
    # طباعة عينة
    print(f"\n📝 عينة من الكود:")
    print("="*60)
    for line in code_lines[:20]:
        print(line)
    print("...")
    print("="*60)

if __name__ == '__main__':
    generate_letter_initialization_code()

