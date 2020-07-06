<template>
  <div>
    <form @submit.prevent="register">
      <label for="name">Name:</label>
      <input type="text" name="name" v-model="name" value />

      <label for="email">Email:</label>
      <input type="email" name="email" v-model="email" value />

      <label for="password">Password:</label>
      <input type="password" name="password" v-model="password" value />

      <button type="submit" name="button">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      await this.$store.dispatch("register", {
        name: this.name,
        email: this.email,
        password: this.password,
      });
      this.$router.push({ name: "dashboard" });
    },
  },
};
</script>
