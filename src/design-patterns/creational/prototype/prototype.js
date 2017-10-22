/**
 * 原型模式(Prototype Pattern)
 * 通过拷贝原型创建新的对象
 * 作用: 有效的利用每个构造器创建对象
 * 应用场景:
 * 创建重复的对象
 */

// 使用原型链
var father = {
  name: 'father',
  birthday: new Date('1991-04-07'),
  structure: ['脸','身体','手','脚'],
  clothes:{
    jacket: '夹克',
    jean: '牛仔裤',
    shoes: '鞋子'
  },
  speak: function () {
    console.log('I can speak');
  },
}
var son = Object.create(father);
son.name = 'son';
console.log(father, son);
console.log('----------------------分割线----------------------');

// 不使用原型链, 使用深拷贝
// 推荐参考loadsh的深拷贝,可以解决大部分的深拷贝情况
// 情况列举
// 1、普通对象 2、嵌套对象 3、数组对象 4、函数对象,包括闭包 5、DOM对象/BOM对象 6、原型对象(prototype) 还有啥没想到...
var deepClone = function (source) {
  // 实现不了,无能为力
  // 推荐loadsh的深拷贝或jq的$.extend();
}
var daughter = deepClone(father);
