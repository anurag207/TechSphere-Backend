const express=require('express');
const {listEvents, createEvents, registerEvent} = require('../controllers/eventController.js');
const {getEvents} =require('../controllers/eventfilterController.js');
const eventRouter=express.Router();
eventRouter.post('/',createEvents); 
eventRouter.get('/',listEvents); 
eventRouter.post('/:eventId/register',registerEvent); 
eventRouter.get('/filter',getEvents); 
module.exports={eventRouter};