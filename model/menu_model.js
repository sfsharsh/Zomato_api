const { default: mongoose, Model } = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'restaurant' },
    name: {
        type: String
    },
    ar_name:{
        type :String , "default" : "" ,"arabic" : true
    },
    image: [],
    desc: {
        type: String
    },
    ar_desc:{
        type :String  ,"arabic" : true
    },
    menu_status:{
        type : Number,
        default:1
    }
}, {
    timestamps: true
})

const model = mongoose.model('menu', schema);
module.exports = model;