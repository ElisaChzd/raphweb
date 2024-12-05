const express = require('express');
const router = express.Router();
const employeeRepo = require('../utils/employees.repository.js');

// Définition des routes
router.get('/list', employeeListAction);
router.delete('/remove/:employeeId', employeeDeleteAction);
router.post('/create', employeeCreateAction);  
router.patch('/update/:employeeId', employeeUpdateAction);



// Route pour récupérer la liste des employees
async function employeeListAction(request, response) {
    try {
        console.log("Tentative de récupération de la liste des employee...");
        
        const employees = await employeeRepo.getAllEmployees();  
        console.log("Employee récupérés : ", employees);

        // No employee founded
        if (!employees || employees.length === 0) {
            console.log("Aucun employee trouvé dans la base de données.");
            return response.status(404).send("Aucun employee trouvé.");
        }

        response.status(200).json(employees);  // Retourne les employee en JSON
    } catch (err) {
        console.error("Erreur lors de la récupération de la liste des employee : ", err);
        response.status(500).send('Erreur lors de la récupération de la liste des employee.');
    }
}

// Route pour supprimer un employee
async function employeeDeleteAction(request, response) {
    try {
        const employeeId = request.params.employeeId;  
        console.log(`Tentative de suppression du employee avec l'ID : ${employeeId}`);

        const numRows = await employeeRepo.deleteEmployee(employeeId); 
        console.log(`employee supprimé. Nombre de lignes affectées : ${numRows}`);

        if (numRows === 0) {
            return response.status(404).send("employee non trouvé ou déjà supprimé.");
        }

        response.status(200).send(`employee avec l'ID ${employeeId} supprimé avec succès.`);
    } catch (err) {
        console.error("Erreur lors de la suppression du employee : ", err);
        response.status(500).send('Erreur lors de la suppression du employee.');
    }
}

// Route pour créer un employee
async function employeeCreateAction(req, res) {
    try {
        const {
            id_employee,
            name_employee="name",
            age_employee=0,
            gender_employee="M/F/PD",
            post_employee="post",
            salary_employee=0,
            id_bar=1,//-----------------------------------------------------------------id to specify
        } = req.body;

        console.log("Tentative de création d'un employee avec les données : ", req.body);

        const newEmployeeId = await employeeRepo.createEmployee({
            id_employee,
            name_employee,
            age_employee,
            gender_employee,
            post_employee,
            salary_employee,
            id_bar,
        });

        res.status(201).send(`employee créé avec succès avec l'ID : ${newEmployeeId}`);
    } catch (err) {
        console.error("Erreur lors de la création du employee : ", err);
        res.status(500).send('Erreur lors de la création du employee.');
    }
}


async function employeeUpdateAction(req, res) {
    try {
        const employeeId = req.params.employeeId;
        const updateData = req.body;     

        console.log(`Tentative de mise à jour du employee avec l'ID : ${employeeId}`);
        console.log("Données à mettre à jour : ", updateData);

        // Appel au dépôt pour mettre à jour le employee
        const numRows = await employeeRepo.updateEmployee(employeeId, updateData);

        if (numRows === 0) {
            return res.status(404).send("employee non trouvé ou aucune donnée mise à jour.");
        }

        res.status(200).send(`employee avec l'ID ${employeeId} mis à jour avec succès.`);
    } catch (err) {
        console.error("Erreur lors de la mise à jour du employee : ", err);
        res.status(500).send('Erreur lors de la mise à jour du employee.');
    }
}

module.exports = router;