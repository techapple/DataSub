const { Schema, model } = require('mongoose')

const schema = new Schema({
  CardName: {
    type: String,
    required: true
  },
  CardNumber: {
    type: String,
    required: true
  },
  ExpDate: {
    type: String,
    required: false
  },
  Cvv: {
    type: Number,
    required: true
  },
  Amount: {
    type: Number,
    required: true
  },

})

module.exports = model('Card', schema)