const { Sequelize } = require('sequelize')

const sequelize = new Sequelize ({
    host: 'localhost',
    database: 'eduwork_cruds',
    username: 'root',
    dialect: 'mysql'
})



//TESTING KONEKSI
// const  test = async () => {
// try {
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }
// test();

module.exports = sequelize;