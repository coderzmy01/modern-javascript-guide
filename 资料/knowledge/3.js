/*
 Promise：ES6新增的内置类(构造函数)，用来规划异步编程代码，解决回调地狱等问题
   let p1 = new Promise([executor])
     + [executor]必须是一个函数,而且new Promise的时候会立即把其执行 “同步”
     + p1是其创建出来的实例
       私有属性
       + [[PromiseState]]:"pending"、"fulfilled"、"rejected"  实例的状态
       + [[PromiseResult]]:undefined  实例的值「成功的结果或失败的原因」
       公共方法：Promise.prototype
       + then
       + catch
       + finally
       + ...
     + p1.then([onfulfilled],[onrejected])
       + [onfulfilled]/[onrejected]都是函数
       + 实例状态是成功fulfilled的时候,会把[onfulfilled]执行,并且把实例的值作为成功的结果传递给他
       + 实例状态是失败rejected的时候,会把[onrejected]执行,把实例值作为失败原因传递给他
 
   如何修改实例的状态和值
   @1 基于这种方式创建实例 
      let p=new Promise((resolve,reject)=>{ 
         ...
      })
      + 如果executor函数执行报错，则把实例的状态修改为rejected，值是报错原因「不会抛异常」
      + resolve/reject也是函数
        resolve('OK') -> 把实例p的状态修改为fulfilled，值(成功结果)是'OK'
        reject('NO') -> 把实例p的状态修改为rejected，值(失败原因)是'NO'
      + 一但状态被修改为fulfilled或rejected，后期就不会再更改状态值了
    
   @2 每一次执行THEN方法，都会返回一个“全新的promise实例”
     let p2 = p1.then(onfulfilled,onrejected);
     不论是onfulfilled还是onrejected执行(由p1状态来决定),方法的执行决定了p2的状态和值
     + 首先看方法执行是否报错，如果报错了，则p2是失败态(rejected)，值是报错原因
     + 如果执行不报错，再看方法的返回值
       + 如果返回的是“新的promise实例 -> @NP”，则@NP的状态和值直接决定了p2的状态和值
       + 如果返回的不是新实例，则p2状态是成功(fulfilled)，值是函数的返回值

   @3 执行Promise.resolve/reject/all/any/race...等静态私有方法，也会创建新的promise实例
     + Promise.resolve(10) 创建一个状态是成功fulfilled，值是10的实例
     + Promise.reject(0) 创建一个状态是失败rejected，值是0的实例


  TEHN链的穿透/顺延机制
    .then(onfulfilled,onrejected)，两个方法可以传可以不传，如果不传，则顺延至下一个THEN中，相同状态要执行的方法中去处理！！
    + 原理：我们不设置对应的方法，PROMISE内部会默认加一个对应的方法，可以让其实现状态的顺延/穿透
    ---
    p.catch(onrejected) 等价于 p.then(null,onrejected)

  
  关于Promise.all/any/race三个方法的研究
    let p = Promise.all/any/race([promises]);
      + promises是包含零到多个promise实例的集合，一般是数组！如果集合中的某一项不是promise实例，则默认变为状态为成功，值是本身的promise实例！！
      + all：集合中的“每个实例都成功”，最后结果p才成功，值是按照集合顺序，依次存储每个实例成功结果的数组；其中只要有一个实例失败，则p就是失败的，值是本次失败的原因，后面的操作不再处理！！
      + any：只要有一个成功，最后p就是成功的，值是本次成功的结果；都失败，最后p才是失败！{兼容性不好}
      + race：集合中谁最先知道结果，则以谁的为主！


  AJAX的串行和并行：真实项目中发送ajax请求都是“采用异步编程”
    并行：多个请求同时发送即可，谁先回来先处理谁，主要用于多个请求间没有依赖「偶尔我们需要监测，多个请求都成功，整体再去做啥事 => Promise.all」
    串行：多个请求之间存在依赖，上一个请求成功，我们才能发送下一个请求（往往是下一个请求需要用到上一个请求的结果，才需要这样处理）！
 */

