import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

let orderSchema = new Schema({
    order_userId: {
        type: ObjectId,
        ref: "users",
    },
    order_status: {
        type: String,
        default: "pending",
    },
    order_products: [
        {
            productId:
            {
                type: ObjectId,
                ref: 'products'
            },
            quantity: Number
        }
    ],
    order_createdAt: {
        type: Date,
        default: Date.now
    },
    order_updateAt: {
        type: Date,
        default: Date.now
    },
    order_updateBy: {
        type: ObjectId,
        ref: "users"
    },
    order_shipDate: {
        type: Date,
        default: undefined,
    },
    order_shipAddress: {
        type: "String"
    }
});

orderSchema.pre("findOneAndUpdate", async function (next) {
    const docToUpdate = await this.model.findOne(this.getQuery());
    docToUpdate.updateAt = Date.now();
    docToUpdate.save(function (err) {
        if (err) {
            console.log(err);
        }
    });
    next();
});
const Order = mongoose.model("Order", orderSchema);

export default Order;