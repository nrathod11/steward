
const {Sequelize,sequelize} = require('../connect');
const User = sequelize.define('user', {
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    lastName: {
        type: Sequelize.STRING    
    },
    phoneNumber: {
        type: Sequelize.BIGINT,
        allowNull: false    
    },
    profilePic:{
        type: Sequelize.STRING
    },
    userType:{
        type:Sequelize.INTEGER
    },
    isDeleted:{
        type:Sequelize.BOOLEAN,
        defaultValue: Sequelize.BOOLEAN
    }
    }, {
    
    // options
    
    });
    
    
    User.sync() //User.sync({ force: true })

exports.User = User;