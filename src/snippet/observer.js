/**
 * 观察者模式(Observer)
 * 观察者模式又叫发布订阅模式（Publish/Subscribe），它定义了一种一对多的关系。
 * 让多个观察者对象同时监听某一个主题对象，这个主题对象的状态发生变化时就会通知所有的观察者对象。
 * 对象包含订阅者和发布者, 功能包含订阅、发布、退订功能, 如javascript事件功能
 */

var Observer = {
  topics: {},
  // 订阅
  on: function (topic, func) {
    var cbs = this.topics[topic];
    cbs ? cbs.push(func) : this.topics[topic] = [];
    if (!cbs) {
      this.topics[topic].push(func)
    }
  },
  // 发布
  emit: function (topic) {
    var cbs = this.topics[topic];
    var args = Array.prototype.slice.call(arguments,1);
    if(cbs){
      for(var i=0;i<cbs.length;i++){
        cbs[i].apply(this,args);
      }
    }
  },
  // 退订
  off: function (topic) {
    var cbs = this.topics[topic];
    if(cbs){
      var i = cbs.length;
      while(i--){
        cbs.splice(i,1);
      }
    }
  }
};

// run on-emit
Observer.on('test', function (a) {
  console.log(a);
});
Observer.on('test', function (a,b) {
  console.log(a,b);
});
Observer.emit('test',1,2);
// run off
Observer.on('testoff', function (a) {
  console.log(a);
});
Observer.off('testoff');
Observer.emit('testoff',3);
