let address = [{
    "code": "11",
    "name": "北京市",
    "children": [{
        "code": "1101",
        "name": "市辖区",
        "children": [{
            "code": "110101",
            "name": "东城区"
        }, {
            "code": "110102",
            "name": "西城区"
        }]
    }]
}, {
    "code": "13",
    "name": "河北省",
    "children": [{
        "code": "1301",
        "name": "石家庄市",
        "children": [{
            "code": "130102",
            "name": "长安区"
        }, {
            "code": "130104",
            "name": "桥西区"
        }]
    }, {
        "code": "1302",
        "name": "唐山市",
        "children": [{
            "code": "130202",
            "name": "路南区"
        }, {
            "code": "130203",
            "name": "路北区"
        }]
    }]
}];

/* 方案2：先把数组扁平化，后期查找的时候按照扁平化的数组查找即可 */
const getNameByCode = (function (address) {
    // 先扁平化处理「广度优先原则」
    let result = [];
    const next = arr => {
        // 先把本级处理好
        let temp = arr.map(item => {
            return {
                code: item.code,
                name: item.name
            };
        });
        result = result.concat(temp);
        // 再看是否有children，如果存在，再处理下一级
        arr.forEach(item => {
            if (item.children) next(item.children);
        });
    };
    next(address);

    // 返回按照code查找的方法「去扁平化后的数组中查找」
    return function getNameByCode(code) {
        let item = result.find(item => item.code == code);
        return item ? item.name : '';
    };
})(address);
console.log(getNameByCode('130102')); //"长安区"
console.log(getNameByCode('1302')); //"唐山市"


/* 方案1：递归查找「深度优先原则」 */
/* const getNameByCode = function getNameByCode(address, code) {
    let result = "";
    const next = arr => {
        for (let i = 0; i < arr.length; i++) {
            let { code: codeItor, name, children } = arr[i];
            if (codeItor == code) {
                result = name;
                break;
            }
            if (Array.isArray(children)) next(children);
        }
    };
    next(address);
    return result;
} 
console.log(getNameByCode(address, '130102')); //"长安区"
console.log(getNameByCode(address, '1302')); //"唐山市"
*/
