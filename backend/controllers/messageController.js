const Message = require("../models/messageModel");

exports.saveMessage = async (data) => {

    try {
        console.log(data);

        const saveMsg = new Message(data);
        await saveMsg.save();

        // return message;

    } catch (error) {
        console.log(error);
        // return new Error(error.message);
    }
}


exports.getMessages = async (req, res) => {
    try {
        const id = req.params.id;

        // Validation
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "User ID is required"
            });
        }

        const allMessages = await Message.find({
            $or: [{ "sender._id": id }, { "receiver._id": id }]
        })

        return res.status(200).json({
            success: true,
            message: "All messages were successfully retrieved",
            data: allMessages
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}



exports.deleteMessage = async (req, res) => {
    try {
        const id = req.params.id;

        // Validation
        if (!id) {
            return res.status(404).json({
                success: false,
                message: "User ID is required"
            });
        }

        const delMsg = await Message.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Message deleted successfully",
            data: delMsg
        });

    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}