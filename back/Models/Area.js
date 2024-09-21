const { Schema, model, models } = require('mongoose');

const areaSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

const AreaModel = models.Area || model('Area', areaSchema);

module.exports = AreaModel;
