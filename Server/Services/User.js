let users = []

const AddUser = ({ socketId, username, roomId, user }) => {
    const exist = users.find(user => { user.id == user.id && user.room == roomId })
    if (exist) {
        return { error: "User Already Logged In" }
    }
    const newUser = { socketId, username, roomId, user }
    users.push(newUser)
    console.log('users list', users)
    return { user }


}
const removeUser = (socketId) => {

    const Index = users.findIndex(user => { user.socketId == socketId })
    if (Index !== -1) {
        return users.splice(Index, 1)
    }


}
const GetUsers = (socketId) => {
    const user = users.find(user => { user.socketId === socketId })
    return user
}
module.exports = { AddUser, removeUser, GetUsers }