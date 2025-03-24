const { User } = require("../../../models/userModel");
const {Event} = require("../../../models/eventModel");

const getUserDashboard = async (req, res) => {
    try {
        let { userId } = req.params;
        userId=userId.trim();
        const currentDate = new Date();
    
        // const user = await User.findById(userId).populate("bookmarkedEvents");
        const user = await User.findById(userId)
  .populate("bookmarkEvents") // Fix: ensure field name matches schema
  .populate("registeredEvents"); // Populate registered events too
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
    
        // Convert stored string dates to Date while querying
        const pastEvents = await Event.find({
          $expr: { $lt: [{ $toDate: "$start" }, currentDate] },
        });
    
        res.json({
          bookmarks: user.bookmarkEvents,
          registeredEvents: user.registeredEvents,
          pastEvents: pastEvents
        });
    } catch (err) {
        console.error("Error fetching dashboard:", err);
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
  };

  module.exports={getUserDashboard};