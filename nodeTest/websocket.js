const ws = require("ws");
const websocketServer =  ws.Server;
const wss = new websocketServer({port: 4000 });
wss.on("connection", (wsconnect) => {
  wsconnect.on("message", (mes, err) => {
    console.log(mes);
    wsconnect.send("hello", () => {

    })
  })
})

