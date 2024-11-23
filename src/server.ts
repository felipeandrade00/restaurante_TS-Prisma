import app from './app'; // Importe o app configurado no app.ts

const PORT = 3000; // Porta do servidor

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
