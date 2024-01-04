const { default: mongoose, Model } = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'restaurant' },
    order_id: { type: Schema.Types.ObjectId, ref: 'restaurant' },
    thoughts: {
        type: String
    },
    rate_of_exeperience:{
        type :String ,
    }
}, {
    timestamps: true
})

const model = mongoose.model('feedback', schema);
module.exports = model;