<template>
  <div v-if="bar">
    <header>
      <div class="logo-container">
        <img src="/image/logo.png" alt="Logo" class="logo-image">
      </div>
      <div class="navbar">
        <router-link :to="{ name: 'BarPage'}" class="barPage">HOME</router-link>
        <button @click="currentSection = 'About'">ABOUT</button>
        <button @click="currentSection = 'favorite'">FAVORITE</button>
        <router-link :to="{ name: 'Login'}" class="login">LOGIN</router-link>
      </div>
    </header> 


    <main>
      <!-- Home Section -->
      <section v-if="currentSection === 'home'" class="home-section">
        
        <div class="description">
          <h1 class="title">{{ bar.name }}</h1>
          <p v-html="bar.fool_description"></p>

        </div>

        <div class="items">
          <div class="drinks-section">
            <img src="/image/Drinks_item.png" alt="Drinks Item">
            <button @click="currentSection = 'drinks'">DRINKS</button>
          </div>

          <div class="games-section">
            <img src="/image/Games_item.png" alt="Games Item">
            <button @click="currentSection = 'games'">GAMES</button>
          </div>

          <div class="workers-section">
            <img src="/image/Workers_item.png" alt="Workers Item">
            <button @click="currentSection = 'workers'">EMPLOYEE</button>
          </div>
        </div>

        <!-- Location Section with Toggleable Hours -->
        <div class="location">
          <h3>Location</h3>
          <div class="location-content">
            <img :src="bar.image_map" alt="Map to the bar" class="map-image">
            <div class="location-details">
              <p><strong>Address:</strong> {{ bar.address }}</p>
              <div class="schedule-container">
                <p><strong>Opening times</strong></p>
                <button @click="toggleHours">
                  {{ showHours ? "See less" : "See the hours" }}
                </button>
                <div v-if="showHours" class="hoursList">
                  <ul>
                    <li v-for="(hours, day) in bar.hours" :key="day">{{ day }}: {{ hours }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section v-if="currentSection === 'About'">
        <p>T'es arrivé dans le about mais jai pas encore fait grand chose</p>
      </section>

      <!-- Favorite Section -->
      <section v-if="currentSection === 'favorite'">
        <p>Pareil que pour about</p>
      </section>

      <!-- Drinks Section -->
      <section v-if="currentSection === 'drinks'">
        <button @click="currentSection = 'home'" class="back-button">← Back to Home</button>
        <h2 class="centered-title">Available Drinks</h2>
        <button @click="addDrink" class="add-button">+ Add a drink</button>
        <table class="drink-table" v-if="filteredDrinks.length > 0">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Ingredients</th>
              <th>Price (€)</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(drink, index) in filteredDrinks" :key="index">
              <td><img :src="drink.image" :alt="drink.name_drink" class="drink-image"></td>
              <td>{{ drink.name_drink }}</td>
              <td>{{ drink.ingredient_drink }}</td>
              <td>{{ drink.price_selling_drink }}</td>
            </tr>
          </tbody>
        </table>
        <p v-else>No drinks available for this bar</p>
      </section>

      <!-- Games Section -->
      <section v-if="currentSection === 'games'">
        <button @click="currentSection = 'home'" class="back-button">← Back to Home</button>
        <h2 class="centered-title">Available Games</h2>
        <button @click="addGame" class="add-button">+ Add a game</button>
        <table class="game-table" v-if="filteredGames.length > 0">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Price (€)</th>
              <th>Time</th>
              <th>Min Players</th>
              <th>Max Players</th>
              <th>State</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in filteredGames" :key="index">
              <td>
                <img :src="game.image" :alt="game.name_game" class="game-image">
              </td>
              <td v-if="!game.editMode">{{ game.name_game }}</td>
              <td v-else>
                <input v-model="game.name_game" placeholder="Enter game name">
              </td>
              <td v-if="!game.editMode">{{ game.price_game }}</td>
              <td v-else>
                <input v-model="game.price_game" placeholder="Enter price">
              </td>
              <td v-if="!game.editMode">{{ game.time_game }}</td>
              <td v-else>
                <input v-model="game.time_game" placeholder="Enter time">
              </td>
              <td v-if="!game.editMode">{{ game.nb_people_min_game }}</td>
              <td v-else>
                <input v-model="game.nb_people_min_game" placeholder="Enter min players">
              </td>
              <td v-if="!game.editMode">{{ game.nb_people_max_game }}</td>
              <td v-else>
                <input v-model="game.nb_people_max_game" placeholder="Enter max players">
              </td>
              <td v-if="!game.editMode">{{ game.state_game }}</td>
              <td v-else>
                <select v-model="game.state_game">
                  <option>Perfect</option>
                  <option>Available</option>
                  <option>Bad</option>
                </select>
              </td>
              <td>
                <button v-if="!game.editMode" @click="editGame(index)">Update</button>
                <button v-else @click="saveGame(index)">Save</button>
              </td>
              <td>
                <button @click="sendDeleteRequestGame(index+1)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No games available</p>
      </section>

      <!-- Workers Section -->
      <section v-if="currentSection === 'workers'">
        <button @click="currentSection = 'home'" class="back-button">← Back to Home</button>
        <h2 class="centered-title">Our Workers</h2>
        <button @click="addEmployee" class="add-button">+ Add an Employee</button>
        <table class="worker-table" v-if="filteredWorkers.length > 0">
          <thead>
            <tr>
              <th>Name</th>
              <th>Post</th>
              <th>Age</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(worker, index) in filteredWorkers" :key="index">
              <td v-if="!worker.editMode">{{ worker.name_employee }}</td>
              <td v-else>
                <input v-model="worker.name_employee" placeholder="Enter worker name">
              </td>
              <td v-if="!worker.editMode">{{ worker.post_employee }}</td>
              <td v-else>
                <input v-model="worker.post_employee" placeholder="Enter worker post">
              </td>
              <td v-if="!worker.editMode">{{ worker.age_employee }}</td>
              <td v-else>
                <input type="number" v-model="worker.age_employee" placeholder="Enter age">
              </td>
              <td>
                <button v-if="!worker.editMode" @click="editWorker(index)">Update</button>
                <button v-else @click="saveWorker(index)">Save</button>
              </td>
              <td>
                <button @click="sendDeleteRequestWorker(index)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
        <p v-else>No workers available</p>
      </section>

    </main>
  </div>
</template>

<script>
import barsData from "../json/bar.json";
import drinksData from "../json/drinks.json";
import barDrinksData from "../json/bar_drinks.json";
import gamesData from "../json/games.json";
import barGamesData from "../json/bar_games.json";
import workersData from "../json/workers.json";
import deleteFromFile from "../../js/delete.js"

export default {
  name: "Bar",
  data() {
    return {
      currentSection: "home",
      bar: null,
      barDrinks: [],
      barGames: [],
      barWorkers: [],
      showHours: false
    };
  },
  mounted() {
    this.loadBarData();
    this.loadBarDrinks();
    //this.loadBarGames();
    this.loadAllGames();
    //this.loadBarWorkers();
    //this.loadAllWorkers();
    this.loadBarWorkers(bar.id_bar);
  },
  computed: {
    filteredWorkers() {
      return this.barWorkers;
    },
    filteredGames() {
      return this.barGames;
    }
  },
  methods: {
  loadBarData() {
    const barId = parseInt(this.$route.params.id, 10);
    this.bar = barsData.find(bar => bar.id_bar === barId);
  },
  loadBarDrinks() {
    const barId = parseInt(this.$route.params.id, 10);
    this.barDrinks = drinksData.filter(drink =>
      barDrinksData.some(barDrink => barDrink.bar_id === barId && barDrink.drink_id === drink.id_drink)
    );
  },
    
  toggleHours() {
    this.showHours = !this.showHours;
  },

  //----------------------------------------GAMES----------------------------------------------------
  async loadAllGames() {
    try {
        let responseGames = await fetch('http://localhost:3000/games/list'); // Appel API pour récupérer tous les jeux
        this.barGames = await responseGames.json(); 
    } catch (error) {
        console.error("Erreur lors du chargement des jeux :", error);
      }
  },
  async addGame(){
    try {
        alert("CREATE... ");
        let response = await this.$http.get("http://localhost:3000/games/create");
        this.loadAllGames();
      }
      catch (ex) { console.log(ex); }
  },
  async sendDeleteRequestGame(GameId) {
      try {
        alert("DELETING... " + GameId);
        let response = await this.$http.get("http://localhost:3000/games/remove/" + GameId);
        alert("DELETED: " + response.data.rowsDeleted);
        this.loadAllGames();
      }
      catch (ex) { console.log(ex); }
    },

  //---------------------------------------WORKERS-------------------------------------------------------
  /*async loadAllWorkers() {
    try {
        let responseEmployees = await fetch('http://localhost:3000/employees/list'); // Appel API pour récupérer tous les jeux
        this.barWorkers = await responseEmployees.json(); 
    } catch (error) {
        console.error("Erreur lors du chargement des employées :", error);
      }
  },*/
  async loadAllWorkers() {
    try {
        let responseEmployees = await fetch('http://localhost:3000/employees/list'); // Appel API pour récupérer tous les jeux
        this.barWorkers = await responseEmployees.json(); 
    } catch (error) {
        console.error("Erreur lors du chargement des employées :", error);
    }
},/*
  async loadBarWorkers(barId) {
    try {
        let responseEmployees = await fetch(`http://localhost:3000/employees_bar/list/` + barId); // Appel API avec barId comme filtre
        this.barWorkers = await responseEmployees.json();
    } catch (error) {
        console.error("Erreur lors du chargement des employés pour le bar :", error);
    }
},*/
async loadBarWorkers(barId) {
    try {
        alert("Try recuperate... "+barId);
        let responseEmployees = await fetch('http://localhost:3000/employees/list'); // Récupère tous les employés
        let allEmployees = await responseEmployees.json();
        alert("recuperate... "+barId);
        // Filtrer les employés ayant le bon id_bar
        this.barWorkers = allEmployees.filter(employee => employee.id_bar === barId);
    } catch (error) {
        console.error("Erreur lors du chargement des employés :", error);
    }
},
  async addEmployee(){
    try {
        //alert("CREATE... ");
        let response = await fetch("http://localhost:3000/employees/create");
        //this.loadAllEmployee();
        this.barWorkers= await this.loadAllEmployee()
        alert("CREATE succed");

      }
      catch (ex) { console.log(ex); }
  },
  async sendDeleteRequestWorker(EmployeeId) {
    try {
      alert("Trying DELETING the employee number : " + EmployeeId);
      let response = this.$http.fetch("http://localhost:3000/employees/remove/" + EmployeeId);
      alert("DELETED Employee: " + response.data.rowsDeleted);
      this.barWorkers= await this.loadAllEmployee()
    }
    catch (ex) { console.log(ex); }
  },
  /*
  editDrink(index) {
    // Active le mode édition pour une boisson
    this.$set(this.barDrinks[index], "editMode", true);
  },

  saveDrink(index) {
    // Sauvegarde les modifications
    const drink = this.barDrinks[index];
    if (!drink.name_drink || !drink.price_drink || !drink.volume_drink) {
      alert("Please fill in all fields!");
      return;
    }
    // Désactive le mode édition
    this.$set(this.barDrinks[index], "editMode", false);

    // Sauvegarde dans le localStorage
    const barId = parseInt(this.$route.params.id, 10);
    localStorage.setItem(`barDrinks_${barId}`, JSON.stringify(this.barDrinks));

    console.log("Drink updated:", drink);
  },
    
  deleteDrink(index) {
    // Supprime une boisson
    const deletedDrink = this.barDrinks.splice(index, 1);

    // Sauvegarde dans le localStorage
    const barId = parseInt(this.$route.params.id, 10);
    localStorage.setItem(`barDrinks_${barId}`, JSON.stringify(this.barDrinks));

    console.log("Drink deleted:", deletedDrink);
  },

  addDrink() {
    const barId = parseInt(this.$route.params.id, 10);

    const newDrink = {
      id_drink: Date.now(), 
      name_drink: "",
      price_drink: "",
      volume_drink: "",
      alcohol_content_drink: "", // Par exemple, pourcentage d'alcool
      state_drink: "Available", // Par défaut
      image: "default_image_url", // Remplacez par une URL par défaut
      editMode: true // Active le mode édition pour remplir les champs
    };

    // Ajouter la boisson à la liste actuelle
    this.barDrinks.push(newDrink);

    // Sauvegarder dans le localStorage
    localStorage.setItem(`barDrinks_${barId}`, JSON.stringify(this.barDrinks));

    console.log("New drink added:", newDrink);
  },*/
  /*
  loadBarGames() {
    const barId = parseInt(this.$route.params.id, 10);

    // Vérifie si une version sauvegardée existe dans le localStorage
    const savedBarGames = localStorage.getItem(`barGames_${barId}`);
    if (savedBarGames) {
      this.barGames = JSON.parse(savedBarGames);
    } else {
      // Charge les données par défaut depuis gamesData et barGamesData
      this.barGames = gamesData.filter(game =>
        barGamesData.some(barGame => barGame.bar_id === barId && barGame.game_id === game.id_game)
      );
    }
  },

  editGame(index) {
    // Active le mode édition pour un jeu
    this.$set(this.barGames[index], "editMode", true);
  },

  saveGame(index) {
    // Sauvegarde les modifications
    const game = this.barGames[index];
    if (!game.name_game || !game.price_game || !game.time_game) {
      alert("Please fill in all fields!");
      return;
    }
    // Désactive le mode édition
    this.$set(this.barGames[index], "editMode", false);

    // Sauvegarde dans le localStorage
    const barId = parseInt(this.$route.params.id, 10);
    localStorage.setItem(`barGames_${barId}`, JSON.stringify(this.barGames));

    console.log("Game updated:", game);
  },

  deleteGame(index) {
    // Supprime un jeu
    const deletedGame = this.barGames.splice(index, 1);

    // Sauvegarde dans le localStorage
    const barId = parseInt(this.$route.params.id, 10);
    localStorage.setItem(`barGames_${barId}`, JSON.stringify(this.barGames));

    console.log("Game deleted:", deletedGame);
  },

  addGame() {
    const barId = parseInt(this.$route.params.id, 10);

    
    const newGame = {
      id_game: Date.now(), 
      name_game: "",
      price_game: "",
      time_game: "",
      nb_people_min_game: "",
      nb_people_max_game: "",
      state_game: "Available", // Par défaut
      image: "default_image_url", 
      editMode: true // Active le mode édition pour remplir les champs
    };

    // Ajouter le jeu à la liste actuelle
    this.barGames.push(newGame);

    // Sauvegarder dans le localStorage
    localStorage.setItem(`barGames_${barId}`, JSON.stringify(this.barGames));

    console.log("New game added:", newGame);
  },*/



  /*
  loadBarWorkers() {
    const barId = parseInt(this.$route.params.id, 10);

    // Vérifie si une version sauvegardée dans localStorage existe
    const savedWorkers = localStorage.getItem(`workers_${barId}`);
    if (savedWorkers) {
      this.barWorkers = JSON.parse(savedWorkers);
    } else {
      this.barWorkers = workersData.filter(worker => worker.id_bar === barId);
    }
  },

  deleteWorker(index) {
    const workerToDelete = this.barWorkers[index];
    this.barWorkers.splice(index, 1);

    // Sauvegarde dans le localStorage après suppression
    const barId = parseInt(this.$route.params.id, 10);
    localStorage.setItem(`workers_${barId}`, JSON.stringify(this.barWorkers));

    console.log("Worker deleted:", workerToDelete);
  },

  editWorker(index) {
    this.$set(this.barWorkers[index], "editMode", true);
  },

  saveWorker(index) {
    const worker = this.barWorkers[index];
    if (!worker.name_employee || !worker.post_employee || !worker.age_employee) {
      alert("Please fill in all fields!");
      return;
    }
    this.$set(this.barWorkers[index], "editMode", false);

    // Sauvegarde dans le localStorage après modification
    const barId = parseInt(this.$route.params.id, 10);
    localStorage.setItem(`workers_${barId}`, JSON.stringify(this.barWorkers));

    console.log("Worker updated:", worker);
  },

  addWorker() {
      const barId = parseInt(this.$route.params.id, 10);

      // Exemple d'un nouveau travailleur par défaut
      const newWorker = {
        id_employee: Date.now(), // Utilise un timestamp pour générer un ID unique
        name_employee: "",
        post_employee: "",
        age_employee: "",
        photo_employee: "", // Par défaut, pas d'image
        editMode: true, // Active le mode édition pour remplir les champs
      };

      // Ajouter le travailleur à la liste actuelle
      this.filteredWorkers.push(newWorker);

      // Sauvegarder dans localStorage
      localStorage.setItem(`workers_${barId}`, JSON.stringify(this.filteredWorkers));

      console.log("New worker added:", newWorker);
    },*/
}
};
</script>
  

<style scoped>

header {
  display: flex; /* Active Flexbox */
  justify-content: space-between; /* Place le logo à gauche et les boutons à droite */
  align-items: center; /* Aligne verticalement tous les éléments */
  color: white;
  padding: 10px 20px; /* Ajoute de l’espace à l’intérieur du header */
}

.logo-container {
  display: flex; /* Pour flexibilité future */
  align-items: center; /* Centrer verticalement le logo */
}

.logo-image {
  height: 50px; /* Ajuste la hauteur du logo */
  width: auto; /* Conserve ses proportions */
}

.navbar {
  display: flex; /* Aligne les boutons sur une ligne */
  gap: 15px; /* Espace entre les boutons */
}


.navbar button, .barPage, .login {
  padding: 10px 20px;
  background-color: #05a04b;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1em;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.navbar button:hover {
  background-color: #e07b37;
}

.home-section, .drinks, .games {
  text-align: center;
  margin-top: 20px;
}

.add-button{
  background-color: #4CAF50;  
  color: white;  
  border: none;  
  padding: 10px 20px;  
  font-size: 16px;  
  cursor: pointer;  
  border-radius: 5px;  
  transition: background-color 0.3s ease, transform 0.3s ease
}

.map-image {
  width: 100%;
  max-width: 600px;
  margin: 10px 0;
  border-radius: 8px;
}

.description {
  margin: 20px;
}

.drink-table, .game-table {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.drink-table th, .drink-table td, .game-table th, .game-table td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
}

.drink-table th, .game-table th {
  background-color: #ff8c42;
  color: white;
  font-weight: bold;
}

.drink-table tr:nth-child(even), .game-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.drink-table tr:hover, .game-table tr:hover {
  background-color: #f1f1f1;
}

.drink-image, .game-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}
.centered-title {
  text-align: center;
  margin: 20px 0;
  font-size: 1.8em;
}


