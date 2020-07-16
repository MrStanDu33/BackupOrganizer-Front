<template>
  <v-bottom-navigation
    color="blue"
    hide-on-scroll
    absolute
  >
    <v-btn>
      <span>{{$t('menu.dashboard')}}</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-btn>
      <span>{{$t('menu.clients')}}</span>
      <v-icon>mdi-account-multiple</v-icon>
    </v-btn>

    <v-btn>
      <span>{{$t('menu.backups')}}</span>
      <v-icon>mdi-cloud-upload</v-icon>
    </v-btn>

    <v-btn>
      <span>{{$t('menu.billing')}}</span>
      <v-icon>mdi-cash-multiple</v-icon>
    </v-btn>

  </v-bottom-navigation>
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
