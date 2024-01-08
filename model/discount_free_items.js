const { default: mongoose, Model } = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    discount_id: { type: Schema.Types.ObjectId, ref: 'discount' },
    offer_item_id: { type: Schema.Types.ObjectId, ref: 'section_item' },
    free_item_id: { type: Schema.Types.ObjectId, ref: 'free_item' },
    quantity: {
        type: Number
    }
}, {
    timestamps: true
})

const model = mongoose.model('discount_free_item', schema);
module.exports = model;