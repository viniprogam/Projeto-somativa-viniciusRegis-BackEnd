const express = require('express');

const modelCategoria = require('../models/modelCategoria');

const router = express.Router();


/*ROTA DE INSERÇÃO */
router.post('/inserirCategoria', (req, res)=>{
    let {nome_categoria} = req.body;
    modelCategoria.create(
        {
            nome_categoria
        }
    )
    .then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'CATEGORIA iNSERIDA'
                    
                }
            );
        }
    )
    .cath((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mesageStatus:'HOUVE UM ERRO AO INSERIR',
                errorObject:error
            }
        );
    });
});

/* ROTA DE LISTAGEM GERAL DE CATEGORIAS */
router.get('/listagemCategorias', (req, res)=>{

    modelCategoria.findAll()
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'CATEGORIAS LISTADAS COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO LISTAR AS CATEGORIAS',
                errorObject:error
            }
        );
    });

});

module.exports = router;