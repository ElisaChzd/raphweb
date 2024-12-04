const express = require('express');
const router = express.Router();
const workerRepo = require('../utils/workers.repository.js');

// Définition des routes
router.get('/list', workerListAction);
router.delete('/remove/:workerId', workerDeleteAction);
router.post('/create', workerCreateAction);  
router.patch('/update/:workerId', workerUpdateAction);



// Route pour récupérer la liste des jeux
async function workerListAction(request, response) {
    try {
        console.log("Tentative de récupération de la liste des jeux...");
        
        const workers = await workerRepo.getAllWorkers();  
        console.log("Jeux récupérés : ", workers);

        // No worker founded
        if (!workers || workers.length === 0) {
            console.log("Aucun jeu trouvé dans la base de données.");
            return response.status(404).send("Aucun jeu trouvé.");
        }

        response.status(200).json(workers);  // Retourne les jeux en JSON
    } catch (err) {
        console.error("Erreur lors de la récupération de la liste des jeux : ", err);
        response.status(500).send('Erreur lors de la récupération de la liste des jeux.');
    }
}

// Route pour supprimer un jeu
async function workerDeleteAction(request, response) {
    try {
        const workerId = request.params.workerId;  
        console.log(`Tentative de suppression du jeu avec l'ID : ${workerId}`);

        const numRows = await workerRepo.deleteWorker(workerId); 
        console.log(`Jeu supprimé. Nombre de lignes affectées : ${numRows}`);

        if (numRows === 0) {
            return response.status(404).send("Jeu non trouvé ou déjà supprimé.");
        }

        response.status(200).send(`Jeu avec l'ID ${workerId} supprimé avec succès.`);
    } catch (err) {
        console.error("Erreur lors de la suppression du jeu : ", err);
        response.status(500).send('Erreur lors de la suppression du jeu.');
    }
}

// Route pour créer un jeu
async function workerCreateAction(req, res) {
    try {
        const {
            id_employee,
            name_employee,
            age_employee,
            gender_employee,
            post_employee,
            salary_employee,
            id_bar,
        } = req.body;

        // Validation simple
        if (!id_employee || !name_employee || !age_employee || !gender_employee || !post_employee || !salary_employee || !id_bar) {
            return res.status(400).send("Tous les champs obligatoires doivent être fournis.");
        }

        console.log("Tentative de création d'un jeu avec les données : ", req.body);

        const newWorkerId = await workerRepo.createWorker({
            id_employee,
            name_employee,
            age_employee,
            gender_employee,
            post_employee,
            salary_employee,
            id_bar,
        });

        res.status(201).send(`Jeu créé avec succès avec l'ID : ${newWorkerId}`);
    } catch (err) {
        console.error("Erreur lors de la création du jeu : ", err);
        res.status(500).send('Erreur lors de la création du jeu.');
    }
}


async function workerUpdateAction(req, res) {
    try {
        const workerId = req.params.workerId;
        const updateData = req.body;     

        console.log(`Tentative de mise à jour du jeu avec l'ID : ${workerId}`);
        console.log("Données à mettre à jour : ", updateData);

        // Appel au dépôt pour mettre à jour le jeu
        const numRows = await workerRepo.updateWorker(workerId, updateData);

        if (numRows === 0) {
            return res.status(404).send("Jeu non trouvé ou aucune donnée mise à jour.");
        }

        res.status(200).send(`Jeu avec l'ID ${workerId} mis à jour avec succès.`);
    } catch (err) {
        console.error("Erreur lors de la mise à jour du jeu : ", err);
        res.status(500).send('Erreur lors de la mise à jour du jeu.');
    }
}

module.exports = router;