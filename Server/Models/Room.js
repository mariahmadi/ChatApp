const mongoose = require("mongoose")


const RoomSchema = new mongoose.Schema({
    Room: {
        type: String,
        required: [true, 'Please enter Room Name']
    },

})


const Room = mongoose.model("Room", RoomSchema)
module.exports = Room
