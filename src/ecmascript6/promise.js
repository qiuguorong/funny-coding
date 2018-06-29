var promise1 = function () {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve(1);
    }, 1000);
  });
}
var promise2 = function () {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve(2);
    }, 1000);
  });
}
var promise3 = function () {
  return new Promise((resolve, reject) => {
    window.setTimeout(() => {
      resolve(3);
    }, 1000);
  });
}

promise1()
.then((resp) => {
  // 1回调
  console.log(resp);
  return promise2();
})
.then((resp) => {
  // 2回调
  console.log(resp);
  return promise3();
})
.then((resp) => {
  // 3回调
  console.log(resp);
})
.catch((error) => {
  // 捕捉任一错误
  console.log('error', error);
});