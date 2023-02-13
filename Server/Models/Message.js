const mongoose = require("mongoose")


const MessageSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter Message']
    },
   
    user_id: {
        type: String, 
    },
    room_id: {
        type: String, 
    },
    text: {
        type: String,
    }
})





const Message = mongoose.model("Message", MessageSchema)
module.exports = Message
