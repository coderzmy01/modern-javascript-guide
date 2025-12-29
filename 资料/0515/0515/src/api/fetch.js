/*
 http([config])
   + url 请求地址
   + method 请求方式  *GET/DELETE/HEAD/OPTIONS/POST/PUT/PATCH
   + credentials 携带资源凭证  *include/same-origin/omit
   + headers:null 自定义的请求头信息「格式必须是纯粹对象」
   + body:null 请求主体信息「只针对于POST系列请求，根据当前服务器要求，如果用户传递的是一个纯粹对象，我们需要把其变为urlencoded格式字符串(设定请求头中的Content-Type)...」
   + params:null 设定问号传参信息「格式必须是纯粹对象，我们在内部把其拼接到url的末尾」
   + responseType 预设服务器返回结果的读取方式  *json/text/arrayBuffer/blob
   + signal 中断请求的信号
 -----
 http.get/head/delete/options([url],[config])  预先指定了配置项中的url/method
 http.post/put/patch([url],[body],[config])  预先指定了配置项中的url/method/body
 */