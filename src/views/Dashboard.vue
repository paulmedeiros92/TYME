<template>
  <div class="dashboard">
    <div class="local-time">
      <Timer />
    </div>
    <div class="other-times">
      <Timer
        v-for="timezone in dashTimezones"
        :key="timezone.name"
        :timezone="timezone"
        :close="removeTimezone"
      />
    </div>
    <label for="add-clock">Add a clock!</label>
    <select
      id="add-clock"
      @input="setSelected($event.target.value)"
    >
      <option
        v-for="timezone in timezones"
        :key="timezone.code"
        :value="timezone.code"
      >
        {{ timezone.name }}
      </option>
    </select>
    <div class="preview">
      <Timer
        v-if="selectedTime"
        :timezone="selectedTime"
      />
    </div>
    <button @click="addTimezone(selectedTime)">
      Add
    </button>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import Timezone from '@/time-zones/Timezone';
import Timer from './Timer.vue';

const timezones = require('../time-zones/time-zones.json');

export default defineComponent({
  components: {
    Timer,
  },
  mounted() {
    this.$store.dispatch('loadCookie');
    this.$store.dispatch('startTimer');
  },
  data() {
    return {
      timezones,
      selectedTime: new Timezone(
        timezones[0].code,
        timezones[0].name,
        timezones[0]['utc-offset-seconds'],
      ),
    };
  },
  methods: {
    setSelected(zoneCode) {
      const timezone = timezones.find((zone) => zone.code === zoneCode);
      this.selectedTime = new Timezone(
        timezone.code,
        timezone.name,
        timezone['utc-offset-seconds'],
      );
    },
    addTimezone(timezone) {
      this.$store.dispatch('addZone', timezone);
    },
    removeTimezone(timezone) {
      this.$store.dispatch('removeZone', timezone);
    },
  },
  computed: {
    dashTimezones() {
      return this.$store.state.timezones;
    },
  },
});
</script>

<style lang="scss">
.other-times {
  display: flex;
}
</style>
