<template>
  <div class="search">
    <label class="title" for="add-clock">Add a clock!</label>
    <div class="autocomplete">
      <div class="search-form">
        <input
          class="search-input"
          :class="{ active: filteredZones.length > 0 }"
          type="search"
          v-model="searchString"
        />
        <select
          class="search-parameter"
          :class="{ active: filteredZones.length > 0 }"
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
    <button
      class="button"
      @click="addTimezone(selectedTime)"
    >
      ADD
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
.search {
  margin-top: 3rem;

  .title {
    font-size: 2rem;
    font-weight: 600;
  }

  .button {
    background-color: $color-background;
    border: solid 1px $color-close;
    border-radius: .5rem;
    box-shadow: 2px 2px $color-close;
    font-size: 2rem;
    font-weight: 600;
    color: $color-parameters;

    &:active {
      box-shadow: -2px -2px $color-shadow;
      border: solid 1px $color-shadow;
      color: $color-close;
    }

    &:focus {
      outline: none;
    }
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
      width: 250px;
      background-color: $color-input;
      border: solid 1px #d9b08c;
      border-radius: .5rem 0 0 .5rem;
      font-size: 1rem;
      color: $color-background;
      padding: .4rem;

      &.active {
        border-radius: .5rem 0 0 0;
      }

      &:focus {
        outline: none;
      }
    }

    .search-parameter {
      width: 150px;
      border: none;
      border-radius: 0 .5rem .5rem 0;
      background-color: $color-parameters;
      font-size: 1rem;
      color: $color-shadow;
      padding: .4rem;

      &.active {
        border-radius: 0 .5rem 0 0;
      }    border: solid 1px $color-close;

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
    border-radius: 0 0 .5rem .5rem;

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
