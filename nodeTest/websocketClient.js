// const ws= new WebSocket("ws://localhost:4000/")
// ws.onopen = function() {
//   console.log("connect")
// }
// ws.onmessage = function (e) {
//   console.log(e.data);
// }

// 浏览器
const websocket = require("ws");
const wsclient = new websocket("ws://localhost:4000");
wsclient.on("open", function() {
  wsclient.send("hi");
})
wsclient.on("message", function(data) {
  console.log(data.toString());
})
// 然后启动客户端,在执行node websocketClient.js得到<Buffer 68 65 6c 6c 6f>,也可以toString得到hello