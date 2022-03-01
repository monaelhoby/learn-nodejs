
const {sendFriendRequest, getFrineds} = require('../models/user-model')


module.exports = (io, socket) => {
    socket.on('sendFriendRequest', data => {
        sendFriendRequest(data)
            .then(() => {
                socket.emit('sendRequest')
                io.to(data.friendId).emit('newFriendRequest', {
                    name: data.myName, 
                    id: data.myId
                })
            }).catch(err => {
                console.log(err)
                socket.emit('request failed')
            })
    })

    socket.on('getOnlineFriends', (id) => {
        getFrineds(id)
            .then(friends => {
                let onlineFriends = friends.friends.filter(friend => io.onlineUsers[friend.id])
                // console.log(onlineFriends)
                socket.emit('onlineFriends', onlineFriends)
        })
    })
}