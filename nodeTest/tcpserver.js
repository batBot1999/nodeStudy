const net = require("net");
const server = net.createServer((Socket) => {
  Socket.on("data", (data) => {
    console.log(data.toString());
    Socket.write("已连接")
  })
})
server.listen(5000);