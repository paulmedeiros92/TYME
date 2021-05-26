<template>
  <div class="search">
    <div class="autocomplete">
      <div class="search-form">
        <input
          class="search-input"
          :class="{ active: filteredZones.length > 0 }"
          type="search"
          :value="searchString"
          @input="onInput"
          v-on:keyup.down="onKeyDown"
          v-on:keyup.up="onKeyUp"
          v-on:keyup.enter="onKeyEnter"
          placeholder="Las Vegas"
        />
      </div>
      <div
        v-if="filteredZones.length > 0"
        class="search-results"
      >
        <div
          v-for="(timezone, index) in filteredZones"
          :key="timezone.lat + timezone.lng"
          class="search-result"
          :class="{ focus: index === focusIndex}"
          :ref="index === focusIndex ? 'focus': ''"
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
      focusIndex: null,
    };
  },
  updated() {
    if (this.searchString) {
      this.$refs.focus.scrollIntoView();
    }
  },
  methods: {
    addTimezone(timezone) {
      this.searchString = '';
      this.$store.dispatch('addZone', timezone);
    },
    onInput(event) {
      this.searchString = event.target.value;
      this.focusIndex = 0;
    },
    onKeyDown() {
      const { focusIndex, filteredZones } = this;
      if (focusIndex === null) {
        this.focusIndex = 0;
      } else if (focusIndex >= 0 && focusIndex < filteredZones.length - 1) {
        this.focusIndex += 1;
      }
    },
    onKeyUp() {
      const { focusIndex } = this;
      if (focusIndex === null) {
        this.focusIndex = 0;
      } else if (focusIndex > 0) {
        this.focusIndex -= 1;
      }
    },
    onKeyEnter() {
      const { focusIndex, filteredZones } = this;
      this.addTimezone(filteredZones[focusIndex]);
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
.autocomplete {
  position: relative;
  height: 2rem;

  .search-form {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    .search-input {
      width: 300px;
      background-color: $color-close;
      border: solid 1px $color-close;
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
    width: 300px;
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
      &.focus {
        background-color: $color-close;
        color: $color-shadow;
        scroll-snap-align: center;
      }
    }
  }
}
</style>
