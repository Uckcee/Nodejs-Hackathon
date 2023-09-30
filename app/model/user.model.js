const mongoose = require('mongoose')
// const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema ({
    name: {
        type: String,
        required : true
    },
    username: {
        type: String,
        required: true,
        // unique :true
    },
    password: {
        type: String, 
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNum: {
        type: Number,
        required: false
    },
    wallet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Wallet',
  },

})
module.exports = mongoose.model('User', UserSchema)
