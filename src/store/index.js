import { createStore } from 'vuex';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import tz from 'dayjs/plugin/timezone';
import Cookies from 'js-cookie';
import * as cityTimezones from 'city-timezones';

dayjs.extend(utc);
dayjs.extend(tz);

export default createStore({
  state: {
    intervalId: -1,
    time: dayjs(),
    timezones: [],
  },
  mutations: {
    startTime(state) {
      state.intervalId = window.setInterval(() => {
        state.time = dayjs();
      }, 1000);
    },
    setDashboard(state, zoneArray) {
      state.timezones = zoneArray;
    },
    addTimezone(state, timezone) {
      const timezones = [...state.timezones, timezone];
      state.timezones = timezones;
      Cookies.set('timezones', JSON.stringify(timezones));
    },
    removeTimezone(state, timezone) {
      const timezones = state.timezones
        .filter((zone) => zone.timezone !== timezone);
      state.timezones = timezones;
      Cookies.set('timezones', JSON.stringify(timezones));
    },
  },
  actions: {
    startTimer({ commit }) {
      commit('startTime');
    },
    loadCookie({ commit }) {
      const cookie = Cookies.get('timezones') ? JSON.parse(Cookies.get('timezones')) : null;
      if (!cookie) {
        const defaultZones = [
          cityTimezones.lookupViaCity('Cairo')[0],
          cityTimezones.lookupViaCity('Amsterdam')[0],
          cityTimezones.lookupViaCity('Denver')[0],
        ];
        Cookies.set('timezones', JSON.stringify(defaultZones));
        commit(
          'setDashboard',
          defaultZones,
        );
      } else {
        commit('setDashboard', cookie);
      }
    },
    addZone({ commit }, timezone) {
      commit('addTimezone', timezone);
    },
    removeZone({ commit }, timezone) {
      commit('removeTimezone', timezone);
    },
  },
});
