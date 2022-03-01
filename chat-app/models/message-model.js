
const mongoose = require('mongoose');

const DB_url = 'mongodb://localhost:27017/chat-app';

const messageSchema = mongoose.Schema({
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'chat'
    }, //to use mongoose population to overcome alot of requests to server
    content: String,
    sender: String,
    timeStamp: Number
});

const Messages = mongoose.model("message", messageSchema)

exports.getMessages = async chatId => {
    try{
        await mongoose.connect(DB_url);
        // i return user data by one request to database using populate
        let messages = await Messages.find({chat: chatId}, null, {sort: {timeStamp: 1}}).populate({
            path: 'chat', //field
            model: 'chat', //name in ref
            populate: {
                path: 'users',
                model: 'user',
                select: 'userName image' //field i want to return
            }
        })
        mongoose.disconnect();
        return messages
    }catch(err){
        mongoose.disconnect()
        throw new Error(err) 
    }
}

exports.newMessage = async msg => {
    try{
        await mongoose.connect(DB_url);
        msg.timeStamp = Date.now()
        let newmsg = new Messages(msg)
        await newmsg.save()
        mongoose.disconnect();
        return 
    }catch(err){
        mongoose.disconnect()
        throw new Error(err) 
    }
}