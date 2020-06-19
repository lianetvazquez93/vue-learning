<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      :value="value"
      @input="updateValue"
      v-on="listeners"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import { formFieldMixin } from "../mixins/formFiledMixind";

export default {
  mixins: [formFieldMixin],
};
</script>
