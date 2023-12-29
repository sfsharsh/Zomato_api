const { default: mongoose, Model } = require("mongoose");
const { Schema } = mongoose;

const schema = new mongoose.Schema({
  menu_id: { type: Schema.Types.ObjectId, ref: 'menu' },
  section_id: { type: Schema.Types.ObjectId, ref: 'section' },
  name: {
    type: String
  },
  ar_name: {
    type: String, arabic: true
  },
  image: [],
  desc: {
    type: String
  },
  ar_desc: {
    type: String, arabic: true
  },
  sectionitem_status: {
    type: Number,
    default:1
  },
  mark_section_as_new: {
    type: Number
  },
  mark_section_as_signature: {
    type: Number
  },
  allergies: [],
  recommended_items: [],
  price: [],
}, {
  timestamps: true
})

const model = mongoose.model('section_item', schema);
module.exports = model;