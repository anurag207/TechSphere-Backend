const express=require('express');
const {listEvents, createEvents, registerEvent,bookmarkEvent,getBookmarkedEvents,searchEvents} =require('../controllers/eventController.js');
const {getEvents} =require('../controllers/eventfilterController.js');

const eventRouter=express.Router();
eventRouter.post('/',createEvents); 
eventRouter.get('/',listEvents); 
eventRouter.post('/:eventId/register',registerEvent); 
eventRouter.get('/filter',getEvents); 
eventRouter.post("/bookmark/:userId/:eventId",bookmarkEvent);
eventRouter.get("/bookmarks/:userId",getBookmarkedEvents);
eventRouter.get("/search",searchEvents);
module.exports={eventRouter};