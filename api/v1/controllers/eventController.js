const { Event } = require("../../../models/eventModel.js");

exports.createEvents=async (req, res) => {
  try{
      const {body}=req;
      const newEvent = await Event.create(body);
      res.status(201);
      // console.log(body);
      res.json({
          "status": 'success',
          "message": 'Event Created',
          data: newEvent
      });
  // console.log(res);
}

catch(err)
{

  res.status(400);
  console.log(err);

  res.json({
      "status": 'fail',
      "message": `Event Not Created ${err}`
  });
  

  // console.log("-----Error Occured",err);
}
}

// exports.listEvents = async (req, res) => {
//   try {
//     // const {body}=req;
//     const eventRes = await Event.find();
//     res.status(200);
//     // console.log(eventRes);
//     // console.log(body);
//     res.json({
//       status: "success!",
//       message: "Events Fetched",
//       data: eventRes,
//     });
//     // console.log(res);
//   } catch (err) {
//     res.status(500); //only possible when connection/server is down, so client no mistake

//     res.json({
//       status: "fail",
//       message: `Internal Server Error`,
//     });

//     // console.log("-----Error Occured",err);
//   }
// };



exports.listEvents = async (req, res) => {
  try {
    const { eventId } = req.query; // Check if eventId is provided

    if (eventId) {
      // Fetch both eventMoreDetails and registration details
      const event = await Event.findById(eventId).select("eventMoreDetails registration");
      if (!event) {
        return res.status(404).json({ status: "fail", message: "Event not found" });
      }
      return res.status(200).json({
        status: "success",
        message: "Event More Details Fetched",
        data: event,
      });
    } else {
      // Fetch only basic details for all events
      const eventRes = await Event.find().select("_id type location name description start duration prize image_bg image_url");
      return res.status(200).json({
        status: "success",
        message: "Events Fetched",
        data: eventRes,
      });
    }
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({
      status: "fail",
      message: "Internal Server Error",
    });
  }
};


exports.registerEvent=async (req, res) => {
  try {
    const { eventId } = req.params;
    const { registered } = req.body; // Array of registrations

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
        return res.status(404).json({ message: "Event not found" });
    }

    // Register users //for of used instead of for each to handle asynchronous operations properly
    for (let reg of registered) {
        // const user = await User.findById(reg.userId);
        // if (!user) {
        //     return res.status(404).json({ message: `User with ID ${reg.userId} not found` });
        // }  

        event.registered.push(reg);
        // user.registeredEvents.push(eventId);
        // await user.save();
    }

    await event.save();
    res.status(200).json({ message: "Users registered successfully", event });
} catch (error) {
    res.status(500).json({ message: "Error registering users", error: error.message });
}
}
