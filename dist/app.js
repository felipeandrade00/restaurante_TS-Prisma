import express from 'express'; // Importando express
import {router} from './routes/menuRoutes'
app.use(express.json());

// Rota raiz
app.get('/', (req, res) => {
    res.send('API funcionando! 🚀');
});
app.use('/menu', router);
export default app;
