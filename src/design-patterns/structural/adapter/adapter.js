/**
 * 适配器模式(Adapter Pattern)
 * 两个不兼容的接口之间的桥梁
 * 作用: 将一个类的接口转换成客户希望的另外一个接口
 * 应用场景:
 * 
 */

// 假设场景
// 原本有一个函数接受两个参数,而客户需要的是要要接受一个对象,则可以通过适配器来实现
var sum = function (a, b) {
  return a + b;
}
var sumAdapert = function (obj) {
  return sum(obj.a, obj.b);
}
console.log('原有函数', sum(1,2));
console.log('适配函数', sumAdapert({a: 1, b: 2}));
