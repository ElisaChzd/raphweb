const express = require('express');
const app = express();
const gamesRouter = require('./controllers/gamesapi.route.js');  // Chemin vers votre fichier routes
const cors = require('cors');
app.use(cors());

// Middleware pour analyser le corps des requêtes (si nécessaire)
app.use(express.json());

// Utilisation des routes
app.use('/games', gamesRouter);

// Définir une route GET sur la racine "/"
app.get('/toto', (req, res) => {
    res.send('Hello World'); // Réponse avec "Hello World"
});

// Lancer le serveur sur un port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});