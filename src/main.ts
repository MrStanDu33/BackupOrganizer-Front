import Vue from 'vue';
import i18n from '@/plugins/i18n';
import store from '@/store';
import router from '@/router';
import App from './App.vue';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount('#app');
