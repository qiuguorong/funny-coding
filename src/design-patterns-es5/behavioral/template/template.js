/**
 * 模板模式(Template Pattern)
 * 作用: 固定算法骨架,可以不改变一个算法的结构即可重定义该算法的某些特定步骤
 * 应用场景:
 * 1、有多个子类共有的方法，且逻辑相同
 * 2、重要的、复杂的方法，可以考虑作为模板方法。
 */

// 假设场景
// 有个Game抽象类,内部定义了玩游戏的固定算法规则,具体游戏实现具体规则
var NOOP = function () {}
var Game = function () {}
// 初始化游戏
Game.prototype.initialize = NOOP;
// 开始游戏
Game.prototype.start = NOOP;
// 结束游戏
Game.prototype.end = NOOP;
// 算法骨架
Game.prototype.play = function () {
  this.initialize();
  this.start();
  this.end();
}

var Basketball = function () {}
Basketball.prototype = Object.create(Game.prototype);
Basketball.prototype.initialize = function () {
  console.log('篮球初始化');
}
Basketball.prototype.start = function () {
  console.log('篮球开始游戏');
}
Basketball.prototype.end = function () {
  console.log('篮球结束游戏');
}
var basketball = new Basketball();
basketball.play();

var Football = function () {}
Football.prototype = Object.create(Game.prototype);
Football.prototype.initialize = function () {
  console.log('足球初始化');
}
Football.prototype.start = function () {
  console.log('足球开始游戏');
}
Football.prototype.end = function () {
  console.log('足球结束游戏');
}
var football = new Football();
football.play();
