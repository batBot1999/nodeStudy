let path = require("path");
let demo = "C:/src/a/b/c.js"
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
let num = 0
setInterval(() => {
    console.log(num++);
    if (num == 5) {
        process.exit()
    }
}, 500)
process.on("exit", () =>{
    console.log("计数完成")
})
11