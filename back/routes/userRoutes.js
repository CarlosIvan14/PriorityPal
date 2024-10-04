const express = require('express');
const UserModel = require('../Models/User');
const router = express.Router();
const bcrypt = require('bcrypt');


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
        const user = await UserModel.findById(req.params.id).populate('area');
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

// Eliminar un usuario
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

// Fuzzy Search para buscar usuarios
router.get('/search', async (req, res) => {
    const busqueda = req.query.q;
    try {
        const resultadoBusqueda = await UserModel.aggregate([
            {
                $search: {
                    text: {
                        query: busqueda,
                        path: ["name", "username"],
                        fuzzy: {
                            maxEdits: 2,
                            prefixLength: 1
                        }
                    }
                }
            }
        ]);
        res.status(200).json(resultadoBusqueda);
    } catch (error) {
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

module.exports = router;
