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
    <Search :selectedZone="selectedTime" />
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import Timezone from '@/time-zones/Timezone';
import Timer from './Timer.vue';
import Search from './Search.vue';

const timezones = require('../time-zones/time-zones.json');

export default defineComponent({
  components: {
    Timer,
    Search,
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
        timezones[0].offsetMinutes,
      ),
    };
  },
  methods: {
    setSelected(zoneCode) {
      const timezone = timezones.find((zone) => zone.code === zoneCode);
      this.selectedTime = new Timezone(
        timezone.code,
        timezone.name,
        timezone.offsetMinutes,
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
