/**
 * 装饰者模式(Decorator Pattern)
 * 允许向一个现有的对象添加新的功能，同时又不改变其结构
 * 作用: 动态地给一个对象添加一些额外的职责
 * 应用场景:
 * 1、动态增加功能，动态撤销。
 * 2、扩展一个类的功能
 */

// 假设场景
// 对工具类Utils进行扩展
(function () {
  var utils = {
    isApp: false,
    getUrlParam: function () {
      // do something
    }
  }
  window.Utils = utils;
})();
(function (utils) {
  utils.isLogin = function () {
    // do something
  }
})(window.Utils);
console.log(window.Utils);

console.log('-----------------分割线-----------------');

// 假设场景
// 将形状修饰上不同的颜色
var Shape = function () {
  this.draw = function () {
    console.log('抽象类');
  }
}
var Rectangle = function () {
  Shape.apply(this);
  this.draw = function () {
    console.log('正方形:');
  }
};
var Circle = function () {
  Shape.apply(this);
  this.draw = function () {
    console.log('圆形:');
  }
};
var ColorDecorator = function (shape, color) {
  this.draw = function () {
    shape.draw();
    this.setColor(color);
  }
  this.setColor = function (color) {
    console.log('设置形状颜色: ' + color);
  }
}
var redCircle = new ColorDecorator(new Circle(), 'red');
redCircle.draw();
var blackRectangle = new ColorDecorator(new Rectangle(), 'black');
blackRectangle.draw();
