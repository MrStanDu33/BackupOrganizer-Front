<template>
  <v-app>
    <DesktopNavBar
    v-if=" $route.meta.menu && !DisplayMobile"/>
    <MobileNavBar
    v-if=" $route.meta.menu && DisplayMobile"/>
    <v-main fill-height fluid >
      <transition
      name="scroll-y-transition"
      mode="out-in">
        <router-view class="ma-sm-16"></router-view>
      </transition>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { isMobileOnly } from 'mobile-device-detect';
import DesktopNavBar from './components/DesktopNavBar.vue';
import MobileNavBar from './components/MobileNavBar.vue';

export default Vue.extend({
  name: 'App',

  components: {
    DesktopNavBar,
    MobileNavBar,
  },

  data: () => ({
    //
  }),

  computed: {
    DisplayMobile() { return isMobileOnly; },
  },

  created() {
  },
});
</script>

<style lang="scss">
</style>
