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