let fs = require("fs");

// // readFileSync -> 동기식 처리
// console.log("A");
// let result = fs.readFileSync("syntax/sample.txt", "utf-8");
// console.log(result);
// console.log("C");

// readFile -> 비동기식 처리
console.log("A");
fs.readFile("syntax/sample.txt", "utf-8", (err, result) => {
    console.log(result);
});
console.log("C");
