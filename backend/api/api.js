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

router.get('/asd', (request, response) => {
    response.status(200).json({
        success: 'asd'
    });
});

module.exports = router;
