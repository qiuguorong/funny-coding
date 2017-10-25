/**
 * 策略模式(Strategy Pattern)
 * 作用: 一个类的行为或其算法可以在运行时更改
 * 应用场景:
 * 1、使用多重条件判断
 * 2、系统内部许多类,之间仅在行为有区别
 */

// 假设场景
// 有个计算需求,需要进行特殊的加法、减法、乘法,还要方便的扩展除法,便可以使用策略模式
var operation = {
  add: function (a, b) {
    return a + b;
  },
  substract: function (a, b) {
    return a - b;
  },
  multiply: function (a, b) {
    return a * b;
  }
}

var Calculate = function (op) {
  this.operation = op;
}
Calculate.prototype.execute = function (a, b) {
  return this.operation(a, b);
}

var add = new Calculate(operation.add);
var substract = new Calculate(operation.substract);
var multiply = new Calculate(operation.multiply);
console.log('加法', add.execute(1, 2));
console.log('减法', substract.execute(1, 2));
console.log('乘法', multiply.execute(1, 2));


