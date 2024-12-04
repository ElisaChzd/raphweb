const express = require('express');
const router = express.Router();
const gameRepo = require('../utils/bar_games.repository.js');

// Définition des routes
router.get('/list', bar_gameListAction);
router.delete('/remove/:bar_gameId', bar_gameDeleteAction);
router.post('/create/bar_gameId', bar_gameCreateAction);  
router.patch('/update/:bar_gameId', bar_gameUpdateAction);



// Route pour récupérer la liste des jeux
async function gameListAction(request, response) {
    try {
        console.log("Tentative de récupération de la liste des jeux...");
        
        const games = await gameRepo.getAllGames();  
        console.log("Jeux récupérés : ", games);

        // No game founded
        if (!games || games.length === 0) {
            console.log("Aucun jeu trouvé dans la base de données.");
            return response.status(404).send("Aucun jeu trouvé.");
        }

        response.status(200).json(games);  // Retourne les jeux en JSON
    } catch (err) {
        console.error("Erreur lors de la récupération de la liste des jeux : ", err);
        response.status(500).send('Erreur lors de la récupération de la liste des jeux.');
    }
}

// Route pour supprimer un jeu
async function gameDeleteAction(request, response) {
    try {
        const gameId = request.params.gameId;  
        console.log(`Tentative de suppression du jeu avec l'ID : ${gameId}`);

        const numRows = await gameRepo.deleteGame(gameId); 
        console.log(`Jeu supprimé. Nombre de lignes affectées : ${numRows}`);

        if (numRows === 0) {
            return response.status(404).send("Jeu non trouvé ou déjà supprimé.");
        }

        response.status(200).send(`Jeu avec l'ID ${gameId} supprimé avec succès.`);
    } catch (err) {
        console.error("Erreur lors de la suppression du jeu : ", err);
        response.status(500).send('Erreur lors de la suppression du jeu.');
    }
}

// Route pour créer un jeu
async function gameCreateAction(req, res) {
    try {
        const {
            name_game,
            price_game,
            time_game,
            nb_people_min_game,
            nb_people_max_game,
            state_game,
            game_isdeluxe = 0,
            game_realprice = null,
        } = req.body;

        // Validation simple
        if (!name_game || !price_game || !time_game || !nb_people_min_game || !nb_people_max_game || !state_game) {
            return res.status(400).send("Tous les champs obligatoires doivent être fournis.");
        }

        console.log("Tentative de création d'un jeu avec les données : ", req.body);

        const newGameId = await gameRepo.createGame({
            name_game,
            price_game,
            time_game,
            nb_people_min_game,
            nb_people_max_game,
            state_game,
            game_isdeluxe,
            game_realprice,
        });

        res.status(201).send(`Jeu créé avec succès avec l'ID : ${newGameId}`);
    } catch (err) {
        console.error("Erreur lors de la création du jeu : ", err);
        res.status(500).send('Erreur lors de la création du jeu.');
    }
}


async function gameUpdateAction(req, res) {
    try {
        const gameId = req.params.gameId;
        const updateData = req.body;     

        console.log(`Tentative de mise à jour du jeu avec l'ID : ${gameId}`);
        console.log("Données à mettre à jour : ", updateData);

        // Appel au dépôt pour mettre à jour le jeu
        const numRows = await gameRepo.updateGame(gameId, updateData);

        if (numRows === 0) {
            return res.status(404).send("Jeu non trouvé ou aucune donnée mise à jour.");
        }

        res.status(200).send(`Jeu avec l'ID ${gameId} mis à jour avec succès.`);
    } catch (err) {
        console.error("Erreur lors de la mise à jour du jeu : ", err);
        res.status(500).send('Erreur lors de la mise à jour du jeu.');
    }
}

module.exports = router;