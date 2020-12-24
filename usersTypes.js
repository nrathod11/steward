const express = require('express');
const router = express.Router();
// const {recordNotFound,unexpectedError,recordExist,recordUpdated,recordDeleted} = require('../config/con-settings');
const config = require('config');

const { UserType } = require('../models/userType');
const Joi = require('joi');


// Create new record
router.post('/', async (req, res) => {

    let result = validation(req);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    try {    
        const checkExisitingUserType = await UserType.findAll({
            //   attributes: ['id', 'firstName']
                where: { typeName: req.body.typeName }
            });
        if(checkExisitingUserType.length>0) return res.send(config.get('default_responses.recordExist'));
        else{            
            const newUserType = new UserType(req.body)
            await newUserType.save()
            res.json({ userType: newUserType }) // Returns the new user that is created in the database
        }
    } 
    catch(error) {
        // console.error(error)
        res.statusCode(500).send(config.get('default_responses.unexpectedError'));
    }
});


// Get all records
router.get('/', async (req, res, next) => {
    // const { userId } = req
    const userType =  await UserType.findAll({
        //   attributes: ['id', 'firstName']
            where: { isDeleted: false }
        });
    if (userType.length>0) return res.json(userType)
    else return res.send(config.get('default_responses.recordNotFound'));
});

// Get particular record
router.get('/:userId', async (req, res) => {
    const userType = await UserType.findAll({
      
      where: { id:req.params.userId, isDeleted: false }

    });
    if(userType.length >0) return  res.send(user);
    else return res.send(config.get('default_responses.recordNotFound')); 
});

//Update a record
router.put('/:userId',async(req,res)=>{
    let result = validation(req);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const userType= await UserType.findAll({
        where:{id:req.params.userId,isDeleted:false}
    });

    if(userType.length >0) {
        const updated =  await UserType.update(req.body,{where:{id:req.params.userId,isDeleted:false}});
        if(updated.length > 0 ) return res.send(req.body)
        else return res.send(config.get('default_responses.unexpectedError'));
    }
    else return res.send(config.get('default_responses.recordNotFound')); 
});

//Delete a record
router.delete('/:userId',async(req,res)=>{
    const userType= await UserType.findAll({
        where:{id:req.params.userId,isDeleted:false}
    });

    if(userType.length >0) {
        const updated =  await UserType.update({isDeleted:true},{where:{id:req.params.userId,isDeleted:false}});
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

