const { default: mongoose, Model } = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    phone_number: [],
    name: {
        type: String,
        default: ""
    },
    ar_name: {
        type: String,
        default: ""
    },
    image:[],
    restaurant_owner_name:{
        type:String
    },
    email: {
        type: String,
        default: ""
    },
    password:{
        type:String
    },
    address: {
        type: String,
        default: ""
    },
    state: {
        type: String,
        default:""
    },
    street: {
        type: String,
        default: ""
    },
    country: {
        type: String,
        default: ""
    },
    restaurant_phones:[{
        items:{
            country_code:{
                type:Number
            },
            phone_number:{
                type:Number
            }
        }
    }],
    latitude:{
        type:String
    },
    longitude:{
        type:String
    },
    timezone:{
        type:String
    },
    restaurant_bio:{
        type:String
    },
    ar_restaurant_bio:{
        type:String
    },
    currency:{
        type:String
    },
    vat:{
        type:String
    },
    service_charge:{
        type:String
    },
    whats_app_notification:{
        type:Boolean
    },
    payment_enable:{
        type:Boolean
    },
    subscription_status:{
        type:Boolean
    },
    disable_order:{
        type:Boolean
    }
}, {
    timestamps: true
})

const model = mongoose.model('restaurant', schema);
module.exports = model;