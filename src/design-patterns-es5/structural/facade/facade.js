/**
 * 外观模式/门面模式(Facade Pattern)
 * 隐藏系统的复杂性，并向客户端提供了一个客户端可以访问系统的接口
 * 作用: 简化复杂接口
 * 应用场景:
 * 1、为复杂的模块或子系统提供外界访问的模块
 * 2、polyfill
 * 3、三层架构(UI、BLL、DAL)
 */

// 假设场景
// 创建复杂对象(这个例子有点类似工程模式)
var Maker = (function () {
  var Shape = function () {
    // 内部包含复杂的结构
  }
  return {
    create: function () {
      return new Shape();
    }
  }
})();
var shape = Maker.create();

// 假设场景
// 解决跨浏览器添加事件
var EventUtil = {
  addHandler: function (element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + type, handler);
    } else {
      element["on" + type] = handler;
    }
  },
  removeHandler: function (element, type, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent('on' + type, handler);
    } else {
      element['on' + type] = handler;
    }
  },
  getEvent: function (event) {
    return event ? event : window.event;
  },
  getTarget: function (event) {
    return event.target || event.srcElement;
  },
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  }
}
