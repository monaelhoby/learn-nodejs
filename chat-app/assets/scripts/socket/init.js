const socket = io();


const friendrequestsbtn = document.getElementById('friendrequestsdropdown');

let myId = document.getElementById('myId').value

socket.on('connect', () => {
    socket.emit('joinNotificationRoom', myId)
    socket.emit('goOnline', myId)
}) ;

socket.on('newFriendRequest', (data) => {
    const friendRequests = document.getElementById('friendRequests');
    friendRequests.innerHTML += `
        <a class="dropdown-item" href="/profile/${data.id}">
            ${data.name}
        </a>
    `;
    friendrequestsbtn.classList.remove('btn-primary')
    friendrequestsbtn.classList.add('btn-danger')
    friendrequestsbtn.find('i').style('color','#bb2d3b')
})

    friendrequestsbtn.onclick = () => {
        friendrequestsbtn.classList.add('btn-primary')
        friendrequestsbtn.classList.remove('btn-danger')
        friendrequestsbtn.find('i').style('color','#FFF')
    }