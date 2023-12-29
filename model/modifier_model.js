const { default: mongoose, Model } = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    name: {
        type: String
    },
    ar_name: {
        type: String, "default": ""
    },
    modifier: [
        {
            name:{type:String},
            ar_name:{type:String},
            price:{type:Number},
            calories:{type:Number},
            status:{type:Boolean}
        }
    ],
    modifier_status:{
        type:Number,
        default:1
    }
}, {
    timestamps: true
})

const model = mongoose.model('modifier', schema);
module.exports = model;