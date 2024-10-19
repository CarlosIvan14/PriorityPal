
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const taskRoutes = require('./routes/taskRoutes');
const userRoutes = require('./routes/userRoutes');
const areaRoutes = require('./routes/areaRoutes');
const aiRoutes = require('./routes/aiRoutes'); 
const dotenv = require('dotenv');
const Message = require('./Models/message');

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
app.use('/openAiRoute', aiRoutes); // Asegúrate de que esta línea sea correcta

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

const http = require('http').createServer(app);

const io = require("socket.io")(http);

// {"userId": "socket ID"}

const userSocketMap = {};

io.on('connection',socket => {
    console.log("a user is connetcted",socket.id);

    const userId = socket.handshake.query.userId;

    console.log("userid",userId);

    if(userId !== "undefined"){
        userSocketMap[userId] = socket.id
    }

    console.log("user socket data", userSocketMap);

    socket.on("disconnect", () =>{
        console.log("user disconnected",socket.id);
        delete userSocketMap[userId];
    });

    socket.on("sendMessage",({senderId, receiverId, message}) => {
        const receiverSocketId = userSocketMap[receiverId];
        
        console.log("receiver Id",receiverId);

        if(receiverSocketId){
         io.to(receiverSocketId).emit('receiveMessage',{
            senderId,
            message
        });   
        }
    });
});

http.listen(6000,() =>{
    console.log("Socket.IO running on port 6000");
})

app.post('/sendmessage',async(req,res) =>{
  try{
      const {senderId, receiverId, message} = req.body;

      const newMessage = new Message({
          senderId,
          receiverId,
          message,
      });

      await newMessage.save();

      const receiverSocketId = userSocketMap[receiverId];

      if(receiverSocketId){
        console.log("emmittin revieveMessage event to the reciver", receiverId);
        io.to(receiverSocketId).emit("newMeesage",newMessage)
      }else{
        console.log("Receiver socket ID not foud");
      }

      res.status(201).json(newMessage)
  } catch (error){
      console.log("ERORR", error);
  }
})

app.get("/messages", async (req, res) => {
  try {
    const { senderId, receiverId } = req.query;

    console.log("Fetching messages between", senderId, "and", receiverId);

    const messages = await Message.find({
      $or: [
        { senderId: senderId, receiverId: receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).populate('senderId', "_id name"); // Corregido 'sederId' a 'senderId'
    console.log(messages);
    res.status(200).json(messages);
  } catch (error) {
    console.log('Error', error);
    res.status(500).json({ message: 'Error al obtener los mensajes' });
  }
});
