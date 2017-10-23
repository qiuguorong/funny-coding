/**
 * 组合模式(Composite Pattern)
 * 作用: 用户对单个对象和组合对象的使用具有一致性
 * 使用场景:
 * 部分、整体场景
 */

// 假设场景
// web页面中的菜单数据结构
function MenuItem(name, href) {
  this.name = name;
  this.href = href;
  this.items = [];
}
MenuItem.prototype = {
  addItem: function (item) {
    this.items.push(item);
  },
  removeItem: function (item) {
    // 省略实现
  },
  logItems: function () {
    for (var i = 0; i < this.items.length; i++) {
      console.log(this.items[i].name);
      if (this.items[i].items.length > 0) {
        this.items[i].logItems();
      }
    }
  }
}

var parent = new MenuItem('父节点', '#');
var child1 = new MenuItem('子节点1', '#');
var child2 = new MenuItem('子节点2', '#');
var child3 = new MenuItem('子节点3', '#');
parent.addItem(child1);
parent.addItem(child2);
child1.addItem(child3);
parent.logItems();
