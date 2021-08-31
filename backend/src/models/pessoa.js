const mongoose = require('../config/database');

const PessoaSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    numero: {
        type: String,
        require: true
    },
    blackList: {
        type: Boolean,
        required: true,
        default: false,
    },
    dataNascimento: {
        type: Date
    },
    dataRegistro: {
        type: Date,
        default: Date.now,
    }
});

const Pessoa = mongoose.model('Pessoa', PessoaSchema);
module.exports = Pessoa;