.items {
  display: flex;
  justify-content: center;
  gap: 20px; /* Espacement entre les éléments */
  margin-top: 20px;
}

.items button{
  border: 2px solid red; /* Debug visual */
}


/* Styles pour chaque section */
.drinks-section,
.games-section,
.workers-section {
  display: flex;
  flex-direction: column; /* Aligne les enfants verticalement */
  align-items: center;    /* Centrer horizontalement */
  
}

.drinks-section img,
.games-section img,
.workers-section img {
  width: 300px;   /* Ajustez la taille de l'image */
  height: auto;
  margin-bottom: 10px; /* Espacement entre l'image et le bouton */
}

.workers-image{
  width: 100px;
  height: auto;
}

.drinks-section button, .games-section button, .workers-section button {
  padding: 10px 20px;
  background-color: #05a04b;
  color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1em;
  transition: background-color 0.3s;
}

.drinks-section button:hover, .games-section button:hover,.workers-section button:hover {
  background-color: #e07b37;
}


.bar-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
}

.description {
  margin: 20px 0;
}


.location {
  display: flex;
  flex-direction: column; 
  align-items: center;     
  justify-content: center;
  text-align: center;     
  margin: 0 auto;          
}

.location-content {
  display: flex;
  flex-direction: row;  
  align-items: center;     
  justify-content: center; 
  width: 80%;              
  margin-top: 20px;        
}

.location-details {
  padding-left: 20px;   
}

.map-image {
  width: 400px;
  height: auto;
  margin-right: 20px;
}


.schedule-container {
  margin-top: 10px;
}

.schedule-container button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #ff8c42;
  color: white;
  border: none;
  cursor: pointer;
}

.schedule-container button:hover {
  background-color: #ff7b2d;
}

.hoursList ul {
  list-style-type: none;
  padding: 0;
  margin-top: 10px;
}

.hoursList li {
  margin: 5px 0;
}

.worker-table {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  border-collapse: collapse;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.worker-table th, .worker-table td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
}

.worker-table th {
  background-color: #ff8c42;
  color: white;
  font-weight: bold;
}

.worker-table tr:nth-child(even) {
  background-color: #f9f9f9;
}

.worker-table tr:hover {
  background-color: #f1f1f1;
}
</style>