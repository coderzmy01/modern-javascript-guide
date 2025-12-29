/* 
 第一步：URL解析
    URI:URL+URN
      + URI统一资源标识符
      + URL统一资源定位符
      + URN统一资源名称
    传输协议：
      + HTTP  超文本传输协议
      + HTTPS  HTTP+SSL(加密证书),相对于HTTP来讲会更加安全
      + FTP 文件的传输，例如：FTP上传工具、FTP资源共享...
    域名：服务器有一个外网IP，基于外网IP找到服务器，而域名就是给外网IP设置一个好记忆的名字
    端口号：区分同一台服务器上的不同服务(或项目)的
      + 取值范围：0~65535
      + 默认值：我们自己不写端口号，浏览器默认加的  HTTP->80  HTTPS->443  FTP->21
    编码问题：如果URL地址或者问号传参的信息中，出现中文或者某些特殊符号，传输中可能会乱码，此时需要客户端先进行编码，服务器端再解码..
      + encodeURI / decodeURI：一般用于对整个URL的编码，它只编码中文和部分特殊符号，对于URL地址中的有效符号不编码
      + encodeURIComponent / decodeURIComponent：一般用于对URL问号传参的值进行部分编码，因为除了encodeURI可以编码的东西外，对于URL地址中的有效符号也能编码，所以不适合整个URL
      + escape / unescape：不是所有后端语言都支持这个API，所以只用于客户端两个页面间数据传输的编译

  第二步：缓存检查
    “缓存”存储在哪了？
      + 虚拟内存（内存条）：页面关闭，存储的东西会消失  Memory Cache
      + 物理内存（硬盘）：持久存储  Disk Cache
    关于“静态资源文件”的缓存有两种：强缓存、协商缓存
      + 不论哪一种都是服务器设置规则，客户端浏览器会自动配合完成，无需我们写代码
      + 一般真实项目中，强缓存、协商缓存都会设置「也可以只设置一个」，强缓存失效的情况下，再去走协商缓存的机制
    强缓存：Cache-Control(HTTP/1.1)、Expires(HTTP/1.0) 服务器设置的“响应头”信息
      + cache-control: max-age=2592000
      + expires: Sun, 15 May 2022 20:14:22 GMT
      + 不论是从服务器获取，还是从缓存中读取，HTTP状态码都是200
      问题：如果本地缓存生效，但是服务器更新了这个资源，如何保证客户端可以获取最新的？
        + HTML页面资源“绝对不能”做强缓存，因为其实页面渲染的入口，所有其它资源也是在渲染解析HTML代码的时候，再去请求的！！
*/

// let url = `http://www.xx.com/首页.html?lx=0&name=珠峰@培训`;
// console.log(encodeURI(url)); //'http://www.xx.com/%E9%A6%96%E9%A1%B5.html?lx=0&name=%E7%8F%A0%E5%B3%B0'

// let url = `http://www.xx.com/?lx=0&name=${encodeURIComponent('珠峰@培训')}&from=${encodeURIComponent('http://www.wx.com/')}`;
// console.log(url); //'http://www.xx.com/?lx=0&name=%E7%8F%A0%E5%B3%B0%40%E5%9F%B9%E8%AE%AD&from=http%3A%2F%2Fwww.wx.com%2F'

// console.log(escape('珠峰@培训://')); //'%u73E0%u5CF0@%u57F9%u8BAD%3A//'
// console.log(unescape('%u73E0%u5CF0@%u57F9%u8BAD%3A//')); //'珠峰@培训://'