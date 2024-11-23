import express from 'express'; // Importando express
import menuRoutes from './routes/menuRoutes'; // Rotas

const app = express();

app.use(express.json()); // Middleware para JSON

// Rota raiz
app.get('/', (req, res) => {
    res.send('API funcionando! 🚀');
});

// Rota /menu
app.use('/menu', menuRoutes);

export default app;
