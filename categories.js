const express = require('express');
const router = express.Router();
// const {recordNotFound,unexpectedError,recordExist,recordUpdated,recordDeleted} = require('../config/con-settings');
const config = require('config');

const { Category } = require('../models/category');
const Joi = require('joi');


// Create new record
router.post('/', async (req, res) => {

    let result = validation(req);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    try {    
        const checkExisitingCategory = await Category.findAll({
            //   attributes: ['id', 'firstName']
                where: { typeName: req.body.typeName }
            });
        if(checkExisitingCategory.length>0) return res.send(config.get('default_responses.recordExist'));
        else{            
            const newCategory = new Category(req.body)
            await newCategory.save()
            res.json({ category: newCategory }) // Returns the new user that is created in the database
        }
    } 
    catch(error) {
        // console.error(error)
        res.status(500).send(config.get('default_responses.unexpectedError'));
    }
});


// Get all records
router.get('/', async (req, res, next) => {
    // const { userId } = req
    const category =  await Category.findAll({
        //   attributes: ['id', 'firstName']
            where: { isDeleted: false }
        });
    if (category.length>0) return res.json(category)
    else return res.send(config.get('default_responses.recordNotFound'));
});

// Get particular record
router.get('/:userId', async (req, res) => {
    const category = await Category.findAll({
      
      where: { id:req.params.userId, isDeleted: false }

    });
    if(category.length >0) return  res.send(category);
    else return res.send(config.get('default_responses.recordNotFound')); 
});

//Update a record
router.put('/:userId',async(req,res)=>{
    let result = validation(req);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const category= await Category.findAll({
        where:{id:req.params.userId,isDeleted:false}
    });

    if(category.length >0) {
        const updated =  await Category.update(req.body,{where:{id:req.params.userId,isDeleted:false}});
        if(updated.length > 0 ) return res.send(req.body)
        else return res.send(config.get('default_responses.unexpectedError'));
    }
    else return res.send(config.get('default_responses.recordNotFound')); 
});

//Delete a record
router.delete('/:userId',async(req,res)=>{
    const category= await Category.findAll({
        where:{id:req.params.userId,isDeleted:false}
    });

    if(category.length >0) {
        const updated =  await Category.update({isDeleted:true},{where:{id:req.params.userId,isDeleted:false}});
        if(updated.length > 0 ) return res.send(config.get('default_responses.recordDeleted'));
        else return res.send(config.get('default_responses.unexpectedError'));
    }
    else return res.send(config.get('default_responses.recordNotFound')); 
});

// Input validation

const validation = (req) => {
    const schema = Joi.object({
        typeName : Joi.string().min(3).required(),
        isDeleted: Joi.bool().default(false)
    });
    let result = schema.validate(req.body);
    return result;
}


module.exports = router;

