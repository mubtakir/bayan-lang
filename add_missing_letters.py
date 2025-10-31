#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
إضافة الحروف الناقصة (ء و آ) إلى قاعدة البيانات
Add missing letters (ء and آ) to the database
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

def add_missing_letters():
    """إضافة الحروف الناقصة"""
    
    # تحميل قاعدة البيانات المحدثة
    print("📖 تحميل قاعدة البيانات المحدثة...")
    db = load_json('unified_letters_database_updated.json')
    
    # تحميل المعاني المستخرجة
    extracted = load_json('letter-meanings-extracted.json')
    
    print("\n➕ إضافة الحروف الناقصة...\n")
    
    # إضافة الهمزة (ء)
    if 'ء' not in db['letters']:
        print("➕ إضافة الهمزة (ء)...")
        db['letters']['ء'] = {
            "letter": "ء",
            "name": "الهمزة",
            "position_in_alphabet": 0,  # قبل الألف
            "articulation_point": "حلقي",
            "articulation_depth": "جوفي",
            "phonetic_type": "قاطعة",
            "emotional_strength": 0.95,
            "physical_strength": 0.2,
            "meaning_type": "نفسي/انفعالي",
            "shape_general": "رأس عين",
            "shape_meaning": "المفاجأة والقطع",
            "shape_in_objects": [],
            "shape_objects_names": [],
            "sound_description": "صوت قاطع مفاجئ",
            "sound_meaning": "المفاجأة والرعب",
            "developer_meanings": [
                {
                    "meaning": "عنصر المفاجأة",
                    "opposite": "التوقع والاستعداد",
                    "examples": ["فجأة", "بدأ", "نشأ"],
                    "strength": 1.0,
                    "relations": {}
                },
                {
                    "meaning": "صوت رعب وتخويف",
                    "opposite": "الطمأنينة والأمان",
                    "examples": ["أخاف", "أرعب"],
                    "strength": 0.9,
                    "relations": {}
                }
            ],
            "inferred_meanings": [],
            "similar_shape_letters": ["ع"],
            "similar_sound_letters": [],
            "adjacent_articulation_letters": ["ا", "ع", "ه"],
            "opposite_letter": "م",
            "example_words": ["أب", "أم", "أخ"],
            "philosophical_meaning": "القطع المفاجئ الذي يبدأ الوجود",
            "geometric_shape": "نقطة القطع",
            "symbolic_meaning": "البداية المفاجئة",
            "last_updated": datetime.now().isoformat(),
            "updated_by": "hurof_md_integration",
            "confidence": 0.95
        }
    
    # إضافة الألف الممدودة (آ)
    if 'آ' not in db['letters']:
        print("➕ إضافة الألف الممدودة (آ)...")
        db['letters']['آ'] = {
            "letter": "آ",
            "name": "الألف الممدودة",
            "position_in_alphabet": 1.5,  # بين الألف والباء
            "articulation_point": "حلقي",
            "articulation_depth": "جوفي",
            "phonetic_type": "فاتحة ممدودة",
            "emotional_strength": 0.95,
            "physical_strength": 0.4,
            "meaning_type": "نفسي/انفعالي",
            "shape_general": "خط مستقيم عمودي مع مد",
            "shape_meaning": "الاستقامة مع العلو",
            "shape_in_objects": [],
            "shape_objects_names": [],
            "sound_description": "صوت مفتوح عميق ممدود",
            "sound_meaning": "العلو والتعظيم",
            "developer_meanings": [
                {
                    "meaning": "علو",
                    "opposite": "انخفاض",
                    "examples": ["آفاق", "آمال"],
                    "strength": 1.0,
                    "relations": {}
                },
                {
                    "meaning": "حنان",
                    "opposite": "قسوة",
                    "examples": ["آه", "آي"],
                    "strength": 0.9,
                    "relations": {}
                },
                {
                    "meaning": "تعظيم",
                    "opposite": "تحقير",
                    "examples": ["آية", "آلاء"],
                    "strength": 0.95,
                    "relations": {}
                }
            ],
            "inferred_meanings": [],
            "similar_shape_letters": ["ا"],
            "similar_sound_letters": ["ا"],
            "adjacent_articulation_letters": ["ا", "ع", "ه"],
            "opposite_letter": "ي",
            "example_words": ["آب", "آذار", "آمن"],
            "philosophical_meaning": "الوحدة العالية المعظمة",
            "geometric_shape": "الخط المستقيم الممتد للأعلى",
            "symbolic_meaning": "العلو والتعظيم",
            "last_updated": datetime.now().isoformat(),
            "updated_by": "hurof_md_integration",
            "confidence": 0.95
        }
    
    # تحديث metadata
    db['metadata']['letters_count'] = len(db['letters'])
    db['metadata']['last_updated'] = datetime.now().isoformat()
    db['metadata']['version'] = '1.2'
    
    # حفظ قاعدة البيانات
    print("\n💾 حفظ قاعدة البيانات...")
    save_json(db, 'unified_letters_database_complete.json')
    
    print("\n✅ تم إضافة الحروف الناقصة بنجاح!")
    print(f"📊 إجمالي الحروف الآن: {db['metadata']['letters_count']}")
    print(f"📁 الملف النهائي: unified_letters_database_complete.json")

if __name__ == '__main__':
    add_missing_letters()

