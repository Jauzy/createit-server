const users = []

//join user to chat
const userJoin = (id, uid, utype, room) => {
    const user = { id, uid, utype, room }
    const index = users.findIndex(user => user.id === id)
    if (index === -1)
        users.push(user)
    else {
        users[index].uid = uid
        users[index].utype = utype
    }
    return user
}

const getCurrentUser = (id) => {
    return users.find(user => user.id === id)
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