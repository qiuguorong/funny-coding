/**
 * 代理模式(Proxy Pattern)
 * 作用: 一个类代表另一个类的功能
 * 应用场景:
 * 1. 远程代理
 * 2. 虚拟代理
 * 3. 保护代理
 */

// 假设场景
// 实现图片预加载
var myImage = (function () {
  var imgNode = document.createElement('img');
  document.body.appendChild(imgNode);
  return {
    setSrc: function (src) {
      imgNode.src = src;
    }
  }
})();

// Bad
myImage.setSrc('resource.png');

// God
var proxyImage = (function () {
  var img = Image();
  img.onload = function () {
    myImage.setSrc(this.src);
  }
  return {
    setSrc: function (src) {
      myImage.setSrc('loading.gif');
      img.src = src;
    }
  }
})();
proxyImage.setSrc('resource.png');
