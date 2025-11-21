document.addEventListener('DOMContentLoaded', () => {
    generateTaskList();
    document.getElementById('submitInput').addEventListener('click', newTask);
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

const getMethodFetch = async (url) => {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Hiba: ${response.status} ( ${response.statusText} )`);
        }
        return await response.json();
    } catch (err) {
        throw new Error('Hiba: ' + err.message);
    }
};

const generateTaskList = async () => {
    try {
        const response = await getMethodFetch('api/todos');
        const taskArray = response.result;
        const taskList = document.createElement('ol');
        taskList.id = 'taskList';
        taskList.classList.add('list-group', 'text-light');
        const listDiv = document.getElementById('listDiv');

        for (const item of taskArray) {
            const li = document.createElement('li');
            li.dataset.done = false;
            li.addEventListener('click', doneTask);
            li.innerText = item;
            li.classList.add(
                'list-group-item',
                'list-group-item-action',
                'px-5',
                'list-group-item-warning'
            );

            taskList.appendChild(li);
        }
        listDiv.replaceChildren(taskList);
    } catch (err) {
        console.log(`Hiba: ${err.message}`);
    }
};

const newTask = async () => {
    try {
        const textInput = document.getElementById('textInput').value;

        if (textInput != '') {
            const response = await postMethodFetch('/api/todos', {
                task: textInput
            });
            const taskList = document.getElementById('taskList');
            const li = document.createElement('li');
            li.dataset.done = false;
            li.addEventListener('click', doneTask);
            li.classList.add(
                'list-group-item',
                'list-group-item-action',
                'px-5',
                'list-group-item-warning'
            );
            li.innerText = textInput;
            taskList.appendChild(li);
        }
    } catch (err) {
        console.log(`Hiba: ${err}`);
    }
};

function doneTask() {
    if (this.dataset.done == 'false') {
        this.dataset.done = true;
        this.style.textDecoration = 'line-through';
    } else {
        this.dataset.done = false;
        this.style.textDecoration = 'none';
    }
}
