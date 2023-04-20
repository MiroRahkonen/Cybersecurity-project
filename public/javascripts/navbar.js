const errorMessage = document.getElementById('error-message');
const logoutSection = document.getElementById('logout-section');
const logoutButton = document.getElementById('logout-button');
const loginButton = document.getElementById('login-button');
const loginSection = document.getElementById('login-section');
const registerButton = document.getElementById('register-button');
const registerSection = document.getElementById('register-section');

async function initializeHeader(){
    const authToken = localStorage.getItem('auth_token');

    // No token, show login and register buttons
    if(!authToken){
        loginSection.removeAttribute('hidden');
        return registerSection.removeAttribute('hidden');
    }

    let response = await fetch('/authenticate',{
        method: 'POST',
        headers: {
            'authorization': 'Bearer ' + authToken
        }
    })
    data = await response.json();
    // Checking if a stored authToken is expired, deleting it and reloading
    if(response.status !== 200){
        localStorage.removeItem('auth_token');
        window.location.reload();
    }
    // Token authentication successful, show logout button
    else if(response.status === 200){
        logoutSection.removeAttribute('hidden')
        return;
    }
}

logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('auth_token');
    return document.location.reload();
})

initializeHeader();