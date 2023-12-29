const { default: mongoose, Model } = require("mongoose");
const { Schema } = mongoose;
const schema = new mongoose.Schema({
    restaurant_id: { type: Schema.Types.ObjectId, ref: 'restaurant' },
    group_type: {
        type: "String"
    },
    group_name: {
        type: "String"
    },
    arabic_group_name: {
        type: "String"
    },
    status: {
        type: "Boolean",
    }
}, {
    timestamps: true
})

const model = mongoose.model('orderMenuGroup', schema);
module.exports = model;