import Vue from 'vue';
import Vuex, { Module } from 'vuex';
import Language from '@/store/modules/Language';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    API: 'http://backup-organizer.localhost/api/v1',
  },
  modules: {
    Language,
  },
});
