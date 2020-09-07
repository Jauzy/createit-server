const users = []

//join user to chat
const userJoin = (id, uid, utype, room) => {
    const user = { id, uid, utype, room }
    const index = users.findIndex(user => user.uid === uid && user.room === room)
    if (index === -1)
        users.push(user)
    else {
        users[index].id = id
    }
    return user
}

const getCurrentUser = (id, room) => {
    return users.find(user => user.uid === id && user.room == room)
}

const userLeave = (id) => {
    const index = users.findIndex(user => user.id === id)
    if (index != -1) {
        return users.splice(index, 1)[0]
    }
}

const getRoomUsers = (room) => {
    return users.filter(user => user.room === room)
}

module.exports = {
    userJoin,
    getCurrentUser,
    userLeave,
    getRoomUsers
}