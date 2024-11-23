import express from 'express';
import menuRoutes from './routes/menuRoutes';

const app = express()
app.use(express.json())

app.use('/menu', menuRoutes);

export default app