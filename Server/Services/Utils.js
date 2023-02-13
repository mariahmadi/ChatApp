const JWT = require('jsonwebtoken')

const createToken = (id) => {
    return JWT.sign({ id }, "secret", { expireIn: 60 * 24 * 60 })
}
const leaveRoom = (userID, chatRoomUsers) => {
    return chatRoomUsers.filter((user) => user.id != userID);
}


module.exports = { createToken, leaveRoom }