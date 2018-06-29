// ES6 const
const ES6_CONST = 'es6';
var ES5_CONST = {};
var ES5_CONST_TEST = 'hello';
// 数据描述符和存取描述符
Object.defineProperty(ES5_CONST, 'test', {
  configurable: false, // 默认,可配置（删除属性，修改特性）
  enumerable: false, // 默认，可枚举
  // writable: false, // 默认，可赋值
  // value: 'es5-test', //
  get: function () {
    console.log('object property get hook');
    return ES5_CONST_TEST;
  },
  set: function (value) {
    console.log('object property set hook');
    value = ES5_CONST_TEST;
  }
});
console.log(ES5_CONST.test);
ES5_CONST.test = '123';
// ES6 let
for (let i = 0; i < 10; i++) {
  window.setTimeout(() => {
    console.log('es6 ' + i);
  }, 100);
}
// ES5
var loop = function (i) {
  window.setTimeout(function(){
    console.log('es5 ' + i);
  }, 100);
}
for (var i = 0; i < 10; i++) {
  loop(i);
}
// ES5 IIFE
for (var i = 0; i < 10; i++) {
  (function (index) {
    window.setTimeout(function(){
      console.log('es5 iife ' + index);
    }, 100);
  })(i)
}

var undeclared_variable = 0;
if(true){
  // ES6环境下会报错（暂时性死区），Babel转码es5后，不会报错
  console.log(typeof undeclared_variable);
  let undeclared_variable = 1;
}

// 变量解构赋值
// 数组的解构赋值，条件：模式匹配，数据结构具有 Iterator 接口
let [a, b, c] = [1, 2, 3];
let [d = 4, e] = [, 6];
console.log('a: ' + a, 'b: ' + b, 'c: ' + c, 'd: ' + d, 'e: ' + e);
// 对象的解构赋值
// let { foo, bar } = { bar: { a: 1, b: 2 }, foo: 'foo' };
// console.log('foo: ' + foo , 'bar: ' + bar);
// 函数的解构赋值
let func = function ({ foo, bar }) {
  console.log('foo: ' + foo, 'bar: ' + bar);
}
func({ foo: 1, bar: 2 });
// 字符串的解构赋值
let [strA, strB, strC] = 'abc';
console.log(strA, strB, strC);