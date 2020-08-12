<template>
  <v-btn icon :color="databaseExist" smal class="ma-2">
    <v-progress-circular
      v-if="isLoading"
      indeterminate
      color="grey"
    ></v-progress-circular>
    <v-icon dark v-else>mdi-database</v-icon>
  </v-btn>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import Vue, { PropType } from 'vue';

export default Vue.extend({
  name: 'DatabaseButton',

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
    database: [] as any,
    isLoading: true as boolean,
  }),

  methods: {
    getProjectDatabase(projectId:number) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.$store.state.API}/database?projectId=${projectId}`, true);
      const token = localStorage.getItem('token');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== xhr.DONE) return;
        if (xhr.status === 200) {
          this.database = JSON.parse(xhr.response);
          this.isLoading = false as boolean;
        }
      };
      xhr.send();
    },
  },

  computed: {
    databaseExist() {
      if (this.database.length === 0) {
        return 'grey';
      }
      return 'black';
    },
  },

  created() {
    this.getProjectDatabase(this.projectId);
  },
});
</script>

<style lang="scss">
</style>
