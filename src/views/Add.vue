<template>
  <div class="add">
    <div class="title" for="add-clock">Add a T<span class="flair">Y</span>ME!</div>
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
.add {
  min-width: 100px;
  padding: 20px;
  display: flex;
  flex-flow: column;
  justify-content: center;
  flex-grow: 1;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
