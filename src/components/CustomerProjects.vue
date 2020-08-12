<template>
  <v-card outlined class="mb-4">
    <v-card-title>
        <v-icon class="mr-2">
          mdi-folder
        </v-icon>
        {{$t('customerProjects.title')}}
      </v-card-title>
    <v-data-table
      :headers="headers"
      :items="projects"
      :loading="isLoading"
      hide-default-footer
      item-key="id"
      class="rounded"
      calculate-widths
    >
      <template v-slot:item="{ item }">
          <tr class="">
            <td class="">
              {{item.name}}
            </td>
            <td class="">
              <WebsiteButton :projectId="item.id"/>
            </td>
            <td class="">
              <DatabaseButton :projectId="item.id"/>
            </td>
            <td>
              <v-btn
              @click="routeToProjectDetails(item)"
              class="ma-2 white--text"
              small
              color="grey"
              icon>
                <v-icon dark>mdi-eye</v-icon>
              </v-btn>
            </td>
          </tr>
      </template>
    </v-data-table>
  </v-card>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import Vue, { PropType } from 'vue';
import WebsiteButton from './WebsiteButton.vue';
import DatabaseButton from './DatabaseButton.vue';

export default Vue.extend({
  name: 'CustomerProjects',

  props: {
  },

  watch: {
  },

  components: {
    WebsiteButton,
    DatabaseButton,
  },

  data: () => ({
    projects: [] as object[],
    isLoading: false as boolean,
  }),

  methods: {
    getCustomerProjects() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.$store.state.API}/project?customerId=${this.$route.params.customerId}`, true);
      const token = localStorage.getItem('token');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== xhr.DONE) return;
        if (xhr.status === 200) {
          this.projects = JSON.parse(xhr.response);
        }
      };
      xhr.send();
    },

    routeToProjectDetails(item:any) {
      this.$route.params.customerId = item.customerId as string;
      this.$route.params.projectId = item.id as string;
      this.$router.push({ name: 'projectDetails' });
    },
  },

  computed: {
    headers() {
      return [
        {
          text: this.$t('customerProjects.dataHeader.name'),
          value: 'name',
        },
        {
          text: this.$t('customerProjects.dataHeader.website'),
          sortable: false,
          width: 200,
        },
        {
          text: this.$t('customerProjects.dataHeader.database'),
          sortable: false,
          width: 200,
        },
        {
          text: '',
          value: 'view',
          sortable: false,
          width: 50,
        },
      ];
    },
  },

  created() {
    this.getCustomerProjects();
  },
});

</script>

<style lang="scss">
</style>
