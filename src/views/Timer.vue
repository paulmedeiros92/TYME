<template>
  <div class="time">
    <h1>{{ time.format('HH:mm') }}</h1>
    <h3>{{ time.format('MMMM DD dddd YYYY') }}</h3>
    <h5>{{ extraInfo }}</h5>

  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    offsetMinutes: {
      type: Number,
      default: null,
    },
    code: {
      type: String,
      default: null,
    },
    name: {
      type: String,
      default: null,
    },
    country: {
      type: String,
      defualt: null,
    },
  },
  computed: {
    time() {
      const { offsetMinutes } = this;
      if (offsetMinutes === null) {
        return this.$store.state.time;
      }
      return this.$store.state.time.utcOffset(offsetMinutes);
    },
    extraInfo() {
      const { country, name } = this;
      return `${country}, Timezone: ${name}`;
    },
  },
});
</script>

<style lang="scss">
.time {
  border: solid black;
  flex-grow: 1;
  margin: 20px;
}
</style>
