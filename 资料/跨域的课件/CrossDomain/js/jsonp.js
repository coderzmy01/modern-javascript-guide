/* 
  封装一个jsonp方法「基于promise管理」,执行这个方法可以发送jsonp请求 
    jsonp([url],[options])
      options配置项
      + params:null/对象 问号参数信息
      + jsonpName:'callback' 基于哪个字段把全局函数名传递给服务器
      + ...
*/
(function () {
  /* 工具类方法 */
  // 检测是否为纯粹对象
  const toString = Object.prototype.toString;
  const isPlainObject = function isPlainObject(obj) {
    let proto, Ctor;
    if (!obj || toString.call(obj) !== "[object Object]") return false;
    proto = Object.getPrototypeOf(obj);
    if (!proto) return true;
    Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
    return typeof Ctor === "function" && Ctor === Object;
  };
  // 把对象变为URLENCODED格式字符串 xxx=xxx&xxx=xxx
  const stringify = function stringify(obj) {
    let keys = Reflect.ownKeys(obj),
      str = ``;
    keys.forEach(key => {
      let value = obj[key];
      str += `&${key}=${value}`;
    });
    return str.substring(1);
  };

  /* 核心功能 */
  const jsonp = function jsonp(url, options) {
    // 格式校验 && 合并默认配置项
    if (typeof url !== "string") throw new TypeError("url is not a string");
    if (!isPlainObject(options)) options = {};
    let { params, jsonpName } = Object.assign({
      params: null,
      jsonpName: "callback"
    }, options);

    // 返回promise实例
    return new Promise((resolve, reject) => {
      // 移除创建的全局函数&SCRIPT
      const clear = () => {
        delete window[name];
        document.body.removeChild(script);
      };

      // 先创建全局函数「备注：不能导致全局变量污染」
      const name = `jsonp${+new Date()}`;
      window[name] = function (data) {
        // 请求成功：会把创建的全局函数执行，DATA就是从服务器获取的结果
        resolve(data);
        clear();
      };

      // 处理URL：把PARAMS拼接上 & 把全局函数名也拼接上
      if (isPlainObject(params)) {
        params = stringify(params);
        url += `${url.includes("?") ? "&" : "?"}${params}`;
      }
      url += `${url.includes("?") ? "&" : "?"}${jsonpName}=${name}`;

      // 动态创建SCRIPT标签，向服务器发送请求
      const script = document.createElement("script");
      script.src = url;
      script.onerror = () => {
        // 请求失败
        reject();
        clear();
      };
      document.body.appendChild(script);
    });
  };

  /* 暴露API */
  if (typeof module === 'object' && typeof module.exports === 'object') module.exports = jsonp;
  if (typeof window !== 'undefined') window.jsonp = jsonp;
})();