<template>
  <div class="board">
    <div class="flex flex-row items-start">
      <BoardColumn
        v-for="(column, $columnIndex) of board.columns"
        :key="$columnIndex"
        :column="column"
        :columnIndex="$columnIndex"
        :board="board"
      />

      <div class="column flex">
        <input
          type="text"
          class="p-2 mr-2 flex-grow"
          placeholder="New Column Name"
          v-model="newColumnName"
          @keyup.enter="createColumn"
        />
      </div>
    </div>

    <div class="task-bg" v-if="isTaskOpen" @click.self="closeTask">
      <router-view />
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  beforeCreate: function() {
    this.$options.components.BoardColumn = require("../components/BoardColumn").default;
  },
  data() {
    return {
      newColumnName: "",
    };
  },
  computed: {
    ...mapState(["board"]),
    isTaskOpen() {
      return this.$route.name === "task";
    },
  },
  methods: {
    closeTask() {
      this.$router.push({ name: "board" });
    },
    createColumn() {
      this.$store.commit("CREATE_COLUMN", {
        name: this.newColumnName,
      });
      this.newColumnName = "";
    },
  },
};
</script>

<style lang="postcss">
.board {
  @apply p-4 bg-teal-600 h-full overflow-auto;
}
.task-bg {
  @apply inset-0 absolute;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
