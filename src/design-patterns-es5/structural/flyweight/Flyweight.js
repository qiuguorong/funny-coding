/**
 * 享元模式(Flyweight Pattern)
 * 内部状态和外部状态
 * 内部状态: 存在于对象内部,可以被共享,通常不会变化
 * 外部状态: 根据场景变化而变化
 * 作用: 主要用于减少创建对象的数量，以减少内存占用和提高性能
 * 应用场景:
 * 1、系统中有大量相似对象
 * 2、需要缓冲池
 */

// 假设场景
// 需要随机创建50个有颜色的点
// 当对象较少时,不会出现问题,但当点对象指数增加时,内存占用也有指数上升,性能急速下降甚至崩溃
var pointLength = 50;
var colorArr = ['red', 'white', 'black', 'green', 'yellow'];
var Point = function (color) {
  this.color = color;
  this.show = function () {
    console.log(this.color + ' show on (' + this.x + ',' + this.y + ')');
  }
}

// Bad
console.log('Bad:');
for (var i = 0; i < pointLength; i++) {
  var index = Math.floor(Math.random() * 5);
  var point = new Point(colorArr[index]);
  point.x = i;
  point.y = i;
  point.show();
}
console.log('---------------------分割线---------------------');
// Good
console.log('Good:');
var pointFactory = {
  points: {},
  create: function (color) {
    var point = this.points[color];
    if (point) return point;
    this.points[color] = new Point(color);
    return this.points[color];
  }
};
for (var i = 0; i < pointLength; i++) {
  var index = Math.floor(Math.random() * 5);
  var point = pointFactory.create(colorArr[index]);
  point.x = i;
  point.y = i;
  point.show();
}
