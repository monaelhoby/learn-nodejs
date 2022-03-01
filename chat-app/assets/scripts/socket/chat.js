const chatId = document.getElementById("chatId").value
const msgContent = document.getElementById("message")
const sendBtn = document.getElementById("sendBtn")
const msgContainer = document.getElementById("messages-container")
const btnVideoCall = document.getElementById("btnVideoCall")

socket.emit("joinChat", chatId);

sendBtn.onclick = () => {
    let content = msgContent.value;
    socket.emit("sendMessage", {
        chat: chatId,
        content: content,
        sender: myId
    })
}

socket.on("newMessage", msg => {
    msgContainer.innerHTML = msg.content ;
    msgContent.value = " ";
})

let peer = new Peer();
let peerId = null
peer.on('open', function(id) {
    peerId = id
    console.log('My peer ID is: ' + id);
  });

btnVideoCall.onclick = () => {
    socket.emit('requestPeerId', chatId)
}

socket.on('getPeerId', () => {
    socket.emit('sendPeerId', {
        chatId: chatId,
        peerId: peerId
    })
})

socket.on('recievePeerId', id => {
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    }).then(stream => {
        let call = peer.call(id,stream)
        call.on("recieveStream", showVideoCall)
    }).catch(err => {
        console.log(err)
    })
})

peer.on('call', function(call) {
    navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true
    }).then(stream => {
        call.answer(stream);
        call.on("recieveStream", showVideoCall)
    }).catch(err => {
        console.log(err)
    })
  });

  //display video on screen

  function showVideoCall(stream) {
    let video = document.createElement('video');
    video.srcObject = stream
    document.body.append(video)
    video.play()
  }