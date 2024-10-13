const { Schema, model, models, default: mongoose } = require('mongoose');

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
    },
    requests:[{
        from:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required: true
        },
        message:{
            type: String,
            required: true,
        },
        status:{
            type:String,
            enum:["pendiente","aceptada","rechazada"],
            default: "pendiente"
        }
    }],
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
}, {
    timestamps: true
});

const UserModel = models.User || model('User', userSchema);

module.exports = UserModel;
