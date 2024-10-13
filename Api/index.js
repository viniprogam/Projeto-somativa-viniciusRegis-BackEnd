const express = require('express');
const cors = require('cors');

const routerReceita = require('./routes/routesReceita');
const routerCategoria = require('./routes/routesCategoria');

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/', routerReceita);
app.use('/', routerCategoria);

app.listen(5000, ()=>{
    console.log('Servidor rodando em:  http://localhost:5000 🏃');
});