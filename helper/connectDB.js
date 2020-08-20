const mongoose = require("mongoose");
const dotenvn = require("dotenv");
dotenvn.config();
mongoose.set("useCreateIndex", true)

const con = mongoose
    .connect(process.env.DBURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Connected to the database!");
    })
    .catch(err => {
        console.log("Cannot connect to the database!", err);
        process.exit();
    });



// db.mongoose
//     .connect(db.url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log("Connected to the database!");
//     })
//     .catch(err => {
//         console.log("Cannot connect to the database!", err);
//         process.exit();
//     });

module.exports = con;