// 需求：设置定时器，到时间干啥
/* 
setTimeout(() => {
    // ...
}, 1000); 
*/
const sleep = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};
sleep().then(() => {
    // ...
}).then(() => {
    // ...
});


// 基于Promise解决了串行中的回调地狱问题
axios.get('/api1')
    .then(value => {
        console.log(`第一个请求成功:`, value);
        return axios.get('/api2');
    })
    .then(value => {
        console.log(`第二个请求成功:`, value);
        return axios.get('/api3');
    })
    .then(value => {
        console.log(`第三个请求成功:`, value);
    });

/* 
// JQ中的AJAX串行 -> 回调地狱
$.ajax({
    url: '/api1',
    success(result) {
        console.log(`第一个请求成功:`, result);
        $.ajax({
            url: '/api2',
            success(result) {
                console.log(`第二个请求成功:`, result);
                $.ajax({
                    url: '/api3',
                    success(result) {
                        console.log(`第三个请求成功:`, result);
                    }
                });
            }
        });
    }
}); 
*/

/* 
// AJAX并行
$.ajax({
    url: '/api1',
    success(result) {
        console.log(`第一个请求成功:`, result);
    }
});
$.ajax({
    url: '/api2',
    success(result) {
        console.log(`第二个请求成功:`, result);
    }
});
$.ajax({
    url: '/api3',
    success(result) {
        console.log(`第三个请求成功:`, result);
    }
}); 
*/









/* 
let p1 = new Promise(resolve => {
    setTimeout(() => {
        resolve(1);
    }, 3000);
});
let p2 = new Promise(resolve => {
    setTimeout(() => {
        resolve(2);
    }, 2000);
});
let p3 = Promise.resolve(3);
let p4 = 4; //默认变为 -> Promise.resolve(4)

let p = Promise.all([p1, p2, p3, p4]);
p.then(values => {
    console.log(values); //1 2 3 4
}).catch(reason => {
    console.log('失败', reason);
}); 
*/


/* 
// 真实项目中：then中一般只传递onfulfilled「成功干什么」，最后加一个catch；这样不论中间哪个环节创建了失败的实例，都会穿透至最后一个catch；catch不加，出现失败的实例，控制台报“红”，但是不影响其他代码执行！！
Promise.resolve(10)
    .then(value => {
        console.log('成功', value);
        return value * 10;
    })
    .then(value => {
        console.log('成功', value);
        return Promise.reject(value * 10);
    })
    .then(value => {
        console.log('成功', value);
        return value * 10;
    })
    .catch(reason => {
        console.log('失败', reason);
    })
    .finally(()=>{
        //不论成功还是失败，最后都有要执行finally中的方法「一般不用」
    }); 
*/


/* 
Promise.reject(0)
    .then(
        null
        /!* value=>{
            return value;
        } *!/
        /!*,reason=>{
            throw reason;
        } *!/
    )
    .then(value => {
        console.log('成功', value);
    }, reason => {
        console.log('失败', reason);
    }); 
*/

/* Promise.resolve(10)
    .then(value => {
        console.log('成功', value);
        return Promise.reject(value / 10);
    }, reason => {
        console.log('失败', reason);
        return Promise.resolve(reason * 10);
    })
    .then(value => {
        console.log('成功', value);
        return value + 10;
    }, reason => {
        console.log('失败', reason);
        return reason - 10;
    })
    .then(value => {
        console.log('成功', value);
        return value + a;
    }, reason => {
        console.log('失败', reason);
        return reason - a;
    })
    .then(value => {
        console.log('成功', value);
    }, reason => {
        console.log('失败', reason);
    }); */



/* let p1 = new Promise((resolve, reject) => {
    resolve(10);
});
let p2 = p1.then(value => {
    console.log('成功', value); //成功 10
}, reason => {
    console.log('失败', reason);
});
p2.then(value => {
    console.log('成功', value); //成功 undefined
}, reason => {
    console.log('失败', reason);
}); */