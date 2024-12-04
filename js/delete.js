const fs = require('fs');

// Fonction pour supprimer un élément du fichier JSON
function deleteFromFile(filePath, key, id) {
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error(`Erreur lors de la lecture du fichier : ${err.message}`);
      return;
    }

    let items = JSON.parse(data); // Charger les données JSON
    const initialLength = items.length;

    // Supprimer l'élément avec l'ID spécifié
    items = items.filter(item => item[key] !== id);

    if (items.length === initialLength) {
      console.log(`Aucun élément trouvé avec l'ID : ${id}`);
      return;
    }

    // Réécrire le fichier avec les données mises à jour
    fs.writeFile(filePath, JSON.stringify(items, null, 2), err => {
      if (err) {
        console.error(`Erreur lors de l'écriture dans le fichier : ${err.message}`);
        return;
      }
      console.log(`Élément avec ID ${id} supprimé de ${filePath}.`);
    });
  });
}



   
module.exports = deleteFromFile;
