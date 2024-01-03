const { default: mongoose, Model } = require("mongoose");
const { stringify } = require("postman-request/lib/url-parse");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'restaurant' },
    customer_name: {
        type: String
    },
    remark: {
        type: String, "default": ""
    },
    qr_code_id:{
       type:String
    },
    qr_code_group_id:{
        type:String
    },
    order_type: {
        type: String
    },
    phone_number: {
        type: String
    },
    country_code: {
        type: String
    },
    order_items: [],
    special_notes: {
        type: String
    },
    ar_special_notes: {
        type: String,
    },
    amount: {
        type: Number
    },
    quantity: {
        type: Number
    },
    payment_status:{
        type: String
    }
}, {
    timestamps: true
})

const model = mongoose.model('order', schema);
module.exports = model;