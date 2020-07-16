import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import { getModule } from 'vuex-module-decorators';

import Store from '@/store';
import LanguageModule from '@/store/modules/Language';
import Routes from './routes';
import i18n from '../plugins/i18n';

Vue.use(VueRouter);

const Router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: Routes,
});

Router.beforeEach((to, from, next) => {
  const Language = getModule(LanguageModule, Store);
  if (Language.language && Language.language !== i18n.locale) {
    i18n.locale = Language.language;
    next();
  } else if (!Language.language) {
    Store.dispatch('Language/setLanguage', navigator.languages)
      .then(() => {
        i18n.locale = Language.language;
        next();
      });
  } else {
    next();
  }

  const token = localStorage.getItem('token');
  if (!token) {
    Router.push({ name: 'Login' });
  }
});

export default Router;
