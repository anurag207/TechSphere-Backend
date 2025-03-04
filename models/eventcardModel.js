const { Schema, model } = require("mongoose");
const eventcardSchema = new Schema(
  {
    location: String,
    name: String,
    description: String,
    start: { type: Date },
    duration: String,
    prize: String,
    imageBg: String,
  },
  {
    timestamps: true,
  }
);
// console.log(user);
const EventCard = model("eventcards", eventcardSchema);
module.exports = { EventCard };

// EventCard.create({
//   name: "Lik 3",
//   start: new Date("28 April 2025"),
// });
