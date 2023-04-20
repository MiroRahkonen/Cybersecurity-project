const registerForm = document.getElementById('register-form');

registerForm.addEventListener('submit',async (event)=>{
    event.preventDefault();

    const formData = new FormData(event.target);
    const response = await fetch('/register',{
        method: 'POST',
        body: formData
    })
    const data = await response.json();
    if(response.status != 200){
        M.toast({html: data.message});
    }
    
    if(response.status === 200){
        M.toast({html: 'Registration successful, redirecting to login page'});
        setTimeout(()=>{
            window.location.href='/login';
        },2500);
    }
})

//Redirect to index page if already logged in
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