
const {Sequelize,sequelize} = require('../connect');
const Hotel = sequelize.define('hotel', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    
    tagLine: {
        type: Sequelize.STRING    
    },
    phoneNumber: {
        type: Sequelize.BIGINT,
        allowNull: false    
    },
    logo:{
        type: Sequelize.STRING
    },
    location:{
        type:Sequelize.STRING
    },
    isDeleted:{
        type:Sequelize.BOOLEAN,
        defaultValue: Sequelize.BOOLEAN
    }
    }, {
    
    // options
    
    });
    
    
    Hotel.sync() //Hotel.sync({ force: true })

exports.Hotel = Hotel;