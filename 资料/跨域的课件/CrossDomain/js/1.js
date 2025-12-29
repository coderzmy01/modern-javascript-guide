/* 
 同源策略请求 && 非同源策略(跨域)请求
   HTML页面预览的地址：http://127.0.0.1:5500/index.html
   基于Ajax发送请求的数据接口地址：http://127.0.0.1:9999/user/list
   如果两个地址的“协议、域名、端口号”完全一致，则是同源请求，只要有一个不一样，则就是跨域请求！！
      + 同源请求：把web页面和后台的接口程序部署在“相同服务器的相同服务下”
      + 跨域请求：页面和后台分开部署「同一台服务器的不同端口下、或者不同服务器下...」
   项目场景：
      + 开发的时候：我们在自己的电脑上启动服务预览项目，但是后台的程序在其他的服务器上，没有在一起，此时的数据请求就是“跨域”的！！
      + 部署到服务器：
        + 全部署在一起(相同服务器的相同服务下)，此时就是同源「不建议」
        + 当代部署一般都是分服务器部署，也就是页面和后台是部署在不同服务器上的，此时就是跨域
      + ...
   默认情况下不允许Ajax跨域请求，因为浏览器有“安全策略”
      Access to XMLHttpRequest at 'https://www.jianshu.com/asimov...' from origin 'http://127.0.0.1:5500' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
   服务器和服务器之间默认是没有跨域限制的

 ==============================
 非同源策略（跨域）请求方案：
   + proxy跨域代理：原理就是利用“服务器和服务器之间不存在跨域”来实现的
     步骤：
       @1 在本地启动一个服务：一方面可以实现页面的预览，另一方面也可以代理转发数据请求
       @2 我们以后再发数据请求，发送给本地启动的这个服务，而这个服务会去真正的服务器上获取到相关的数据，再返回给客户端！！
     + 本地开发的时候，我们基于proxy跨域代理来完成「webpack-dev-server、Node...」
     + 部署到服务器的时候，我们一般是基于nginx的反向代理来处理

   + CORS跨域资源共享：默认因为浏览器的安全策略，是不允许ajax跨域访问的，但是如果服务器设置了 Access-Control-Allow-Origin 响应头信息，设置允许这个源发送请求，那么浏览器也就不在去限制了！！
     步骤：
       @1 由服务器设置允许源
         Access-Control-Allow-Origin 设置允许的源「白名单机制」
         Access-Control-Allow-Credentials 是否允许携带资源凭证「例如:cookie」
           服务器端设置了允许，则客户端也要配合设置允许
           axios.defaults.withCredentials = true;
           xhr.withCredentials=true;
         Access-Control-Allow-Headers 设置允许的请求头
         Access-Control-Allow-Methods 设置允许的请求方式
       @2 在CORS跨域共享中，客户端首先会尝试发送一个OPTIONS试探请求，验证是否连接成功，连接成功后，再发送真正的请求！！

   + JSONP跨域解决方案
     原理：利用了<script>标签不存在域的限制来实现的，同样的<img>、<link>、<iframe>等标签也不存在域的限制...
     步骤：
       @1 基于 <script> 的src指定请求的地址，实现请求的发送「没有域的限制」；我们会创建一个“全局函数”，在发送请求的时候，会基于问号传参，把全局函数“名”基于“callback「自己定义:和服务器商量好的」”传递给服务器
         const fn=function fn(data){
            //...
         };
         <script src='http://127.0.0.1:1001/list?callback=fn'>
       @2 服务器会收到对应的请求，并且基于“callback”获取传递过来的函数名
         + 准备数据 [{id:1,name:'xxx'},{id:2,name:'xxx'},...]
         + 把函数名和数据拼接在一起，成为指定格式的字符串  “fn([{id:1,name:'xxx'},{id:2,name:'xxx'},...])”
         + 最后返回给客户端这个字符串
       @3 客户端获取到 “fn(...)” 字符串，因为基于 <script> 发送的，所以会默认把其当做js代码执行
         + 也就是把全局函数fn执行，并且把服务器准备的数据当做实参传递给了函数
         + 这也是为啥fn必须是全局函数了，如果是私有的，在此处执行的时候，找不到私有的fn
     问题：
       + 只能发送GET请求，因为<script>本身只有GET请求，没有办法发送POST请求
       + 一定需要服务器的支持和配合
*/


/* axios.defaults.withCredentials = true;
axios.get('http://127.0.0.1:1001/list')
    .then(response => {
        console.log(response.data);
    }); */