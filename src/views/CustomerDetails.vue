<template>
  <v-card>
    <v-toolbar flat color="primary" dark>
        <Avatar :customer="customer" class="mr-4"/>
        {{$t('customerDetails.profileof')}} {{customer.name}}
        <v-spacer></v-spacer>
        <v-btn text @click="backToCustomers">
          <v-icon left>
            mdi-arrow-left-bold-circle-outline
          </v-icon>
          Retour
        </v-btn>
    </v-toolbar>
    <v-tabs
    :vertical="!DisplayMobile"
    :centered="DisplayMobile"
    :grow="DisplayMobile"
    >
      <v-tab :class="FlexMobile">
        <v-icon left>mdi-account-details</v-icon>
        {{$t('customerDetails.details')}}
      </v-tab>
      <v-tab :class="FlexMobile">
        <v-icon left>mdi-folder</v-icon>
        {{$t('customerDetails.projects')}}
      </v-tab>
      <v-tab :class="FlexMobile">
        <v-icon left>mdi-cash-multiple</v-icon>
        {{$t('customerDetails.bills')}}
      </v-tab>

      <v-tab-item >
        <v-card>
          <v-card-text>
              <CustomerForm :customer="customer" />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <CustomerProjects />
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <p>
              In progress
            </p>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { isMobileOnly } from 'mobile-device-detect';
import CustomerForm from '../components/CustomerForm.vue';
import CustomerProjects from '../components/CustomerProjects.vue';
import Avatar from '../components/Avatar.vue';

export default Vue.extend({
  name: 'CustomerDetails',

  components: {
    CustomerForm,
    CustomerProjects,
    Avatar,
  },

  methods: {
    getCustomerDetails() {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `${this.$store.state.API}/customer/${this.$route.params.customerId}`, true);
      const token = localStorage.getItem('token');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== xhr.DONE) return;
        if (xhr.status === 200) {
          this.customer = JSON.parse(xhr.response).customer;
        }
      };
      xhr.send();
    },
    backToCustomers() {
      this.$router.push({ name: 'Customers' });
    },
  },

  beforeMount() {
    this.getCustomerDetails();
  },

  computed: {
    DisplayMobile() { return isMobileOnly; },
    FlexMobile() {
      if (this.DisplayMobile) {
        return 'd-flex flex-column';
      }
      return '';
    },
  },

  data: () => ({
    customer: {},
  }),
});
</script>

<style lang="scss">
</style>
