const mongoose = require('mongoose');

const eventMoreDetailsSchema = new mongoose.Schema(
    {
        eventOverview: {
            image: { type: String },
            heading: { type: String },
            subtitle: { type: String },
            button: { type: String },
            subdetails: [{ label: { type: String }, value: { type: String } }]
          },
          details: [
            {
        id: { type: Number, required: true },
        heading: { type: String, required: true },
        text: { type: [mongoose.Schema.Types.Mixed] }, // Allows strings or objects
        days: { type: [{ type: mongoose.Schema.Types.Mixed }] }, // Nested object arrays
        imgSrc: { type: String },
        title: { type: String },
        subTitle: { type: String }
            }
          ]
    },
    { timestamps: true }
);

// module.exports = mongoose.model('eventMoreDetails', eventMoreDetailsSchema);
module.exports = { eventMoreDetailsSchema };
