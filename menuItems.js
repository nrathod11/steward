const express = require('express');
const router = express.Router();
// const {recordNotFound,unexpectedError,recordExist,recordUpdated,recordDeleted} = require('../config/con-settings');
const config = require('config');

const { MenuItem } = require('../models/menuItem');
const Joi = require('joi');


// Create new record
router.post('/', async (req, res) => {

    let result = validation(req);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    try {    
        const checkExisitingMenuItem = await MenuItem.findAll({
            //   attributes: ['id', 'firstName']
                where: { Name: req.body.Name }
            });
        if(checkExisitingMenuItem.length>0) return res.send(config.get('default_responses.recordExist'));
        else{            
            const newMenuItem = new MenuItem(req.body)
            await newMenuItem.save()
            res.json({ menuItem: newMenuItem }) // Returns the new user that is created in the database
        }
    } 
    catch(error) {
        console.error(error)
        res.status(500).send(config.get('default_responses.unexpectedError'));
    }
});


// Get all records
router.get('/', async (req, res, next) => {
    // const { userId } = req
    const menuItem =  await MenuItem.findAll({
        //   attributes: ['id', 'firstName']
            where: { isDeleted: false }
        });
    if (menuItem.length>0) return res.json(menuItem)
    else return res.send(config.get('default_responses.recordNotFound'));
});

// Get particular record
router.get('/:userId', async (req, res) => {
    const menuItem = await MenuItem.findAll({
      
      where: { id:req.params.userId, isDeleted: false }

    });
    if(menuItem.length >0) return  res.send(menuItem);
    else return res.send(config.get('default_responses.recordNotFound')); 
});

//Update a record
router.put('/:userId',async(req,res)=>{
    let result = validation(req);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const menuItem= await MenuItem.findAll({
        where:{id:req.params.userId,isDeleted:false}
    });

    if(menuItem.length >0) {
        const updated =  await MenuItem.update(req.body,{where:{id:req.params.userId,isDeleted:false}});
        if(updated.length > 0 ) return res.send(req.body)
        else return res.send(config.get('default_responses.unexpectedError'));
    }
    else return res.send(config.get('default_responses.recordNotFound')); 
});

//Delete a record
router.delete('/:userId',async(req,res)=>{
    const menuItem= await MenuItem.findAll({
        where:{id:req.params.userId,isDeleted:false}
    });

    if(menuItem.length >0) {
        const updated =  await MenuItem.update({isDeleted:true},{where:{id:req.params.userId,isDeleted:false}});
        if(updated.length > 0 ) return res.send(config.get('default_responses.recordDeleted'));
        else return res.send(config.get('default_responses.unexpectedError'));
    }
    else return res.send(config.get('default_responses.recordNotFound')); 
});

// Input validation

const validation = (req) => {
    const schema = Joi.object({
        Name : Joi.string().min(3).required(),
        isDeleted: Joi.bool().default(false),
        Description: Joi.string().min(10).max(100),
        CategoryId: Joi.number().required(),
        Image: Joi.string(),
        Price: Joi.number().required(),
        isActive: Joi.bool().required(),
        isDeleted: Joi.bool()
    });
    let result = schema.validate(req.body);
    return result;
}


module.exports = router;

