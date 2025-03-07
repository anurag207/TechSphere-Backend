const mongoose = require('mongoose');

const eventMoreDetailsSchema = new mongoose.Schema(
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

// module.exports = mongoose.model('eventMoreDetails', eventMoreDetailsSchema);
module.exports = { eventMoreDetailsSchema };
