#!/usr/bin/env node

/**
 * 自动化测试运行器
 * 支持多种测试模式和报告生成
 */

const fs = require('fs');
const path = require('path');

class AdvancedTestRunner {
  constructor(options = {}) {
    this.options = {
      verbose: options.verbose || false,
      timeout: options.timeout || 5000,
      ...options
    };
    this.results = [];
    this.startTime = null;
  }
  
  async runTestSuite() {
    this.startTime = Date.now();
    console.log('🎯 炮弹模拟器自动化测试系统启动...\n');
    
    // 运行物理计算测试
    await this.runPhysicsTests();
    
    // 运行文件完整性测试
    await this.runFileIntegrityTests();
    
    // 运行性能测试
    await this.runPerformanceTests();
    
    // 生成测试报告
    this.generateReport();
    
    return this.results.every(r => r.status === 'passed');
  }
  
  async runPhysicsTests() {
    const physicsTests = [
      {
        name: '最大高度计算',
        test: () => {
          const v0 = 50, angle = 45;
          const expected = 63.775;
          const actual = this.calculateMaxHeight(v0, angle);
          this.assertApproxEqual(actual, expected, 0.001);
          return { v0, angle, expected, actual };
        }
      },
      {
        name: '射程计算',
        test: () => {
          const v0 = 50, angle = 45;
          const expected = 255.102;
          const actual = this.calculateRange(v0, angle);
          this.assertApproxEqual(actual, expected, 0.001);
          return { v0, angle, expected, actual };
        }
      },
      {
        name: '飞行时间计算',
        test: () => {
          const v0 = 50, angle = 45;
          const expected = 7.216;
          const actual = this.calculateFlightTime(v0, angle);
          this.assertApproxEqual(actual, expected, 0.001);
          return { v0, angle, expected, actual };
        }
      }
    ];
    
    for (const test of physicsTests) {
      await this.runSingleTest(test, 'physics');
    }
  }
  
  async runFileIntegrityTests() {
    const fileTests = [
      {
        name: 'HTML文件存在性检查',
        test: () => {
          const htmlPath = path.join(__dirname, '../projectile_simulator.html');
          if (!fs.existsSync(htmlPath)) {
            throw new Error('HTML文件不存在');
          }
          return { path: htmlPath, exists: true };
        }
      },
      {
        name: 'HTML内容验证',
        test: () => {
          const htmlPath = path.join(__dirname, '../projectile_simulator.html');
          const content = fs.readFileSync(htmlPath, 'utf8');
          
          const checks = {
            hasCanvas: content.includes('canvas'),
            hasScript: content.includes('script'),
            hasPhysics: content.includes('calculateMaxHeight') || content.includes('物理计算'),
            hasControls: content.includes('input') || content.includes('button')
          };
          
          const missing = Object.entries(checks)
            .filter(([_, exists]) => !exists)
            .map(([key]) => key);
          
          if (missing.length > 0) {
            throw new Error(`缺少必要元素: ${missing.join(', ')}`);
          }
          
          return checks;
        }
      }
    ];
    
    for (const test of fileTests) {
      await this.runSingleTest(test, 'file');
    }
  }
  
  async runPerformanceTests() {
    const perfTests = [
      {
        name: '物理计算性能测试',
        test: () => {
          const startTime = Date.now();
          const iterations = 10000;
          
          for (let i = 0; i < iterations; i++) {
            this.calculateMaxHeight(50, 45);
            this.calculateRange(50, 45);
            this.calculateFlightTime(50, 45);
          }
          
          const duration = Date.now() - startTime;
          const opsPerSecond = (iterations * 3) / (duration / 1000);
          
          if (opsPerSecond < 1000) {
            throw new Error(`性能过低: ${opsPerSecond.toFixed(0)} 操作/秒`);
          }
          
          return { iterations, duration, opsPerSecond };
        }
      }
    ];
    
    for (const test of perfTests) {
      await this.runSingleTest(test, 'performance');
    }
  }
  
