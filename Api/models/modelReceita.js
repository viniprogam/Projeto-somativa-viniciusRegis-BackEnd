const Sequelize = require('sequelize');
const connection = require('../database/database');

const modelReceita = connection.define(
    'tbl_receita',
    {
        cod_receita:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        nome_receita:{
            type:Sequelize.STRING(100),
            allowNull:true
        },
        ingredientes:{
            type:Sequelize.TEXT,
            allowNull:true
        },
        modo_de_preparo:{
            type:Sequelize.TEXT,
            allowNull:true
        } 
    }
);

// modelReceita.sync({force:true});


module.exports = modelReceita