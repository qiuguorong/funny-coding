/**
 * 建造者模式(Builder Pattern)
 * 使用多个简单的对象一步一步构建成一个复杂的对象(各司其职,拆解流程)
 * 作用:
 * 主要解决在软件系统中，有时候面临着"一个复杂对象"的创建工作，其通常由各个部分的子对象用一定的算法构成；
 * 由于需求的变化，这个复杂对象的各个部分经常面临着剧烈的变化，但是将它们组合在一起的算法却相对稳定。
 * 应用场景:
 * 1、需要生成的对象具有复杂的内部结构
 * 2、需要生成的对象内部属性本身相互依赖。
 */

// 假设场景:
// 如电商系统中的组合套餐, 包含上衣、裤子、鞋子
// 后续扩展可以再加入帽子、袜子等
// 上衣夹克
function Jacket() {
  this.type = 'jacket';
  this.size = ['S', 'M', 'L'];
  this.color = ['red', 'black'];
}
// 牛仔裤
function Jean() {
  this.type = 'jean';
  this.size = ['33', '34', '35'];
  this.color = ['blue', 'black'];
}
// 鞋子
function Shoes() {
  this.type = 'shoes'
  this.size = ['31', '32', '33'];
  this.color = ['white', 'black'];
}
// 组合套餐
function Package() {
  this.items = [];
  this.addItem = function (item) {
    this.items.push(item);
  }
  this.getItem = function (type) {
    var _items = [];
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].type === type) {
        _items.push(this.items[i]);
      }
    }
    return _items;
  }
  this.showItems = function (info) {
    console.info(info);
    for (var i = 0; i < this.items.length; i++) {
      console.log(this.items[i]);
    }
  }
}
// 生成套餐 / 指挥类
function Builder() {
  // 创建A套餐, 夹克、裤子、鞋子
  this.createAPackage = function () {
    var _package = new Package();
    _package.addItem(new Jacket());
    _package.addItem(new Jean());
    _package.addItem(new Shoes());
    return _package;
  }
  // 创建B套餐, 夹克、两条裤子
  this.createBPackage = function () {
    var _package = new Package();
    _package.addItem(new Jacket());
    _package.addItem(new Jean());
    _package.addItem(new Jean());
    return _package;
  }
}
// run  demo
var builder = new Builder();
// create A package
var aPackage = builder.createAPackage();
aPackage.showItems('A套餐');
console.log('获取夹克对象', aPackage.getItem('jacket'));
// create B package
var bPackage = builder.createBPackage();
bPackage.showItems('B套餐');
console.log('获取牛仔裤对象', bPackage.getItem('jean'));
console.log('----------------------分割线----------------------');
