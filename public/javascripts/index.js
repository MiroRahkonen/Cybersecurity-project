let currentUsername = '';

async function checkToken()
    const authToken = localStorage.getItem('auth_token');
    if(authToken){
        let response = await fetch('/token/authenticate',{
            headers: {
                'authorization': 'Bearer ' + authToken
            }
        })
        data = await response.json();
        currentUsername = data.username;
}

checkToken();