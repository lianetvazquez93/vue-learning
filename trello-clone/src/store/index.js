import Vue from "vue";
import Vuex from "vuex";
import defaultBoard from "../default-board";
import { saveStatePlugin } from "../utils";

Vue.use(Vuex);

const board = JSON.parse(localStorage.getItem("board")) || defaultBoard;

export default new Vuex.Store({
  plugins: [saveStatePlugin],
  state: {
    board,
  },
  getters: {
    getTask(state) {
      return id => {
        for (let column of state.board.columns) {
          for (let task of column.tasks) {
            if (task.id === id) {
              return task;
            }
          }
        }
      };
    },
  },
  mutations: {},
  actions: {},
  modules: {},
});
