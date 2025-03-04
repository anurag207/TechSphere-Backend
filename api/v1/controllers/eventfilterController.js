const { EventCard } = require("../../../models/eventcardModel.js");

exports.getEvents = async (req, res) => {
  try {
    const {
      view,
      sortBy,
      price,
      isFree,
      duration,
      page = 1,
      size = 20,
    } = req.query;

    const filter = {};
    const today = Date.now();
    // today.setUTCHours(0, 0, 0, 0);

    if (view === "upcoming") {
      filter.start = { $gte: today };
    } else if (view === "past") {
      filter.start = { $lt: today };
    }

    if (isFree === "true") {
      filter.prize = "Free";
    } else if (price) {
      filter.prize = price;
    }

    if (duration) {
      filter.duration = duration;
    }

    const totalEventsInDatabase = await EventCard.countDocuments({});
    const totalFilteredEvents = await EventCard.countDocuments(filter);

    let query = EventCard.find(filter);

    const sortFields = {
      date: { start: 1 },
      location: { location: 1 },
      duration: { duration: 1 },
      prize: { prize: 1 },
    };

    if (sortBy && sortFields[sortBy]) {
      query = query.sort(sortFields[sortBy]);
    }

    const pageNumber = Number(page);
    const pageSize = Number(size);
    query = query.skip((pageNumber - 1) * pageSize).limit(pageSize);

    const events = await query;

    res.json({
      events,
      totalEvents: totalEventsInDatabase,
      totalFilteredEvents,
      totalPages: Math.ceil(totalEventsInDatabase / pageSize),
      currentPage: pageNumber,
      pageSize,
    });
  } catch (error) {
    console.error("❌ Server Error:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
};
