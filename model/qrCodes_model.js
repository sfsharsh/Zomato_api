const { default: mongoose, Model } = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'restaurant' },
    qr_code_group_id: { type: Schema.Types.ObjectId, ref: 'orderMenuGroup' },
    name: {
        type: String
    },
    ar_name:{
        type :String , "default" : "" ,"arabic" : true
    },
    qr_code_image: [],
    qr_code_status:{
        type : Number
    }
}, {
    timestamps: true
})

const model = mongoose.model('qrCode', schema);
module.exports = model;