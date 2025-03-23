const { User } = require("../../../models/userModel");
const {Event} = require("../../../models/eventModel");
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