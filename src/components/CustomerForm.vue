<template>
  <v-container>
    <v-alert
      v-if="customerDeleted"
      outlined
      type="success"
      text
    >
      {{$t('customerForm.messages.other.deletedCustomerMessagePart1')}}
      {{customerInfo.name}}
      {{$t('customerForm.messages.other.deletedCustomerMessagePart2')}}
    </v-alert>
    <v-card outlined class="mb-4" v-if="!customerDeleted">
      <v-card-title>
        <v-icon class="mr-2">
          mdi-card-account-details
        </v-icon>
        {{$t('customerForm.title.identification')}}
      </v-card-title>
      <v-card-text>
        <v-dialog
        v-model="warning.display"
        max-width="600"
        >
          <v-alert
          border="right"
          colored-border
          type="error"
          elevation="2"
          >
          <v-container v-if="warning.type === 'autocomplete'">
            {{$t('customerForm.messages.warning.autocomplete')}}
            <ul>
              <li v-for="item in warning.existingInformation" :key="item">
                {{$t(`customerForm.formLabel.${item}`)}}
              </li>
            </ul>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="clearWarningAutocomplete();">
                {{$t('customerForm.button.cancel')}}
              </v-btn>
              <v-btn class="success" @click="clearWarningAutocomplete(); autocomplete();">
                {{$t('customerForm.button.continue')}}
              </v-btn>
            </v-card-actions>
          </v-container>
          <v-container v-if="warning.type === 'deleteCustomer'">
            {{$t('customerForm.messages.warning.deleteCustomer')}}
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text @click="clearWarningDeleteCustomer()">
                {{$t('customerForm.button.cancel')}}
              </v-btn>
              <v-btn class="success" @click="clearWarningDeleteCustomer(); deleteCustomer();">
                {{$t('customerForm.button.continue')}}
              </v-btn>
            </v-card-actions>
          </v-container>
          </v-alert>
        </v-dialog>
        <v-row dense justify="space-around">
          <v-col lg="3" md="4" sm="12">
          <v-text-field
            filled
            :label="$t('customerForm.formLabel.siret')"
            v-model="customerInfo.siret"
            :value="customerInfo.siret ? customerInfo.siret : ''"
            counter
            maxlength="14"
            loading="siret.loading"
            id="siret"
            :error="formError.siret.error"
            :error-messages="formError.siret.errorMessage"
          >
          </v-text-field>
          </v-col>
          <v-col>
          <v-btn class="success my-2" :disabled="!siret.button" @click="checkAutocomplete">
            {{$t('customerForm.button.autocomplete')}}
          </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card outlined class="mb-4" v-if="!customerDeleted">
      <v-card-title>
        <v-icon class="mr-2">
          mdi-domain
        </v-icon>
        {{$t('customerForm.title.company')}}
      </v-card-title>
      <v-card-text>

        <v-row dense>
          <v-col lg="6" md="8" sm="12">
          <v-text-field
            filled
            :label="$t('customerForm.formLabel.name')"
            v-model="customerInfo.name"
            :error="formError.name.error"
            :error-messages="formError.name.errorMessage"
          >
          </v-text-field>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col lg="2" md="3" sm="4">
          <v-text-field
            filled
            :label="$t('customerForm.formLabel.streetNumber')"
            v-model="customerInfo.address_street_number"
          >
          </v-text-field>
          </v-col>
          <v-col lg="10" md="9" sm="8">
          <v-text-field
            filled
            :label="$t('customerForm.formLabel.streetName')"
            v-model="customerInfo.address_street_name"
          >
          </v-text-field>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col lg="1" md="2" sm="3">
          <v-text-field
            filled
            :label="$t('customerForm.formLabel.zip')"
            v-model="customerInfo.address_zip_code"
          >
          </v-text-field>
          </v-col>
          <v-col lg="6" md="6" sm="9">
          <v-text-field
            filled
            :label="$t('customerForm.formLabel.city')"
            v-model="customerInfo.address_city"
          >
          </v-text-field>
          </v-col>
          <v-col lg="5" md="4" sm="12">
          <v-text-field
            filled
            :label="$t('customerForm.formLabel.country')"
            v-model="customerInfo.address_country"
          >
          </v-text-field>
          </v-col>
        </v-row>

        <v-row dense>
          <v-col lg="9" md="8" sm="12">
          <v-text-field
            filled
            :label="$t('customerForm.formLabel.billingAddress')"
            v-model="customerInfo.address_billing"
            :placeholder="$t('customerForm.formLabel.placeholderBilling')"
          >
          </v-text-field>
          </v-col>
          <v-col lg="3" md="4" sm="12">
          <v-text-field
            filled
            :label="$t('customerForm.formLabel.tva')"
            v-model="customerInfo.tva_number"
            counter
            maxlength="13"
            :error="formError.tva.error"
            :error-messages="formError.tva.errorMessage"
          >
          </v-text-field>
          </v-col>
        </v-row>

      </v-card-text>
    </v-card>

    <v-card outlined class="mb-4" v-if="!customerDeleted">
      <v-card-title>
        <v-icon class="mr-2">
          mdi-card-account-phone
        </v-icon>
        {{$t('customerForm.title.contact')}}
      </v-card-title>
      <v-card-text>
        <v-row dense>
          <v-col lg="6" md="6" sm="12">
          <v-text-field
            filled
            :label="$t('customerForm.formLabel.referentName')"
            v-model="customerInfo.referent_name"
          >
          </v-text-field>
          </v-col>
          <v-col lg="6" md="6" sm="12">
          <v-text-field
            filled
            :label="$t('customerForm.formLabel.referentEmail')"
            v-model="customerInfo.referent_email"
            :error="formError.email.error"
            :error-messages="formError.email.errorMessage"
          >
          </v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col lg="2" md="2" sm="4">
          <v-select
            filled
            :selected="countriesCode.default"
            :label="$t('customerForm.formLabel.referentNumberIndicative')"
            :items="sortedCountriesCode"
            v-model="customerInfo.referent_number_indicative"
            item-value="code"
          >
          <template slot="selection" slot-scope="data">
            {{ data.item.code }}
          </template>
          <template slot="item" slot-scope="data">
            {{ data.item.name }} <span class="text--secondary">({{ data.item.code }})</span>
          </template>
          </v-select>
          </v-col>
          <v-col lg="4" md="4" sm="8">
          <v-text-field
            filled
            :label="$t('customerForm.formLabel.referentNumber')"
            v-model="customerInfo.referent_number_value"
            :error="formError.phone.error"
            :error-messages="formError.phone.errorMessage"
          >
          </v-text-field>
          </v-col>
          <v-col lg="6" md="6" sm="12">
          <v-text-field
            filled
            :label="$t('customerForm.formLabel.website')"
            v-model="customerInfo.website"
          >
          </v-text-field>
          </v-col>
        </v-row>
        <v-row dense>
          <v-col lg="6" md="6" sm="12">
          <v-text-field
            filled
            :label="$t('customerForm.formLabel.source')"
            v-model="customerInfo.source"
          >
          </v-text-field>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-card outlined class="mb-4" v-if="!customerDeleted">
      <v-card-title>
        <v-icon class="mr-2">
          mdi-gesture-double-tap
        </v-icon>
        {{$t('customerForm.title.actions')}}
      </v-card-title>
      <v-card-text>
        <v-btn class="mr-4 mb-4" @click="checkCustomerBeforeSave('save')" v-if="!createMode">
          <v-icon left>
            mdi-content-save
          </v-icon>
          {{$t('customerForm.button.save')}}
        </v-btn>
        <v-btn class="error mb-4" @click="warningDeleteCustomer()" v-if="!createMode">
          <v-icon left>
            mdi-delete
          </v-icon>
          {{$t('customerForm.button.delete')}}
        </v-btn>
        <v-btn class="mr-4 mb-4 success" @click="checkCustomerBeforeSave('push')" v-if="createMode">
          <v-icon left>
            mdi-account-plus
          </v-icon>
          {{$t('customerForm.button.create')}}
        </v-btn>
      </v-card-text>
      <v-snackbar
      timeout="3000"
      color="success"
      v-model="successMessage.display"
      >
      <v-icon>mdi-account-check</v-icon>
      {{$t(`customerForm.messages.success.${successMessage.message}`)}}
      </v-snackbar>
    </v-card>
  </v-container>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import Vue, { PropType } from 'vue';
