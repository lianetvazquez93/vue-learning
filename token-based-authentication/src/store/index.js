import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
  },
  mutations: {
    SET_USER_DATA(state, userData) {
      state.user = userData;
      localStorage.setItem("user", JSON.stringify(userData));
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer: ${userData.token}`;
    },
  },
  actions: {
    async register({ commit }, credentials) {
      const response = await axios.post(
        "http://localhost:3000/register",
        credentials,
      );
      commit("SET_USER_DATA", response.data);
    },
    async login({ commit }, credentials) {
      const response = await axios.post(
        "http://localhost:3000/login",
        credentials,
      );
      commit("SET_USER_DATA", response.data);
    },
  },
  getters: {
    loggedIn(state) {
      return !!state.user;
    },
  },
});
