<template>
  <div class="timer">
    <fa-icon
      v-if="close"
      class="close"
      @click="clickClose"
      icon="times-circle"
    />
    <h1>
      <span>{{ time.format('HH') }}</span>
      <span class="punctuation">:</span>
      <span>{{ time.format('mm') }}</span>
    </h1>
    <h2>{{ timezoneDisplay }}</h2>
    <h3>
      <span>{{ time.format('dddd MMMM DD') }}</span>
      <span class="punctuation">,</span>
      <span>{{ time.format(' YYYY') }}</span>
    </h3>
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
h1 {
  font-size: 2.5rem;
}

.timer {
  box-shadow: 4px 4px $color-shadow;
  border: solid 1px $color-shadow;
  border-radius: 1rem;
  flex-grow: 1;
  margin: 20px;
  position: relative;

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
    color: $color-close;
  }

  .punctuation {
    color: $color-close;
  }
}
</style>
