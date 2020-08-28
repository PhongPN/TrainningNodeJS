import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const categorySchema = new Schema({
    category_id:{
        type: ObjectId,
        required: true
    },
    category_title: {
        type: String,
        required: true,
        unique: true
    },
    category_content: {
        type: String,
        required: true
    },
    category_creted_date: {
        type: Date,
        default: Date.now
    },
    category_lastEdited_date: {
        type: Date,
        default: Date.now
    },
    category_updateBy: {
        type: ObjectId,
        ref: "users",
        default: null
    }
}, { collection: "category" });

categorySchema.pre("findOneAndUpdate", async function (next) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    docToUpdate.updateAt = Date.now();
    docToUpdate.save(function (err) {
        if (err) {
            console.log(err)
        }
    });
    next();
});

const Category = mongoose.model("Category", categorySchema);

export default Category;