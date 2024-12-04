const pool = require(__dirname + "\\db.include.js");

module.exports = {
    // Récupère tous les jeux
    async getAllBarGames() {
        try {
            const sql = "SELECT * FROM games";
            console.log("[BAR_GAMES] Exécution de la requête SQL pour récupérer les tables intermediaire bar_games...");

            // Tester la connexion au pool avant d'exécuter la requête
            console.log("[DB] Vérification de la connexion au pool MySQL...");
            await pool.getConnection(); // Vérifie que le pool est accessible
            console.log("[DB] Connexion au pool MySQL réussie.");

            // Exécuter la requête SQL
            const [rows] = await pool.query(sql); // Utilisation de `query` à la place de `execute`

            // Vérifier les résultats
            if (!rows || rows.length === 0) {
                console.warn("[BAR_GAMES] Aucune table intermediaire jeu trouvée dans la base de données.");
                return [];
            }

            console.log(`[BAR_GAMES] ${rows.length} jeux récupérés.`);
            return rows;
        } catch (err) {
            console.error("[BAR_GAMES] Erreur lors de la récupération de tous les jeux :", err.message);
            throw new Error("Erreur lors de la récupération de tous les jeux.");
        }
    },
    async deleteGame(bar_gameId) {
        try {
            const sql = 'DELETE FROM BAR_GAMES WHERE id_game = ?';
            console.log("[BAR_GAMES] Exécution de la requête SQL pour supprimer une table intermediaire jeu");

            const [result] = await pool.query(sql, [gameId]);//to clarify--------------------------------------------------- 
            return result.affectedRows;  
        } catch (err) {
            console.error('[DB] Erreur lors de la suppression de la table intermediaire de jeu :', err.message);
            throw err;
        }
    },
    

    async createGame(gameData) {
        try {
            const sql = `
                INSERT INTO Bar_Games (
                    id_bar, id_game) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

            const {
                id_bar,
                id_game,
            } = gameData;

            const [result] = await pool.query(sql, [
                id_bar,
                id_game,
                ]);

            return result.insertId; // Retourne l'ID du jeu nouvellement créé //to clarify---------------------------------------------------
        } catch (err) {
            console.error('[DB] Erreur lors de la création d\'un jeu :', err.message);
            throw err;
        }
    },


    async updateGame(gameId, updateData) {//to clarify---------------------------------------------------------------------------------------
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