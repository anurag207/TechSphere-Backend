const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");
const { eventMoreDetailsSchema } = require('./eventMoreDetails');
const {registeredSchema} = require('./registeredModel');

const registrationSchema = new Schema(
  {
      title: { type: String, required: true },
      type: { type: String, enum: ["text", "number", "email", "select"], required: true },
      validationRegex: { type: String },
      isRequired: { type: Boolean, required: true },
      options: { type: [String] }, // Optional for select fields (dropdowns)
  },

);


const eventSchema = new Schema(
  {
    type: { type: String, required: true },
        location: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String },
        start: { type: Date,  },
        duration: { type: String, },
        prize: { type: String },
        image_bg: { type: String },
        image_url: { type: String },
        eventMoreDetails: eventMoreDetailsSchema, // Embedded schema\
        registration: [registrationSchema],// Embedded schema
        registered: [registeredSchema]// Embedded schema

  },
  {
    timestamps: true,
  }
);
// console.log(user);
const Event = model("events", eventSchema);
module.exports = { Event };

// Event.create({
//   name: "Lik 3",
//   start: new Date("28 April 2025"),
// });
