const mongoose = import("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

let orderSchema = new mongoose.Schema({
    order_id: {
        type: Number,
        required: true,
        unique: true
    },
    order_user: {
        type: String,
        required: true,
        unique: true
    },
    order_product: [
        {
            product_name: { type: String },
            product_quantity: { type: Number }
        }
    ]
})

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;