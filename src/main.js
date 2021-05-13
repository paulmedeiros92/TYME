import { createApp } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import App from './App.vue';
import router from './router';
import store from './store';

library.add(faTimesCircle);

createApp(App)
  .use(store)
  .use(router)
  .component('fa-icon', FontAwesomeIcon)
  .mount('#app');
