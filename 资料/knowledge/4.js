/*
 async/await：是Promise+Generator的“语法糖” 
   async是对函数的修饰 -> async function xxx(){...}
     + 让函数的返回值自动变为promise实例
       + 函数执行报错，则返回状态是rejected，值是报错原因的实例
       + 如果执行不报错，再看返回值
         + 返回值是新的实例，则以自己返回的promise实例为主
         + 其它情况都返回一个状态是fulfilled，值是返回值的实例
     + 可以在函数中使用await

   await可以监听promise实例的状态，从而决定去做啥事 -> let xxx = await [promise实例];
     + 必须出现在一个函数中，并且是经过async修饰的函数
     + await后面需要跟一个promise实例「如果不是promise实例，浏览器也会把其变为promise实例」
       await 14; => await Promise.resolve(14);
     + await会“等待”后面实例的状态为“成功”时，再把“当前上下文”中，await“下面”的代码执行！xxx就是实例状态为成功返回的结果！
     + 如果await后面的实例状态是失败，则下面代码不会执行(控制台爆红，但是不影响其它代码执行)！！
     + 我们是基于try/catch实现对await后面实例为失败态的处理，避免爆红
 */
// 模拟从服务器获取数据
const query = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // resolve({ code: 0, data: [10, 20, 30] });
            reject('请求失败');
        }, 2000);
    });
};

(async function () {
    /* try {
        let result = await query(); //在不知道请求结果之前，当前上下文await下面的代码是不会执行；只有后面实例状态是成功，下面代码才执行；如果实例状态是失败，下面代码也不执行「因为我们没有做失败情况的处理，所以控制台抛红」
        console.log('请求成功:', result);
    } catch (reason) {
        // 实例状态是失败
        console.log('请求失败:', reason);
    } */

    /* 
    query()
        .then(result => {
            console.log('请求成功:', result);
        })
        .catch(reason => {
            console.log('请求失败:', reason);
        }); 
    */
})();


/* (async function () {
    let num = await Promise.resolve(100);
    console.log(num);
})(); */


/* 
const fn = async () => {
    // return Promise.resolve(100);
};
console.log(fn()); //返回promise实例：fulfilled undefined 
*/


//=====================
// 需求：设置三个定时器{2000,1000,3000}，类似于ajax串行（第一个定时器触发后才能设置第二个...）
/* setTimeout(() => {
    console.log('第一个定时器触发执行');
    setTimeout(() => {
        console.log('第二个定时器触发执行');
        setTimeout(() => {
            console.log('第三个定时器触发执行');
        }, 3000);
    }, 1000);
}, 2000); */

const sleep = (interval = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, interval);
    });
};

/* const handler = async () => {
    await sleep(2000);
    console.log('第一个定时器触发执行');

    await sleep(1000);
    console.log('第二个定时器触发执行');

    await sleep(3000);
    console.log('第三个定时器触发执行');
};
handler().then(() => {
    console.log('当函数内部所有await都处理完，而且对应的实例都是fulfilled，才会让handler执行的返回值是成功的promise实例！');
}).catch(() => {
    console.log('代码执行报错，或者其中某个await后面的实例是失败的，则直接让handler返回值也是失败的');
}); */

/* sleep(2000)
    .then(() => {
        console.log('第一个定时器触发执行');
        return sleep(1000);
    })
    .then(() => {
        console.log('第二个定时器触发执行');
        return sleep(3000);
    })
    .then(() => {
        console.log('第三个定时器触发执行');
    }); */