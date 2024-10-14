const express = require('express');
const UserModel = require('../Models/User');
const router = express.Router();
const bcrypt = require('bcrypt');
const Fuse = require('fuse.js'); 


// Fuzzy Search para buscar usuarios por nombre o nombre de usuario
router.get('/search', async (req, res) => {
    const busqueda = req.query.q;

    try {
        const users = await UserModel.find();
        const options = {
            keys: ['name', 'username'],  
            threshold: 0.1, 
            distance: 100,
        };

        const fuse = new Fuse(users, options);
        
        const resultadoBusqueda = fuse.search(busqueda).map(result => result.item);

        res.status(200).json(resultadoBusqueda);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todos los usuarios
router.get('/', async (req, res) => {
    try {
        const users = await UserModel.find().populate('area');
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener un usuario por ID
router.get('/:id', async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id).populate('area');3
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear un nuevo usuario
router.post('/', async (req, res) => {
    const { role, name, cv, username, password, area } = req.body;

    try {
        if(!username || !password || !role || !area ||!name){
            return res.status(400).json({message: 'Todos los campos son requeridos, llena los faltantes'})
        }

        const hashedPassword = await bcrypt.hash(password, 10);  // Encriptar la contraseña
        const newUser = new UserModel({
            role,
            name,
            cv,
            username,
            password: hashedPassword,  // Guardar la contraseña encriptada
            area
        });

        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un usuario
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un usuario por id
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        if (deletedUser) {
            res.status(200).json({ message: 'Usuario eliminado' });
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Eliminar un usuario por username
router.delete('/deleteByUsername/:username', async (req, res) =>{
    const { username } = req.params; 
    try{
        const deletedUser = await UserModel.findOneAndDelete({username});
        if(deletedUser){
            res.status(200).json({message: 'Usuario eliminado', user: deletedUser})
        }else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    }catch(error){
        res.status(500).json({ message: error.message });
    }
});



// Endpoint de Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await UserModel.findOne({ username });

        if (!user) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
        }

        return res.status(200).json({ message: 'Inicio de sesión exitoso', user });
    } catch (error) {
        return res.status(500).json({ message: 'Error en el servidor', error });
    }
});

// Obtener usuarios por área
router.get('/area/:areaId', async (req, res) => {
    const { areaId } = req.params; // Obtén el ID del área de los parámetros de la solicitud

    try {
        const usersInArea = await UserModel.find({ area: areaId }).populate('area'); // Busca usuarios en el área especificada
        res.status(200).json(usersInArea); // Devuelve los usuarios encontrados
    } catch (error) {
        res.status(500).json({ message: error.message }); // Manejo de errores
    }
});

//Mandar un request de mensaje
router.post('/sendrequest', async (req, res) => {
    const { senderId, receiverId, message } = req.body;

    console.log(senderId);
    console.log(receiverId);
    console.log(message);

    const receiver = await UserModel.findById(receiverId);
    if (!receiver) {
        return res.status(404).json({ message: 'Receiver not found' });
    }

    // Inicializa la propiedad request como un array si no existe
    if (!receiver.requests) {
        receiver.requests = [];
    }

    receiver.requests.push({ from: senderId, message });
    await receiver.save();

    res.status(200).json({ message: 'Request sent successfully' });
});

// Obtener solicitudes de chats
router.get('/getrequests/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Buscar el usuario y popular el campo "requests.from" con los datos "name" y "email"
        const user = await UserModel.findById(userId).populate("requests.from", "name");

        // Verificar si el usuario existe
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Devolver las solicitudes del usuario
        res.status(200).json(user.requests);
    } catch (error) {
        // Registrar el error en la consola
        console.error('Error al obtener las solicitudes:', error);

        // Devolver una respuesta de error al cliente
        res.status(500).json({ message: "Internal Server Error" });
    }
});
 router.post('/acceptrequest', async (req,res) => {
    try{
        const {userId,requestId} = req.body;

        const user =await UserModel.findById(userId);
        if(!user){
            return res.status(404).json({message:"Usuario no encontrado"});
        }
        const updatedUser= await UserModel.findByIdAndUpdate(userId,{
            $pull:{requests:{from:requestId}}
        },
        {new:true},
        );
        if(!updatedUser){
            return res.status(404).json({message:"Solicitud no encontrada"})
        }
        
        await UserModel.findByIdAndUpdate(userId,{
            $push:{friends:requestId},
        });
        const friendUser = await UserModel.findByIdAndUpdate(requestId,{
            $push:{friends:userId},
        });

        if(!friendUser){
            return res.status(404).json({message:"Friend not found"})
        }
        
        res.status(200).json({message:"Solicitud aceptada "})
    } catch(error){
        console.log("error",error);
        res.status(500).json({message:"Error en el server"})
    }
 });

router.get('/user/:userId', async (req,res) => {
    try{
        const userId = req.params.userId;

        const users = await UserModel.findById(userId).populate('friends','name');
        console.log('Amigos del usuario:', users.friends);
        res.json(users.friends);
    }catch(error){
        console.log('Error al fetch de los usuarios',error);
    }
});

module.exports = router;
