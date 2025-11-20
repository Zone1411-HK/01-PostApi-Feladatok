
document.addEventListener('DOMContentLoaded', () => {
    console.log("asd")
    document.getElementById('submitBtn').addEventListener('click',castVote);
});

const postMethodFetch = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error('Hiba: ' + response.status + `(${response.statusText})`);
        }
        return await response.json();
    } catch (error) {
        throw new Error('Hiba: ' + error.message);
    };
};

const castVote = async () => {
    try {
        let textInput = document.getElementById('inputText').value;
        if(textInput != '') {
            const response = await postMethodFetch('/api/vote', {
                [textInput]: ""
            });
            const resArr = Object.entries(response.result);
            for(const item of resArr){

                console.log(item[1][textInput])
            }
            //console.log(resArr[0][1]);
        }
    } catch(err){
        console.log(err);
    }
}