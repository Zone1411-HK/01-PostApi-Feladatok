const nomineeObj = {
    c: 5
};
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submitBtn').addEventListener('click', castVote);
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
    }
};

const castVote = async () => {
    try {
        let textInput = document.getElementById('inputText').value;
        let nomineeDiv = document.getElementById('nomineeDiv');
        let contDiv = document.createElement('div');

        if (textInput != '') {
            const response = await postMethodFetch('/api/vote', {
                [textInput]: ''
            });

            const resArr = Object.entries(response.result);
            for (let i = 0; i < resArr.length; i++) {
                let tempArr = Object.entries(resArr[i][1])[0];
                let p = document.createElement('p');

                p.innerText = tempArr[0] + ' : ' + tempArr[1];
                contDiv.appendChild(p);
            }

            nomineeDiv.replaceChildren(contDiv);
        }
    } catch (err) {
        console.log(err);
    }
};
