// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const personasRoutes = require('./routes/persona.route');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use('/api/personas', personasRoutes);

// Conexión a la base de datos
mongoose.connect('mongodb+srv://20233tn115:rxeZ2IW8QjiBxjf3@firstcloster.2a4pc.mongodb.net/inventario-db?retryWrites=true&w=majority&appName=FirstCluster', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conexión exitosa a la base de datos en MongoDB');
    app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
  })
  .catch((err) => console.log('Error al conectar a MongoDB', err));
