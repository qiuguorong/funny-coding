/**
 * 访问者模式(Visitor Pattern)
 * 作用: 主要将数据结构与数据操作分离
 * 应用场景:
 * 1、对象结构中对象对应的类很少改变，但经常需要在此对象结构上定义新的操作
 * 2、需要对一个对象结构中的对象进行很多不同的并且不相关的操作，而需要避免让这些操作"污染"这些对象的类，也不希望在增加新操作时修改这些类。
 */

// 假设场景
// 需要提供一个借口访问计算机内部的元件
var Keyboard = function () {}
Keyboard.prototype.accept = function (visitor) {
  visitor.visit(this);
}
var Monitor = function () {}
Monitor.prototype.accept = function (visitor) {
  visitor.visit(this);
}
// 基础数据结构
var Computer = function () {
  this.parts = [new Keyboard(), new Monitor()];
}
Computer.prototype.accept = function (visitor) {
  visitor.visit(this);
  this.acceptAll(visitor);
}
Computer.prototype.acceptAll = function (visitor) {
  for (var i = 0; i < this.parts.length; i++) {
    this.parts[i].accept(visitor);
  }
}

// 访问者,可进行数据操作
var Visitor = function () {}
Visitor.prototype.visit = function (item) {
  if (item.constructor == Keyboard) {
    console.log('Visit Keyboard');
  } else if (item.constructor == Monitor) {
    console.log('Visit Monitor');
  } else if (item.constructor == Computer) {
    console.log('Visit Computer');
  } else {
    console.log('Null');
  }
}

// run demo
var computer = new Computer();
computer.accept(new Visitor());
