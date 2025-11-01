/**
 * عرض تجريبي تفاعلي لنظام بصيرة AI
 * Interactive Demo for Baserah AI System
 */

import { FinalBrainManager } from '../src/brain/finalBrainManager';
import { FinalLearningManager } from '../src/learning/finalLearningManager';
import { DatabaseManager } from '../src/databases/databaseManager';
import { FinalIntegrationManager } from '../src/integration/finalIntegrationManager';
import * as readline from 'readline';

// ألوان للعرض
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
  red: '\x1b[31m'
};

class BaserahAIDemo {
  private brain: FinalBrainManager;
  private learning: FinalLearningManager;
  private database: DatabaseManager;
  private integration: FinalIntegrationManager;
  private rl: readline.Interface;

  constructor() {
    console.log(`${colors.bright}${colors.cyan}`);
    console.log('═══════════════════════════════════════════════════════════');
    console.log('          🌟 بصيرة AI - Baserah AI System 🌟');
    console.log('     نظام ذكاء اصطناعي رياضي ثوري بدون شبكات عصبية');
    console.log('═══════════════════════════════════════════════════════════');
    console.log(colors.reset);

    // تهيئة الأنظمة
    console.log(`${colors.yellow}⚙️  جاري تهيئة الأنظمة...${colors.reset}`);
    this.brain = new FinalBrainManager();
    this.learning = new FinalLearningManager();
    this.database = new DatabaseManager();
    this.integration = new FinalIntegrationManager();

    // إعداد قاعدة البيانات
    this.setupDatabase();

    // إعداد واجهة القراءة
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    console.log(`${colors.green}✅ تم تهيئة جميع الأنظمة بنجاح!${colors.reset}\n`);
  }

  private setupDatabase(): void {
    // تسجيل قاعدة بيانات للمعرفة
    this.database.registerDatabase({
      name: 'knowledge_db',
      type: 'semantic',
      path: '/tmp/knowledge.db',
      maxConnections: 10,
      cacheSize: 1000,
      autoVacuum: true
    });

    // تسجيل قاعدة بيانات للحوارات
    this.database.registerDatabase({
      name: 'conversations_db',
      type: 'document',
      path: '/tmp/conversations.db',
      maxConnections: 5,
      cacheSize: 500,
      autoVacuum: true
    });
  }

  private printMenu(): void {
    console.log(`${colors.bright}${colors.blue}`);
    console.log('┌─────────────────────────────────────────────────────────┐');
    console.log('│                    القائمة الرئيسية                    │');
    console.log('├─────────────────────────────────────────────────────────┤');
    console.log('│ 1. 🧠 اختبار نظام الدماغ (Brain System)               │');
    console.log('│ 2. 📚 اختبار نظام التعلم (Learning System)            │');
    console.log('│ 3. 💾 اختبار قواعد البيانات (Database System)        │');
    console.log('│ 4. 🔗 اختبار نظام التكامل (Integration System)       │');
    console.log('│ 5. 🤖 محادثة ذكية (Smart Conversation)               │');
    console.log('│ 6. 📊 عرض الإحصائيات (Show Statistics)               │');
    console.log('│ 7. 🧪 اختبار شامل (Comprehensive Test)               │');
    console.log('│ 0. 🚪 خروج (Exit)                                     │');
    console.log('└─────────────────────────────────────────────────────────┘');
    console.log(colors.reset);
  }

  private async testBrainSystem(): Promise<void> {
    console.log(`\n${colors.cyan}═══ اختبار نظام الدماغ ═══${colors.reset}\n`);

    const testData = [
      { content: 'ما هو الذكاء الاصطناعي؟', priority: 8 },
      { content: 'كيف يعمل التعلم الآلي؟', priority: 7 },
      { content: 'شرح المعادلة الأم', priority: 9 }
    ];

    for (const data of testData) {
      console.log(`${colors.yellow}📝 السؤال: ${data.content}${colors.reset}`);
      
      const result = this.brain.processInformation({
        type: 'text',
        content: data.content,
        priority: data.priority
      });

      console.log(`${colors.green}✅ النتيجة:${colors.reset}`);
      console.log(`   - المعرف: ${result.id}`);
      console.log(`   - الحالة: ${result.status}`);
      console.log(`   - الأولوية: ${result.priority}`);
      console.log(`   - البيانات المعالجة: ${JSON.stringify(result.processedData).substring(0, 100)}...`);
      console.log('');
    }

    const stats = this.brain.getComprehensiveStatistics();
    console.log(`${colors.magenta}📊 إحصائيات نظام الدماغ:${colors.reset}`);
    console.log(`   - المعلومات المعالجة: ${stats.brain.processedInformation}`);
    console.log(`   - الذكريات المخزنة: ${stats.memory.totalMemories}`);
    console.log(`   - الأفكار المولدة: ${stats.thinking.totalThoughts}`);
  }

