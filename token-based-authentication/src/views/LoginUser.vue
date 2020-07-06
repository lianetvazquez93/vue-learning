<template>
  <div>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input type="email" name="email" v-model="email" value />

      <label for="password">Password:</label>
      <input type="password" name="password" v-model="password" value />

      <button type="submit" name="button">Login</button>
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
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
      this.$router.push({ name: "dashboard" });
    },
  },
};
</script>
