const { default: mongoose, Model } = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    phone_number: {
        type: String,
    },uid:{
        type:String
    },
    name: {
        type: String,
    },
    age: {
        type: String,
    },
    email: {
        type: String,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    otp:{
        type:String,
    },
    verify:{
        type:Boolean,
        default:false
    }
}, {
    timestamps: true
})

const model = mongoose.model('user', schema);
module.exports = model;