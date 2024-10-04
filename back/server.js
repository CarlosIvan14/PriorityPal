const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const areaRoutes = require('./routes/areaRoutes');
const dotenv = require('dotenv');

// Cargar variables de entorno desde el archivo .env
dotenv.config();

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

// Construir la URI de conexión usando variables de entorno
const mongoURI = `${process.env.MONGO_URI}${process.env.DB_NAME}`;

// Conectar a MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error al conectar a MongoDB', err));

app.use(cors());
app.use(express.json());



// Usar las rutas
app.use('/tasks', taskRoutes);
app.use('/users', userRoutes);
app.use('/areas', areaRoutes);


app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
