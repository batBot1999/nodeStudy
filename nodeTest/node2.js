// # 文件操作
// 1. 读取-readFile
// 2. 写入-writeFile
// 3. 删除-unlink
// 4. 插入-appendFIle
// 5. 移动(重命名)-rename
// 6. 拷贝-copyFIle

// 文件读取-方法-全都是异步操作 回调promise
// 文件操作的异步形式都会有一个回调,在最后一个参数
// 所有方法都会有同步版本
// const fs = require("fs");
// 异步版本
// fs.writeFile("./test.txt", "hello", function (err, res) { })
// 同步版本
// const res = fs.writeFileSync("./test.txt", "hello", function () { })
// const state = fs.statSync("./testdir");
// console.log(state);
const fs = require("fs")
const path = require("path")
// 清空文件夹方法
// function empty(dirpath) {
//   if (fs.existsSync(dirpath)) {
//     const dir = fs.readdirSync(dirpath)
//     dir.forEach((dirItem) => {
//       // 如果是文件就删了,如果是文件夹就递归
//       let fullPath = path.join(dirpath, dirItem)
//       const _state = fs.statSync(fullPath)
//       if (_state.isDirectory()) {
//         empty(fullPath)
//       } else {
//         fs.unlinkSync(fullPath);
//       }
//     })
//   }
// }
// empty("./testDir")

// function copyDir(target, source) {
//   if(!fs.existsSync(target)) {
//     fs.mkdirSync(target);
//   }
//   if(fs.existsSync(source)) {
//     const dir = fs.readdirSync(source)
//     dir.forEach((dirItem) => {
//       // 如果是文件就删了,如果是文件夹就递归
//       let fullPath = path.join(source, dirItem)
//       let targetFullPath = path.join(target, dirItem)
//       const _state = fs.statSync(fullPath)
//       if (_state.isDirectory()) {
//         copyDir(targetFullPath, fullPath);
//       } else {
//         fs.copyFileSync(fullPath, targetFullPath);
//       }
//     })
//   }
// }
// copyDir("./copyTest", "./testdir")

// const cm = require("compressing");
// // cm.zip.compressDir("./testdir", "./testdir.zip").then((res) => {
// //     console.log(res);
// // });
// cm.zip.uncompress('./testdir.zip', "./testDir2").then((res) => {
//   console.log(res);
// });

// 监听到他的改变后输出文件名,webpack开发模式下改变了文件触发重新打包,显示新的内容
// fs.watch("./test.txt", (err, filename) => {
//   console.log(filename);
// })