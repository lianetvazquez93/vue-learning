<template>
  <AppDrop @drop="moveTaskOrColumn">
    <AppDrag
      class="column"
      :transferData="{ type: 'column', fromColumnIndex: columnIndex }"
    >
      <div class="flex items-center mb-2 font-bold">
        {{ column.name }}
      </div>
      <div class="list-reset">
        <ColumnTask
          v-for="(task, $taskIndex) of column.tasks"
          :key="$taskIndex"
          :task="task"
          :taskIndex="$taskIndex"
          :column="column"
          :columnIndex="columnIndex"
          :board="board"
        />

        <input
          type="text"
          class="block p-2 bg-transparent"
          placeholder="+ Enter new task"
          @keyup.enter="createTask($event, column.tasks)"
        />
      </div>
    </AppDrag>
  </AppDrop>
</template>

<script>
import movingTasksAndColumnsMixin from "../mixins/movingTasksAndColumnsMixin";
import AppDrag from "./AppDrag";
import AppDrop from "./AppDrop";

export default {
  name: "board-column",
  components: {
    AppDrag,
    AppDrop,
  },
  mixins: [movingTasksAndColumnsMixin],
  beforeCreate: function() {
    this.$options.components.ColumnTask = require("./ColumnTask").default;
  },
  methods: {
    createTask(event, tasks) {
      this.$store.commit("CREATE_TASK", {
        tasks,
        name: event.target.value,
      });
      event.target.value = "";
    },
    pickupColumn(event, fromColumnIdex) {
      event.dataTransfer.effectAllowed = "move";
      event.dataTransfer.dropEffect = "move";

      event.dataTransfer.setData("from-column-index", fromColumnIdex);
      event.dataTransfer.setData("type", "column");
    },
  },
};
</script>

<style lang="postcss">
.column {
  @apply bg-gray-400 p-2 mr-4 shadow rounded;
  min-width: 350px;
}
</style>
