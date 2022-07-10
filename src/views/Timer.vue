<template>
  <div class="timer" :style="{ backgroundColor: color }">
    <fa-icon v-if="close" class="close flair" @click="clickClose" icon="times-circle" />
    <h1>
      <span>{{ formattedHours }}</span>
      <span class="flair">:</span>
      <span>{{ formattedMinutes }}</span>
    </h1>
    <h3>
      <div>{{ time.format("dddd") }}</div>
      <div>
        {{ time.format("MMMM D, YYYY") }}
      </div>
    </h3>
    <h3>
      {{ `${time.format("Z")} UTC` }}
    </h3>
    <h2 v-if="timezone">
      {{ `${timezone.city}, ${timezone.iso3}` }}
    </h2>
    <h3 v-else>YOUR T<span class="flair">Y</span>ME</h3>
    <div class="toggle">
      <Toggle v-model="isTwelve" />
      <h3>{{ twelveLabel }}</h3>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import Toggle from './Toggle.vue';

export default defineComponent({
  components: {
    Toggle,
  },
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
  data() {
    return ({
      isTwelve: false,
    });
  },
  methods: {
    clickClose() {
      this.$store.dispatch('removeZone', this.timezone);
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
    formattedHours() {
      return this.isTwelve ? this.time.format('hh') : this.time.format('HH');
    },
    formattedMinutes() {
      return this.isTwelve ? this.time.format('mm A') : this.time.format('mm');
    },
    twelveLabel() {
      return this.isTwelve ? '24hrs' : '12hrs';
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
  min-width: 100px;
  padding: 20px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  position: relative;
  color: $color-font;

  &:hover > .close {
    opacity: 1;
  }

  .close {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    cursor: pointer;
    opacity: 0;
    transition: opacity 0.25s ease-out;
  }

  .toggle {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
  }
}
</style>
