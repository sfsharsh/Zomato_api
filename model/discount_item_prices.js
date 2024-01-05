const { default: mongoose, Model } = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    discount_id: { type: Schema.Types.ObjectId, ref: 'discount' },
    offer_item_id: { type: Schema.Types.ObjectId, ref: 'offer' },
    discount: {
        type: Float
    },
    minimum_quantity:{
        type : Number
    }
}, {
    timestamps: true
})

const model = mongoose.model('discount_item_price', schema);
module.exports = model;