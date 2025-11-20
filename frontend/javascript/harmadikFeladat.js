document.addEventListener('DOMContentLoaded', () => {
    fillNameList();
    document.getElementById('submitBtn').addEventListener('click', sendName);
});

const getMethodFetch = (url) => {
    return fetch(url)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Hiba: ' + response.status + '(' + response.statusText + ')');
            }
            return response.json();
        })
        .catch((error) => {
            throw new Error('Hiba: ' + error.message);
        });
};

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

const fillNameList = () => {
    getMethodFetch('/api/names')
        .then((data) => {
            const arr = data.results;
            const select = document.createElement('select');

            for (const item of arr) {
                const option = document.createElement('option');
                option.value = item;
                option.innerText = item;
                select.appendChild(option);
            }

            document.getElementById('selectDiv').replaceChildren(select);
        })
        .catch((error) => {
            console.error('Hiba: ' + error.message);
        });
};

const sendName = async () => {
    try {
        const textInput = document.getElementById('textInput');
        if (textInput.value != '') {
            const response = await postMethodFetch('/api/names', {
                name: textInput.value
            });
            fillNameList();
        }
    } catch (error) {
        console.error('Hiba: ' + error);
    }
}