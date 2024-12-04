const pool = require(__dirname + "\\db.include.js");

module.exports = {
    // Récupère tous les jeux
    async getAllEmployees() {
        try {
            const sql = "SELECT * FROM Employees";
            console.log("[EMPLOYEE] Exécution de la requête SQL pour récupérer tous les jeux...");

            // Tester la connexion au pool avant d'exécuter la requête
            console.log("[DB] Vérification de la connexion au pool MySQL...");
            await pool.getConnection(); // Vérifie que le pool est accessible
            console.log("[DB] Connexion au pool MySQL réussie.");

            // Exécuter la requête SQL
            const [rows] = await pool.query(sql); // Utilisation de `query` à la place de `execute`

            // Vérifier les résultats
            if (!rows || rows.length === 0) {
                console.warn("[EMPLOYEE] Aucun jeu trouvé dans la base de données.");
                return [];
            }

            console.log(`[EMPLOYEE] ${rows.length} jeux récupérés.`);
            return rows;
        } catch (err) {
            console.error("[EMPLOYEE] Erreur lors de la récupération de tous les jeux :", err.message);
            throw new Error("Erreur lors de la récupération de tous les jeux.");
        }
    },
    async deleteEmployee(employeeId) {
        try {
            const sql = 'DELETE FROM Employee WHERE id_employee = ?';
            console.log("[EMPLOYEE] Exécution de la requête SQL pour supprimer un jeu");

            const [result] = await pool.query(sql, [employeeId]); 
            return result.affectedRows;  
        } catch (err) {
            console.error('[DB] Erreur lors de la suppression du jeu :', err.message);
            throw err;
        }
    },
    

    async createEmployee(employeeData) {
        try {
            const sql = `
                INSERT INTO Employee (
                    id_employee, name_employee, age_employee,
                    gender_employee, post_employee,
                    salary_employee, id_bar,
                ) VALUES (?, ?, ?, ?, ?, ?, ?)`;

            const {
                id_employee,
                name_employee,
                age_employee,
                gender_employee,
                post_employee,
                salary_employee,
                id_bar,
            } = gameData;

            const [result] = await pool.query(sql, [
                id_employee,
                name_employee,
                age_employee,
                gender_employee,
                post_employee,
                salary_employee,
                id_bar,
            ]);

            return result.insertId; // Retourne l'ID de l'employée nouvellement créé
        } catch (err) {
            console.error('[DB] Erreur lors de la création d\'un employée :', err.message);
            throw err;
        }
    },


    async updateEmployee(employeeId, updateData) {
        try {
            // Préparer les parties SET et les valeurs dynamiques
            const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
            const values = Object.values(updateData);

            // Ajouter l'ID du jeu pour la condition WHERE
            values.push(employeeId);

            const sql = `UPDATE Employee SET ${fields} WHERE id_employee = ?`;

            const [result] = await pool.query(sql, values);
            return result.affectedRows; // Retourne le nombre de lignes affectées
        } catch (err) {
            console.error('[DB] Erreur lors de la mise à jour du jeu :', err.message);
            throw err;
        }
    },
};