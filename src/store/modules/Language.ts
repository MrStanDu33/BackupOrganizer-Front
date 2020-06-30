import Vue from 'vue';
import VueLocalStorage from 'vue-localstorage';
import {
  Module, VuexModule, Mutation, Action,
} from 'vuex-module-decorators';

import Languages from '../../translations';

declare module 'vue/types/vue' {
  interface VueConstructor {
    localStorage: any
  }
}

Vue.use(VueLocalStorage);

const supportedLanguages = Object.getOwnPropertyNames(Languages);

@Module({ namespaced: true, name: 'Language' })
export default class Language extends VuexModule {
  language = Vue.localStorage.get('language');

  @Mutation
  SET_LANGUAGE(lang: string) {
    Vue.localStorage.set('language', lang);
    this.language = lang;
  }

  @Action({ rawError: true, commit: 'SET_LANGUAGE' })
  // eslint-disable-next-line class-methods-use-this
  setLanguage(languages: any) {
    if (typeof languages === 'string') return languages;

    const language = supportedLanguages.find((sl) => languages.find((l: any) => (l.split(new RegExp(sl, 'gi')).length - 1 > 0 ? sl : null)));
    return language;
  }
}
