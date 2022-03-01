const chatModel = require('../models/chat-model')
const messageModel = require('../models/message-model')

exports.getChat = (req, res, next) => {
    let chatId = req.params.id;
    messageModel.getMessages(chatId).then((messages) => {
        // console.log("messages", messages)
        if(messages.length == 0){
            chatModel.getChat(chatId).then(chat => {
                let friendData = chat.users.find(
                    user => user._id !== req.session.userId
                );
                res.render('chat', {
                    pageTitle: friendData.userName,
                    isUser: req.session.userId,
                    friendRequests: req.friendRequests.friendRequests,
                    messages: messages,
                    friendData: friendData,
                    chatId: chatId
                })
            })
        } else {
            let friendData = messages[0].chat.users.find(
                user => user._id !== req.session.userId
            );
            res.render('chat', {
                pageTitle: friendData.userName,
                isUser: req.session.userId,
                friendRequests: req.friendRequests.friendRequests,
                messages: messages,
                friendData: friendData,
                chatId: chatId
            })
        }
    })
}