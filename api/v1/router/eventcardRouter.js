const express=require('express');
const { listeventcards} = require('../controllers/eventCardControlle.js');
const eventcardRouter=express.Router();
eventcardRouter.get('/',listeventcards);  
module.exports={eventcardRouter};