let obj = {
    a: {
        b: {
            c: {
                d: 1
            }
        }
    }
};

const getValue = (obj, keyPath) => {
    let keys = keyPath.split('.'),
        index = 0,
        result;
    const next = x => {
        if (index >= keys.length) return;
        let key = keys[index++];
        result = x[key];
        if (result == null || typeof result !== "object") return;
        next(result);
    };
    next(obj);
    return result;
};

/* const getValue = (obj, keyPath) => {
    let keys = keyPath.split('.');
    return keys.reduce((x, key) => {
        return x ? x[key] : undefined;
    }, obj);
}; */
console.log(getValue(obj, 'a.b.c.d')); //1
console.log(getValue(obj, 'a.b')); //{c:{d:1}}
console.log(getValue(obj, 'a.b.x.y')); //undefined

/* 可选链处理 */
/* const getValue = (objName, keyPath) => {
    keyPath = keyPath.replace(/\./g, '?.');
    return eval(`${objName}?.${keyPath}`);
};
console.log(getValue('obj', 'a.b.c.d')); //1
console.log(getValue('obj', 'a.b')); //{c:{d:1}} */