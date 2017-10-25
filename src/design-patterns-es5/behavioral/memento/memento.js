/**
 * 备忘录模式(Memento Pattern)
 * 作用: 保存一个对象的某个状态，以便在适当的时候恢复对象
 * 应用场景:
 * 1、需要保存/恢复数据的相关状态场景(Cache、SessionStorage、LocalStorage、IndexedDB)
 * 2、提供一个可回滚的操作
 */

// 备忘录类
var Memento = function (value) {
  this.value = value;
}
// 备忘录管理类
var Originator = function(){}
Originator.prototype.store = function (value) {
    return new Memento(value);
}
Originator.prototype.restore = function (memento) {
    return memento.value;
}
// 客户
function Caretaker() {
  this.values = [];
}
Caretaker.prototype.addMemento = function(memento) {
  this.values.push(memento);
};
Caretaker.prototype.getMemento = function(index) {
  return this.values[index];
};

var originator = new Originator();
var caretaker = new Caretaker();
var memento1 = originator.store('state1');
var memento2 = originator.store('state2');
caretaker.addMemento(memento1);
caretaker.addMemento(memento2);

