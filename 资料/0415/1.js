/*
 EC(G)
   VO(G)/GO
     a -> 1
     fn -> 0x001 [[scope]]:EC(G)
   变量提升:
     var a;
     function fn(a){...};
   代码执行:
 */
/* var a = 1;
function fn(a) {
    /!*
     EC(FN)
       AO(FN)
         a -> （1）（0x002 [[scope]]:EC(FN)） 2
       作用域链:<EC(FN),EC(G)>
       形参赋值: a=1
       变量提升:
         var a; //无需声明
         function a(){ }；//无需声明，但是需要重新定义赋值
       代码执行:
     *!/
    console.log(a); //小函数0x002
    var a = 2;
    function a() { }
    console.log(a); //2
}
fn(a); //fn(1)
console.log(a); //1
*/

//====================

/*
var num = 10;
var obj = {
    num: 20
};
obj.fn = (function (num) {
    this.num = num * 3;
    num++;
    return function (n) {
        this.num += n;
        num++;
        console.log(num);
    }
})(obj.num);
var fn = obj.fn;
fn(5);
obj.fn(10);
console.log(num, obj.num);
*/

//====================
/*
/!*
 EC(G)
   VO(G) / GO
     obj -> 0x001
     fn -> 0x002
   代码执行:
 *!/
let obj = { //0x001
    // 把自执行函数执行的返回值赋值给0x001.fn -> 0x002小函数
    fn: (function () {
        /!* EC(AN) 闭包 *!/
        return function () { //0x002 [[scope]]:EC(AN)
            console.log(this);
        }
    })()
};
obj.fn(); //this->obj
let fn = obj.fn;
fn(); //this->window(严格模式下是undefined)
*/

//====================
/*
 块级私有上下文的诞生
   + 在除函数/对象之外的大括号中，出现基于 let/const/class/function 声明变量(或函数)，就会产生块级上下文
 */
/*
debugger;
console.log(foo); //undefined
{
    console.log(foo); //函数
    function foo() { }
    foo = 1;
    console.log(foo); //1
}
console.log(foo); //函数
*/

/*
/!*
 EC(G)
   VO(G)/GO
     foo -> （0x002）1
   变量提升:
     function foo;
     function foo;
   代码执行:
 *!/
debugger;
{
    /!*
     EC(B)
       AO(B)
         foo -> 0x001
             -> 0x002
             -> 1
       作用域链:<EC(B),EC(G)>
       变量提升:
         function foo() { 1 }
         function foo() { 2 }
       代码执行:
     *!/
    console.log(foo); //渣男2号:函数
    function foo(a) { 1 } //===>让全局的foo=0x002
    foo = 1;
    function foo(b) { 2 } //===>让全局的foo=1
    console.log(foo); //1
}
console.log(foo); //1
*/

/*
{
    function foo(a) { } //===>让全局的foo=0x002
    foo = 1; //===>让私有的foo=1
    function foo(b) { } //===>让全局的foo=1
    foo = 2; //===>让私有的foo=2
}
console.log(foo); //1
*/

//启发：以后在项目中(尤其是代码块中)，声明函数不要再使用 “function xxx(){}” ，因为会出现“大坑”！采用函数表达式的方式创建函数，可以避免很多不必要的麻烦；
/*
// console.log(foo); //报错 Uncaught ReferenceError: foo is not defined
{
    // console.log(foo); //报错 Uncaught ReferenceError: Cannot access 'foo' before initialization
    let foo = function foo() { };
    foo = 1;
    console.log(foo); //1
}
// console.log(foo); //报错 Uncaught ReferenceError: foo is not defined
*/


//====================
/*
 EC(G)
   VO(G)/GO
     x -> 1
     func -> 0x001 [[scope]]:EC(G)
   变量提升:
     var x;
     function func(x,y=...){...};
 */
/*
debugger;
var x = 1;
function func(x, y = function () { x = 2 }) {
    /!*
     EC(FUNC)
       AO(FUNC)
         x -> （5）（3）2
       作用域链:<EC(FUNC),EC(G)>
       形参赋值:
         x=5
         y=默认值(小函数 0x002 [[scope]]:EC(FUNC))
       变量提升:- -
     *!/
    x = 3;
    y();
    console.log(x); //2
}
func(5);
console.log(x); //1
*/

//------------------

/*
debugger;
var x = 1;
function func(x, y = function () { x = 2 }) {
    var x = 3;
    y();
    console.log(x); //3
}
func(5);
console.log(x); //1
*/


/*
debugger;
var x = 1;
function func(x, y = function (l) { x = 2 }) {
    var x = 3;
    var y = function (b) { x = 4 };
    y();
    console.log(x); //4
}
func(5);
console.log(x); //1
*/

// 总结：真实项目中，谨慎使用形参赋值默认值「如果用到，函数体中尽可能不要出现基于var/let/const声明变量的操作，尤其是不要用var声明和形参相同的变量」