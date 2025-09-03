const { resolveToolHandlers, testFunctions, demoFunctions } = require('./resolveToolHandlers');

// 运行内置测试
console.log('Running built-in tests...');
testFunctions();

// 自定义测试示例
const customTest = async () => {
  console.log('\n=== Custom Test Examples ===');
  
  try {
    // 示例1: 简单的数学运算
    const mathFunction = {
      name: "calculate",
      code: `
        function main(args) {
          const { operation, a, b } = args;
          switch(operation) {
            case 'add': return a + b;
            case 'subtract': return a - b;
            case 'multiply': return a * b;
            case 'divide': return b !== 0 ? a / b : 'Error: Division by zero';
            default: return 'Unknown operation';
          }
        }
      `
    };
    
    const mathHandler = await resolveToolHandlers([mathFunction]);
    console.log('calculate(add, 10, 5) =', await mathHandler[0].exec({ operation: 'add', a: 10, b: 5 }));
    console.log('calculate(multiply, 6, 7) =', await mathHandler[0].exec({ operation: 'multiply', a: 6, b: 7 }));
    
    // 示例2: 字符串处理
    const stringFunction = {
      name: "stringProcessor",
      code: `
        function main(args) {
          const { text, action } = args;
          switch(action) {
            case 'uppercase': return text.toUpperCase();
            case 'lowercase': return text.toLowerCase();
            case 'reverse': return text.split('').reverse().join('');
            case 'length': return text.length;
            case 'words': return text.split(' ').length;
            default: return text;
          }
        }
      `
    };
    
    const stringHandler = await resolveToolHandlers([stringFunction]);
    console.log('stringProcessor("Hello World", "uppercase") =', 
      await stringHandler[0].exec({ text: "Hello World", action: "uppercase" }));
    console.log('stringProcessor("Hello World", "reverse") =', 
      await stringHandler[0].exec({ text: "Hello World", action: "reverse" }));
    
    // 示例3: 数组处理
    const arrayFunction = {
      name: "arrayProcessor",
      code: `
        function main(args) {
          const { array, operation } = args;
          switch(operation) {
            case 'sum': return array.reduce((sum, num) => sum + num, 0);
            case 'average': return array.reduce((sum, num) => sum + num, 0) / array.length;
            case 'max': return Math.max(...array);
            case 'min': return Math.min(...array);
            case 'sort': return array.slice().sort((a, b) => a - b);
            case 'unique': return [...new Set(array)];
            default: return array;
          }
        }
      `
    };
    
    const arrayHandler = await resolveToolHandlers([arrayFunction]);
    const testArray = [3, 1, 4, 1, 5, 9, 2, 6];
    console.log('arrayProcessor([3,1,4,1,5,9,2,6], "sum") =', 
      await arrayHandler[0].exec({ array: testArray, operation: "sum" }));
    console.log('arrayProcessor([3,1,4,1,5,9,2,6], "unique") =', 
      await arrayHandler[0].exec({ array: testArray, operation: "unique" }));
    
    // 示例4: 日期时间处理
    const dateFunction = {
      name: "dateProcessor",
      code: `
        function main(args) {
          const { date = new Date(), format } = args;
          const d = new Date(date);
          
          switch(format) {
            case 'iso': return d.toISOString();
            case 'local': return d.toLocaleString();
            case 'date': return d.toDateString();
            case 'time': return d.toTimeString();
            case 'timestamp': return d.getTime();
            case 'year': return d.getFullYear();
            case 'month': return d.getMonth() + 1;
            case 'day': return d.getDate();
            case 'weekday': return d.getDay();
            default: return d.toString();
          }
        }
      `
    };
    
    const dateHandler = await resolveToolHandlers([dateFunction]);
    console.log('dateProcessor(new Date(), "iso") =', 
      await dateHandler[0].exec({ date: new Date(), format: "iso" }));
    console.log('dateProcessor(new Date(), "year") =', 
      await dateHandler[0].exec({ date: new Date(), format: "year" }));
    
  } catch (error) {
    console.error('Custom test failed:', error);
  }
};

// 错误处理测试
const errorTest = async () => {
  console.log('\n=== Error Handling Test ===');
  
  try {
    // 测试危险代码检测
    const dangerousFunction = {
      name: "dangerous",
      code: `
        function main(args) {
          require('fs').readFileSync('/etc/passwd');
          return 'dangerous';
        }
      `
    };
    
    await resolveToolHandlers([dangerousFunction]);
    console.log('❌ Dangerous code was not detected!');
  } catch (error) {
    console.log('✅ Dangerous code detected:', error.message);
  }
  
  try {
    // 测试语法错误
    const syntaxErrorFunction = {
      name: "syntaxError",
      code: `
        function main(args) {
          return args.a + ; // 语法错误
        }
      `
    };
    
    const handlers = await resolveToolHandlers([syntaxErrorFunction]);
    await handlers[0].exec({ a: 5 });
    console.log('❌ Syntax error was not caught!');
  } catch (error) {
    console.log('✅ Syntax error caught:', error.message);
  }
};

// 性能测试
const performanceTest = async () => {
  console.log('\n=== Performance Test ===');
  
  const performanceFunction = {
    name: "performance",
    code: `
      function main(args) {
        const { iterations = 1000 } = args;
        let result = 0;
        for(let i = 0; i < iterations; i++) {
          result += Math.sqrt(i);
        }
        return result;
      }
    `
  };
  
  const start = Date.now();
  const handlers = await resolveToolHandlers([performanceFunction]);
  const result = await handlers[0].exec({ iterations: 10000 });
  const end = Date.now();
  
  console.log(`Performance test completed in ${end - start}ms`);
  console.log('Result:', result);
};

// 运行所有测试
const runAllTests = async () => {
  await customTest();
  await errorTest();
  await performanceTest();
};

// 如果直接运行此文件
if (require.main === module) {
  runAllTests();
}

module.exports = {
  customTest,
  errorTest,
  performanceTest,
  runAllTests
};
