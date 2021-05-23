<template>
  <div class="header">
    <div class="title" for="add-clock">
      Add a T<span class="flair">Y</span>ME!
    </div>
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
  padding: 60px;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
