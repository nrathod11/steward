
const {Sequelize,sequelize} = require('../connect');
const Category = sequelize.define('category', {
    // id: {
    //     allowNull: false,
    //     autoIncrement: true,
    //     primaryKey: true,
    //     type: Sequelize.INTEGER
    //   },
    typeName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    // menuItemId: {
    //     type: Sequelize.INTEGER
    // },
    isDeleted:{
        type:Sequelize.BOOLEAN,
        defaultValue: Sequelize.BOOLEAN
    }
    }, {});
    
    
      
    Category.sync() //User.sync({ force: true })

exports.Category = Category;


// Category.hasMany(MenuItem, { as :"Categories" , foreignKey: "menuItemId"})
// MenuItem.belongsTo(Category,{ as:"MenuItems" , foreignKey: "menuItemId" })
// sequelize.sync();