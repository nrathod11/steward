
const {Sequelize,sequelize} = require('../connect');
const Category = require('../models/category');

const MenuItem = sequelize.define('menuitem', {
    // id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    Name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Description: {
        type: Sequelize.STRING
    },
    Image: { 
        type : Sequelize.STRING
    },
    Price: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    CategoryId :  {
        type: Sequelize.INTEGER,
        // references: {
        //   modelName: 'Category',
        //   key: 'id'
        // }
      },
    isActive:{
        type:Sequelize.BOOLEAN,
        defaultValue: Sequelize.BOOLEAN
    },
    isDeleted:{
        type:Sequelize.BOOLEAN,
        defaultValue: Sequelize.BOOLEAN
    }
    }, {});
    
    MenuItem.sync() //User.sync({ force: true })
    
exports.MenuItem = MenuItem;
