/**
 * 中介者模式(Mediator Pattern)
 * 作用: 降低多个对象和类之间的通信复杂性
 * 应用场景:
 * 1、对象与对象之间存在大量的关联关系(MVC中的M和V,C为中介者)
 * 2、想通过一个中间类来封装多个类中的行为
 */

// 假设场景
// 多人聊天室
var User = function (name) {
  this.name = name;
}
User.prototype.sendMessage = function (message) {
  ChatRoom.showMessage(this, message)
}
var ChatRoom = (function () {
  return {
    showMessage: function (user, message) {
      console.log(user.name + ' say: ' + message);
    }
  };
})();

var userA = new User('John');
var userB = new User('Robert');
userA.sendMessage('你好!');
userB.sendMessage('啊?你说什么?我近视听不懂!');
userA.sendMessage('-.-');
