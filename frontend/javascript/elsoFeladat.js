document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('sendBtn').addEventListener('click', sendMessage);
});

const postFetch = async(url,data) => {
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error('Hiba: ' + response.status + response.statusText);
        }
        return await response.json();
    } catch(error){
        throw new Error('Hiba: ' + error);
    };
};

const sendMessage = async () => {
    try {
        const sender = document.getElementById('sender').value;
        const message = document.getElementById('message').value;
        if(sender != "" && message != ""){
            const response = await postFetch('api/sendMessage', {
                sender: sender,
                message: message
            });
            const p = document.getElementById('p');
            p.innerText = response.success;
        }
    } catch(error) {
        console.error('Hiba: ' + error);
    }
};