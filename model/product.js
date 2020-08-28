import mongoose from 'mongoose';
const ObjectId = mongoose.SchemaTypes.ObjectId;

let productSchema = new mongoose.Schema({
    product_id: {
        type: ObjectId,
        required: true,
        unique: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_category_id: {
        type: ObjectId,
        required: true
    },
    product_cost: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: ObjectId,
        ref: "users",
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
    updateBy: {
        type: ObjectId,
        ref: "users",
        default: null
    }
}, { collection: "product" });

productSchema.pre("findOneAndUpdate", async function (next) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    docToUpdate.updateAt = Date.now();
    docToUpdate.save(function (err) {
        if (err) {
            console.log(err);
        }
    });
    next();
});

const Product = mongoose.model("Product", productSchema);

export default Product;