  private async testLearningSystem(): Promise<void> {
    console.log(`\n${colors.cyan}═══ اختبار نظام التعلم ═══${colors.reset}\n`);

    // التعلم من حوارات
    const conversations = [
      {
        query: 'ما هو الذكاء الاصطناعي؟',
        response: 'الذكاء الاصطناعي هو علم يهدف إلى إنشاء أنظمة ذكية تحاكي القدرات البشرية',
        feedback: 'شرح ممتاز وواضح!',
        positive: true
      },
      {
        query: 'كيف يعمل التعلم الآلي؟',
        response: 'التعلم الآلي يستخدم الخوارزميات لتحليل البيانات والتعلم من الأنماط',
        feedback: 'جيد جداً',
        positive: true
      }
    ];

    for (const conv of conversations) {
      console.log(`${colors.yellow}📝 السؤال: ${conv.query}${colors.reset}`);
      console.log(`${colors.blue}💬 الإجابة: ${conv.response}${colors.reset}`);
      
      this.learning.learnFromConversation(
        conv.query,
        conv.response,
        conv.feedback,
        conv.positive
      );
      
      console.log(`${colors.green}✅ تم التعلم من الحوار${colors.reset}\n`);
    }

    // تحسين إجابة
    const testResponse = 'إجابة قصيرة';
    const improved = this.learning.improveResponseWithLearning(
      testResponse,
      { topic: 'AI', userLevel: 'beginner' }
    );

    console.log(`${colors.magenta}🔄 تحسين الإجابة:${colors.reset}`);
    console.log(`   - الإجابة الأصلية: "${testResponse}"`);
    console.log(`   - الإجابة المحسنة: "${improved}"`);

    const stats = this.learning.getComprehensiveStatistics();
    console.log(`\n${colors.magenta}📊 إحصائيات نظام التعلم:${colors.reset}`);
    console.log(`   - الأنماط المتعلمة: ${stats.learningEngine.totalPatterns}`);
    console.log(`   - الأنماط المعترف بها: ${stats.patternRecognition.totalPatterns}`);
    console.log(`   - القواعد التكيفية: ${stats.adaptiveLearning.totalRules}`);
  }

  private async testDatabaseSystem(): Promise<void> {
    console.log(`\n${colors.cyan}═══ اختبار قواعد البيانات ═══${colors.reset}\n`);

    // تنفيذ استعلامات
    const queries = [
      {
        id: 'query1',
        database: 'knowledge_db',
        type: 'select' as const,
        query: 'SELECT * FROM concepts WHERE category = "AI"',
        priority: 8
      },
      {
        id: 'query2',
        database: 'conversations_db',
        type: 'insert' as const,
        query: 'INSERT INTO conversations (user, message) VALUES ("user1", "Hello")',
        priority: 5
      }
    ];

    for (const query of queries) {
      console.log(`${colors.yellow}🔍 الاستعلام: ${query.query}${colors.reset}`);
      
      const result = this.database.executeQuery(query);
      
      console.log(`${colors.green}✅ النتيجة:${colors.reset}`);
      console.log(`   - المعرف: ${result.id}`);
      console.log(`   - الحالة: ${result.status}`);
      console.log(`   - الصفوف المتأثرة: ${result.rowsAffected}`);
      console.log('');
    }

    const stats = this.database.getStatistics();
    console.log(`${colors.magenta}📊 إحصائيات قواعد البيانات:${colors.reset}`);
    console.log(`   - قواعد البيانات المسجلة: ${stats.totalDatabases}`);
    console.log(`   - الاتصالات النشطة: ${stats.activeConnections}`);
    console.log(`   - الاستعلامات المنفذة: ${stats.totalQueries}`);
  }

  private async testIntegrationSystem(): Promise<void> {
    console.log(`\n${colors.cyan}═══ اختبار نظام التكامل ═══${colors.reset}\n`);

    // تسجيل الأنظمة
    this.integration.registerSystem({
      id: 'brain',
      name: 'Brain System',
      type: 'processing',
      status: 'active',
      capabilities: ['process', 'think', 'remember']
    });

    this.integration.registerSystem({
      id: 'learning',
      name: 'Learning System',
      type: 'learning',
      status: 'active',
      capabilities: ['learn', 'improve', 'adapt']
    });

    console.log(`${colors.green}✅ تم تسجيل الأنظمة${colors.reset}\n`);

    // إنشاء خطة تكامل
    const plan = this.integration.createIntegrationPlan(
      'process_and_learn',
      ['brain', 'learning']
    );

    console.log(`${colors.magenta}📋 خطة التكامل:${colors.reset}`);
    console.log(`   - المعرف: ${plan.id}`);
    console.log(`   - الاسم: ${plan.name}`);
    console.log(`   - الأنظمة: ${plan.systems.join(', ')}`);
    console.log(`   - الحالة: ${plan.status}`);

    const stats = this.integration.getComprehensiveStatistics();
    console.log(`\n${colors.magenta}📊 إحصائيات نظام التكامل:${colors.reset}`);
    console.log(`   - الأنظمة المسجلة: ${stats.totalSystems}`);
    console.log(`   - الأنظمة النشطة: ${stats.activeSystems}`);
    console.log(`   - خطط التكامل: ${stats.totalIntegrationPlans}`);
  }

