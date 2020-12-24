const express = require('express');
const router = express.Router();
// const {recordNotFound,unexpectedError,recordExist,recordUpdated,recordDeleted} = require('../config/con-settings');
const config = require('config');

const {Hotel} = require('../models/hotel');
const Joi = require('joi');


// Create new record
router.post('/', async (req, res) => {

    let result = validation(req);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    try {    
        const checkExisitingUser = await Hotel.findAll({
            //   attributes: ['id', 'firstName']
                where: { phoneNumber: req.body.phoneNumber }
            });
        if(checkExisitingUser.length>0) return res.send(config.get('default_responses.recordExist'));
        else{            
            const newHotel = new Hotel(req.body)
            await newHotel.save()
            res.json({ hotel: newHotel }) // Returns the new user that is created in the database
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
    const hotel =  await Hotel.findAll({
        //   attributes: ['id', 'firstName']
            where: { isDeleted: false }
        });
    if (hotel.length>0) return res.json(hotel)
    else return res.send(config.get('default_responses.recordNotFound'));
});

// Get particular record
router.get('/:userId', async (req, res) => {
    const hotel = await Hotel.findAll({
      
      where: { id:req.params.userId, isDeleted: false }

    });
    if(hotel.length >0) return  res.send(hotel);
    else return res.send(config.get('default_responses.recordNotFound')); 
});

//Update a record
router.put('/:userId',async(req,res)=>{
    let result = validation(req);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }

    const hotel= await Hotel.findAll({
        where:{id:req.params.userId,isDeleted:false}
    });

    if(hotel.length >0) {
        const updated =  await Hotel.update(req.body,{where:{id:req.params.userId,isDeleted:false}});
        if(updated.length > 0 ) return res.send(req.body)
        else return res.send(config.get('default_responses.unexpectedError'));
    }
    else return res.send(config.get('default_responses.recordNotFound')); 
});

//Delete a record
router.delete('/:userId',async(req,res)=>{
    const hotel= await Hotel.findAll({
        where:{id:req.params.userId,isDeleted:false}
    });

    if(hotel.length >0) {
        const updated =  await Hotel.update({isDeleted:true},{where:{id:req.params.userId,isDeleted:false}});
        if(updated.length > 0 ) return res.send(config.get('default_responses.recordDeleted'));
        else return res.send(config.get('default_responses.unexpectedError'));
    }
    else return res.send(config.get('default_responses.recordNotFound')); 
});

// Input validation

const validation = (req) => {
    const schema = Joi.object({
        name : Joi.string().min(3).required(),
        tagLine : Joi.string().min(3).required(),
        phoneNumber : Joi.string().min(10).max(10).required(),
        logo: Joi.string(),
        location: Joi.string(),
        isDeleted: Joi.bool().default(false)
    });
    let result = schema.validate(req.body);
    return result;
}


module.exports = router;

