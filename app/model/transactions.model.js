import mongoose from 'mongoose';
const Schema = mongoose.Schema

const transactionSchema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    receiver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number
    },
    transactionId: {
        type: Number
    },
    date: {
        type : Date,
        default:Date.now()
    },
    remark: {
        type: String,
        required: false
    }
})
module.exports = mongoose.model('Transaction', transactionSchema)