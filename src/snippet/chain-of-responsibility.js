/**
 * 职责链模式(Chain of Responsibility)
 * Q: 如果有多个对象都有可能接受请求，如何避免请求发送者与接收者耦合在一起呢？
 * A: 使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。
 *    将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。
 * 应用场景:
 */

function ChainOfResponsibility(handler) {
  this.nextHandler = handler || null;
}
ChainOfResponsibility.prototype.setNextHandler = function (handler) {
  this.nextHandler = handler;
}
ChainOfResponsibility.prototype.handleRequest = function (param) {
  this.nextHandler && this.nextHandler.handleRequest(param);
}

var chainStart = new ChainOfResponsibility();
chainStart.handleRequest = function (param) {
  // 初始化 ...
  console.log('start chain');
  //this.nextHandler && this.nextHandler.handleRequest(param);
  this.nextHandler && ChainOfResponsibility.prototype.handleRequest.call(this, param);
}
var chainA = new ChainOfResponsibility();
chainA.handleRequest = function (param){
  if(param == 1){
    console.log('handle a request');
  }
  //this.nextHandler && this.nextHandler.handleRequest(param);
  this.nextHandler && ChainOfResponsibility.prototype.handleRequest.call(this, param);
}
var chainB = new ChainOfResponsibility();
chainB.handleRequest = function (param){
  if(param == 2){
    console.log('handle b request');
  }
  //this.nextHandler && this.nextHandler.handleRequest(param);
  this.nextHandler && ChainOfResponsibility.prototype.handleRequest.call(this, param);
}
var chainEnd = new ChainOfResponsibility();
chainEnd.handleRequest = function (param) {
  // 职责链结束 ...
  console.log('end chain');
  //this.nextHandler && this.nextHandler.handleRequest(param);
  this.nextHandler && ChainOfResponsibility.prototype.handleRequest.call(this, param);
}

//创建职责链条
chainStart.setNextHandler(chainA);
chainA.setNextHandler(chainB);
chainB.setNextHandler(chainEnd);

chainStart.handleRequest(1);
