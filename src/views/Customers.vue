<template>
  <v-container>
    <h1 class="text-center mb-12">
      <v-icon size="40">mdi-account-multiple</v-icon>
      {{$t('customers.customers')}}
    </h1>
      <v-data-table
      :headers="headers"
      :items="customers"
      :search="search"
      :loading="isLoading"
      hide-default-footer
      item-key="id"
      class="elevation-3 rounded"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-btn
          text
          color="success"
          class="ma-2"
          @click="$router.push({ name: 'createCustomer' });"
          >
            <v-icon left>mdi-account-plus</v-icon>
            {{$t('customers.add')}}
          </v-btn>
        </v-toolbar>
      </template>
      <template v-slot:item="{ item }">
          <tr class="">
            <td class="">
              <Avatar :customer="item" color="dark" />
            </td>
            <td class="">
              {{item.name}}
            </td>
            <td class="">
              {{item.id}}
            </td>
            <td class="">
              {{item.referent_name}}
            </td>
            <td>
              <v-btn
              @click="goToCustomerView(item.id)"
              class="'ma-2 white--text"
              small
              color="grey"
              icon>
                <v-icon dark>mdi-eye</v-icon>
              </v-btn>
            </td>
          </tr>
      </template>
    </v-data-table>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import Avatar from '../components/Avatar.vue';

export default Vue.extend({
  name: 'Customer',

  components: {
    Avatar,
  },

  data: () => ({
    customers: [] as any,
    search: null,
    isLoading: true as boolean,
  }),

  methods: {
    getCustomers() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.$store.state.API}/customer`, true);
      const token = localStorage.getItem('token');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== xhr.DONE) return;
        if (xhr.status === 200) {
          this.customers = JSON.parse(xhr.response);
          this.isLoading = false;
        }
      };
      xhr.send();
    },
    goToCustomerView(customerId:string) {
      this.$route.params.customerId = customerId as string;
      this.$router.push({ name: 'customerDetails' });
    },
  },

  mounted() {
    this.getCustomers();
  },

  computed: {
    emptyCustomers() {
      if (this.customers === null) {
        return true as boolean;
      }
      return false as boolean;
    },
    headers() {
      return [
        {
          text: this.$t('customers.logo'),
          sortable: false,
          value: '',
        },
        {
          text: this.$t('customers.name'),
          value: 'name',
        },
        {
          text: this.$t('customers.projects'),
          value: 'id',
        },
        {
          text: this.$t('customers.referent'),
          value: 'referent_name',
        },
        {
          text: '',
          value: 'view',
          sortable: false,
        },
      ];
    },
  },
});
</script>

<style lang="scss">
</style>
