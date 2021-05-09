<template>
  <div class="dashboard">
    <div class="local-time">
      <Timer />
    </div>
    <div class="other-times">
      <Timer :offsetMinutes="540" name="Japan Standard Time" />
      <Timer :offsetMinutes="0" name="Azores Summer Time" />
      <Timer :offsetMinutes="120" name="Eastern European Time" />
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
        :offsetMinutes="selectedTime['utc-offset-seconds']"
        :name="selectedTime.name"
      />
    </div>
    <button>Add</button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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
      selectedTime: null,
    };
  },
  methods: {
    setSelected(zoneCode) {
      this.selectedTime = timezones.find((zone) => zone.code === zoneCode);
    },
  },
});
</script>

<style lang="scss">
.other-times {
  display: flex;
}
</style>
