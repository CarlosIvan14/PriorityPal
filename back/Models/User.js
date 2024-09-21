const { Schema, model, models } = require('mongoose');

// Modelo para el usuario
const userSchema = new Schema({
    role: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    cv: {
        type: String, // Puede ser una URL o ruta a un archivo
        required: false
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    area: {
        type: Schema.Types.ObjectId, 
        ref: 'Area',
        required: true
    }
}, {
    timestamps: true
});

const UserModel = models.User || model('User', userSchema);

module.exports = UserModel;
