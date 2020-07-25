<template>
  <v-main>
    <h1 class="text-center">{{$t('newAccount.createAccount')}}</h1>
    <v-card
    elevation="5"
    class="mx-auto mt-6"
    max-width="344"
    :loading="loading"
    >
      <v-card-text>
        <v-form
        v-model="valid"
        ref="login"
        lazy-validation
        align="end">
          <v-text-field
          @keydown.enter="testNewAccount"
          :label="$t('newAccount.name')"
          id="name"
          outlined
          required
          :error="errorName"
          :error-messages="errorMessageName"
          >
          </v-text-field>
          <v-text-field
          @keydown.enter="testNewAccount"
          :label="$t('newAccount.email')"
          id="email"
          outlined
          required
          :error="errorMail"
          :error-messages="errorMessageMail"
          >
          </v-text-field>
          <v-text-field
          @keydown.enter="testNewAccount"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          name="input-10-2"
          id="password"
          :label="$t('newAccount.password')"
          @click:append="showPassword = !showPassword"
          outlined
          required
          :error="errorPassword"
          :error-messages="errorMessagePassword"
          >
          </v-text-field>
          <v-text-field
          @keydown.enter="testNewAccount"
          :append-icon="showPasswordConfirm ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPasswordConfirm ? 'text' : 'password'"
          name="input-10-2"
          id="confirm"
          :label="$t('newAccount.confirm')"
          @click:append="showPasswordConfirm = !showPasswordConfirm"
          outlined
          required
          :error="errorConfirm"
          :error-messages="errorMessageConfirm"
          >
          </v-text-field>
        </v-form>
        <v-btn
        class="mt-5"
        block
        color="success"
        @click="testNewAccount"
        >
          {{$t('newAccount.create')}}
        </v-btn>
      </v-card-text>
    </v-card>
    <v-card
    outlined
    class="mx-auto mt-6"
    max-width="344"
    >
    <v-card-text
    align="center">
      <a @click="$router.push({ name: 'Login' })">{{$t('newAccount.connectWithAccount')}}</a>
    </v-card-text>
    </v-card>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'NewAccount',

  components: {
  },

  methods: {
    testNewAccount() {
      this.loading = true;
      this.resetError();
      this.checkName();
      this.checkMail();
      this.checkPassword();
      this.checkPasswordConfirm();
      if (!this.errorName && !this.errorMail && !this.errorPassword && !this.errorConfirm) {
        this.pushNewAccount();
      }
    },
    resetError() {
      this.errorName = false as boolean;
      this.errorMail = false as boolean;
      this.errorPassword = false as boolean;
      this.errorConfirm = false as boolean;
      this.errorMessageName = '' as string;
      this.errorMessageMail = '' as string;
      this.errorMessagePassword = '' as string;
      this.errorMessageConfirm = '' as string;
    },
    checkName() {
      const name = (document.getElementById('name') as HTMLInputElement).value;
      if (!name) {
        this.setErrorName();
      }
    },
    setErrorName() {
      this.errorName = true as boolean;
      this.errorMessageName = this.$t('newAccount.errorName') as string;
      this.loading = false;
    },
    checkMail() {
      const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,64}$/;
      const mail = (document.getElementById('email') as HTMLInputElement).value;
      if (!regex.test(mail)) {
        this.setErrorMailStructure();
      }
    },
    setErrorMailStructure() {
      this.errorMail = true as boolean;
      this.errorMessageMail = this.$t('newAccount.errorMailStructure') as string;
      this.loading = false;
    },
    setErrorMailExist() {
      this.errorMail = true as boolean;
      this.errorMessageMail = this.$t('newAccount.errorMailExist') as string;
      this.loading = false;
    },
    checkPassword() {
      const password = (document.getElementById('password') as HTMLInputElement).value;
      if (password.length < 8) {
        this.setErrorPassword();
      }
    },
    setErrorPassword() {
      this.errorPassword = true as boolean;
      this.errorMessagePassword = this.$t('newAccount.errorPassword') as string;
      this.loading = false;
    },
    checkPasswordConfirm() {
      const password = (document.getElementById('password') as HTMLInputElement).value;
      const passwordConfirm = (document.getElementById('confirm') as HTMLInputElement).value;
      if (password !== passwordConfirm) {
        this.setErrorPasswordConfirm();
      }
    },
    setErrorPasswordConfirm() {
      this.errorConfirm = true as boolean;
      this.errorMessageConfirm = this.$t('newAccount.errorConfirm') as string;
      this.loading = false;
    },
    pushNewAccount() {
      const log = {
        name: (document.getElementById('name') as HTMLInputElement).value || 'null',
        email: (document.getElementById('email') as HTMLInputElement).value || 'null',
        password: ((document.getElementById('password') as HTMLInputElement).value) || 'null',
      };
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.$store.state.API}/user/register`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.status === 201) {
          this.connect(xhr.response);
        }
        if (xhr.status === 409) {
          this.setErrorMailExist();
        }
        if (xhr.status === 422) {
          const errors = JSON.parse(xhr.responseText);
          if (errors.email) {
            this.setErrorMailStructure();
          }
          if (errors.password) {
            this.setErrorPassword();
          }
        }
      };
      xhr.send(JSON.stringify(log));
    },
    connect(response:string) {
      localStorage.setItem('token', JSON.parse(response).accessToken);
      this.$router.push({ name: 'Dashboard' });
    },
  },

  data: () => ({
    valid: true as boolean,
    loading: false as boolean,
    showPassword: false as boolean,
    showPasswordConfirm: false as boolean,
    errorName: false as boolean,
    errorMail: false as boolean,
    errorPassword: false as boolean,
    errorConfirm: false as boolean,
    errorMessageName: '' as string,
    errorMessageMail: '' as string,
    errorMessagePassword: '' as string,
    errorMessageConfirm: '' as string,
  }),
});
</script>

<style lang="scss" scoped>
</style>
