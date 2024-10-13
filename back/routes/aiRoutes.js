const express = require('express');
const router = express.Router();  // Aquí defines el enrutador
const mongoose = require('mongoose');
const TaskModel = require('../Models/Task');
const AreaModel = require('../Models/Area');
const User = require('../Models/User');
const OpenAI = require('openai');
const dotenv = require('dotenv');
const path = require('path');

// Configuración de dotenv
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Configuración de la API de OpenAI
const openai = new OpenAI({
    apiKey: process.env.OPENAI_KEY
});

// Crear una nueva tarea y asignarla automáticamente usando ChatGPT
router.post('/assignAutomatically', async (req, res) => {
    const { name, description, deadline, area_id } = req.body;

    if (!name || !description || !deadline || !area_id) {
        return res.status(400).json({ message: 'Todos los campos son obligatorios' });
    }

    try {
        // Convertir el area_id a ObjectId si no lo es
        const objectId = mongoose.Types.ObjectId.isValid(area_id) ? mongoose.Types.ObjectId(area_id) : null;

        if (!objectId) {
            return res.status(400).json({ message: 'El ID del área no es válido.' });
        }

        // Obtener todos los usuarios del área específica
        const area = await AreaModel.findById(objectId).populate('users');
        const users = area?.users || [];

        if (users.length === 0) {
            return res.status(404).json({ message: 'No hay usuarios disponibles en esta área' });
        }

        // Obtener la cantidad de tareas asignadas a cada usuario
        const usersWithTaskCount = await Promise.all(users.map(async (user) => {
            const taskCount = await TaskModel.countDocuments({ id_users: user._id });
            return { name: user.name, taskCount };
        }));

        // Crear el prompt para ChatGPT
        const prompt = `
            Asigna la siguiente tarea a uno de los usuarios en el área de trabajo de forma justa.
            Aquí están los detalles de la tarea:
            - Nombre: ${name}
            - Descripción: ${description}
            - Fecha límite: ${deadline}

            Aquí está la lista de usuarios con la cantidad de tareas que tienen:
            ${usersWithTaskCount.map(u => `- ${u.name}: ${u.taskCount} tareas`).join('\n')}
            
            Por favor asigna la tarea al usuario con menos tareas.
        `;

        // Enviar solicitud a OpenAI
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: 'Eres un experto en gestión de tareas y asignaciones de trabajo.' },
                { role: 'user', content: prompt }
            ]
        });

        // Obtener el nombre del usuario al que se le asignará la tarea
        const assignmentResponse = completion.choices[0].message.content;
        const assignedUserName = assignmentResponse.match(/Asignar a: (\w+)/i)[1];

        // Buscar el usuario por nombre
        const assignedUser = users.find(user => user.name === assignedUserName);

        if (!assignedUser) {
            return res.status(404).json({ message: 'No se encontró el usuario asignado por ChatGPT' });
        }

        // Crear nueva tarea con el usuario asignado
        const newTask = new TaskModel({
            id_users: [assignedUser._id],
            name,
            description,
            deadline,
            area_id: objectId
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        console.error('Error al asignar la tarea automáticamente usando OpenAI:', error);
        res.status(500).json({ message: 'Error en el servidor, por favor intenta más tarde.' });
    }
});

// Exportar el router para que pueda ser usado en otros archivos
module.exports = router;
