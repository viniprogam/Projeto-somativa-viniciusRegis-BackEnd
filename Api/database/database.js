const Sequelize = require('sequelize');

const connection = new Sequelize(
    'bd_chefInova_api',
    'root',
    '050108',
    {
        host: 'localhost',
        password: '050108',
        port: '3306',
        dialect: 'mysql',
        timeZone: '-03:00'
    }
);

module.exports = connection;