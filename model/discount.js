const { default: mongoose, Model } = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'restaurant' },
    title: {
        type: String
    },
    ar_title: {
        type: String
    },
    discount_type: {
        type: Number,
        values: ['1', '2', '3'],
        Comment: '1=> free Item Discount ,2=> Item Price Discount,3=>Total Price Discount',
        default: 3
    },
    description: {
        type: String
    },
    ar_description: {
        type: String
    },
    minimum_order_amount: {
        type: String,
    },
    maximum_order_amount: {
        type: String,
    },
    discount: {
        type: Float,
    },
    discount_applicable_on: {
        type: JSON,
    }
}, {
    timestamps: true
})

const model = mongoose.model('discount', schema);
module.exports = model;