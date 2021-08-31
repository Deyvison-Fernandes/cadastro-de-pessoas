const express = require('express');
const Pessoa = require('../models/pessoa');
const {sumConsult} = require('../middleware/countAccess');

const router = express.Router();

router.get('/', async (request, response) => {
    try {
        let query = request.query;

        if(query.nome){
            query.nome = { $regex: '.*' + query.nome + '.*' };
        }

        const pessoa = await Pessoa.find(query);
        sumConsult();
        
        return response.send({pessoa});
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao listar os dados' });
    }
});

router.get('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const pessoa = await Pessoa.findById(id);
        sumConsult();

        return response.send({pessoa});
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao consultar o registro' });
    }
});


router.post('/', async (request, response) => {
    try {
        const {nome, numero, blackList, dataNascimento} = request.body;
        const pessoa = await Pessoa.create({nome, numero, blackList, dataNascimento});
        
        await pessoa.save();

        return response.send({pessoa});
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao inserir o registro' });
    }
});

router.put('/:id', async (request, response) => {
    try {
        const id = request.params.id;
        const {nome, numero, blackList, dataNascimento} = request.body;

        const pessoa = await Pessoa.findByIdAndUpdate(id, {
            nome, numero, blackList, dataNascimento
        }, {new: true});

        return response.send({pessoa});
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao alterar o registro' });
    }
});

router.delete('/:id', async (request, response) => {
    try {
        const id = request.params.id;

        const pessoa = await Pessoa.findByIdAndRemove(id);

        return response.send({ mensagem: "Registro deletado" });
    } catch(error){
        return response.status(400).send({ error: true, messageError: 'Ocorreu um erro ao deletar o registro' });
    }
});

router.post('/deleteMany', async (req, res) => {
    try {

        const listaIds = req.body;
        if (Array.isArray(listaIds) && listaIds.length > 0) {
            await Pessoa.deleteMany({ '_id': { '$in': listaIds } });
        }

        return res.send();

    } catch (ex) {
        return res.status(400).send({ error: true, messageError: 'Ocorreu um erro ao deletar os registros' })
    }
})



module.exports = app => app.use('/pessoa', router);