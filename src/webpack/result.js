
(function webpack (root, factory) {
  // umd
})(this, function () {
  return (function (modules) {
    var installedModules = {};
    // 模块加载器
    function __webpack_require__(moduleId) {
      // Check if module is in cache
      if(installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      // Create a new module (and put it into the cache)
      var module = installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {}
      };
      modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
      
      return module.exports;
    }

    return __webpack_require__(0);
  })([
    // moduleId：0
    (function (module, exports) {
      exports.default = _messageBox2.default;
      module.exports = exports['default'];
    }),
    // moduleId：1
    (function (module, exports) {}),
  ])
})