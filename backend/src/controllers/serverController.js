const express = require('express');
const router = express.Router();
const process = require('process');
const mongoose = require('../config/database');

router.get('/', async (request, response) => {
    try {
        const dataAtual = Date.now();
        const timeUp = process.uptime();
        const mlTime = timeUp * 1000;

        return response.send({
            dateUp: new Date(dataAtual - mlTime),
            secondsUp: process.uptime(),
            dbStatus: mongoose.connection.readyState,
            totalAccess: serverRequest.totalAccess,
            totalConsult: serverRequest.totalConsult
        });

    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Erro ao acessar o serviço' });
    }
});

module.exports = app => app.use('/server', router);