const express = require('express');

const modelReceita= require('../models/modelReceita');

const router = express.Router();

/* TESTE DE CONEXÃO COM A API */
router.get('/', (req, res)=>{

    return res.status(200).json({status:'Conexão bem sucedida!'});

});

/*ROTA DE INSERÇÃO DE RECEITA */
router.post('/inserirReceita', (req, res)=>{
    let {nome_receita, ingredientes, modo_de_preparo, cod_categoria} = req.body;
    modelReceita.create(
        {
            nome_receita,
            ingredientes,
            modo_de_preparo,
            cod_categoria
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

/* ROTA DE LISTAGEM GERAL DE RECEITAS */
router.get('/listagemReceitas', (req, res)=>{

    modelReceita.findAll()
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'RECEITAS LISTADAS COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO LISTAR AS RECEITAS',
                errorObject:error
            }
        );
    });

    // return res.status(200).json({status:'TESTE DE LISTAGEM DE RECEITAS!'});

});

/* ROTA DE LISTAGEM DE RECEITA POR CÓDIGO DE RECEITA*/
router.get('/listagemReceita/:cod_receita', (req, res)=>{

    let { cod_receita } = req.params;

    modelReceita.findByPk(cod_receita)
    .then(
        (response)=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'RECEITA RECUPERADA COM SUCESSO',
                    data:response
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO RECUPERAR A RECEITA',
                errorObject:error
            }
        );
    });

    // return res.status(200).json({status:'TESTE DE LISTAGEM DA RECITA COM BUSCA POR CÓDIGO DA RECEITA!'});

});

/*ROTA DE EXCLUSÃO DA RECEITA */

router.delete('/excluirReceita/:cod_receita', (req, res)=>{
    let { cod_receita } = req.params;

    modelReceita.destroy(
        {where:{cod_receita}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'RECEITA EXCLUÍDA COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO EXCLUIR A RECEITA',
                errorObject:error
            }
        )
    })
})

router.put('/alterarReceita', (req, res)=>{
    let {cod_receita, nome_receita, ingredientes, modo_de_preparo } = req.body;

    modelReceita.update(
        {
            nome_receita,
            ingredientes,
            modo_de_preparo
        },
        {where:{cod_receita}}
    ).then(
        ()=>{
            return res.status(201).json(
                {
                    errorStatus:false,
                    mensageStatus:'RECEITA ALTERADA COM SUCESSO'
                }
            );
        }
    )
    .catch((error)=>{
        return res.status(400).json(
            {
                errorStatus:true,
                mensageStatus:'HOUVE UM ERRO AO ALTERAR A RECEITA',
                errorObject:error
            }
        );
    });
})

/* ROTA DE LISTAGEM DE RECEITAS POR CATEGORIA */
router.post('/listagemReceitasCategoria', (req, res) => {

    let { cod_categoria } = req.body;

    if (cod_categoria) {
        modelReceita.findAll({
            where: { cod_categoria: cod_categoria }
        })
        .then((response) => {
            return res.status(200).json({
                errorStatus: false,
                mensageStatus: 'RECEITAS FILTRADAS POR CATEGORIA COM SUCESSO',
                data: response
            });
        })
        .catch((error) => {
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'HOUVE UM ERRO AO FILTRAR AS RECEITAS POR CATEGORIA',
                errorObject: error
            });
        });
    } else {
        modelReceita.findAll()
        .then((response) => {
            return res.status(200).json({
                errorStatus: false,
                mensageStatus: 'RECEITAS LISTADAS COM SUCESSO',
                data: response
            });
        })
        .catch((error) => {
            return res.status(400).json({
                errorStatus: true,
                mensageStatus: 'HOUVE UM ERRO AO LISTAR AS RECEITAS',
                errorObject: error
            });
        });
    }
});

module.exports = router;