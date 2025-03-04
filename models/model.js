const mongoose = require('mongoose');

/* === models/User.js === */
const UserSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        eventCardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
        savedEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Event' }],
        registeredEvents: [
            {
                eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'Event' },
                registrationFields: { type: mongoose.Schema.Types.Mixed }
            }
        ],
        mode: { type: String },
        hostedBy: { type: String },
        contact: { type: String }
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

/* === models/EventMoreDetails.js === */
const EventMoreDetailsSchema = new mongoose.Schema(
    {
        id: { type: Number, required: true },
        heading: { type: String, required: true },
        text: { type: [mongoose.Schema.Types.Mixed] }, // Allows strings or objects
        days: { type: [{ type: mongoose.Schema.Types.Mixed }] }, // Nested object arrays
        imgSrc: { type: String },
        title: { type: String },
        subTitle: { type: String }
    },
    { timestamps: true }
);

const EventMoreDetails = mongoose.model('EventMoreDetails', EventMoreDetailsSchema);

/* === models/Registration.js === */
const RegistrationSchema = new mongoose.Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phoneNumber: { type: String, required: true },
        teamName: { type: String },
        teamMembers: [{ type: String }] // Array for team members
    },
    { timestamps: true }
);

const Registration = mongoose.model('Registration', RegistrationSchema);

/* === models/Event.js === */
const EventSchema = new mongoose.Schema(
    {
        type: { type: String, required: true },
        location: { type: String, required: true },
        name: { type: String, required: true },
        description: { type: String },
        start: { type: Date, required: true },
        duration: { type: String, required: true },
        prize: { type: String },
        image_bg: { type: String },
        image_url: { type: String },
        eventMoreDetails: [EventMoreDetailsSchema], // Embedded schema
        registered: [RegistrationSchema] // Embedded schema
    },
    { timestamps: true }
);

const Event = mongoose.model('Event', EventSchema);

/* === Exporting Models === */
module.exports = { User, Event, EventMoreDetails, Registration };