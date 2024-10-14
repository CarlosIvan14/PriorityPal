const { Schema, model, models, default: mongoose } = require('mongoose');
const { type } = require('os');

// Modelo para el mensaje
const messageSchema = new Schema({
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    message:String,
    timestamps:{
        type:Date,
        default:Date.now
    }
}, {
    timestamps: true
});

const Message= models.Message || model('Message', messageSchema);

module.exports = Message;
