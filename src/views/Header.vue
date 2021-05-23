<template>
  <div class="header">
    <Search />
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import Search from './Search.vue';

export default defineComponent({
  components: {
    Search,
  },
});
</script>

<style lang="scss" scoped>
.header {
  padding: 40px;
}
</style>
