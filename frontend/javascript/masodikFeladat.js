document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', saveData);
});

const postMethodFetch = async(url, data) => {
    try{
        const response = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        });
        if(!response.ok){
            throw new Error('Hiba: ' + response.status + '(' + response.statusText + ')');
        }
        return await response.json();
    } catch (error) {
        throw new Error('Hiba: ' + error);
    };
};

const saveData = async () => {
    try{

        const input = document.getElementById('inputText');
        const data = input.value;
        if(data != ''){

            const response = await postMethodFetch('/api/saveData', {
                key: data
            });
            const h1 = document.getElementById('sikeres');

            h1.innerText = response.success;
            input.disabled = true;
            
            setTimeout( () => {
                h1.innerText = "";
                input.value = "";
                input.disabled = false;
            }, 2000);
        } else {
            alert('TÖLTSD KI HE!');
        }
    } catch (error) {
        console.log('Hiba: ' + error);
    }
}