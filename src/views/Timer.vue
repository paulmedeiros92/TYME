<template>
  <div
    class="timer"
    :style="{backgroundColor: color}"
  >
    <fa-icon
      v-if="close"
      class="close flair"
      @click="clickClose"
      icon="times-circle"
    />
    <h1>
      <span>{{ time.format('HH') }}</span>
      <span class="flair">:</span>
      <span>{{ time.format('mm') }}</span>
    </h1>
    <h3>
      <div class="flair">{{ time.format('dddd')}}</div>
      <div>
        <span>{{ time.format('MMMM D, YYYY') }}</span>
      </div>
    </h3>
    <h3 v-if="timezone">
      {{ `${timezone.city}, ${timezone.iso3}` }}
    </h3>
    <h3 v-else>YOUR TYME</h3>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    timezone: {
      type: Object,
      default: null,
    },
    close: {
      type: Boolean,
      default: true,
    },
    color: {
      type: String,
      default: '#EEEEEE',
    },
  },
  methods: {
    clickClose() {
      this.$store.dispatch('removeZone', this.timezone.timezone);
    },
  },
  computed: {
    time() {
      const { timezone } = this;
      if (timezone === null) {
        return this.$store.state.time;
      }
      return this.$store.state.time.tz(timezone.timezone);
    },
  },
});
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2.5rem;
  margin-bottom: 0;
}

.timer {
  flex-grow: 1;
  padding: 20px;
  position: relative;
  color: $color-background;

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
  }
}
</style>
