/*
 * @Date: 2020-12-30 10:38:43
 * @Author: luxiaofeng
 * @LastEditors: luxiaofeng
 * @LastEditTime: 2020-12-30 17:48:20
 */

function compose(...mws) {
  return mws.reduce((a, b) => (...args) => b(a(...args)));
}
function compose1(...mws) {
  let ret = null;
  return function (startArg) {
    ret = startArg;
    mws.forEach((mw) => {
      ret = mw(ret);
    });
    return ret;
  };
}

function add(next) {
  return (val) => {
    console.log(val, 1);
    const res = next(val);
    console.log("1--");
    return res;
  };
}

function square(next) {
  return (val) => {
    console.log(val, 2);
    const res = next(val);
    console.log("2--");
    return res;
  };
}

function trigger() {
  console.log("第一个函数");
}
const dispatch = compose1(add, square)(trigger);
dispatch(33);
