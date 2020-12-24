const Sequelize = require('sequelize')
const sequelize = new Sequelize('postgres://postgres:Kru@dell2015@localhost:5432/steward')
sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch(err => {
    console.error('Unable to connect to the database:', err);
});

exports.Sequelize = Sequelize;
exports.sequelize = sequelize;
