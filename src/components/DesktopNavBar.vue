<template>
  <v-navigation-drawer
  color="primary"
  dark
  permanent
  expand-on-hover
  app>
    <v-list-item two-line class="px-2">
      <v-list-item-avatar>
        <img src="https://randomuser.me/api/portraits/women/81.jpg">
      </v-list-item-avatar>

      <v-list-item-content>
        <v-list-item-title>Jane Smith</v-list-item-title>
        <v-list-item-subtitle>{{$t('menu.logout')}}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item link>
        <v-list-item-icon>
          <v-icon>mdi-view-dashboard</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('menu.dashboard')}}</v-list-item-title>
      </v-list-item>
      <v-list-item link>
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
      <v-list-item
      link
      v-on:click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-list-item-icon>
          <v-icon>mdi-theme-light-dark</v-icon>
        </v-list-item-icon>
        <v-list-item-title>{{$t('menu.theme')}}</v-list-item-title>
      </v-list-item>
      <v-menu
      transition="slide-x-transition"
      bottom
      right
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          block
        >
          {{$i18n.locale}}
        </v-btn>
      </template>

      <v-list>
        <v-list-item
        class="blue"
          color="primary"
          dark
          v-for="(item, i) in $i18n.availableLocales"
          :key="i"
          @click="$i18n.locale = item"
        >
          <v-list-item-title
          >{{ item }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </v-list>
    </template>
  </v-navigation-drawer>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),

});
</script>

<style lang="scss">
</style>
