<template>
  <div class="search">
    <label class="title" for="add-clock">
      <span>Add a T</span>
      <span class="flair">Y</span>
      <span>ME!</span>
    </label>
    <div class="autocomplete">
      <div class="search-form">
        <input
          class="search-input"
          :class="{ active: filteredZones.length > 0 }"
          type="search"
          v-model="searchString"
        />
      </div>
      <div
        v-if="filteredZones.length > 0"
        class="search-results"
      >
        <div
          v-for="timezone in filteredZones"
          :key="timezone.lat + timezone.lng"
          class="search-result"
          @click="addTimezone(timezone)"
        >
          {{ `${timezone.city}, ${timezone.country}, ${timezone.timezone}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import * as cityTimezones from 'city-timezones';

export default defineComponent({
  props: {
    selectedZone: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      searchString: '',
    };
  },
  methods: {
    addTimezone(timezone) {
      this.searchString = '';
      this.$store.dispatch('addZone', timezone);
    },
  },
  computed: {
    filteredZones() {
      const { searchString } = this;
      return cityTimezones.findFromCityStateProvince(searchString);
    },
  },
});
</script>

<style lang="scss" scoped>
.search {

  .title {
    font-size: 2rem;
    font-weight: 600;
  }
}

.autocomplete {
  position: relative;
  height: 2rem;

  .search-form {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    .search-input {
      width: 400px;
      background-color: $color-input;
      border: solid 1px #d9b08c;
      font-size: 1rem;
      padding: .4rem;

      &:focus {
        outline: none;
      }
    }
  }
  .search-results {
    position: absolute;
    left: 50%;
    top: 2rem;
    transform: translateX(-50%);
    height: 200px;
    width: 400px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 3;
    background-color: $color-shadow;

    .search-result {
      text-align: left;
      padding: .4rem;
      &:hover {
        background-color: $color-close;
        color: $color-shadow;
      }
    }
  }
}
</style>
