/**
 * 状态模式(State Pattern)
 * 环境类、状态类
 * 作用: 一个对象的内部状态发生改变时，会导致其行为的改变
 * 应用场景:
 * 1、行为随状态改变而改变的场景
 * 2、条件、分支语句的代替者
 */

// 假设场景
// 一个开关装置,有On/Off状态,不同状态下,处理不同的行为
// 状态类
var OnState = function () {}
OnState.prototype.doAction = function () {
  console.log('开关打开');
}
var OffState = function () {}
OffState.prototype.doAction = function () {
  console.log('开关关闭');
}
// 环境类
var Switch = function () {
  this.doAction = function (state) {
    state.doAction();
  }
}

// run demo
var on_of = new Switch();
var on = new OnState();
var off = new OffState();
on_of.doAction(on);
on_of.doAction(off);
