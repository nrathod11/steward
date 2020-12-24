
const {Sequelize,sequelize} = require('../connect');
const UserType = sequelize.define('usertype', {
    typeName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isDeleted:{
        type:Sequelize.BOOLEAN,
        defaultValue: Sequelize.BOOLEAN
    }
    }, {
    
    // options
    
    });
    
    
    UserType.sync() //User.sync({ force: true })

exports.UserType = UserType;