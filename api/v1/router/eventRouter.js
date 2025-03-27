const express = require("express");
const {
  listEvents,
  createEvents,
  registerEvent,
  bookmarkEvent,
  getBookmarkedEvents,
  searchEvents,
} = require("../controllers/eventController.js");
const { getEvents } = require("../controllers/eventfilterController.js");
const { verifyToken } = require("../middleware/jwtVerification.js");
const eventRouter = express.Router();
eventRouter.post("/", verifyToken, createEvents);
eventRouter.get("/", listEvents);
eventRouter.post("/:eventId/register", verifyToken, registerEvent);
eventRouter.get("/filter", getEvents);
eventRouter.post("/bookmark/:userId/:eventId", bookmarkEvent);
eventRouter.get("/bookmarks/:userId", getBookmarkedEvents);
eventRouter.get("/search", searchEvents);
module.exports = { eventRouter };
