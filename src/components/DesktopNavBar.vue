<template>
  <v-navigation-drawer
  color="primary"
  dark
  permanent
  expand-on-hover
  app>
    <v-list-item two-line class="px-2">
      <v-list-item-avatar>
        <Avatar :customer="user" color="white" />
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>{{user.name}}</v-list-item-title>
        <v-list-item-subtitle>
          {{user.email}}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-btn
      color="error"
      fab
      x-small
      @click="disconnect">
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link
      @click="$router.push({ name: 'Dashboard' })">
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('menu.dashboard')}}</v-list-item-title>
      </v-list-item>
      <v-list-item link
      @click="$router.push({ name: 'Customers' })">
        <v-list-item-icon>
          <v-icon>mdi-account-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('menu.clients')}}</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-folder</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('menu.projects')}}</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-web</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('menu.websites')}}</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-database</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('menu.database')}}</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-cloud-upload</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('menu.backups')}}</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-cash-multiple</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('menu.billing')}}</v-list-item-title>
      </v-list-item>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-account-cog</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('menu.useraccount')}}</v-list-item-title>
      </v-list-item>
    </v-list>
    <template v-slot:append>
    <v-list dense>
      <v-divider></v-divider>
      <v-list-item
      link
      v-on:click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-list-item-icon>
          <v-icon>{{drawer.darkOrWhite($vuetify.theme.dark)}}</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t(drawer.darkOrWhiteTxt($vuetify.theme.dark))}}</v-list-item-title>
      </v-list-item>
      <v-list-item
      link
      v-on:click="(($i18n.locale === 'en') ? $i18n.locale = 'fr' : $i18n.locale = 'en')">
        <v-list-item-icon
        v-html="flag[$i18n.locale]">
        </v-list-item-icon>
        <v-list-item-title>
          {{$i18n.messages[drawer.localLang($i18n.locale === 'en')].menu.switchLang}}
        </v-list-item-title>
      </v-list-item>
    </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';
import Avatar from './Avatar.vue';

export default Vue.extend({
  name: 'App',

  components: {
    Avatar,
  },

  data: () => ({
    drawer: {
      expand: true as boolean,
      darkOrWhite: (dark: boolean) => (dark ? 'mdi-white-balance-sunny' as string : 'mdi-weather-night' as string),
      darkOrWhiteTxt: (dark: boolean) => (dark ? 'menu.whiteTheme' as string : 'menu.darkTheme' as string),
      localLang: (en: boolean) => (en ? 'fr' as string : 'en' as string),
    },
    flag: {
      en: `<svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
        <rect y="85.331" style="fill:#F0F0F0;" width="512" height="341.337"/>
        <rect y="85.331" style="fill:#0052B4;" width="170.663" height="341.337"/>
        <rect x="341.337" y="85.331" style="fill:#D80027;" width="170.663" height="341.337"/>
      </svg>`,
      fr: `<svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512;" xml:space="preserve">
      <rect y="85.333" style="fill:#F0F0F0;" width="512" height="341.337"/>
      <polygon style="fill:#D80027;" points="288,85.33 224,85.33 224,223.996 0,223.996 0,287.996 224,287.996 224,426.662 288,426.662   288,287.996 512,287.996 512,223.996 288,223.996 "/>
      <g>
        <polygon style="fill:#0052B4;" points="393.785,315.358 512,381.034 512,315.358  "/>
        <polygon style="fill:#0052B4;" points="311.652,315.358 512,426.662 512,395.188 368.307,315.358  "/>
        <polygon style="fill:#0052B4;" points="458.634,426.662 311.652,344.998 311.652,426.662  "/>
      </g>
      <polygon style="fill:#F0F0F0;" points="311.652,315.358 512,426.662 512,395.188 368.307,315.358 "/>
      <polygon style="fill:#D80027;" points="311.652,315.358 512,426.662 512,395.188 368.307,315.358 "/>
      <g>
        <polygon style="fill:#0052B4;" points="90.341,315.356 0,365.546 0,315.356  "/>
        <polygon style="fill:#0052B4;" points="200.348,329.51 200.348,426.661 25.491,426.661  "/>
      </g>
      <polygon style="fill:#D80027;" points="143.693,315.358 0,395.188 0,426.662 0,426.662 200.348,315.358 "/>
      <g>
        <polygon style="fill:#0052B4;" points="118.215,196.634 0,130.958 0,196.634  "/>
        <polygon style="fill:#0052B4;" points="200.348,196.634 0,85.33 0,116.804 143.693,196.634  "/>
        <polygon style="fill:#0052B4;" points="53.366,85.33 200.348,166.994 200.348,85.33  "/>
      </g>
      <polygon style="fill:#F0F0F0;" points="200.348,196.634 0,85.33 0,116.804 143.693,196.634 "/>
      <polygon style="fill:#D80027;" points="200.348,196.634 0,85.33 0,116.804 143.693,196.634 "/>
      <g>
        <polygon style="fill:#0052B4;" points="421.659,196.636 512,146.446 512,196.636  "/>
        <polygon style="fill:#0052B4;" points="311.652,182.482 311.652,85.331 486.509,85.331  "/>
      </g>
      <polygon style="fill:#D80027;" points="368.307,196.634 512,116.804 512,85.33 512,85.33 311.652,196.634 "/>
    </svg>`,
    },
    user: {} as object,
  }),

  methods: {
    disconnect() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'Login' });
    },
    getUser() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.$store.state.API}/user/me`, true);
      const token = localStorage.getItem('token');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== xhr.DONE) return;
        if (xhr.status === 200) {
          this.user = JSON.parse(xhr.response).user;
        }
        if (xhr.status === 401) {
          this.disconnect();
        }
      };
      xhr.send();
    },
  },

  computed: {
  },

  mounted() {
    this.getUser();
  },
});
</script>

<style lang="scss">
svg {
  height: 24px;
}
</style>
