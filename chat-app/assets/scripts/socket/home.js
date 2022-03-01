

// const myId = document.getElementById('myId').value
socket.emit('getOnlineFriends', myId);

socket.on('onlineFriends', friends => {
    let div = document.getElementById('onlineFriends');
    if(friends.length === 0){
        div.innerHTML += `<p class="alert alert-danger">There is no online friends</p>`
    }else{
        let cartHtml = ` 
                    <div class="row">
                `
        for(let friend of friends){
            cartHtml += `
                    <div class="col-md-4 col-sm-6">
                        <div class="card clearfix" style="width: 18rem;">
                        <div>
                        <img src="/${friend.image}" width="100" alt="...">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">
                                <a href="/profile/${friend.id}">
                                    ${friend.name}
                                </a>
                            </h5>
                            <p class="card-text">
                                <a href="/chat/${friend.chatId}" class="btn btn-primary">Chat</a>
                            <p>
                        </div>
                        </div>
                    </div>
                `
        }
        cartHtml += `</div>`
        div.innerHTML = cartHtml
    }
})