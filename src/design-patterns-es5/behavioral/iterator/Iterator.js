/**
 * 迭代器模式(Iterator Pattern)
 * 内部迭代器与外部迭代器
 * 作用: 顺序访问集合对象的元素
 * 应用场景:
 * 1、访问一个聚合对象的内容而无须暴露它的内部表示
 * 2、需要为聚合对象提供多种遍历方式
 */

// 内部迭代器
// 已经定义好了迭代规则，它完全接手整个迭代过程，外部只需一次初始调用
var each = function (arr, callback) {
  for (var i = 0; i < arr.length; i++) {
    callback.call(arr[i], i, arr[i]);
  }
}
each([1, 2, 3, 4], function (i, n) {
  console.log(i + '-' + n);
})
console.log('------------------分割线------------------');
// 外部迭代器
// 必须显示地请求迭代下一个元素
// 核心属性index、hasNext、next
var Iterator = function (el) {
  this.index = 0;
  this.elements = el;
}
Iterator.prototype.hasNext = function () {
  return this.index < this.elements.length;
}
Iterator.prototype.next = function () {
  return this.elements[this.index++];
}
Iterator.prototype.getCurrentItem = function () {
  return this.elements[this.index];
}
var elements = ['福建', '浙江', '江苏', '山东', '天津'];
var iterator = new Iterator(elements);
while (iterator.hasNext()) {
  console.log(iterator.next());
}
