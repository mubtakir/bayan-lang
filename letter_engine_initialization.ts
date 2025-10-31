  /**
   * تهيئة معاني الحروف العربية
   * Initialize Arabic letter meanings
   * 
   * المعاني مستمدة من بحث 40 سنة في سيماء الحروف
   * Meanings derived from 40 years of research in letter semiotics
   */
  private initializeArabicLetters(): void {

    // ء - الهمزة
    this.addLetterMeaning('ء', 'عنصر المفاجأة', MeaningType.PRIMARY, 1.0, ['فجأة', 'بدأ', 'نشأ']);
    this.addLetterMeaning('ء', 'صوت رعب وتخويف', MeaningType.SECONDARY, 0.9, ['أخاف', 'أرعب']);

    // آ - الألف الممدودة
    this.addLetterMeaning('آ', 'علو', MeaningType.PRIMARY, 1.0, ['آفاق', 'آمال']);
    this.addLetterMeaning('آ', 'حنان', MeaningType.SECONDARY, 0.9, ['آه', 'آي']);
    this.addLetterMeaning('آ', 'تعظيم', MeaningType.PRIMARY, 0.95, ['آية', 'آلاء']);

    // ا - الألف
    this.addLetterMeaning('ا', 'الوحدة والبداية والأساس', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ا', 'الأساسيات والبدايات', MeaningType.SECONDARY, 0.7, []);

    // ب - الباء
    this.addLetterMeaning('ب', 'الاتصال والربط والدخول', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ب', 'الحركة والاتصال', MeaningType.SECONDARY, 0.7, []);
    this.addLetterMeaning('ب', 'امتلاء وتشبع', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ب', 'حمل ونقل', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ب', 'دك', MeaningType.PRIMARY, 1.0, []);

    // ت - التاء
    this.addLetterMeaning('ت', 'الحركة والتغيير والتطور', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ت', 'الحركة والتطور', MeaningType.SECONDARY, 0.7, []);
    this.addLetterMeaning('ت', 'البناء', MeaningType.PRIMARY, 1.0, []);

    // ث - الثاء
    this.addLetterMeaning('ث', 'الثبات والاستقرار والتراكم', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ث', 'الثبات والاستقرار', MeaningType.SECONDARY, 0.7, []);
    this.addLetterMeaning('ث', 'البعثرة (مع عشوائية)', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ث', 'التلعثم', MeaningType.PRIMARY, 1.0, []);

    // ج - الجيم
    this.addLetterMeaning('ج', 'الجمع والتجميع والحركة', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ج', 'الجمع والحركة', MeaningType.SECONDARY, 0.7, []);
    this.addLetterMeaning('ج', 'جبر الخاطر', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ج', 'جزالة', MeaningType.PRIMARY, 1.0, []);

    // ح - الحاء
    this.addLetterMeaning('ح', 'الحياة والحركة والدفء', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ح', 'الحياة والحركة', MeaningType.SECONDARY, 0.7, []);
    this.addLetterMeaning('ح', 'صوت المشقة (أبلغ من الجهد)', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ح', 'العطش', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ح', 'التودد', MeaningType.PRIMARY, 1.0, []);

    // خ - الخاء
    this.addLetterMeaning('خ', 'الخروج والإخراج والتحرر', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('خ', 'الخروج والتحرر', MeaningType.SECONDARY, 0.7, []);
    this.addLetterMeaning('خ', 'صوت الخرق والاختراق', MeaningType.PRIMARY, 1.0, []);

    // د - الدال
    this.addLetterMeaning('د', 'الدخول والدعم والقوة', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('د', 'الدخول والقوة', MeaningType.SECONDARY, 0.7, []);
    this.addLetterMeaning('د', 'البدء والانتهاء', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('د', 'الثبات', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('د', 'الباب والفتح', MeaningType.PRIMARY, 1.0, []);

    // ذ - الذال
    this.addLetterMeaning('ذ', 'صوت اللذة', MeaningType.PRIMARY, 1.0, []);

    // ر - الراء
    this.addLetterMeaning('ر', 'التدفق', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ر', 'التكرار', MeaningType.SECONDARY, 1.0, []);
    this.addLetterMeaning('ر', 'الحركة', MeaningType.PRIMARY, 1.0, []);

    // ز - الزاي
    this.addLetterMeaning('ز', 'الانزلاق', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ز', 'التزود والتزويد', MeaningType.SECONDARY, 1.0, []);

    // س - السين
    this.addLetterMeaning('س', 'الزحف', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('س', 'الاحتكاك', MeaningType.SECONDARY, 1.0, []);
    this.addLetterMeaning('س', 'الخفوت والتسلل', MeaningType.PRIMARY, 1.0, []);

    // ش - الشين
    this.addLetterMeaning('ش', 'التشتت والانتشار', MeaningType.PRIMARY, 1.0, []);

    // ص - الصاد
    this.addLetterMeaning('ص', 'صوت قارع أقوى من السين', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ص', 'المراقبة والإنصات', MeaningType.SECONDARY, 1.0, []);

    // ض - الضاد
    this.addLetterMeaning('ض', 'ضمور', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ض', 'ركود', MeaningType.SECONDARY, 1.0, []);
    this.addLetterMeaning('ض', 'تصاغر', MeaningType.PRIMARY, 1.0, []);

    // ط - الطاء
    this.addLetterMeaning('ط', 'الطرق والاستئذان', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ط', 'الانفلات والتحليق', MeaningType.SECONDARY, 1.0, []);

    // ظ - الظاء
    this.addLetterMeaning('ظ', 'الغلظة', MeaningType.PRIMARY, 1.0, []);

    // ع - العين
    this.addLetterMeaning('ع', 'الدفع', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ع', 'القلع', MeaningType.SECONDARY, 1.0, []);

    // غ - الغين
    this.addLetterMeaning('غ', 'صوت الغضب والغليان', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('غ', 'تغييب', MeaningType.SECONDARY, 1.0, []);

    // ف - الفاء
    this.addLetterMeaning('ف', 'فجوة', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ف', 'صوت انفجار', MeaningType.SECONDARY, 1.0, []);

    // ق - القاف
    this.addLetterMeaning('ق', 'الدقة', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ق', 'البُعد', MeaningType.SECONDARY, 1.0, []);

    // ك - الكاف
    this.addLetterMeaning('ك', 'العطاء', MeaningType.PRIMARY, 1.0, []);

    // ل - اللام
    this.addLetterMeaning('ل', 'السحل', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ل', 'الالتفاف', MeaningType.SECONDARY, 1.0, []);
    this.addLetterMeaning('ل', 'الإحاطة', MeaningType.PRIMARY, 1.0, []);

    // م - الميم
    this.addLetterMeaning('م', 'الضم والتخبي', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('م', 'الرضا', MeaningType.SECONDARY, 1.0, []);
    this.addLetterMeaning('م', 'الكتم', MeaningType.PRIMARY, 1.0, []);

    // ن - النون
    this.addLetterMeaning('ن', 'الظهور', MeaningType.PRIMARY, 1, ['بائن، بيان، تبيين']);
    this.addLetterMeaning('ن', 'النشوء', MeaningType.SECONDARY, 1, ['نشأ، النشئ، النشأة']);
    this.addLetterMeaning('ن', 'الانبثاق', MeaningType.PRIMARY, 1, ['نبغ، نبع']);
    this.addLetterMeaning('ن', 'صوت الأنين والاستقرار', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ن', 'الظهور والنشوء', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ن', 'رمز يقوم مقام كلمة (شيء)', MeaningType.PRIMARY, 1.0, []);

    // ه - الهاء
    this.addLetterMeaning('ه', 'الجهد والتعب', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ه', 'النتيجة والثمرة', MeaningType.SECONDARY, 1.0, []);

    // و - الواو
    this.addLetterMeaning('و', 'تعجب', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('و', 'هجوم', MeaningType.SECONDARY, 1.0, []);
    this.addLetterMeaning('و', 'مباغتة', MeaningType.PRIMARY, 1.0, []);

    // ي - الياء
    this.addLetterMeaning('ي', 'تألم نفسي', MeaningType.PRIMARY, 1.0, []);
    this.addLetterMeaning('ي', 'حسرة', MeaningType.SECONDARY, 1.0, []);
  }