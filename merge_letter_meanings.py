#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
دمج معاني الحروف من hurof.md مع قاعدة البيانات الحالية
Merge letter meanings from hurof.md with existing database
"""

import json
from datetime import datetime

def load_json(filepath):
    """تحميل ملف JSON"""
    with open(filepath, 'r', encoding='utf-8') as f:
        return json.load(f)

def save_json(data, filepath):
    """حفظ ملف JSON"""
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def merge_meanings():
    """دمج المعاني"""
    
    # تحميل قاعدة البيانات الأصلية
    print("📖 تحميل قاعدة البيانات الأصلية...")
    original_db = load_json('unified_letters_database_original.json')
    
    # تحميل المعاني المستخرجة
    print("📖 تحميل المعاني المستخرجة من hurof.md...")
    extracted = load_json('letter-meanings-extracted.json')
    
    # إحصائيات
    stats = {
        'total_letters': 0,
        'updated_letters': 0,
        'new_meanings_added': 0,
        'skipped_meanings': 0
    }
    
    print("\n🔄 بدء عملية الدمج...\n")
    
    # المرور على كل حرف في المعاني المستخرجة
    for letter, letter_data in extracted['letters'].items():
        stats['total_letters'] += 1
        
        # التحقق من وجود الحرف في قاعدة البيانات الأصلية
        if letter not in original_db['letters']:
            print(f"⚠️  الحرف '{letter}' غير موجود في قاعدة البيانات الأصلية - تخطي")
            continue
        
        original_letter = original_db['letters'][letter]
        
        # إضافة المعاني الجديدة
        meanings_added = 0
        for meaning_obj in letter_data['meanings']:
            meaning_text = meaning_obj['meaning']
            meaning_type = meaning_obj['type']
            opposite = meaning_obj.get('opposite')
            
            # التحقق من عدم وجود المعنى مسبقاً
            exists = False
            for dev_meaning in original_letter.get('developer_meanings', []):
                if meaning_text in dev_meaning.get('meaning', ''):
                    exists = True
                    break
            
            if not exists:
                # إضافة المعنى الجديد
                new_meaning = {
                    "meaning": meaning_text,
                    "opposite": opposite,
                    "examples": [],
                    "strength": 1.0,
                    "relations": {}
                }
                
                if 'developer_meanings' not in original_letter:
                    original_letter['developer_meanings'] = []
                
                original_letter['developer_meanings'].append(new_meaning)
                meanings_added += 1
                stats['new_meanings_added'] += 1
            else:
                stats['skipped_meanings'] += 1
        
        if meanings_added > 0:
            stats['updated_letters'] += 1
            # تحديث تاريخ التحديث
            original_letter['last_updated'] = datetime.now().isoformat()
            original_letter['updated_by'] = 'hurof_md_integration'
            print(f"✅ {letter} ({letter_data['name']}): أضيف {meanings_added} معنى جديد")
        else:
            print(f"⏭️  {letter} ({letter_data['name']}): لا توجد معاني جديدة")
    
    # تحديث metadata
    original_db['metadata']['last_updated'] = datetime.now().isoformat()
    original_db['metadata']['version'] = '1.1'
    original_db['metadata']['notes'] = 'تم دمج معاني الحروف من hurof.md (بحث 40 سنة)'
    
    # حفظ قاعدة البيانات المحدثة
    print("\n💾 حفظ قاعدة البيانات المحدثة...")
    save_json(original_db, 'unified_letters_database_updated.json')
    
    # طباعة الإحصائيات
    print("\n" + "="*60)
    print("📊 إحصائيات الدمج:")
    print("="*60)
    print(f"إجمالي الحروف المعالجة: {stats['total_letters']}")
    print(f"الحروف المحدثة: {stats['updated_letters']}")
    print(f"المعاني الجديدة المضافة: {stats['new_meanings_added']}")
    print(f"المعاني المتخطاة (موجودة مسبقاً): {stats['skipped_meanings']}")
    print("="*60)
    print("\n✅ تم الدمج بنجاح!")
    print(f"📁 الملف المحدث: unified_letters_database_updated.json")

if __name__ == '__main__':
    merge_meanings()

