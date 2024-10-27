const Sequelize = require('sequelize');
const connection = require('../database/database');

const modelCategoria = require('./modelCategoria')

const modelReceita = connection.define(
    'tbl_receita',
    {
        cod_receita:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        cod_categoria:{
            type: Sequelize.INTEGER,
            allowNull: false
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

modelCategoria.hasMany(modelReceita, {
    foreingKey: 'cod_categoria',
    sourceKey: 'cod_categoria'
});

modelReceita.belongsTo(modelCategoria, {
    foreingKey: 'cod_categoria',
    sourceKey: 'cod_categoria'
})

// modelReceita.sync({force:true});


module.exports = modelReceita