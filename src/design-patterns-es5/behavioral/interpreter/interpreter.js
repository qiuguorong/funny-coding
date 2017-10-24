/**
 * 解释器模式(Interpreter Pattern)
 * 角色: 抽象表达式角色(Expression)、终结符表达式角色、非终结符表达式角色、环境角色(Context)
 * 作用: 于一些固定文法构建一个解释句子的解释器
 * 使用场景:
 * 1、一些重复出现的问题可以用一种简单的语言来进行表达
 * 2、一个简单语法需要解释的场景
 */

// 假设场景
// 设置基本三个条件,man/woman/programmer、一个AND条件、一个OR条件
// 普通表达式
var Expression = function (data) {
  this.data = data;
}
Expression.prototype.interpret = function (context) {
  if (context.indexOf(this.data) != -1) {
    return true;
  }
  return false;
}
// And表达式
var AndExpression = function (expr1, expr2) {
  this.expr1 = expr1;
  this.expr2 = expr2;
}
AndExpression.prototype.interpret = function (context) {
  return this.expr1.interpret(context) && this.expr2.interpret(context)
}
// Or表达式
var OrExpression = function (expr1, expr2) {
  this.expr1 = expr1;
  this.expr2 = expr2;
}
OrExpression.prototype.interpret = function (context) {
  return this.expr1.interpret(context) || this.expr2.interpret(context)
}

var man = new Expression('Man');
var woman = new Expression('Woman');
var programmer = new Expression('Programmer');
var manAndProgrammer = new AndExpression(man, programmer);
var manOrProgrammer = new OrExpression(man, programmer);
var womanAndProgrammer = new AndExpression(woman, programmer);
console.log('ManProgrammer满足男性并且是程序员条件吗?', manAndProgrammer.interpret('ManProgrammer'));
console.log('ManProgrammer满足男性或者是程序员条件吗?', manOrProgrammer.interpret('ManProgrammer'));
console.log('WomanProgrammer满足男性并且是程序员条件条件吗?', manAndProgrammer.interpret('WomanProgrammer'));
console.log('WomanProgrammer满足男性或者是程序员条件条件吗?', manOrProgrammer.interpret('WomanProgrammer'));
console.log('WomanProgrammer满足女性并且是程序员条件条件吗?', womanAndProgrammer.interpret('WomanProgrammer'));
