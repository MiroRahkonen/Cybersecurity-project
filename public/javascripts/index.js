const welcomeMessage = document.getElementById('welcome-message');

let user;

async function checkAuthToken(){
    authToken = localStorage.getItem('auth_token');
    if(authToken){
        let response = await fetch('/authenticate',{
            method: 'POST',
            headers: {
                'authorization': 'Bearer ' + authToken
            }
        })
        data = await response.json();
        user = data;

        // If token check failed due to it being expired, remove token and reload
        if(response.status !== 200){
            localStorage.removeItem('auth_token');
            window.location.reload();
        }
    }
    initializeMessage();
}

function initializeMessage(){
    if(user){
        welcomeMessage.innerHTML = `Welcome to the forum ${user.username}!`
    }
    else{
        welcomeMessage.innerHTML = 'Welcome to the forum! \nTo create posts and comments, please log in.'
    }
}

checkAuthToken();