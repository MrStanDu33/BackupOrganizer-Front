import Vue from 'vue';
import i18n from '@/plugins/i18n';
import store from '@/store';
import router from '@/router';
import App from './App.vue';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
