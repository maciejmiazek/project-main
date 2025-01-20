require('dotenv').config();
const express = require('express');
const path = require('path'); // Dodaj ten import
const app = express();
const cors = require('cors')
const corsOptions = {
    origin: ['localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
const frontendPath = path.resolve(__dirname, '../frontend/dist');
//db
const mongoose = require('mongoose');
const { UserModel, UserAddModel } = require('./models/Users');

app.use(express.json())
app.use(express.static(path.join(frontendPath)));
app.use(express.urlencoded({ extended: true }));

const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS
mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@cluster0.${db_host}/project`)

app.get('/api', (req, res) => {
    UserModel.find()
        .then(users => res.json(users))
        .catch(err => res.json(err))
});

app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.post('/', (req, res) => {
    res.redirect('/planowanie');
});

app.post('/api/pracownicy', async (req, res) => {
    console.log(req.body);
    try {
        // Utworzenie nowego dokumentu na podstawie danych przesłanych w żądaniu
        const user = new UserAddModel(req.body);

        // Walidacja i zapis do bazy
        const savedPracownik = await user.save();

        // Odpowiedź do klienta
        res.status(201).json({ message: 'Pracownik zapisany', data: savedPracownik });
    } catch (error) {
        console.error('Błąd podczas zapisu:', error.message);

        // Obsługa błędów walidacji
        if (error.name === 'ValidationError') {
            const errors = Object.values(error.errors).map((err) => err.message);
            return res.status(400).json({ message: 'Błąd walidacji', errors });
        }

        // Inne błędy
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

// Uruchom serwer
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});