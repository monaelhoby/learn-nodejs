
const mongoose = require('mongoose');

const DB_url = 'mongodb://localhost:27017/chat-app';

const chatSchema = mongoose.Schema({
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }], //to use mongoose population to overcome alot of requests to server
});

const Chat = mongoose.model("chat", chatSchema)

exports.Chat = Chat

exports.getChat = async chatId => {
    try{
        await mongoose.connect(DB_url);
        // i return user data by one request to database using populate
        let chat = await Chat.findById(chatId).populate('users')
        mongoose.disconnect();
        return chat
    }catch(err){
        mongoose.disconnect()
        throw new Error(err) 
    }
}