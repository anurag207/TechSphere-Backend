const express=require('express');
const {listeventcards} = require('../controllers/eventcardController.js');
const {getEvents} =require('../controllers/eventfilterController.js');
const eventcardRouter=express.Router();
eventcardRouter.get('/',listeventcards); 
eventcardRouter.get('/filter',getEvents); 
module.exports={eventcardRouter};