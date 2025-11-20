const express = require('express');
const router = express.Router();
const database = require('../sql/database.js');
const fs = require('fs/promises');

//!Multer
const multer = require('multer'); //?npm install multer
const path = require('path');

const storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, path.join(__dirname, '../uploads'));
    },
    filename: (request, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname); //?egyedi név: dátum - file eredeti neve
    }
});

const upload = multer({ storage });

//!Endpoints:
//?GET /api/test
router.get('/test', (request, response) => {
    response.status(200).json({
        message: 'Ez a végpont működik.'
    });
});

//?GET /api/testsql
router.get('/testsql', async (request, response) => {
    try {
        const selectall = await database.selectall();
        response.status(200).json({
            message: 'Ez a végpont működik.',
            results: selectall
        });
    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }
});

let messages = [];
router.post('/sendMessage', (request, response) => {
    /*
    try {
        const body = request.body;
        const sender = body.sender;
        const message = body.message;

        const senderMessage = {
            sender: sender,
            message: message
        };

        messages.push(senderMessage);
        console.log(messages);

        response.status(200).json({
            success: 'Üzenet fogadva',
            results: messages
        });

    } catch (error) {
        response.status(500).json({
            message: 'Ez a végpont nem működik.'
        });
    }*/
    const { sender, message } = request.body;
    messages.push({
        sender: sender,
        message: message
    });
    console.log(messages);

    response.status(200).json({
        success: 'Üzenet fogadva!'
    });
});

let saveDataArray = [];
router.post('/saveData', (request, response) => {
    const { key } = request.body;

    saveDataArray.push({
        key: key
    });
    console.log(saveDataArray);


    response.status(200).json({
        success: "Sikeres mentés"
    });
})

let harmadikNames = [];
router.post('/names', (request, response) => {
    const { name } = request.body;

    harmadikNames.push(name);
    console.log(harmadikNames);

    response.status(200).json({
        success: "Sikeres mentés!"
    });
});

router.get('/names', (request, response) => {
    response.status(200).json({
        success: "Siker",
        results: harmadikNames
    });
});

let votes = [];
router.post('/vote', (request, response) => {
    const body = request.body;
    const nominee = Object.keys(body)[0];

    let i = 0;
    while (i < votes.length && Object.keys(votes[i])[0] != nominee) {
        i++;
    }
 
    if (i < votes.length) {
        votes[i][nominee]++;
    } else {
        const tempObj = {
            [nominee]: 1
        };
        votes.push(tempObj);
    }

    console.log(votes);

    response.status(200).json({
        result: votes
    });

});

router.get('/asd', (request, response) => {
    response.status(200).json({
        success: 'asd'
    });
});

module.exports = router;
