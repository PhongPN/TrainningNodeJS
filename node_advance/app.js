// //import module
// const express = require("express");
// const BodyParser = require("body-parser");
// const routes = require('./routes/routes');

// const app = express();
// const port = 3000;

// //bodyParsing middleware
// app.use(BodyParser.json());
// app.use(BodyParser.urlencoded({ extended: true }));

// routes(app);

// //Listen port
// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))

const express = require("express");
const app = express();
const initAPIs = require("./routes/routes");

// Cho phép các api của ứng dụng xử lý dữ liệu từ body của request
app.use(express.json());

// Khởi tạo các routes cho ứng dụng
initAPIs(app);

let port = 3000;
app.listen(port, () => {
  console.log(`Running at localhost:${port}/`);
});