setTimeout(() => {
    require('./connections/connection.mysql')();
    
}, 10000);
require('./connections/connection.mongo')();

const client = require('./connections/connection.redis')();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const UserDao = require('./dao/user.dao');
const { mongoDb } = require('./configs');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



app.get('/', (req, res) => {
    res.status(200).json({ status: 'success', payload: { apiVersion: 1.0, writtenBy: 'LexClass Members', supervisedBy: 'ABUBAKAR ZUBAIR IDRIS ', date: 'August 2020' }, message: 'Welcome to Lexclass Docker networking' });
});

app.post('/mongo', async (req, res) => {
    try {
        const savedUser = await UserDao.addNew(req.body);
        res.status(200).json({ status: 'success', payload: savedUser, message: 'User created successfully!'});
    } catch (err) {
        res.status(500).json({ status: 'failed', payload: null, message: err });
    }
});
//Get User from MongoDB
app.get('/mongo', async (req, res) => {
    try {
        const usersArray = await UserDao.getAll();
        res.status(200).json({ status: 'success', payload: usersArray, message: 'All Users fetched successfully'});
    } catch (err) {
        res.status(500).json({ status: 'failed', payload: null, message: err });
       
    }
});

app.listen(7000, () => {
    console.log('User Microservice listening on port 7000')
});

module.exports.app = app;