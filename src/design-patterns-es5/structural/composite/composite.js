/**
 * 组合模式(Composite Pattern)
 * 作用: 用户对单个对象和组合对象的使用具有一致性
 * 使用场景:
 * 部分、整体场景
 */

// 假设场景
// web页面中的菜单数据结构
function MenuItem() {
  this.name = '';
  this.href = '';
  this.items = [];
}
MenuItem.prototype.addItem = function (item) {
  this.items.push(item);
}
MenuItem.prototype.removeItem = function (item) {
  
}

