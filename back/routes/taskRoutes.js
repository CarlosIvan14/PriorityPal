const express = require('express');
const TaskModel = require('../Models/Task');
const router = express.Router();
const mongoose = require('mongoose');
const Fuse = require('fuse.js'); 


// Fuzzy Search
router.get('/search', async (req, res) => {
    const busqueda = req.query.q;
    console.log("Buscando por descripción:", busqueda); 

    try {
        // Obtener todas las tareas
        const tasks = await TaskModel.find().populate('area_id');

        const fuseOptions = {
            keys: ['description'], 
            threshold: 0.3, 
            distance: 100, 
            includeScore: true 
        };

        const fuse = new Fuse(tasks, fuseOptions);

        const resultadoBusqueda = fuse.search(busqueda).map(result => result.item); 

        console.log("Resultados encontrados:", resultadoBusqueda.length); // Imprime la cantidad de resultados
        res.status(200).json(resultadoBusqueda); // Devolver los resultados filtrados
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Obtener todas las tareas
router.get('/', async (req, res) => {
    try {
        const tasks = await TaskModel.find().populate('area_id'); 
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Crear una nueva tarea
router.post('/', async (req, res) => {
    const { id_users, name, deadline, description, area_id } = req.body;

    try {
        const newTask = new TaskModel({
            id_users,
            name,
            deadline,
            description,
            area_id
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Actualizar una tarea
router.put('/:id', async (req, res) => {
    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedTask);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Eliminar una tarea por ID
router.delete('/deleteById/:id', async (req, res) => {
    try {
        const deletedTask = await TaskModel.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


// Obtener tareas por usuario
router.get('/user/:userId', async (req, res) => {
    try {
        const tasks = await TaskModel.find({ id_users: req.params.userId }).populate('area_id');
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
<<<<<<< Updated upstream

// Eliminar una tarea por nombre
router.delete('/deleteByName/:name', async (req, res) => {
    try {
        const deletedTask = await TaskModel.findOneAndDelete({ name: req.params.name });
        if (!deletedTask) {
            return res.status(404).json({ message: 'Tarea no encontrada' });
        }
        res.status(200).json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});


=======
// Obtener una tarea por ID
router.get('/:taskId', async (req, res) => {
    try {
      const task = await TaskModel.findById(req.params.taskId).populate('area_id');
      if (!task) {
        return res.status(404).json({ message: 'Tarea no encontrada' });
      }
      res.status(200).json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
>>>>>>> Stashed changes
module.exports = router;