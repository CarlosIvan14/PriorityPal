const { Schema, model, models } = require('mongoose');

// Modelo para la tarea
const taskSchema = new Schema({
    id_users: [{
        type: Schema.Types.String,
        ref: 'User'
    }],
    name: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    area_id: {
        type: Schema.Types.String,
        ref: 'Area',
        required: true
    },
    status:{
        type: String,
        require: true,
    },
    progress:{
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

const TaskModel = models.Task || model('Task', taskSchema);

module.exports = TaskModel;
