const s1 = new Set();
[1, 2, 34, 5, 4, 5, 5, 5, 5, 55, 5, 5, 55, 5, 55, 55, 5, 55, 5].map((i) =>
  s1.add(i)
);
// for (const element of s1) {
//   console.log(element);
// }
// console.log(s1);
// console.log(s1[1]);
console.log(s1.has(2));
console.log(s1.delete(2));
console.log(s1.size);
console.log(s1.has(2));
