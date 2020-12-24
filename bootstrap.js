module.exports = async () => {
    const Category = require('./models/category');
    const MenuItems = require('./models/menuItem');

    MenuItems.create({Name : " Test", Description : "test3", Image : "asdfsdf", Price: '2.2', category_id : 1, isActive : true ,isDeleted : false})
}