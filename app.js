const coments = document.getElementById('comments');
const currentUserAvatar = document.getElementById('current-user-avatar');
let http = new XMLHttpRequest();
let isEditable = false;

http.open('get', './data.json');
http.responseType = 'json';
http.send();


http.onload = async function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = this.response;
            currentUserAvatar.src = data.currentUser.image.png;

            for (let item of data.comments) {
                let replies = '';
                for (let reply of item.replies) {
                    replies += `
                    <div class='comment'>
                        <div class='comment-controls'>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
                            </button>
                            <strong>
                                ${reply.score}
                            </strong>
                            <button>
                                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="3"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
                            </button>
                        </div>
                        <div class='comment-content'>
                            <div class='comment-user'>
                                <div class='comment-user-info'>
                                    <img src='${reply.user.image.png}' alt=''>
                                    <strong>${reply.user.username}</strong> ${ reply.user.username == data.currentUser.username ? '<span class="currentUserStatus">YOU</span>' : '' }
                                    <span>${reply.createdAt}</span>
                                </div>
                                ${ reply.user.username == data.currentUser.username ? 
                                        `<div class="reply-btn">
                                            <button class="btn-delete btn-delete"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="14">
                                                    <path d="M1.167 12.448c0 .854.7 1.552 1.555 1.552h6.222c.856 0 1.556-.698 1.556-1.552V3.5H1.167v8.948Zm10.5-11.281H8.75L7.773 0h-3.88l-.976 1.167H0v1.166h11.667V1.167Z" fill="#ED6368"/>
                                                </svg> 
                                                Delete 
                                            </button>
                                            <button class="btn-edit"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14"><path d="M13.479 2.872 11.08.474a1.75 1.75 0 0 0-2.327-.06L.879 8.287a1.75 1.75 0 0 0-.5 1.06l-.375 3.648a.875.875 0 0 0 .875.954h.078l3.65-.333c.399-.04.773-.216 1.058-.499l7.875-7.875a1.68 1.68 0 0 0-.061-2.371Zm-2.975 2.923L8.159 3.449 9.865 1.7l2.389 2.39-1.75 1.706Z" fill="#5357B6"/></svg> 
                                                Edit 
                                            </button>
                                        </div>` 
                                        : `<button class="btn-reply"> 
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg> 
                                                Reply 
                                            </button>` }
                                
                            </div>
                                ${data.currentUser.username == reply.user.username ? 
                                    `
                                        <form class='hide'>
                                            <textarea name="comment" rows="4" placeholder="Add a comment...">@${reply.replyingTo+' '+reply.content}</textarea>
                                            <button class="btn-send">
                                                Update
                                            </button>
                                        </form>
                                        <p>
                                            <span class='replingto'> @${reply.replyingTo} </span> ${reply.content}
                                        </p>
                                    ` :
                                    `
                                        <p>
                                            <span class='replingto'> @${reply.replyingTo} </span> ${reply.content}
                                        </p>
                                    `
                                
                                }
                            </div>
                    </div>
                    <div class="add-reply-section">
                        <img src="${data.currentUser.image.png}" alt="current-user">
                        <form>
                            <textarea name="comment" rows="5" placeholder="Add a comment...">@${reply.replyingTo}</textarea>
                            <button class="btn-send">
                            Reply
                            </button>
                        </form>
                    </div>
                `
            }

            coments.innerHTML += `
                <div class='comment'>
                    <div class='comment-controls'>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11"><path d="M6.33 10.896c.137 0 .255-.05.354-.149.1-.1.149-.217.149-.354V7.004h3.315c.136 0 .254-.05.354-.149.099-.1.148-.217.148-.354V5.272a.483.483 0 0 0-.148-.354.483.483 0 0 0-.354-.149H6.833V1.4a.483.483 0 0 0-.149-.354.483.483 0 0 0-.354-.149H4.915a.483.483 0 0 0-.354.149c-.1.1-.149.217-.149.354v3.37H1.08a.483.483 0 0 0-.354.15c-.1.099-.149.217-.149.353v1.23c0 .136.05.254.149.353.1.1.217.149.354.149h3.333v3.39c0 .136.05.254.15.353.098.1.216.149.353.149H6.33Z" fill="#C5C6EF"/></svg>
                        </button>
                        <strong>
                            ${item.score}
                        </strong>
                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" width="11" height="3"><path d="M9.256 2.66c.204 0 .38-.056.53-.167.148-.11.222-.243.222-.396V.722c0-.152-.074-.284-.223-.395a.859.859 0 0 0-.53-.167H.76a.859.859 0 0 0-.53.167C.083.437.009.57.009.722v1.375c0 .153.074.285.223.396a.859.859 0 0 0 .53.167h8.495Z" fill="#C5C6EF"/></svg>
                        </button>
                    </div>
                    <div class='comment-content'>
                        <div class='comment-user'>
                            <div class='comment-user-info'>
                                <img src='${item.user.image.png}' alt=''>
                                <strong>${item.user.username}</strong>
                                <span>${item.createdAt}</span>
                            </div>
                            <button class='btn-reply'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13"><path d="M.227 4.316 5.04.16a.657.657 0 0 1 1.085.497v2.189c4.392.05 7.875.93 7.875 5.093 0 1.68-1.082 3.344-2.279 4.214-.373.272-.905-.07-.767-.51 1.24-3.964-.588-5.017-4.829-5.078v2.404c0 .566-.664.86-1.085.496L.227 5.31a.657.657 0 0 1 0-.993Z" fill="#5357B6"/></svg>
                                Reply
                            </button>
                        </div>
                        <p>
                            ${item.content}
                        </p>
                    </div>
                </div>
                <div class="add-reply-section">
                        <img src="${data.currentUser.image.png}" alt="current-user">
                        <form>
                            <textarea name="comment" rows="5" placeholder="Add a comment...">@${item.user.username}</textarea>
                            <button class="btn-send">
                            Reply
                            </button>
                        </form>
                    </div>
                <div class='reply'>
                    ${replies}
                </div>
            `;

            replies = '';
        }
    }
}

http.onloadend = function() {
    const btns_reply = document.querySelectorAll('.btn-reply');
    btns_reply.forEach(reply => {
        let reply_parent = reply.parentElement.parentElement.parentElement.nextElementSibling;
        reply.onclick = function() {
            reply_parent.classList.toggle('flex');
        }
    })

    const deleteBtn = document.querySelector('.btn-delete')
    deleteBtn.onclick = () => {
        document.querySelector('.modal-container').classList.toggle('show');
    }

    const cancelModal = document.querySelector('#cancel-modal')
    cancelModal.onclick = () => {
        document.querySelector('.modal-container').classList.toggle('show');
    }

    const btn_edit = document.querySelectorAll('.btn-edit');
    btn_edit.forEach( btn =>{
        let form = btn.parentElement.parentElement.nextElementSibling
        let p = btn.parentElement.parentElement.nextElementSibling.nextElementSibling
        btn.onclick = function(){
            p.classList.toggle('hide')
            form.classList.toggle('hide')
        }
        
    })
}