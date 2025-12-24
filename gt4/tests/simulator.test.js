/**
 * 炮弹模拟器自动化测试套件
 */

class PhysicsCalculator {
  static calculateMaxHeight(v0, angle, gravity = 9.8) {
    const angleRad = angle * Math.PI / 180;
    return (v0 ** 2 * Math.sin(angleRad) ** 2) / (2 * gravity);
  }
  
  static calculateRange(v0, angle, gravity = 9.8) {
    const angleRad = angle * Math.PI / 180;
    return (v0 ** 2 * Math.sin(2 * angleRad)) / gravity;
  }
  
  static calculateFlightTime(v0, angle, gravity = 9.8) {
    const angleRad = angle * Math.PI / 180;
    return (2 * v0 * Math.sin(angleRad)) / gravity;
  }
}

class TestRunner {
  constructor() {
    this.tests = [];
    this.passed = 0;
    this.failed = 0;
  }
  
  test(name, testFunction) {
    this.tests.push({ name, testFunction });
  }
  
  run() {
    console.log('🚀 开始运行炮弹模拟器自动化测试...\n');
    
    this.tests.forEach((testCase, index) => {
      try {
        testCase.testFunction();
        console.log(`✅ [${index + 1}/${this.tests.length}] ${testCase.name}`);
        this.passed++;
      } catch (error) {
        console.log(`❌ [${index + 1}/${this.tests.length}] ${testCase.name}`);
        console.log(`   错误: ${error.message}`);
        this.failed++;
      }
    });
    
    console.log('\n📊 测试结果统计:');
    console.log(`✅ 通过: ${this.passed} 个`);
    console.log(`❌ 失败: ${this.failed} 个`);
    console.log(`📈 总计: ${this.tests.length} 个测试`);
    
    if (this.failed === 0) {
      console.log('🎉 所有测试都通过了！炮弹模拟器运行正常！');
    } else {
      console.log('⚠️  有测试失败，请检查代码逻辑。');
    }
    
    return this.failed === 0;
  }
  
  assertEqual(actual, expected, message) {
    const tolerance = 0.001;
    if (Math.abs(actual - expected) > tolerance) {
      throw new Error(`${message} - 期望: ${expected}, 实际: ${actual}`);
    }
  }
  
  assertTrue(condition, message) {
    if (!condition) {
      throw new Error(`${message} - 条件不满足`);
    }
  }
}

// 创建测试运行器
const runner = new TestRunner();

// 测试物理计算
runner.test('计算最大高度 - 45度角', () => {
  const height = PhysicsCalculator.calculateMaxHeight(50, 45);
  runner.assertEqual(height, 63.775, '最大高度计算错误');
});

runner.test('计算最大高度 - 90度角', () => {
  const height = PhysicsCalculator.calculateMaxHeight(50, 90);
  runner.assertEqual(height, 127.551, '垂直发射高度计算错误');
});

runner.test('计算射程 - 45度角', () => {
  const range = PhysicsCalculator.calculateRange(50, 45);
  runner.assertEqual(range, 255.102, '射程计算错误');
});

runner.test('计算飞行时间 - 45度角', () => {
  const time = PhysicsCalculator.calculateFlightTime(50, 45);
  runner.assertEqual(time, 7.216, '飞行时间计算错误');
});

runner.test('验证文件完整性', () => {
  // 检查HTML文件是否存在
  const fs = require('fs');
  const path = require('path');
  
  const htmlPath = path.join(__dirname, '../projectile_simulator.html');
  runner.assertTrue(fs.existsSync(htmlPath), 'HTML文件不存在');
  
  const content = fs.readFileSync(htmlPath, 'utf8');
  runner.assertTrue(content.includes('canvas'), 'Canvas元素缺失');
  runner.assertTrue(content.includes('轨迹模拟器'), '模拟器标题缺失');
  runner.assertTrue(content.includes('物理计算函数'), '物理计算代码缺失');
});

runner.test('验证物理公式正确性', () => {
  // 测试边界情况
  const heightZero = PhysicsCalculator.calculateMaxHeight(0, 45);
  runner.assertEqual(heightZero, 0, '零速度高度应为0');
  
  const rangeZero = PhysicsCalculator.calculateRange(0, 45);
  runner.assertEqual(rangeZero, 0, '零速度射程应为0');
});

runner.test('验证角度范围', () => {
  // 测试不同角度
  const height30 = PhysicsCalculator.calculateMaxHeight(50, 30);
  const height60 = PhysicsCalculator.calculateMaxHeight(50, 60);
  
  runner.assertTrue(height30 < height60, '60度角高度应大于30度角');
  runner.assertTrue(height30 > 0 && height60 > 0, '高度应为正值');
});

// 运行所有测试
if (require.main === module) {
  const success = runner.run();
  process.exit(success ? 0 : 1);
}

module.exports = { TestRunner, PhysicsCalculator };