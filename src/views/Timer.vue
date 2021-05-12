<template>
  <div class="time">
    <h1>{{ timeDisplay }}</h1>
    <h2 v-if="timezone">{{ timezone.code }}</h2>
    <h3>{{ time.format('MMMM DD dddd YYYY') }}</h3>
    <h5>{{ extraInfo }}</h5>

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
  },
  computed: {
    time() {
      if (this.timezone === null) {
        return this.$store.state.time;
      }
      const { offsetMinutes } = this.timezone;
      return this.$store.state.time.utcOffset(offsetMinutes);
    },
    timeDisplay() {
      return this.time.format('HH:mm');
    },
    extraInfo() {
      if (this.timezone === null) {
        return 'Local';
      }
      const { country, name } = this.timezone;
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
