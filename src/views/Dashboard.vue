<template>
  <div class="dashboard">
    <Timer :close="false" />
    <Timer
      v-for="(timezone, i) in timezones"
      :key="timezone.city"
      :timezone="timezone"
      :color="getColor(i)"
    />
    <Add :close="false" />
  </div>
</template>

<script lang="js" scoped>
import { defineComponent } from 'vue';
import { mapState } from 'vuex';
import Timer from './Timer.vue';
import Add from './Add.vue';

export default defineComponent({
  components: {
    Timer,
    Add,
  },
  data() {
    return {
      colors: ['#B9FFB7', '#ABEDC6', '#98D9C2', '#F19A3E'],
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
.dashboard {
  display: flex;
  flex-flow: row;
  height: 100%;
}
</style>
