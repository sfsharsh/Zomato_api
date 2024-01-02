const { default: mongoose, Model } = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    menu_id: { type: Schema.Types.ObjectId, ref: 'menu' },
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'restaurant' },
    section_name: {
        type: String
    },
    ar_section_name:{
        type :String , "default" : ""
    },
    image: [],
    desc: {
        type: String
    },
    ar_desc:{
        type : String ,"default": ""
    },
    section_status:{
        type : Number,
        default:1
    }
}, {
    timestamps: true
})

const model = mongoose.model('section', schema);
module.exports = model;