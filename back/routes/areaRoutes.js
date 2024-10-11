const express = require('express');
const AreaModel = require('../Models/Area');  
const router = express.Router();
console.log(AreaModel); 
const Fuse = require('fuse.js'); 

//Fuzy Search
router.get('/search', async (req,res)=>{
    const busqueda = req.query.q;
    console.log("Buscando por area:", busqueda);
    try{
        const areas = await AreaModel.find().populate('_id');

        const fuseOptions ={
            keys: ['name'],
            threshold: 0.3,
            distance:100,
            includeScore: true
        };
        const fuse = new Fuse(areas,fuseOptions);

        const resultadoBusqueda = fuse.search(busqueda).map(result => result.item);
        console.log("Resultados encontrados:", resultadoBusqueda.length);
        res.status(200).json(resultadoBusqueda);
    }catch(error){
        res.status(500).json({message: error. message});
    }

});



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

// Eliminar un área por id
router.delete('/:id', async (req, res) => {
    try {
        const deletedArea = await AreaModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Área eliminada' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


//Eliminar un área por nombre
router.delete('/deleteByName/:name', async (req,res) => {
    try {
        const deletedArea = await AreaModel.findOneAndDelete({name: req.params.name});
        if (!deletedArea){
            return res.status(404).json({message: 'Area no encontrada'})
        }
        res.status(200).json({message: 'Area eliminada'})
    } catch (error){
        res.status(400).json({message: error.message});
    }
});


module.exports = router;