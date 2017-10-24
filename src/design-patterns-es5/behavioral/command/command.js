/**
 * 命令模式(Command Pattern)
 * 作用: 将行为请求者与行为实现者进行解耦
 * 应用场景:
 * 1、行为请求者与行为实现者是一种紧耦合的关系
 * 2、认为是命令的地方都可以使用命令模式
 */

// 假设场景
// 场外指导员指导驾驶员开车, 有启动、加速、减速、停止这几种操作

var Driver = function () {}
Driver.prototype.execute = function(command) {
  command.execute();
};

var Car = function () {
  this.speed = 0;
}
Car.prototype.speedUp = function () {
  // 加速...
  console.log('汽车加速');
}
Car.prototype.speedDown = function () {
  // 减速...
  console.log('汽车减速');
}
Car.prototype.run = function () {
  // 启动...
  console.log('汽车启动');
}
Car.prototype.stop = function () {
  // 停止...
  console.log('汽车停止');
}

var Command = function (Car, command) {
  this.Car = Car;
  this.command = command;
  this.execute = function () {
    this.Car[command]();
  }
}

var car = new Car();
// 接收者
var driver = new Driver();
// 命令
var run = new Command(car, 'run');
var stop = new Command(car, 'stop');
var speedUp = new Command(car, 'speedUp');
var speedDown = new Command(car, 'speedDown');
// 开始指导
driver.execute(run);
driver.execute(speedUp);
driver.execute(speedDown);
driver.execute(speedUp);
driver.execute(stop);
