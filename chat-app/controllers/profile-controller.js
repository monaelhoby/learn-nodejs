const userModel = require('../models/user-model');


exports.redirect = (req, res, next) => {
    res.redirect('/profile/'+ req.session.userId)
}

exports.getProfile = (req, res, next) => {
    let id = req.params.id || req.session.userId;
    userModel
        .getUserData(id)
        .then(data => {
            // console.log(req.friendRequests.friendRequests)
            res.render('profile', {
                pageTitle : data.userName,
                isUser : req.session.userId,
                myId: req.session.userId,
                myName: req.session.userName,
                myImage: req.session.userImage,
                friendRequests: req.friendRequests.friendRequests,
                friendId: data._id,
                userImage: data.image,
                userName: data.userName,
                isOwner: id === req.session.userId,
                isFriends: data.friends.find(friend => friend.id === req.session.userId),
                isRequestSent: data.friendRequests.find(friend => friend.id === req.session.userId),
                isRequestRecieved: data.sendRequests.find(friend => friend.id === req.session.userId),
            })
        }).catch(err => {
            console.log(err)
        })
}

