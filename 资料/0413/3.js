/* function getCss(ele, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(ele)[attr];
    }
    return ele.currentStyle[attr];
} */

/* 
function getCss(ele, attr) {
    if (window.getComputedStyle) {
        getCss = function (ele, attr) {
            return window.getComputedStyle(ele)[attr];
        };
    } else {
        getCss = function (ele, attr) {
            return ele.currentStyle[attr];
        };
    }
    return getCss(ele, attr);
}
console.log(getCss(document.body, 'width'));
console.log(getCss(document.body, 'margin'));
console.log(getCss(document.body, 'padding')); 
*/