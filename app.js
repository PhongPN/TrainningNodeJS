const db = require("./helper/connectDB");
const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const PORT = process.env.PORT;

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to my application." });
});

require("./routes/user")(app);
require("./routes/category")(app);
require("./routes/product")(app);
require("./routes/order")(app);

app.listen(PORT, () => {
    console.log(`Server is running on port ` + PORT);
});