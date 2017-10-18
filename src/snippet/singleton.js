/**
 * 单例模式(Singleton Pattern)
 * 应用场景:
 * 1. 资源共享,如整个系统拥有一个全局对象(配置文件)
 * 2. 控制资源,方便资源之间的互相通信
 *
 * 需注意:
 * 在多线程情况下,若两个线程同时调用创建方法,那么它们同时没有检测到唯一实例的存在,而各自创建了一个实例,从而两个实例被构造出来了。
 * 解决这个问题的办法是为指示类是否已经实例化的变量提供一个互斥锁
 */

var Singleton = (function () {
  var instance = null;
  function Construct() {
    this.name = 'Singleton Pattern'
    this.method = function () {
      console.log('execute method', this.name);
    }
  }
  return {
    getInstance: function () {
      if(!instance){
        instance = new Construct();
      }
      return instance;
    }
  }
})()

// run
Singleton.getInstance().method();
