import mongoose from 'mongoose';
const Schema = mongoose.Schema

const walletSchema = new Schema ({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    balance: {
        type: Number,
    }
})

module.exports = mongoose.model('Wallet', walletSchema)
