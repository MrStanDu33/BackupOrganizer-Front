<template>
  <v-container>
    <h1 class="text-center mb-12">
      <v-icon size="40">mdi-account-multiple</v-icon>
      {{$t('customers.customers')}}
    </h1>
      <v-data-table
      :headers="headers"
      :items="completeCustomers"
      :search="search"
      :loading="isLoading"
      hide-default-footer
      item-key="id"
      class="elevation-3 rounded ma-lg-16"
      calculate-widths
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
            <td class="text-end">
              <v-progress-circular
                v-if="item.projectNumber==='...'"
                indeterminate
                color="grey"
              ></v-progress-circular>
              <span v-else>
              {{item.projectNumber}}
              </span>
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

  watch: {
    customers(val) {
      val.forEach((customer:any) => {
        this.getCustomerProjects(customer);
      });
    },
  },

  data: () => ({
    customers: [] as any,
    customersProjects: [] as any,
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
    getCustomerProjects(customer:any) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.$store.state.API}/project?customerId=${customer.id}`, true);
      const token = localStorage.getItem('token');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== xhr.DONE) return;
        if (xhr.status === 200) {
          // eslint-disable-next-line
          const projectNumber = JSON.parse(xhr.response).length;
          this.customersProjects.push({ id: customer.id, projectNumber });
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
    completeCustomers() {
      const customersContainer = {} as any;
      for (let i = 0; i < this.customers.length; i += 1) {
        const customer = this.customers[i];
        customersContainer[customer.id] = customer;
        customersContainer[customer.id].projectNumber = '...';
      }
      for (let i = 0; i < this.customersProjects.length; i += 1) {
        const data = this.customersProjects[i];
        customersContainer[data.id].projectNumber = data.projectNumber;
      }
      return Object.values(customersContainer);
    },
    headers() {
      return [
        {
          text: this.$t('customers.logo'),
          sortable: false,
          value: '',
          width: 50,
        },
        {
          text: this.$t('customers.name'),
          value: 'name',
        },
        {
          text: this.$t('customers.projects'),
          value: 'projectNumber',
          width: 100,
          align: 'end',
        },
        {
          text: this.$t('customers.referent'),
          value: 'referent_name',
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
});
</script>

<style lang="scss">
</style>
