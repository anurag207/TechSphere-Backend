const {Schema,model}=require("mongoose");
const mongoose = require("mongoose");
// const {Event} = require("./eventModel.js");

const userSchema=new Schema({
    // name: String,
    name: { type: String },
            email: { type: String, required: true, unique: true },
            password: { type: String, required: true },
            eventId: { type: mongoose.Schema.Types.ObjectId, ref: 'events' },
            bookmarkEvents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'events' }],
            registeredEvents: [{ type: Schema.Types.ObjectId, ref: "events"}], // Prevents duplicate event registrations
    
},{
    timestamps: true
});
// console.log(user);  
const User=model('users',userSchema);
module.exports={User};