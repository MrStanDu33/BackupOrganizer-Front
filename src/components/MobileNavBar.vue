<template>
  <v-bottom-navigation
    color="blue"
    fixed
  >
    <v-btn @click="$router.push({ name: 'Dashboard' })">
      <span v-if="isXs">{{$t('menu.dashboard')}}</span>
      <v-icon>mdi-view-dashboard</v-icon>
    </v-btn>

    <v-btn @click="$router.push({ name: 'Customers' })">
      <span v-if="isXs">{{$t('menu.clients')}}</span>
      <v-icon>mdi-account-multiple</v-icon>
    </v-btn>

    <v-btn>
      <span v-if="isXs">{{$t('menu.backups')}}</span>
      <v-icon>mdi-cloud-upload</v-icon>
    </v-btn>

    <v-btn>
      <span v-if="isXs">{{$t('menu.billing')}}</span>
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
    isXs: false,
  }),

  methods: {
    onResize() {
      this.isXs = window.innerWidth > 400;
    },
  },

  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize, { passive: true });
  },

});
</script>

<style lang="scss">
</style>
