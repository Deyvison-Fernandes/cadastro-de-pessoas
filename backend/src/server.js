const express = require('express');
const {sumAccess} = require('./middleware/countAccess');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

app.use(sumAccess);

require('./controllers/serverController')(app);
require('./controllers/pessoaController')(app);


app.listen(5000);


console.log('Server on port', 5000);