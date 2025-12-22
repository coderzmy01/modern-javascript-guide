// 1. 实现reduce
const arr = [1, 2, 3, 4];
const sum = arr.reduce((cur, prev) => cur + prev, 0);
console.log(sum);

// 重写reduce函数
Array.prototype.reduce = function (callbackFn, initialValue) {
    // 处理非函数

  if (typeof callbackFn !== 'function') throw new TypeError('callbackFn is not a function');
  let i = 0;
  if (initialValue === null || initialValue === undefined) {
    initialValue = this.at(0);
    i = 1;
  }
  for (; i < this.length; i++) {
    initialValue = callbackFn(initialValue, this[i], i, this);
  }
  return initialValue;
};

// 测试例子 - 尝试找出问题
console.log('=== 测试例子 ===');

// // 测试1: 基本求和
// try {
//   const test1 = [1, 2, 3, 4];
//   const result1 = test1.reduce((acc, cur) => acc + cur, 0);
//   console.log('测试1 - 基本求和:', result1); // 期望: 10
// } catch (e) {
//   console.error('测试1错误:', e.message);
// }

// 测试2: 没有初始值
// try {
//   const test2 = [1, 2, 3];
//   const result2 = test2.reduce((acc, cur) => acc + cur);
//   console.log('测试2 - 没有初始值:', result2); // 期望: 6
// } catch (e) {
//   console.error('测试2错误:', e.message);
// }

// 测试3: 累积对象
// try {
//   const test3 = [
//     { name: 'a', value: 1 },
//     { name: 'b', value: 2 },
//   ];
//   const result3 = test3.reduce((acc, cur) => {
//     acc[cur.name] = cur.value;
//     return acc;
//   }, {});
//   console.log('测试3 - 累积对象:', result3); // 期望: {a: 1, b: 2}
// } catch (e) {
//   console.error('测试3错误:', e.message);
// }

// // 测试4: 空数组
// try {
//   const test4 = [];
//   const result4 = test4.reduce((acc, cur) => acc + cur, 0);
//   console.log('测试4 - 空数组:', result4); // 期望: 0
// } catch (e) {
//   console.error('测试4错误:', e.message);
// }

// // 测试5: 空数组无初始值
// try {
//   const test5 = [];
//   const result5 = test5.reduce((acc, cur) => acc + cur);
//   console.log('测试5 - 空数组无初始值:', result5); // 期望报错
// } catch (e) {
//   console.error('测试5错误:', e.message);
// }

// // 测试6: 单元素数组
// try {
//   const test6 = [42];
//   const result6 = test6.reduce((acc, cur) => acc + cur);
//   console.log('测试6 - 单元素数组:', result6); // 期望: 42
// } catch (e) {
//   console.error('测试6错误:', e.message);
// }

// // 测试7: 获取索引和数组
// try {
//   const test7 = ['a', 'b', 'c'];
//   const result7 = test7.reduce((acc, cur, index, array) => {
//     acc.push(`${index}:${cur}`);
//     return acc;
//   }, []);
//   console.log('测试7 - 获取索引:', result7); // 期望: ['0:a', '1:b', '2:c']
// } catch (e) {
//   console.error('测试7错误:', e.message);
// }

// // 测试8: 初始值为null或undefined
// try {
//   const test8 = [1, 2, 3];
//   const result8 = test8.reduce((acc, cur) => acc + cur, null);
//   console.log('测试8 - 初始值为null:', result8); // 期望: 6
// } catch (e) {
//   console.error('测试8错误:', e.message);
// }

// // 测试9: 字符串数组
// try {
//   const test9 = ['hello', 'world'];
//   const result9 = test9.reduce((acc, cur) => acc + ' ' + cur, '');
//   console.log('测试9 - 字符串数组:', result9); // 期望: ' hello world'
// } catch (e) {
//   console.error('测试9错误:', e.message);
// }

// // 测试10: 过滤并求和
// try {
//   const test10 = [1, 2, 3, 4, 5];
//   const result10 = test10.reduce((acc, cur) => {
//     if (cur % 2 === 0) acc += cur;
//     return acc;
//   }, 0);
//   console.log('测试10 - 过滤并求和:', result10); // 期望: 6 (2+4)
// } catch (e) {
//   console.error('测试10错误:', e.message);
// }
// 传统方式的存在问题
/* 
1， 需要自己手动分析出相关的依赖，规划倒入的先后顺序，
2.  不基于闭包，会引发 全局变量污染
3.  解决模块间的相互访问
    1. 把需要外部访问的，挂载到全局变量上【需要暴露更多方法时，容易造成冲突】；
    2. 把模块中需要暴露的方法放在一个对象中管理，最后给予模块名存储这个对象就行；
----> 单例模式

AMD模式
1. 依赖模块提前指定；


*/