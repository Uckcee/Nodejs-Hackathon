const mongoose = require('mongoose')

const TransactionSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  amount: {
    type: Number,
  },
  remark: {
    type: String,
    required: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model('Transaction', TransactionSchema)