const mongoose = require("mongoose");
const { Schema } = mongoose;

// Schema for individual form fields
const registeredDetailsSchema = new Schema(
    {
        title: { type: String, required: true },
        value: { type: String, required: true }
    
    },
   
);

// Schema for user registration
const registeredSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "users", required: true }, // Reference to the registered user enforcing uniqueness
        registeredDetails: [registeredDetailsSchema], // Array of form fields as per the given format
    },
    { timestamps: true }
);

module.exports = { registeredSchema };




// const registrationSchema = new mongoose.Schema(
//     {
//         userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to user who registered
//         name: { type: String, required: true },
//         email: { type: String, required: true },
//         phoneNumber: { type: String, required: true },
//         type: { type: String, enum: ["hackathon", "webinar", "email"], required: true },
//         teamName: { type: String },
//         teamMembers: [{ type: String }] // Array for team members
//     },
//     { timestamps: true }
// );

// // module.exports = mongoose.model('registrations', registrationSchema);
// module.exports = { registrationSchema };
