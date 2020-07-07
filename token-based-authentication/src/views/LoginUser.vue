<template>
  <div>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" name="email" v-model="email" value />

      <label for="password">Password:</label>
      <input type="password" name="password" v-model="password" value />

      <button type="submit" name="button">Login</button>

      <p>{{ error }}</p>

      <router-link to="/register">Don't have an account? Register.</router-link>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      error: null,
    };
  },
  methods: {
    async login() {
      try {
        await this.$store.dispatch("login", {
          email: this.email,
          password: this.password,
        });
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
  },
};
</script>
