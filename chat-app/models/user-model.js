const mongoose = require('mongoose');

const Chat = require('./chat-model').Chat

const DB_url = 'mongodb://localhost:27017/chat-app';

const userSchema = mongoose.Schema({
    userName : String,
    email : String,
    password : String,
    image : {type: String, default: 'default-user-image.png'},
    isOnline: {type: Boolean, default: false},
    friends: {
        type: [{name: String, image: String, id: String, chatId: String}],
        default: []
    },
    friendRequests : {
        type: [{name: String, id: String}],
        default: []
    },
    sendRequests : {
        type: [{name: String, id: String}],
        default: []
    }
});

const User = mongoose.model('user', userSchema)

exports.User = User

exports.getUserData = (id) => {
    return new Promise ((resolve, reject) => {
        mongoose
            .connect(DB_url)
            .then(() => {
                return User.findById(id)
            })
            .then(id => {
                mongoose.disconnect();
                resolve(id)
            })
            .catch(err => {
                mongoose.disconnect()
                reject(err)
            })
    })
}

exports.sendFriendRequest = async (data) => {
    try{
        await mongoose.connect(DB_url);
        await User.updateOne(
            {_id: data.friendId},
            {$push: {friendRequests : {name: data.myName, id: data.myId}}}
        );
        await User.updateOne(
            {_id: data.myId},
            {$push: {sendRequests : {name: data.userName, id: data.friendId}}}
        );
        mongoose.disconnect()
        return
    }catch(err) {
        mongoose.disconnect()
        throw new Error(err)
    }
}

exports.cancelFriendRequest = async (data) => {
    try{
        await mongoose.connect(DB_url);
        await User.updateOne(
            {_id: data.friendId},
            {$pull: {friendRequests : {id: data.myId}}}
        );
        await User.updateOne(
            {_id: data.myId},
            {$pull: {sendRequests : {id: data.friendId}}}
        );
        mongoose.disconnect()
        return
    }catch(err) {
        mongoose.disconnect()
        throw new Error(err)
    }
}


exports.acceptFriendRequest = async (data) => {
    try{
        await mongoose.connect(DB_url);
        let newChat = new Chat ({
            users: [data.myId, data.friendId]
        });
        let theChat = await newChat.save()
        await User.updateOne(
            {_id: data.friendId},
            {
                $push: {
                friends : {
                    name: data.myName, 
                    image: data.myImage, 
                    id: data.myId,
                    chatId: theChat._id
                }
            }
        }
        );
        await User.updateOne(
            {_id: data.myId},
            {
                $push: {
                    friends : {
                        name: data.userName,
                        image: data.userImage, 
                        id: data.friendId,
                        chatId: theChat._id
                    }
                }
            }
        );
        await User.updateOne(
            {_id: data.friendId},
            {$pull: {sendRequests : {id: data.myId}}}
        );
        await User.updateOne(
            {_id: data.myId},
            {$pull: {friendRequests : {id: data.friendId}}}
        );
        mongoose.disconnect()
        return
    }catch(err) {
        mongoose.disconnect()
        throw new Error(err)
    }
}

exports.DeleteFriend = async (data) => {
    try{
        await mongoose.connect(DB_url);
        await Promise.all([ // take array of promises runs in same time
            User.updateOne(
                {_id: data.friendId},
                {
                    $pull: {friends : {id: data.myId}}
                }
            ),
            User.updateOne(
                {_id: data.myId},
                {
                    $pull: {friends : {id: data.friendId},}
                }
            )
        ])
        mongoose.disconnect()
        return
    }catch(err) {
        mongoose.disconnect()
        throw new Error(err)
    }
}

exports.RejectFriendRequest = async (data) => {
    try{
        await mongoose.connect(DB_url);
        await User.updateOne(
            {_id: data.friendId},
            {$pull: {sendRequests : {id: data.myId}}}
        );
        await User.updateOne(
            {_id: data.myId},
            {$pull: {friendRequests : {id: data.friendId}}}
        );
        mongoose.disconnect()
        return
    }catch(err) {
        mongoose.disconnect()
        throw new Error(err)
    }
}

exports.getFriendRequests = async id => {
    try {
        await mongoose.connect(DB_url);
        let data = User.findById(id, {friendRequests: true});
        return data
    }catch(err) {
        mongoose.disconnect()
        throw new Error(err)
    }
}

exports.getFrineds = async id => {
    try{
        await mongoose.connect(DB_url);
        let data = User.findById(id, {friends: true});
        return data
    }catch(err){
        mongoose.disconnect()
        throw new Error(err)
    }
}