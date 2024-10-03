const express = require('express');
const AreaModel = require('../Models/Area');  
const router = express.Router();
console.log(AreaModel); 

// Obtener todas las áreas
router.get('/', async (req, res) => {
    try {
        const areas = await AreaModel.find();
        res.status(200).json(areas);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva área
router.post('/', async (req, res) => {
    const { name, description } = req.body;

    try {
        const newArea = new AreaModel({
            name,
            description
        });

        const savedArea = await newArea.save();
        res.status(201).json(savedArea);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar un área
router.put('/:id', async (req, res) => {
    try {
        const updatedArea = await AreaModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedArea);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar un área
router.delete('/:id', async (req, res) => {
    try {
        const deletedArea = await AreaModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Área eliminada' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;