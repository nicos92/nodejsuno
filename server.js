// Importar módulos esenciales
const express = require('express');
const mongoose = require('mongoose');

// --- 1. CONFIGURACIÓN ---
const app = express();
// Obtener el puerto y la URI de conexión desde las variables de entorno de Docker Compose
const PORT = process.env.PORT || 30000;
const MONGO_URI = process.env.MONGO_URI;
const HOST_PORT = process.env.HOST_PORT || PORT; // Usamos HOST_PORT si existe, si no, usamos PORT

// Verificar que la URI de MongoDB esté configurada
if (!MONGO_URI) {
    console.error('❌ ERROR: La variable de entorno MONGO_URI no está definida.');
    process.exit(1); // Sale de la aplicación
}

// Middlewares
app.use(express.json()); // Para parsear peticiones con cuerpo JSON

// --- 2. CONEXIÓN A MONGODB ---
const connectDB = async () => {
    try {
        console.log(`⏳ Intentando conectar a: ${MONGO_URI}`);
        await mongoose.connect(MONGO_URI);
        
        console.log('✅ MongoDB conectado exitosamente.');

    } catch (error) {
        console.error(`❌ Falló la conexión a MongoDB: ${error.message}`);
        // Detiene la aplicación si la DB no está disponible
        // Esto es útil en Docker para ver el error
        process.exit(1); 
    }
};

// --- 3. RUTAS DE EJEMPLO ---

// Ruta base
app.get('/', (req, res) => {
    res.json({
        message: '¡Bienvenido a tu API de Node.js en Docker!',
        status: 'Funcionando',
        database: mongoose.connection.readyState === 1 ? 'Conectada' : 'Desconectada'
    });
});

// Puedes agregar tus rutas aquí. Por ejemplo:
// app.use('/api/usuarios', require('./routes/userRoutes')); 

// --- 4. INICIO DEL SERVIDOR ---

// Conectar a la DB e iniciar el servidor Express
const startServer = async () => {
    await connectDB();
    
    app.listen(PORT, () => {
        console.log(`🚀 Servidor Express escuchando en http://localhost:${HOST_PORT}`);
        console.log(`Modo: ${process.env.NODE_ENV || 'development'}`);
    });
};

startServer();
