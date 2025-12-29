let p1 = Promise.resolve(1);
let p2 = Promise.resolve(2);
let p3 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(2);
        reject(2);
    }, 2000);
});
let p4 = new Promise((resolve, reject) => {
    setTimeout(() => {
        // resolve(3);
        reject(3);
    }, 1000);
});
// let p4 = 4; // => Promise.resolve(4)

// all:只要有一个失败，整体就是失败的，值存储失败的原因，其余的就不管了！！只有都成功，整体才是成功，而且按照集合的顺序，依次存储每一项成功的结果 {如果其中有一项并不是promise实例，则默认转换为promise实例}
let p = Promise.allLimit([p1, p2, p3, p4], 3);
p.then(values => {
    console.log('成功:', values);
}).catch(reason => {
    console.log('失败:', reason);
});

// race:赛跑，看谁先第一个处理完，谁第一个就已谁的状态为主「哪怕状态是失败」
// any:集合中只要有一个成功，整体就是成功的，值是当前成功这一项的值；只有都是失败的，整体才是失败，值是一个提示 “AggregateError：All promises were rejected”！！
/* let p = Promise.any([p3]);
p.then(values => {
    console.log('成功:', values);
}).catch(reason => {
    console.log('失败:', reason);
}); */