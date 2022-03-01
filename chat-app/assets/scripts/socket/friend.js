const addBtn = document.getElementById('addFriend');

// const myId = document.getElementById('myId').value
const myName = document.getElementById('myName').value
const myImage = document.getElementById('myImage').value
const friendId = document.getElementById('friendId').value
const friendName = document.getElementById('friendName').value
const friendImage = document.getElementById('friendImage').value

addBtn.onclick = (e) => {
    e.preventDefault()
    socket.emit('sendFriendRequest', {
        myId,  myName, myImage, friendId, friendName, friendImage
    })
}

socket.on('sendRequest', () => {
    console.log("addBtn", addBtn)
    addBtn.remove()
    document.getElementById('friendForm').innerHTML =+ `
    <input type="submit" value="Cancel Request" class="btn btn-danger" formaction="/friend/cancel"/>
    `
})