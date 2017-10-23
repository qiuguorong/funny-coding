/**
 * 工厂模式(Factory Pattern)
 * 在工厂模式中，我们在创建对象时不会对客户端暴露创建逻辑，并且是通过使用一个共同的接口来指向新创建的对象。
 * 作用: 解决接口选择的问题
 * 使用场景:
 * 1. 当对象或者组件设置涉及高复杂性时
 * 2. 当需要根据所在不同的环境轻松生产对象的不同实例时
 * 3. 当处理很多共享相同属性的小型对象或组件时
 *
 * 抽象工厂模式(Abstract Factory Pattern)
 * 若一个系统中包含了多个功能,如果要增加功能,就必须修改工厂类,这违背了闭包原则(对扩展开放,对修改关闭)
 * 所以就用到了抽象工厂,每个功能单独创建工厂类,然后通过抽象工厂统一管理工厂类
 *
 */

// 工厂
var Factory = (function () {
  var AConstruct = function () {
    this.name = '结构体A'
    this.logger = function (info) {
      console.log(info, this.name);
    }
  }
  var BConstruct = function () {
    this.name = '结构体B'
    this.logger = function (info) {
      console.log(info, this.name);
    }
  }
  return {
    create: function (type) {
      switch (type) {
        case 'A':
          return new AConstruct();
        case 'B':
          return new BConstruct();
        default:
          return null;
      }

    }
  }
})();

// run demo
Factory.create('A').logger('Factory');
Factory.create('B').logger('Factory');

// 抽象工厂
var AbstractManager = (function () {
  var FactoryA = Factory;
  var FactoryB = Factory;
  return {
    provider: function (type) {
      switch (type) {
        case 'FactoryA':
          return FactoryA;
          break;
        case 'FactoryB':
          return FactoryB;
          break;
      }
    }
  }
})();
// run demo
AbstractManager.provider('FactoryA').create('A').logger('AbstractManager');
AbstractManager.provider('FactoryB').create('B').logger('AbstractManager');
