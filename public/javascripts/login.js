const loginForm = document.getElementById('login-form');

let authToken;

// Executed when pressing submit on login form
loginForm.addEventListener('submit',async (event)=>{
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const response = await fetch('/login',{
        method: 'POST',
        body: formData
    })
    const data = await response.json();
    // If credentials weren't correct, create error toast
    if(response.status != 200){
        M.toast({html: data.message});
    }
    // If login successful, redirect to index
    if(data.token){
        const username = data.user.username;
        localStorage.setItem('auth_token',data.token);
        M.toast({html: `You are authenticated, Welcome ${username}! Redirecting to index...`});
        setTimeout(()=>{
            window.location.href='/';
        },2500);
    }
})

// Check if user already logged in
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
        // Checking if a stored authToken is expired, deleting it and reloading
        if(response.status !== 200){
            localStorage.removeItem('auth_token');
            window.location.reload();
        }
        // User is already logged in, redirect to index
        else if(response.status === 200){
            window.location.href = '/';
        }
    }
}

checkAuthToken();