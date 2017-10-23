/**
 * 桥接模式(Bridge Pattern)
 * 作用:用于把抽象化与实现化解耦，使得二者可以独立变化
 * 应用场景:
 * 1、组件开发
 * 2、设计API
 */

// 假设场景 - 组件开发
// 开发一个弹框插件,插件中有dialog与alert两种弹框类型,每种弹框还可以有不同的动效展示
// MessageBox类似抽象类,Animate类似实现类,二者独立变化
var MessageBox = {
  dialog: function (animate) {
    this.animate = animate;
    this.show = function () {
      this.animate.show();
    }
  },
  alert: function (animate) {
    this.animate = animate;
    this.show = function () {
      this.animate.show();
    }
  }
}
var Animate = {
  easyIn: function () {
    this.show = function () {
      console.log('Animate easyIn show');
    }
  },
  easyOut:function () {
    this.show = function () {
      console.log('Animate easyOut show');
    }
  }
}
var easyIn = new Animate.easyIn();
var easyOut = new Animate.easyOut();
var dialog = new MessageBox.dialog(easyIn);
var alert = new MessageBox.dialog(easyOut);
dialog.show();
alert.show();
