/* let a = { n: 1 };
let b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b); */

/* debugger;
var a = 12;
let b = 13; */


let x = [12, 23];
const fn = function (y) {
    y[0] = 100;
    y = [100];
    y[1] = 200;
    console.log(y);
};
fn(x);
console.log(x);
