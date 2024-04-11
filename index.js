// server.js
const express = require('express');
const app = express();
const inventoryRoutes = require('./routes/inventoryRoutes');
const logRequestMiddleware = require('./middleware/logRequest');

app.use(express.json());
app.use(logRequestMiddleware);

// Routes
app.use('/inventory', inventoryRoutes);

//Levantando el servidor para escuchar por el puerto 3000
app.listen(3000,()=>{
    console.log('Listening on port 3000');
})
