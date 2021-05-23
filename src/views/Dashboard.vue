<template>
  <div class="dashboard">
    <Header />
    <div class="other-times">
      <Timer
        v-for="(timezone, i) in timezones"
        :key="timezone.city"
        :timezone="timezone"
        :color="getColor(i)"
      />
    </div>
        <div class="local-time">
      <Timer :close="false" />
    </div>
  </div>
</template>

<script lang="js" scoped>
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import Timer from './Timer.vue';
import Header from './Header.vue';

export default defineComponent({
  components: {
    Timer,
    Header,
  },
  data() {
    return {
      colors: ['#116466', '#ffcb9a', '#d1e8e2', '#d9b08c', '#d1e8e2'],
    };
  },
  mounted() {
    this.$store.dispatch('loadCookie');
    this.$store.dispatch('startTimer');
  },
  methods: {
    getColor(i) {
      const { colors } = this;
      return colors[i % colors.length];
    },
  },
  computed: mapState(['timezones']),
});
</script>

<style lang="scss">
.other-times {
  display: flex;
}
</style>
