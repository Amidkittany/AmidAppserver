const http = require("http");
const app = require("./App");
const port = 7000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
