const { default: mongoose, Model } = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'restaurant' },
    email: {
        type: String
    },
    first_name:{
        type :String ,
    },
    last_name: {
        type: String
    },
    role:{
        type : Number
    },
    password:{
        type : String
    }
}, {
    timestamps: true
})

const model = mongoose.model('subUser', schema);
module.exports = model;