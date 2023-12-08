const http = require("http");
const fs = require("fs");
const options = {
  key: fs.readFileSync(__dirname + "/cert.key"),
  cert: fs.readFileSync(__dirname + "/cert.crt")
}
const app = https.createServer(options, (req, res) => {
  res.end("hello https");
})
app.listen(3200);