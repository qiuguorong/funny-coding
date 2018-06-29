// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

require = (function (modules, cache, entry) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof require === "function" && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof require === "function" && require;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }
      
      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module;

      modules[name][0].call(module.exports, localRequire, module, module.exports);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module() {
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  // Override the current require with this new one
  return newRequire;
})({2:[function(require,module,exports) {
"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// ES6 const
var ES6_CONST = 'es6';
var ES5_CONST = {};
var ES5_CONST_TEST = 'hello';
// 数据描述符和存取描述符
Object.defineProperty(ES5_CONST, 'test', {
  configurable: false, // 默认,可配置（删除属性，修改特性）
  enumerable: false, // 默认，可枚举
  // writable: false, // 默认，可赋值
  // value: 'es5-test', //
  get: function get() {
    console.log('object property get hook');
    return ES5_CONST_TEST;
  },
  set: function set(value) {
    console.log('object property set hook');
    value = ES5_CONST_TEST;
  }
});
console.log(ES5_CONST.test);
ES5_CONST.test = '123';
// ES6 let

var _loop = function _loop(_i) {
  window.setTimeout(function () {
    console.log('es6 ' + _i);
  }, 100);
};

for (var _i = 0; _i < 10; _i++) {
  _loop(_i);
}
// ES5
var loop = function loop(i) {
  window.setTimeout(function () {
    console.log('es5 ' + i);
  }, 100);
};
for (var i = 0; i < 10; i++) {
  loop(i);
}
// ES5 IIFE
for (var i = 0; i < 10; i++) {
  (function (index) {
    window.setTimeout(function () {
      console.log('es5 iife ' + index);
    }, 100);
  })(i);
}

var undeclared_variable = 0;
if (true) {
  // ES6环境下会报错（暂时性死区），Babel转码es5后，不会报错
  console.log(typeof _undeclared_variable === "undefined" ? "undefined" : _typeof(_undeclared_variable));
  var _undeclared_variable = 1;
}

// 变量解构赋值
// 数组的解构赋值，条件：模式匹配，数据结构具有 Iterator 接口
var a = 1,
    b = 2,
    c = 3;

var _ref,
    d = _ref === undefined ? 4 : _ref,
    e = 6;

console.log('a: ' + a, 'b: ' + b, 'c: ' + c, 'd: ' + d, 'e: ' + e);
// 对象的解构赋值
// let { foo, bar } = { bar: { a: 1, b: 2 }, foo: 'foo' };
// console.log('foo: ' + foo , 'bar: ' + bar);
// 函数的解构赋值
var func = function func(_ref2) {
  var foo = _ref2.foo,
      bar = _ref2.bar;

  console.log('foo: ' + foo, 'bar: ' + bar);
};
func({ foo: 1, bar: 2 });
// 字符串的解构赋值

var _abc = 'abc',
    _abc2 = _slicedToArray(_abc, 3),
    strA = _abc2[0],
    strB = _abc2[1],
    strC = _abc2[2];

console.log(strA, strB, strC);
},{}],0:[function(require,module,exports) {
var global = (1, eval)('this');
var OldModule = module.bundle.Module;
function Module() {
  OldModule.call(this);
  this.hot = {
    accept: function (fn) {
      this._acceptCallback = fn || function () {};
    },
    dispose: function (fn) {
      this._disposeCallback = fn;
    }
  };
}

module.bundle.Module = Module;

if (!module.bundle.parent && typeof WebSocket !== 'undefined') {
  var ws = new WebSocket('ws://localhost:58799/');
  ws.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      data.assets.forEach(function (asset) {
        hmrApply(global.require, asset);
      });

      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.require, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        window.location.reload();
      }
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + 'data.error.stack');
    }
  };
}

function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || (Array.isArray(dep) && dep[dep.length - 1] === id)) {
        parents.push(+k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  if (cached && cached.hot._disposeCallback) {
    cached.hot._disposeCallback();
  }

  delete bundle.cache[id];
  bundle(id);

  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallback) {
    cached.hot._acceptCallback();
    return true;
  }

  return getParents(global.require, id).some(function (id) {
    return hmrAccept(global.require, id)
  });
}
},{}]},{},[0,2])