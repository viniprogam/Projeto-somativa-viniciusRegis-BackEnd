const express = require('express');

const modelReceita= require('../models/modelReceita');

const router = express.Router();

/* TESTE DE CONEXÃO COM A API */
router.get('/', (req, res)=>{

    return res.status(200).json({status:'Conexão bem sucedida!'});

});

/*ROTA DE INSERÇÃO DE RECEITA */
router.post('/inserirReceita', (req, res)=>{
    let {nome_receita, ingredientes, modo_de_preparo} = req.body;
    modelReceita.create(
        {
            nome_receita,
            ingredientes,
            modo_de_preparo
        }
    )
    .then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'Receita INSERIDA COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO INSERIR A RECEITA',
                errorObject:error
            }
        );
    });
});

module.exports = router;