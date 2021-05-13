<template>
  <div class="timer">
    <fa-icon
      v-if="close"
      class="close"
      @click="clickClose"
      icon="times-circle"
    />
    <h1>{{ timeDisplay }}</h1>
    <h2>{{ timezoneDisplay }}</h2>
    <h3>{{ time.format('MMMM DD dddd YYYY') }}</h3>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import Timezone from '@/time-zones/Timezone';

export default defineComponent({
  props: {
    timezone: {
      type: Timezone,
      default: null,
    },
    close: {
      type: Function,
      default: null,
    },
  },
  methods: {
    clickClose() {
      this.close(this.timezone);
    },
  },
  computed: {
    time() {
      if (this.timezone === null) {
        return this.$store.state.time;
      }
      const { offsetMinutes } = this.timezone;
      return this.$store.state.time.utcOffset(offsetMinutes);
    },
    timezoneDisplay() {
      if (this.timezone === null) {
        return 'Local';
      }
      const { code, name } = this.timezone;
      return `${name} (${code})`;
    },
    timeDisplay() {
      return this.time.format('HH:mm');
    },
  },
});
</script>

<style lang="scss">
.timer {
  border: solid black;
  flex-grow: 1;
  margin: 20px;
  position: relative;

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
}
</style>
