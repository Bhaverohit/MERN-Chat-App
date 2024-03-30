const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    msg: {
        type: String,
        required: true
    },
    sender: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            required: true
        }
    },
    receiver: {
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            lowercase: true,
            required: true
        },
    },
    replyMessage: {

    },

},
    { timestamps: true });

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;