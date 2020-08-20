const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);


let categorySchema = new mongoose.Schema({
    category_id:{
        type: Number,
        required: true,
        unique: true
    },
    category_title:{
        type: String,
        required: true,
        unique: true
    },
    category_content:{
        type: String,
        required: true
    }
}, { collection: "category" });

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;