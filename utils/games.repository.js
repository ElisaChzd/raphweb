const pool = require(__dirname + "\\db.include.js");

module.exports = {
    // Récupère tous les jeux
    async getAllGames() {
        try {
            const sql = "SELECT * FROM Games";
            console.log("[GAMES] Exécution de la requête SQL pour récupérer tous les jeux...");

            // Tester la connexion au pool avant d'exécuter la requête
            console.log("[DB] Vérification de la connexion au pool MySQL...");
            await pool.getConnection(); // Vérifie que le pool est accessible
            console.log("[DB] Connexion au pool MySQL réussie.");

            // Exécuter la requête SQL
            const [rows] = await pool.query(sql); // Utilisation de `query` à la place de `execute`

            // Vérifier les résultats
            if (!rows || rows.length === 0) {
                console.warn("[GAMES] Aucun jeu trouvé dans la base de données.");
                return [];
            }

            console.log(`[GAMES] ${rows.length} jeux récupérés.`);
            return rows;
        } catch (err) {
            console.error("[GAMES] Erreur lors de la récupération de tous les jeux :", err.message);
            throw new Error("Erreur lors de la récupération de tous les jeux.");
        }
    },
    async deleteGame(gameId) {
        try {
            const sql = 'DELETE FROM Games WHERE id_game = ?';
            console.log("[GAMES] Exécution de la requête SQL pour supprimer un jeu");

            const [result] = await pool.query(sql, [gameId]); 
            return result.affectedRows;  
        } catch (err) {
            console.error('[DB] Erreur lors de la suppression du jeu :', err.message);
            throw err;
        }
    },
    

    async createGame(gameData) {
        try {
            const sql = `
                INSERT INTO Games (
                    name_game, price_game, time_game,
                    nb_people_min_game, nb_people_max_game,
                    state_game, 
                ) VALUES (?, ?, ?, ?, ?, ?)`;

            const {
                name_game,
                price_game,
                time_game,
                nb_people_min_game,
                nb_people_max_game,
                state_game,
            } = gameData;

            const [result] = await pool.query(sql, [
                name_game,
                price_game,
                time_game,
                nb_people_min_game,
                nb_people_max_game,
                state_game,
            ]);

            return result.insertId; // Retourne l'ID du jeu nouvellement créé
        } catch (err) {
            console.error('[DB] Erreur lors de la création d\'un jeu :', err.message);
            throw err;
        }
    },


    async updateGame(gameId, updateData) {
        try {
            // Préparer les parties SET et les valeurs dynamiques
            const fields = Object.keys(updateData).map(key => `${key} = ?`).join(', ');
            const values = Object.values(updateData);

            // Ajouter l'ID du jeu pour la condition WHERE
            values.push(gameId);

            const sql = `UPDATE Games SET ${fields} WHERE id_game = ?`;

            const [result] = await pool.query(sql, values);
            return result.affectedRows; // Retourne le nombre de lignes affectées
        } catch (err) {
            console.error('[DB] Erreur lors de la mise à jour du jeu :', err.message);
            throw err;
        }
    },
};
