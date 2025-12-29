/* 
const obj = {
    data: [
        ['xiaoming', 'male', '18', 'beijing', '2020-01-02'],
        ['xiaofang', 'female', '18', 'shanghai', '2020-03-02']
    ],
    columns: [
        { name: 'name', note: '' },
        { name: 'gender', note: '' },
        { name: 'age', note: '' },
        { name: 'address', note: '' },
        { name: 'registerTime', note: '' },
    ]
};
输出下面结果 
[
    { name: 'xiaoming', 'gender': 'male', age: '18', address: 'beijing', registerTime: '2020-01-02' },
    { name: 'xiaofang', 'gender': 'female', age: '18', address: 'shanghai', registerTime: '2020-03-02' }
]
*/
/* const combine = function combine(obj) {
    let { data, columns } = obj,
        columnsKeys = {};
    // 先把columns变为 {name:0,gender:1,...} 这种格式
    columns.forEach((item, index) => {
        columnsKeys[item.name] = index;
    });
    // 外层迭代数据DATA
    return data.map(item => {
        // item: ['xiaoming', 'male', '18', 'beijing', '2020-01-02']
        // columnsKeys: {name: 0, gender: 1, age: 2, address: 3, registerTime: 4}
        // 想要的结果 { name: 'xiaoming', 'gender': 'male', age: '18', address: 'beijing', registerTime: '2020-01-02' }
        let obj = {};
        _.each(columnsKeys, (index, key) => {
            obj[key] = item[index];
        });
        return obj;
    });
}; */

/* const combine = function combine(obj) {
    let { data, columns } = obj;
    // 把columns按照每列的字段名扁平化
    columns = columns.map(item => item.name);
    // console.log(columns); //['name', 'gender', 'age', 'address', 'registerTime']
    return data.map(item => {
        // item: ['xiaoming', 'male', '18', 'beijing', '2020-01-02']
        // 想要的结果 { name: 'xiaoming', 'gender': 'male', age: '18', address: 'beijing', registerTime: '2020-01-02' }
        let obj = {};
        columns.forEach((key, index) => {
            obj[key] = item[index];
        });
        return obj;
    });
};

const obj = {
    data: [
        ['xiaoming', 'male', '18', 'beijing', '2020-01-02'],
        ['xiaofang', 'female', '18', 'shanghai', '2020-03-02']
    ],
    columns: [
        { name: 'name', note: '' },
        { name: 'gender', note: '' },
        { name: 'age', note: '' },
        { name: 'address', note: '' },
        { name: 'registerTime', note: '' },
    ]
};
console.log(combine(obj)); */


/* 
const obj = {
    a: {
        b: 1,
        c: 2,
        d: { e: 3, 2: 200 },
    },
    b: [1, 2, { a: 3, b: 4 }],
    c: 1,
    1: 100,
    x: {}
};
// 转换为JSON字符串
// console.log(JSON.stringify(obj));

// 转换为URLENCODED格式字符串「有的后台要求AJAX请求主体传递这样的格式」
// console.log(Qs.stringify(obj)); //'1=100&a[b]=1&a[c]=2&a[d][2]=200&a[d][e]=3&b[0]=1&b[1]=2&b[2][a]=3&b[2][b]=4&c=1' 
*/