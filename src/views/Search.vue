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
      <Transition>
        <div v-if="filteredZones.length > 0" class="search-results">
          <div
            v-for="(timezone, index) in filteredZones"
            :key="index"
            class="search-result"
            :class="{ focus: index === focusIndex }"
            :ref="`focus${index}`"
            @click="addTimezone(timezone)"
          >
            {{ `${timezone.city}, ${timezone.country}, ${timezone.UtcOffset}` }}
          </div>
        </div>
      </Transition>
    </div>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import * as cityTimezones from 'city-timezones';
import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import { nextTick } from 'process';

dayjs.extend(tz);

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
      time: dayjs(),
    };
  },
  watch: {
    focusIndex(newValue) {
      if (this.filteredZones.length) {
        nextTick(() => {
          this.$refs[`focus${newValue}`].scrollIntoView();
        });
      }
    },
  },
  methods: {
    addTimezone(timezone) {
      this.searchString = '';
      if (timezone) {
        this.$store.dispatch('addZone', timezone);
      }
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
      return cityTimezones.findFromCityStateProvince(searchString).slice(0, 50).map((time) => ({
        ...time,
        UtcOffset: time.timezone ? `${this.time.tz(time.timezone).format('Z')} UTC` : 'N/A',
      }));
    },
  },
});
</script>

<style lang="scss" scoped>
$color-search: #abedc6;
$color-shadow: #ffffff;
.autocomplete {
  position: relative;
  height: 2rem;

  .search-form {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;

    .search-input {
      width: 100%;
      background-color: $color-search;
      border: solid 1px $color-search;
      border-radius: 5px;
      font-size: 1rem;
      padding: 0.4rem;
      color: $color-font;

      &:focus {
        outline: none;
      }

      &::-webkit-search-cancel-button{
        -webkit-appearance: none;
      }
    }
  }
  .search-results {
    position: absolute;
    left: 50%;
    top: 2rem;
    transform: translateX(-50%);
    height: 200px;
    width: 100%;
    border-radius: 5px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 3;
    background-color: $color-shadow;

    .search-result {
      text-align: left;
      padding: 0.4rem;
      border-radius: 5px;
      &:hover {
        background-color: $color-search;
        color: $color-font;
      }
      &.focus {
        background-color: $color-search;
        color: $color-font;
        scroll-snap-align: center;
      }
    }
  }
}
</style>
