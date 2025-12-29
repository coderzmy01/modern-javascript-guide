/* 
  封装一个jsonp方法「基于promise管理」,执行这个方法可以发送jsonp请求 
    jsonp([url],[options])
      options配置项
      + params:null/对象 问号参数信息
      + jsonp:null 传递的函数名
      + jsonpName:'callback' 基于哪个字段把全局函数名传递给服务器
      + ...
*/
(function () {
  /* 工具类方法 */
  const toString = Object.prototype.toString;
  const isPlainObject = function isPlainObject(obj) {
    let proto, Ctor;
    if (!obj || toString.call(obj) !== "[object Object]") return false;
    proto = Object.getPrototypeOf(obj);
    if (!proto) return true;
    Ctor = proto.hasOwnProperty('constructor') && proto.constructor;
    return typeof Ctor === "function" && Ctor === Object;
  };
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
    if (typeof url !== "string") throw new TypeError("url is not a string");
    if (!isPlainObject(options)) options = {};
    let { params, jsonpName, jsonp } = Object.assign({
      params: null,
      jsonp: null,
      jsonpName: "callback"
    }, options);

    return new Promise((resolve, reject) => {
      const clear = () => {
        delete window[name];
        document.body.removeChild(script);
      };
      const name = jsonp || `jsonp${+new Date()}`;
      window[name] = function (data) {
        resolve(data);
        clear();
      };

      if (isPlainObject(params)) {
        params = stringify(params);
        url += `${url.includes("?") ? "&" : "?"}${params}`;
      }
      url += `${url.includes("?") ? "&" : "?"}${jsonpName}=${name}`;
      url += `${url.includes("?") ? "&" : "?"}_=${+new Date()}`;

      const script = document.createElement("script");
      script.src = url;
      script.onerror = () => {
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