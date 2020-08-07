<template>
  <v-main>
    <v-card>
    <v-toolbar flat color="primary" dark>
        {{$t('createCustomer.createTitle')}}
        <v-spacer></v-spacer>
        <v-btn text @click="backToCustomers">
          <v-icon left>
            mdi-arrow-left-bold-circle-outline
          </v-icon>
          Retour
        </v-btn>
    </v-toolbar>
      <v-card flat>
        <v-card-text>
          <p>
            <CustomerForm :createMode="true" :customer="customer"/>
          </p>
        </v-card-text>
      </v-card>
  </v-card>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue';
import CustomerForm from '../components/CustomerForm.vue';

export default Vue.extend({
  name: 'CustomerDetails',

  data: () => ({
    customer: {
      name: '' as string,
      siret: null,
      address_street_number: '',
      address_street_name: '' as string,
      address_zip_code: '' as string,
      address_city: '' as string,
      address_country: '' as string,
      address_billing: null,
      tva_number: null,
      website: '' as string,
      source: '' as string,
      referent_name: '' as string,
      referent_email: '' as string,
      referent_number: '' as string,
    },
  }),

  components: {
    CustomerForm,
  },

  methods: {
    backToCustomers() {
      this.$router.push({ name: 'Customers' });
    },
  },

  computed: {
  },

});
</script>

<style lang="scss">
</style>
