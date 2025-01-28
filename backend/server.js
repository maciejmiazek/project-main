require('dotenv').config();
const express = require('express');
const path = require('path'); // Dodaj ten import
const app = express();
const cors = require('cors')
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}
app.use(cors(corsOptions));
const frontendPath = path.resolve(__dirname, '../frontend/dist');
//db
const mongoose = require('mongoose');
const { UserModel, UserAddModel } = require('./models/Users');
const { MachineModel, MachineAddModel } = require('./models/Machines');
const { PlanningModel, PlanningAddModel } = require('./models/Planning');

app.use(express.json())
app.use(express.static(path.join(frontendPath)));

const db_host = process.env.DB_HOST
const db_user = process.env.DB_USER
const db_pass = process.env.DB_PASS

mongoose.connect(`mongodb+srv://${db_user}:${db_pass}@cluster0.${db_host}/project`)
.then(() => console.log('Połączono z bazą danych'))
.catch(err => console.error('Błąd połączenia z bazą danych:', err.message));

app.get('/api', (req, res) => {
    res.status(200).json({
      message: 'Witaj w naszym API!',
      version: '1.0.0',
      endpoints: {
        planowanie: '/api/planowanie',
        pracownicy: '/api/pracownicy',
        maszyny: '/api/maszyny',
        magazyn: '/api/magazyn',
        finanse: '/api/finanse'
      }
    });
});

app.get('/api/pracownicy', (req, res) => {
    UserModel.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
});

app.get('/api/maszyny', (req, res) => {
    MachineModel.find()
    .then(items => res.json(items))
    .catch(err => res.json(err))
});

app.get('/api/planowanie', (req, res) => {
    PlanningModel.find()
    .then(items => res.json(items))
    .catch(err => res.json(err))
});

app.post('/api/pracownicy', async (req, res) => {
    try {
        const user = new UserAddModel(req.body);
        await user.save();
        res.status(200).json({ message: 'Pracownik zapisany'});
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

app.post('/api/maszyny', async (req, res) => {
    try {
        console.log(req.body);
        const item = new MachineModel(req.body);
        await item.save();
        res.status(200).json({ message: 'Maszyna zapisana'});
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

app.post('/api/planowanie', async (req, res) => {
    try {
        console.log(req.body);
        const item = new PlanningAddModel(req.body);
        await item.save();
        res.status(200).json({ message: 'Harmonogram zapisany'});
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

app.put('/api/pracownicy/:id', async (req, res) => {
    try {
        await UserModel.updateOne({ _id: req.params.id}, req.body);
        res.status(200).json({ message: 'Pracownik zaktualizowany' });
    }
    catch (error) {
        console.error('Błąd podczas aktualizacji:', error.message);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

app.put('/api/maszyny/:id', async (req, res) => {
    try {
        await MachineModel.updateOne({ _id: req.params.id}, req.body);
        res.status(200).json({ message: 'Maszyna zaktualizowana' });
    }
    catch (error) {
        console.error('Błąd podczas aktualizacji:', error.message);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

app.put('/api/planowanie/:id', async (req, res) => {
    try {
        await PlanningModel.updateOne({ _id: req.params.id}, req.body);
        res.status(200).json({ message: 'Harmonogram zaktualizowany' });
    }
    catch (error) {
        console.error('Błąd podczas aktualizacji:', error.message);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

app.delete('/api/pracownicy/:id', async (req, res) => {
    try {
        await UserModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Pracownik usunięty' });
    } catch (error) {
        console.error('Błąd podczas usuwania:', error.message);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

app.delete('/api/maszyny/:id', async (req, res) => {
    try {
        await MachineModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Maszyna usunięta' });
    } catch (error) {
        console.error('Błąd podczas usuwania:', error.message);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});

app.delete('/api/planowanie/:id', async (req, res) => {
    try {
        await PlanningModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Harmonogram usunięty' });
    } catch (error) {
        console.error('Błąd podczas usuwania:', error.message);
        res.status(500).json({ message: 'Błąd serwera' });
    }
});


app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

// Uruchom serwer
const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Serwer działa na porcie ${PORT}`);
});