<template>
  <v-btn icon :color="websiteStatus" smal class="ma-2 white--text">
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="grey"
    ></v-progress-circular>
    <v-icon dark v-else>mdi-web</v-icon>
  </v-btn>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'WebsiteButton',

  props: {
    projectId: {
      type: Number as PropType<number>,
      required: true as boolean,
    },
  },

  watch: {
  },

  components: {
  },

  data: () => ({
    website: [] as any,
    isLoading: true as boolean,
  }),

  methods: {
    getProjectWebsite(projectId:number) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.$store.state.API}/website?projectId=${projectId}`, true);
      const token = localStorage.getItem('token');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== xhr.DONE) return;
        if (xhr.status === 200) {
          this.website = JSON.parse(xhr.response);
          this.isLoading = false as boolean;
        }
      };
      xhr.send();
    },
  },

  computed: {
    websiteStatus() {
      if (this.website.length === 0) {
        return 'grey';
      }
      if (this.website[0].status === 1) {
        return 'green';
      }
      if (this.website[0].status === 0) {
        return 'error';
      }
      return 'grey';
    },
  },

  created() {
    this.getProjectWebsite(this.projectId);
  },
});
</script>

<style lang="scss">
</style>
