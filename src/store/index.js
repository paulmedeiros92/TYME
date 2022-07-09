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
    timezones: {},
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
      const timezones = { ...state.timezones };
      timezones[timezone.city] = timezone;
      state.timezones = timezones;
      Cookies.set('timezones', JSON.stringify(timezones));
    },
    removeTimezone(state, timezone) {
      const { timezones } = state;
      const tmp = timezones;
      delete tmp[timezone.city];
      state.timezones = tmp;
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
        const cairo = cityTimezones.lookupViaCity('Cairo')[0];
        const israel = cityTimezones.lookupViaCity('Jerusalem')[0];
        const denver = cityTimezones.lookupViaCity('Denver')[0];
        const defaultZones = {};
        defaultZones[cairo.city] = cairo;
        defaultZones[israel.city] = israel;
        defaultZones[denver.city] = denver;
        Cookies.set('timezones', JSON.stringify(defaultZones));
        commit('setDashboard', defaultZones);
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
