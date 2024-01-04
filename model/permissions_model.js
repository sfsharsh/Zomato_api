const { default: mongoose, Model } = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'restaurant' },
    module_name: {
        type: String
    },
    status:{
        type :Number ,
    }
}, {
    timestamps: true
})

const model = mongoose.model('permission', schema);
module.exports = model;