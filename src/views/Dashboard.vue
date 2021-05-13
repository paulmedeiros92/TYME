<template>
  <div class="dashboard">
    <div class="local-time">
      <Timer />
    </div>
    <div class="other-times">
      <Timer
        v-for="timezone in dashboard.timezones"
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

<script lang="ts">
import { defineComponent } from 'vue';
import Timezone from '@/time-zones/Timezone';
import Timer from './Timer.vue';

const timezones = require('../time-zones/time-zones.json');

export default defineComponent({
  components: {
    Timer,
  },
  mounted() {
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
      dashboard: {
        timezones: [
          new Timezone('CEST', 'Central European SummerTime', 120),
          new Timezone('EST', 'Eastern Standard Time', -300),
          new Timezone('MDT', 'Mountain Daylight Time', -360),
        ],
      },
    };
  },
  methods: {
    setSelected(zoneCode) {
      const timezone = timezones.find((zone) => zone.code === zoneCode);
      return new Timezone(
        timezone.code,
        timezone.name,
        timezone['utc-offset-seconds'],
      );
    },
    addTimezone(timezone) {
      this.dashboard.timezones.push(timezone);
    },
    removeTimezone(timezone) {
      this.dashboard.timezones = this.dashboard.timezones
        .filter((zone) => zone.code !== timezone.code);
    },
  },
});
</script>

<style lang="scss">
.other-times {
  display: flex;
}
</style>
