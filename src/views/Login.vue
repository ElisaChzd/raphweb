<template>
  <div>
    <header>
      <div class="logo-container">
        <img src="/image/logo.png" alt="Logo" class="logo-image">
      </div>
      <div class="navbar">
        <router-link :to="{ name: 'BarPage' }" class="barPage">HOME</router-link>
        <button @click="currentSection = 'About'">ABOUT</button>
        <button @click="currentSection = 'favorite'">FAVORITE</button>
        <button @click="currentSection = 'login'">LOGIN</button>
      </div>
    </header> 

    <main>
      <!-- Section Login -->
      <div v-if="currentSection === 'login'" class="form-container">
        <h2>Login</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="form.password" required>
          </div>
          <button type="submit">Login</button>
        </form>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <!-- Nouveau bouton pour créer un compte -->
        <button class="create-account-button" @click="currentSection = 'signin'">
          Create an Account
        </button>
      </div>

      <!-- Section Register -->
      <div v-if="currentSection === 'signin'" class="form-container">
        <h2>Register</h2>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="firstname">First Name</label>
            <input type="text" id="firstname" v-model="form.firstname" required>
          </div>
          <div class="form-group">
            <label for="lastname">Last Name</label>
            <input type="text" id="lastname" v-model="form.lastname" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" v-model="form.email" required>
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="form.password" required>
          </div>
          <button type="submit">Register</button>
        </form>
        <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
        <button class="create-account-button" @click="currentSection = 'login'">
          Already an account ? 
        </button>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSection: "login", // Contrôle la section visible
      form: {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      },
      successMessage: null // Message après soumission
    };
  },
  methods: {
    handleSubmit() {
      console.log("Form submitted:", this.form);
      this.successMessage = "Registration successful!";
      this.form = {
        firstname: "",
        lastname: "",
        email: "",
        password: ""
      };
    }
  }
};
</script>

<style scoped>
/* Global Header Styles */
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  padding: 10px 20px;
}

.logo-image {
  height: 50px;
  width: auto;
}

.navbar {
  display: flex;
  gap: 15px;
}

.navbar button, .barPage, .login {
  padding: 10px 20px;
  background-color: #05a04b;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1em;
  border-radius: 4px;
}

.navbar button:hover, .login:hover {
  background-color: #e07b37;
}

/* Centered Form Styles */
.form-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.form-container h2 {
  margin-bottom: 20px;
  color: #333;
}

.form-group {
  margin-bottom: 15px;
  text-align: left;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1em;
}

.form-container button {
  background-color: #05a04b;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1em;
}

.form-container button:hover {
  background-color: #e07b37;
}

.create-account-button {
  margin-top: 15px;
  background-color: transparent;
  color: #333;
  text-decoration: underline;
  border: none;
  cursor: pointer;
  font-size: 1em;
}


.success-message {
  margin-top: 15px;
  color: green;
  font-weight: bold;
}
</style>