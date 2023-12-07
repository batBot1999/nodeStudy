let path = require("path");
let demo = "C:/src/a/b/c.js"
let util = require("util");
// console.log(path.basename(demo));
// console.log(path.dirname(demo));
// console.log(path.parse(demo));
// console.log(path.resolve(__dirname, "./a"));
//  console.log(path.resolve("../", "./a"));
// console.log(process.argv);
// console.log(process.execArgv);
// console.log(process.cwd());
// console.log(process.stdout.write("请输入一个数字"));
// 监听data事件，如果有数据更新，就获取然后打印
// process.stdin.on("data", (res) => {
//     console.log(res);
// })
// let num = 0
// setInterval(() => {
//     console.log(num++);
//     if (num == 5) {
//         process.exit()
//     }
// }, 500)
// process.on("exit", () =>{x``
//     console.log("计数完成")
// })
// promisify:把异步回调函数包装为promise形式
function f1(n) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10)
    }, 1000)
  })
}
const callbackf1 = util.callbackify(f1);
callbackf1(function(errr, num) {
  console.log(num);
})