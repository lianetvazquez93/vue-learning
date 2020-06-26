import Vue from "vue";
import Vuex from "vuex";
import defaultBoard from "../default-board";
import { uuid, saveStatePlugin } from "../utils";

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
  mutations: {
    CREATE_TASK(state, { tasks, name }) {
      tasks.push({
        name,
        id: uuid(),
        description: "",
      });
    },
    UPDATE_TASK(state, { task, key, value }) {
      task[key] = value;
    },
  },
  actions: {},
  modules: {},
});