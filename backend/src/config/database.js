const mongoose = require('mongoose');

mongoose.connect('mongodb://mongo/cadastropessoas');

mongoose.Promise = global.Promise;
module.exports = mongoose;