  async runSingleTest(testConfig, category) {
    const testStart = Date.now();
    
    try {
      const result = await Promise.race([
        testConfig.test(),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('测试超时')), this.options.timeout)
        )
      ]);
      
      const duration = Date.now() - testStart;
      this.results.push({
        name: testConfig.name,
        category,
        status: 'passed',
        duration,
        result
      });
      
      console.log(`✅ ${testConfig.name} (${duration}ms)`);
      
    } catch (error) {
      const duration = Date.now() - testStart;
      this.results.push({
        name: testConfig.name,
        category,
        status: 'failed',
        duration,
        error: error.message
      });
      
      console.log(`❌ ${testConfig.name} - ${error.message} (${duration}ms)`);
    }
  }
  
  generateReport() {
    const totalDuration = Date.now() - this.startTime;
    const passed = this.results.filter(r => r.status === 'passed').length;
    const failed = this.results.filter(r => r.status === 'failed').length;
    
    console.log('\n📊 测试报告');
    console.log('='.repeat(50));
    console.log(`总测试数: ${this.results.length}`);
    console.log(`✅ 通过: ${passed}`);
    console.log(`❌ 失败: ${failed}`);
    console.log(`⏱️  总耗时: ${totalDuration}ms`);
    console.log(`📈 成功率: ${((passed / this.results.length) * 100).toFixed(1)}%`);
    
    // 按类别统计
    const categories = {};
    this.results.forEach(result => {
      if (!categories[result.category]) {
        categories[result.category] = { passed: 0, failed: 0 };
      }
      if (result.status === 'passed') {
        categories[result.category].passed++;
      } else {
        categories[result.category].failed++;
      }
    });
    
    console.log('\n📋 分类统计:');
    Object.entries(categories).forEach(([category, stats]) => {
      console.log(`  ${category}: ✅${stats.passed} ❌${stats.failed}`);
    });
    
    // 生成HTML报告
    this.generateHTMLReport();
  }
  
  generateHTMLReport() {
    const reportPath = path.join(__dirname, '../test-report.html');
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>炮弹模拟器测试报告</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .passed { color: green; }
        .failed { color: red; }
        .test-result { margin: 10px 0; padding: 10px; border-left: 4px solid; }
        .summary { background: #f5f5f5; padding: 15px; border-radius: 5px; }
    </style>
</head>
<body>
    <h1>🎯 炮弹模拟器测试报告</h1>
    <div class="summary">
        <p>测试时间: ${new Date().toLocaleString()}</p>
        <p>总测试数: ${this.results.length}</p>
        <p class="passed">通过: ${this.results.filter(r => r.status === 'passed').length}</p>
        <p class="failed">失败: ${this.results.filter(r => r.status === 'failed').length}</p>
    </div>
    
    <h2>详细结果</h2>
    ${this.results.map(result => `
        <div class="test-result ${result.status === 'passed' ? 'passed' : 'failed'}">
            <strong>${result.name}</strong> 
            <span>(${result.category}) - ${result.duration}ms</span>
            ${result.status === 'failed' ? `<br><em>错误: ${result.error}</em>` : ''}
        </div>
    `).join('')}
</body>
</html>`;
    
    fs.writeFileSync(reportPath, html);
    console.log(`\n📄 HTML测试报告已生成: ${reportPath}`);
  }
  
  // 物理计算方法
  calculateMaxHeight(v0, angle, gravity = 9.8) {
    const angleRad = angle * Math.PI / 180;
    return (v0 ** 2 * Math.sin(angleRad) ** 2) / (2 * gravity);
  }
  
  calculateRange(v0, angle, gravity = 9.8) {
    const angleRad = angle * Math.PI / 180;
    return (v0 ** 2 * Math.sin(2 * angleRad)) / gravity;
  }
  
  calculateFlightTime(v0, angle, gravity = 9.8) {
    const angleRad = angle * Math.PI / 180;
    return (2 * v0 * Math.sin(angleRad)) / gravity;
  }
  
  assertApproxEqual(actual, expected, tolerance) {
    if (Math.abs(actual - expected) > tolerance) {
      throw new Error(`期望 ${expected}，实际 ${actual}，误差超过 ${tolerance}`);
    }
  }
}

// 命令行接口
if (require.main === module) {
  const args = process.argv.slice(2);
  const options = {
    verbose: args.includes('--verbose') || args.includes('-v'),
    timeout: parseInt(args.find(arg => arg.startsWith('--timeout='))?.split('=')[1] || '5000')
  };
  
  const runner = new AdvancedTestRunner(options);
  runner.runTestSuite().then(success => {
    process.exit(success ? 0 : 1);
  }).catch(error => {
    console.error('测试运行错误:', error);
    process.exit(1);
  });
}

module.exports = AdvancedTestRunner;