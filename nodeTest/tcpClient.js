const net = require("net");
let client = new net.Socket();
client.connect(5000, "localhost", () => {
  client.write("你好");
})
client.on("data", (data) => {
  console.log(data.toString());
})
// 客户端终端运行显示[已连接],服务端显示[你好]