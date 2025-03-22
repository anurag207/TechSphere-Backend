  const { Event } = require("../../../models/eventModel.js");
const { User } = require("../../../models/userModel.js");



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


// exports.registerEvent=async (req, res) => {
//   try {
//     const { eventId } = req.params;
//     const { registered } = req.body; // Array of registrations

//     // Find the event
//     const event = await Event.findById(eventId);
//     if (!event) {
//         return res.status(404).json({ message: "Event not found" });
//     }

//     // Register users //for of used instead of for each to handle asynchronous operations properly
//     for (let reg of registered) {
//         // const user = await User.findById(reg.userId);
//         // if (!user) {
//         //     return res.status(404).json({ message: `User with ID ${reg.userId} not found` });
//         // }  

//         event.registered.push(reg);
//         // user.registeredEvents.push(eventId);
//         // await user.save();
//     }

//     await event.save();
//     res.status(200).json({ message: "Users registered successfully", event });
// } catch (error) {
//     res.status(500).json({ message: "Error registering users", error: error.message });
// }
// }


exports.registerEvent = async (req, res) => {
  try {
    const { eventId } = req.params;
    const { registered } = req.body; // Array of registrations

    // Find the event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    for (let reg of registered) {
      event.registered.push(reg);

      // Update the user's registered events
      await User.findByIdAndUpdate(reg.userId, {
        $push: { registeredEvents: eventId },
      });
    }

    await event.save();
    res.status(200).json({ message: "Users registered successfully", event });
  } catch (error) {
    res.status(500).json({ message: "Error registering users", error: error.message });
  }
};
exports. bookmarkEvent = async (req, res) => {
    try {
      const { userId, eventId } = req.params; 
      console.log("User ID:", userId, "Event ID:", eventId);
  
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: "User not found" });
  
      if (!user.bookmarkEvents.includes(eventId)) {
        user.bookmarkEvents.push(eventId);
        await user.save();
        return res.json({ message: "Event bookmarked successfully", bookmarks: user.bookmarkEvents });
      }
  
      res.json({ message: "Event already bookmarked", bookmarks: user.bookmarkEvents });
    } catch (err) {
      console.error("Error in bookmarkEvent:", err);
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };
  
  
  // Get all bookmarked events
  exports.getBookmarkedEvents = async (req, res) => {
    try {
      const { userId } = req.params;  
      console.log("Fetching bookmarks for User ID:", userId);  
  
      const user = await User.findById(userId).populate("bookmarkEvents");
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.json({ bookmarks: user.bookmarkEvents });
    } catch (err) {
      console.error("Error fetching bookmarks:", err);  
      res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };
  exports.searchEvents = async (req, res) => {
    try {
        const { search } = req.query; // Get only the search query
        console.log("Searching for:", search);
  
        let query = {};
  
        // 🔹 Filter events by search input (name field)
        if (search && search.trim() !== "") {
            query.name = { $regex: search, $options: "i" }; 
        }
  
        console.log("Final MongoDB Query:", query);
  
        // 🔹 Fetch filtered events
        const events = await Event.find(query).limit(20);
        console.log("filtred Events",events);
  
        res.json(events);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).json({ message: "Server error" });
    }
  };

exports.getUserDashboard = async (req, res) => {
  try {
    let { userId } = req.params;
    userId=userId.trim();
    const currentDate = new Date();

    const user = await User.findById(userId).populate("bookmarkEvents");
    console.log("Fetching dashboard for User ID:", userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
      console.log("User not found");
    }

    // Convert stored string dates to Date while querying
    const pastEvents = await Event.find({
      $expr: { $lt: [{ $toDate: "$start" }, currentDate] },
    });

    res.json({
      bookmarks: user.bookmarkEvents,
      pastEvents: pastEvents,
    });
  } catch (err) {
    console.error("Error fetching dashboard:", err);
    res.status(500).json({ message: "Internal server error", error: err.message });
  }
};