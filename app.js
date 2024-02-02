const express = require('express')
//middleware para evirtar problemas con el cors(asi acepta peticiones de cualquier sitio)
const cors = require('cors')
const app = express() 
require('dotenv').config();
// Configurar la conexión de mongoose
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
app.use(cors())
app.use(express.json())//Middelware para que pueda obtener el body

//Importamos el router de user
const userRoutes = require('./routes/user')
app.use('/users',userRoutes)

//Importamos el router de museum
const museumRoutes = require('./routes/museum')
app.use('/museums',museumRoutes)

//Importamos el router de museum
const museumVisitedRoutes = require('./routes/museumsVisited')
app.use('/museumsVisited',museumVisitedRoutes)

//Importamos el router de auth
const authRoutes = require('./routes/auth')
app.use('/auth',authRoutes)

//Conexion BBDD
async function main(){
    await mongoose.connect(process.env.MONGO_CNN);
    console.log('Database connected');
}
main().catch((err) => console.log(err));

app.listen(process.env.PORT, () => {
    console.log(`El servidor está escuchando en el puerto ${process.env.PORT}`);
  });