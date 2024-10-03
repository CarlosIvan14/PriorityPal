const express = require('express');
const UserModel = require('../Models/User');
const router = express.Router();

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
    const { id, role, name, cv, username, password, area } = req.body;

    try {
        const newUser = new UserModel({
            id,
            role,
            name,
            cv,
            username,
            password,
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
// Nueva ruta de búsqueda difusa
router.post('/search', async (req, res) => {
    const { query } = req.body; 
    try {
        const resultados = await taskFuzzySearch(query);
        res.status(200).json(resultados); 
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Fuzzy Search
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
        return resultadoBusqueda;
    } catch (error) {
        throw error;
    }
});


module.exports = router;
