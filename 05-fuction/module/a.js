let AModule = (function () {
  let name = 'a模块';
  const sum = (...params) => {
    return params.reduce((m, n) => m + n);
  };
  return {
    sum,
  };
})();