// eslint-disable-next-line no-unused-vars
import { TranslateResult } from 'vue-i18n';
import countriesCode from '../assets/countriesCode';

export default Vue.extend({
  name: 'CustomerForm',

  props: {
    customer: {
      type: Object as PropType<any>,
      required: false as boolean,
    },
    createMode: {
      type: Boolean as PropType<boolean>,
      required: false as boolean,
      default: false as boolean,
    },
  },

  components: {
  },

  watch: {
    customer(val) {
      this.customerInfo = val;
      this.referentNumberIndicative();
    },
  },

  data: () => ({
    countriesCode,
    customerInfo: {} as any,
    customerDeleted: false as boolean,

    siret: {
      loading: false as boolean,
      button: false as boolean,
      info: {} as any,
    },

    warning: {
      display: false as boolean,
      type: '' as string,
      existingInformation: [] as string[],
    },

    successMessage: {
      display: false as boolean,
      message: '' as string,
    },

    formError: {
      siret: {
        error: false as boolean,
        errorMessage: '' as TranslateResult,
      },
      name: {
        error: false as boolean,
        errorMessage: '' as TranslateResult,
      },
      tva: {
        error: false as boolean,
        errorMessage: '' as TranslateResult,
      },
      phone: {
        error: false as boolean,
        errorMessage: '' as TranslateResult,
      },
      email: {
        error: false as boolean,
        errorMessage: '' as TranslateResult,
      },
      webiste: {
        error: false as boolean,
        errorMessage: '' as TranslateResult,
      },
    },
  }),

  methods: {
    // XHR REQUESTS
    getSiretInfo(siret:number) {
      this.siret.loading = true as boolean;
      const xhr = new XMLHttpRequest();
      xhr.open('GET', `https://api.insee.fr/entreprises/sirene/V3/siret/${siret}`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', 'Bearer 936cc867-9711-3b08-b5b2-4c09df439eea');
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== xhr.DONE) return;
        if (xhr.status === 200) {
          this.resetSiretError();
          this.siret.button = true as boolean;
          this.siret.info = JSON.parse(xhr.response).etablissement;
          this.siret.loading = false as boolean;
        }
        if (xhr.status === 400) {
          this.errorSiret('format');
        }
        if (xhr.status === 404) {
          this.errorSiret('invalid');
        }
      };
      xhr.send();
    },

    saveCustomer() {
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', `${this.$store.state.API}/customer/${this.customerInfo.id}`, true);
      const token = localStorage.getItem('token');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== xhr.DONE) return;
        if (xhr.status === 200) {
          this.successMessage.display = true as boolean;
          this.successMessage.message = 'savedCustomer' as string;
        }
        if (xhr.status === 409) {
          const response = JSON.parse(xhr.response).errors.conflict;
          if (response === 'A customer already exist with given siret.') {
            this.siretErrorConflict();
          }
        }
      };
      const customer = JSON.stringify(this.customerInfo);
      xhr.send(customer);
    },

    pushCustomer() {
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.$store.state.API}/customer`, true);
      const token = localStorage.getItem('token');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== xhr.DONE) return;
        if (xhr.status === 201) {
          this.successMessage.display = true as boolean;
          this.successMessage.message = 'pushCustomer' as string;
          window.setTimeout(() => {
            this.$route.params.customerId = JSON.parse(xhr.response).customer.id as string;
            this.$router.push({ name: 'customerDetails' });
          }, 2000);
        }
        if (xhr.status === 409) {
          const response = JSON.parse(xhr.response).errors.conflict;
          if (response === 'A customer already exist with given siret.') {
            this.siretErrorConflict();
          }
        }
      };
      const customer = JSON.stringify(this.customerInfo);
      xhr.send(customer);
    },

    deleteCustomer() {
      const xhr = new XMLHttpRequest();
      xhr.open('DELETE', `${this.$store.state.API}/customer/${this.customerInfo.id}`, true);
      const token = localStorage.getItem('token');
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== xhr.DONE) return;
        if (xhr.status === 200) {
          this.customerDeleted = true as boolean;
          window.setTimeout(() => { this.$router.push({ name: 'Customers' }); }, 3000);
        }
        if (xhr.status === 404) {
          Error(this.$t('customerForm.messages.other.problemEncounterer') as string);
        }
      };
      const customer = JSON.stringify(this.customerInfo);
      xhr.send(customer);
    },

    // SIRET
    errorSiret(error:string) {
      this.siret.loading = false as boolean;
      this.siret.button = false as boolean;
      this.formError.siret.error = true as boolean;
      this.siret.info = {} as object;
      this.formError.siret.errorMessage = this.$t(`customerForm.formError.siret.${error}`) as string;
    },

    checkSiret(value:string) {
      this.siret.loading = true;
      if (value.length === 14) {
        this.getSiretInfo(parseInt(value, 10));
      } else {
        this.resetSiretError();
        this.siret.button = false as boolean;
        this.siret.info = {} as object;
      }
    },

    // AUTOCOMPLETE
    checkAutocomplete() {
      if (this.customerInfo.name.length > 1) {
        this.warning.existingInformation.push('name');
      }
      if (this.customerInfo.address_street_number.length > 1) {
        this.warning.existingInformation.push('streetNumber');
      }
      if (this.customerInfo.address_street_name.length > 1) {
        this.warning.existingInformation.push('streetName');
      }
      if (this.customerInfo.address_zip_code.length > 1) {
        this.warning.existingInformation.push('zip');
      }
      if (this.customerInfo.address_city.length > 1) {
        this.warning.existingInformation.push('city');
      }
      if (this.customerInfo.address_country.length > 1) {
        this.warning.existingInformation.push('country');
      }
      if (this.warning.existingInformation.length > 0) {
        this.warningAutocomplete();
      } else {
        this.autocomplete();
      }
    },

    autocomplete() {
      const { customerInfo } = this;
      const siretInfo = this.siret.info;
      customerInfo.name = siretInfo.uniteLegale.nomUsageUniteLegale;
      // eslint-disable-next-line max-len
      customerInfo.address_street_number = siretInfo.adresseEtablissement.numeroVoieEtablissement;
      // eslint-disable-next-line max-len
      customerInfo.address_street_name = `${siretInfo.adresseEtablissement.typeVoieEtablissement} ${siretInfo.adresseEtablissement.libelleVoieEtablissement}`;
      customerInfo.address_zip_code = siretInfo.adresseEtablissement.codePostalEtablissement;
      customerInfo.address_city = siretInfo.adresseEtablissement.libelleCommuneEtablissement;
      // eslint-disable-next-line max-len
      customerInfo.address_country = siretInfo.adresseEtablissement.codePaysEtrangerEtablissement ? siretInfo.adresseEtablissement.codePaysEtrangerEtablissement : 'FRANCE';
    },

    warningAutocomplete() {
      this.warning.display = true as boolean;
      this.warning.type = 'autocomplete' as string;
    },

    clearWarningAutocomplete() {
      this.warning.display = false as boolean;
      this.warning.type = '' as string;
      this.warning.existingInformation = [] as string[];
    },

    // CUSTOMERS
    checkCustomerBeforeSave(type:string) {
      this.resetFormError();
      this.splitReferentNumber();
      if (this.customerInfo.name.length < 1) {
        this.setErrorNameRequired();
      }
      if (this.customerInfo.tva_number) {
        if (this.customerInfo.tva_number.length > 0 && this.customerInfo.tva_number.length < 13) {
          this.setErrorTva();
        }
      }
      if (this.customerInfo.referent_number_indicative && this.customerInfo.referent_number_value) {
        if (this.customerInfo.referent_number.length > 0
        && (this.customerInfo.referent_number.length > 8
        && this.customerInfo.referent_number.length < 12)) {
          this.setErrorPhone();
        }
      }
      if (this.customerInfo.referent_email) {
        const regexMail = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,64}$/;
        if (this.customerInfo.referent_email.length > 0
        && !regexMail.test(this.customerInfo.referent_email)) {
          this.setErrorMail();
        }
      }
      if (this.customerInfo.website) {
        const regexWebsite = /[(http(s)?):\\/\\/(www\\.)?a-zA-Z0-9@:%._\\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/;
        if (this.customerInfo.webiste.length > 0
        && !regexWebsite.test(this.customerInfo.webiste)) {
          this.setErrorWebsite();
        }
      }
      if (this.formError.tva.error === false
      && this.formError.name.error === false
      && this.formError.phone.error === false
      && this.formError.email.error === false
      && this.formError.webiste.error === false) {
        if (type === 'save') {
          this.saveCustomer();
        }
        if (type === 'push') {
          this.pushCustomer();
        }
      }
    },

    splitReferentNumber() {
      if (this.customerInfo.referent_number_value < 1) return;
      if (this.customerInfo.referent_number_value.indexOf('.')) {
        const numberSplit = this.customerInfo.referent_number_value.split('.');
        let finalNumber = '' as string;
        numberSplit.forEach((element:string) => {
          finalNumber += element;
        });
        this.customerInfo.referent_number_value = finalNumber;
      }
      if (this.customerInfo.referent_number_value.indexOf(' ')) {
        const numberSplit = this.customerInfo.referent_number_value.split(' ');
        let finalNumber = '' as string;
        numberSplit.forEach((element:string) => {
          finalNumber += element;
        });
        this.customerInfo.referent_number_value = finalNumber;
      }
    },

    referentNumberIndicative() {
      if (this.customerInfo.referent_number_indicative.length === 0) {
        this.customerInfo.referent_number_indicative = this.countriesCode.default.code;
      }
    },

    warningDeleteCustomer() {
      this.warning.display = true as boolean;
      this.warning.type = 'deleteCustomer' as string;
    },

    clearWarningDeleteCustomer() {
      this.warning.display = false as boolean;
      this.warning.type = '' as string;
    },

    // ERRORS FORM
    setErrorNameRequired() {
      this.formError.name.error = true as boolean;
      this.formError.name.errorMessage = this.$t('customerForm.formError.name.required') as TranslateResult;
    },

    setErrorTva() {
      this.formError.tva.error = true as boolean;
      this.formError.tva.errorMessage = this.$t('customerForm.formError.tva.length') as TranslateResult;
    },

    setErrorPhone() {
      this.formError.phone.error = true as boolean;
      this.formError.phone.errorMessage = this.$t('customerForm.formError.phone.invalid') as TranslateResult;
    },

    setErrorMail() {
      this.formError.email.error = true as boolean;
      this.formError.email.errorMessage = this.$t('customerForm.formError.email.invalid') as TranslateResult;
    },

    setErrorWebsite() {
      this.formError.webiste.error = true as boolean;
      this.formError.webiste.errorMessage = this.$t('customerForm.formError.website.invalid') as TranslateResult;
    },

    siretErrorConflict() {
      this.formError.siret.error = true as boolean;
      this.formError.siret.errorMessage = this.$t('customerForm.formError.siret.conflict') as TranslateResult;
    },

    resetSiretError() {
      this.formError.siret.error = false as boolean;
      this.formError.siret.errorMessage = '' as string;
    },

    resetFormError() {
      this.formError.name.error = false as boolean;
      this.formError.name.errorMessage = '' as string;
      this.formError.tva.error = false as boolean;
      this.formError.tva.errorMessage = '' as string;
      this.formError.phone.error = false as boolean;
      this.formError.phone.errorMessage = '' as string;
      this.formError.email.error = false as boolean;
      this.formError.email.errorMessage = '' as string;
      this.formError.webiste.error = false as boolean;
      this.formError.webiste.errorMessage = '' as string;
      this.resetSiretError();
    },
  },

  mounted() {
    this.customerInfo = this.customer;
    const siretForm = document.getElementById('siret') as HTMLInputElement;
    siretForm.addEventListener('input', () => { this.checkSiret(siretForm.value); });
  },

  computed: {
    sortedCountriesCode() {
      const countriesCodeArray = this.countriesCode.codes;
      const sortedCountriesCode = countriesCodeArray.sort((a:any, b:any) => a.code - b.code);
      return sortedCountriesCode;
    },
  },
});
</script>

<style lang="scss">
</style>
