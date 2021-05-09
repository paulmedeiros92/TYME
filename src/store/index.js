import { createStore } from 'vuex';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

export default createStore({
  state: {
    intervalId: -1,
    time: dayjs(),
  },
  mutations: {
    startTime(state) {
      state.intervalId = window.setInterval(() => {
        state.time = dayjs();
      }, 1000);
    },
  },
  actions: {
    startTimer({ commit }) {
      commit('startTime');
    },
  },
});
