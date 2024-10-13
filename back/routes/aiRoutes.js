const express = require('express');
const TaskModel = require('../Models/Task');
const AreaModel = require('../Models/Area');
const UserModel = require('../Models/User');
const OpenAI = require('openai');
const dotenv = require('dotenv');
const path = require('path');

// Configuración de dotenv
dotenv.config({ path: path.resolve(__dirname, '..//.env') });

// Configuración de la API de OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

const router = express.Router();

// Endpoint para analizar y asignar tarea al usuario con menor carga
router.post('/assign-task', async (req, res) => {
    const { areaId, taskDetails } = req.body;

    try {
        // Verificar si el área existe
        const area = await AreaModel.findById(areaId);
        if (!area) {
            return res.status(404).json({ message: 'Área no encontrada' });
        }

        // Obtener los usuarios de esa área
        const users = await UserModel.find({ area: areaId });
        if (users.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios en esta área' });
        }

        // Obtener las tareas de cada usuario en el área
        const tasks = await TaskModel.find({ area_id: areaId });

        // Agrupar tareas por usuario
        const userTaskCount = users.map(user => {
            const taskCount = tasks.filter(task => task.id_users.includes(user._id.toString())).length;
            return { user, taskCount };
        });

        // Llamada a OpenAI para decidir el usuario con menos carga
        const prompt = `
            Estos son los usuarios y su carga de tareas:
            ${userTaskCount.map(ut => `${ut.user.name}: ${ut.taskCount} tareas`).join('\n')}
            
            Asigna la tarea al usuario que tenga menos tareas asignadas. Si hay varios con la misma cantidad de tareas, elige cualquiera.
            Si algún usuario tiene 0 tareas, asigna la tarea a esa persona.
            Solo devuelve el nombre completo del usuario al que se debe asignar la tarea.
            
            Detalles de la tarea:
            - Nombre: ${taskDetails.name}
            - Descripción: ${taskDetails.description}
            - Fecha límite: ${taskDetails.deadline}
        `;

        const completion = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{ role: 'user', content: prompt }]
        });

        // Respuesta completa de OpenAI
        const aiResponse = completion.choices[0].message.content.trim();

        // Buscar el usuario en la base de datos por nombre
        const assignedUser = await UserModel.findOne({ name: aiResponse });

        if (!assignedUser) {
            return res.status(404).json({ message: `No se encontró ningún usuario con el nombre: ${aiResponse}` });
        }

        // Crear nueva tarea después de asignar al usuario
        const newTask = new TaskModel({
            id_users: [assignedUser._id],
            name: taskDetails.name,
            deadline: taskDetails.deadline,
            description: taskDetails.description,
            area_id: areaId,
            status: "Pendiente", // Agregar cualquier otro campo necesario
            progress: 0
        });

        const savedTask = await newTask.save();

        // Responder con el ID del usuario y la tarea creada
        res.status(201).json({ assignedUserId: assignedUser._id, task: savedTask });
    } catch (error) {
        console.error('Error al procesar la asignación:', error);
        res.status(500).json({ message: 'Error al asignar la tarea' });
    }
});


module.exports = router;
