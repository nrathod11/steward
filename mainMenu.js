const express = require('express');
const router = express.Router();
const config = require('config');

const { MenuItem } = require('../models/menuItem');
const { Category } = require('../models/category');
const Joi = require('joi');

// Get all records
router.get('/', async (req, res, next) => {
    const category =  await Category.findAll({
            where: { isDeleted: false }
        });
        let final = {}
        for (const i in category) {
            
            let items = []
            const typeName = Object.entries(category)[parseInt(i)][1].dataValues.typeName;
            console.log(typeName,parseInt(i)+1)
            const menuItem =  await MenuItem.findAll({
                where: { isDeleted: false , CategoryId: parseInt(i)+1}
            });
            for(const j in menuItem){
                items.push(menuItem[j].dataValues)
            }
            final[typeName] = items;
          }
    
    if (final) return res.json(final)
    else return res.send(config.get('default_responses.recordNotFound'));
});

module.exports = router;

