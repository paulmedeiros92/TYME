<template>
  <div class="search">
    <label for="add-clock">Add a clock!</label>
    <div class="autocomplete">
      <div class="search">
        <input class="search-input" type="search" v-model="searchString" />
        <select
          class="search-parameter"
          v-model="searchParameter"
        >
          <option
            v-for="parameter in searchParameters"
            :key="parameter.label"
            :value="parameter"
            :selected="parameter.label === searchParameter.label"
          >
            {{ parameter.label }}
          </option>
        </select>
      </div>
      <div
        v-if="filteredZones.length > 0"
        class="search-results"
      >
        <div
          v-for="timezone in filteredZones"
          :key="timezone.name + timezone.offsetMinutes"
          class="search-result"
          @click="setSelected(timezone)"
        >
          {{ `${timezone.name}, ${timezone.code}, ${timezone.offsetMinutes}` }}
        </div>
      </div>
    </div>
    <Timer
        v-if="selectedTime"
        :timezone="selectedTime"
    />
    <button @click="addTimezone(selectedTime)">
      Add
    </button>
  </div>
</template>

<script lang="js">
import { defineComponent } from 'vue';
import Timezone from '@/time-zones/Timezone';
import Timer from '@/views/Timer.vue';

const TIMEZONES = require('../time-zones/time-zones.json');

export default defineComponent({
  components: {
    Timer,
  },
  props: {
    selectedZone: {
      type: Timezone,
      default: null,
    },
  },
  data() {
    return {
      timezones: TIMEZONES,
      searchParameters: [
        { label: 'Country', parameter: 'countries' },
        { label: 'Timezone Code', parameter: 'code' },
        { label: 'Timezone Name', parameter: 'name' },
        { label: 'UTC Offset', parameter: 'offsetMinutes' },
      ],
      searchString: '',
      searchParameter: { label: 'Timezone Name', parameter: 'name' },
      selectedTime: new Timezone(
        TIMEZONES[0].code,
        TIMEZONES[0].name,
        TIMEZONES[0].offsetMinutes,
      ),
    };
  },
  methods: {
    setSelected(timezone) {
      this.selectedTime = timezone;
      this.searchString = '';
    },
    setSearchParameter(searchParameter) {
      this.searchParameter = searchParameter;
    },
    addTimezone(timezone) {
      this.$store.dispatch('addZone', timezone);
    },
  },
  computed: {
    filteredZones() {
      const { timezones, searchString, searchParameter } = this;
      if (searchString) {
        const lowerSearch = searchString.toLowerCase();
        return timezones.filter((zone) => {
          const value = zone[searchParameter.parameter];
          if (typeof value === 'number') {
            const hours = value / 60;
            return value.toString().includes(lowerSearch)
              || hours.toString().includes(lowerSearch);
          } if (Array.isArray(value)) {
            return value.some((country) => country.toLowerCase().includes(lowerSearch));
          }
          return zone[searchParameter.parameter].toLowerCase().includes(lowerSearch);
        });
      }
      return [];
    },
  },
});
</script>

<style lang="scss">
.autocomplete {
  position: relative;

  .search {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);

    .search-input {
      width: 250px;
    }

    .search-parameter {
      width: 150px;
    }
  }
  .search-results {
    position: absolute;
    left: 50%;
    top: 1.5rem;
    transform: translateX(-50%);
    height: 200px;
    width: 400px;
    overflow-x: hidden;
    overflow-y: auto;
    z-index: 3;
    background-color: white;

    .search-result {
      &:hover {
        background-color: aqua;
      }
    }
  }
}
</style>