  private async smartConversation(): Promise<void> {
    console.log(`\n${colors.cyan}═══ محادثة ذكية ═══${colors.reset}\n`);
    console.log(`${colors.yellow}💬 اكتب سؤالك (أو 'خروج' للعودة):${colors.reset}\n`);

    const askQuestion = () => {
      this.rl.question(`${colors.bright}أنت: ${colors.reset}`, (question) => {
        if (question.toLowerCase() === 'خروج' || question.toLowerCase() === 'exit') {
          this.showMenu();
          return;
        }

        // معالجة السؤال بنظام الدماغ
        const brainResult = this.brain.processInformation({
          type: 'text',
          content: question,
          priority: 8
        });

        // تحسين الإجابة بنظام التعلم
        const response = this.learning.improveResponseWithLearning(
          `تمت معالجة سؤالك: "${question}"`,
          { topic: 'general', userLevel: 'intermediate' }
        );

        console.log(`${colors.green}🤖 بصيرة AI: ${response}${colors.reset}\n`);

        // حفظ في قاعدة البيانات
        this.database.executeQuery({
          id: `conv_${Date.now()}`,
          database: 'conversations_db',
          type: 'insert',
          query: `INSERT INTO conversations (question, answer) VALUES ("${question}", "${response}")`,
          priority: 5
        });

        askQuestion();
      });
    };

    askQuestion();
  }

  private showStatistics(): void {
    console.log(`\n${colors.cyan}═══ الإحصائيات الشاملة ═══${colors.reset}\n`);

    const brainStats = this.brain.getComprehensiveStatistics();
    const learningStats = this.learning.getComprehensiveStatistics();
    const dbStats = this.database.getStatistics();
    const integrationStats = this.integration.getComprehensiveStatistics();

    console.log(`${colors.bright}${colors.blue}🧠 نظام الدماغ:${colors.reset}`);
    console.log(`   - المعلومات المعالجة: ${brainStats.brain.processedInformation}`);
    console.log(`   - الذكريات: ${brainStats.memory.totalMemories}`);
    console.log(`   - الأفكار: ${brainStats.thinking.totalThoughts}\n`);

    console.log(`${colors.bright}${colors.green}📚 نظام التعلم:${colors.reset}`);
    console.log(`   - الأنماط المتعلمة: ${learningStats.learningEngine.totalPatterns}`);
    console.log(`   - الأنماط المعترف بها: ${learningStats.patternRecognition.totalPatterns}`);
    console.log(`   - القواعد التكيفية: ${learningStats.adaptiveLearning.totalRules}\n`);

    console.log(`${colors.bright}${colors.yellow}💾 قواعد البيانات:${colors.reset}`);
    console.log(`   - قواعد البيانات: ${dbStats.totalDatabases}`);
    console.log(`   - الاستعلامات: ${dbStats.totalQueries}`);
    console.log(`   - الاتصالات النشطة: ${dbStats.activeConnections}\n`);

    console.log(`${colors.bright}${colors.magenta}🔗 نظام التكامل:${colors.reset}`);
    console.log(`   - الأنظمة المسجلة: ${integrationStats.totalSystems}`);
    console.log(`   - الأنظمة النشطة: ${integrationStats.activeSystems}`);
    console.log(`   - خطط التكامل: ${integrationStats.totalIntegrationPlans}\n`);
  }

  private async comprehensiveTest(): Promise<void> {
    console.log(`\n${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}              🧪 اختبار شامل لجميع الأنظمة 🧪${colors.reset}`);
    console.log(`${colors.bright}${colors.cyan}═══════════════════════════════════════════════════════════${colors.reset}\n`);

    await this.testBrainSystem();
    await this.testLearningSystem();
    await this.testDatabaseSystem();
    await this.testIntegrationSystem();
    this.showStatistics();

    console.log(`${colors.bright}${colors.green}\n✅ اكتمل الاختبار الشامل بنجاح!${colors.reset}\n`);
  }

  public async showMenu(): Promise<void> {
    this.printMenu();
    
    this.rl.question(`${colors.bright}اختر رقم من القائمة: ${colors.reset}`, async (choice) => {
      switch (choice.trim()) {
        case '1':
          await this.testBrainSystem();
          this.showMenu();
          break;
        case '2':
          await this.testLearningSystem();
          this.showMenu();
          break;
        case '3':
          await this.testDatabaseSystem();
          this.showMenu();
          break;
        case '4':
          await this.testIntegrationSystem();
          this.showMenu();
          break;
        case '5':
          await this.smartConversation();
          break;
        case '6':
          this.showStatistics();
          this.showMenu();
          break;
        case '7':
          await this.comprehensiveTest();
          this.showMenu();
          break;
        case '0':
          console.log(`\n${colors.green}شكراً لاستخدامك بصيرة AI! 🌟${colors.reset}\n`);
          this.rl.close();
          process.exit(0);
          break;
        default:
          console.log(`${colors.red}❌ اختيار غير صحيح. حاول مرة أخرى.${colors.reset}\n`);
          this.showMenu();
      }
    });
  }

  public start(): void {
    this.showMenu();
  }
}

// تشغيل العرض التجريبي
const demo = new BaserahAIDemo();
demo.start();

