<template>
  <v-main>
    <h1 class="text-center">{{$t('login.connection')}}</h1>
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
          @keydown.enter="checkLog"
          :label="$t('login.email')"
          id="email"
          outlined
          required
          :error="errorMail"
          :error-messages="errorMessageMail"
          >
          </v-text-field>
          <v-text-field
          @keydown.enter="checkLog"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          name="input-10-2"
          id="password"
          :label="$t('login.password')"
          @click:append="showPassword = !showPassword"
          outlined
          required
          :error="errorPassword"
          :error-messages="errorMessagePassword"
          >
          </v-text-field>
          <a class="subtitle-2">{{$t('login.forgotPass')}}</a>
        </v-form>
        <v-btn
        class="mt-5"
        block
        color="success"
        @click="checkLog"
        >
          {{$t('login.connection')}}
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
      {{$t('login.new')}}
      <a @click="$router.push({ name: 'New Account' })">{{$t('login.createAccount')}}</a>
    </v-card-text>
    </v-card>
  </v-main>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',

  components: {
  },

  methods: {
    checkLog() {
      this.resetError();
      this.checkMail();
      this.checkPassword();
      if (!this.errorMail && !this.errorPassword) {
        this.pushLog();
      }
    },
    pushLog() {
      this.resetError();
      this.loading = true as boolean;
      const log = {
        email: (document.getElementById('email') as HTMLInputElement).value || 'null',
        password: ((document.getElementById('password') as HTMLInputElement).value) || 'null',
      };
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.$store.state.API}/user/login`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.readyState !== xhr.DONE) return;
        if (xhr.status === 201) {
          this.connected(xhr.response);
        }
        if (xhr.status === 401) {
          this.setErrorInvalidCredentials();
        }
        if (xhr.status === 422) {
          const { errors } = JSON.parse(xhr.response);
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
    setErrorInvalidCredentials() {
      this.errorMail = true as boolean;
      this.errorPassword = true as boolean;
      this.errorMessagePassword = this.$t('login.errorInvalidCredentials') as string;
      this.loading = false as boolean;
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
      this.errorMessageMail = this.$t('login.errorMailStructure') as string;
      this.loading = false as boolean;
    },
    checkPassword() {
      const password = (document.getElementById('password') as HTMLInputElement).value;
      if (password.length < 8) {
        this.setErrorPassword();
      }
    },
    setErrorPassword() {
      this.errorPassword = true as boolean;
      this.errorMessagePassword = this.$t('login.errorPassword') as string;
      this.loading = false as boolean;
    },
    resetError() {
      this.errorMail = false as boolean;
      this.errorMessageMail = '' as string;
      this.errorPassword = false as boolean;
      this.errorMessagePassword = '' as string;
    },
    connected(response:any) {
      localStorage.setItem('token', response.accessToken);
      this.$router.push({ name: 'Dashboard' });
    },
  },

  data: () => ({
    valid: true as boolean,
    showPassword: false as boolean,
    loading: false as boolean,
    errorMail: false as boolean,
    errorPassword: false as boolean,
    errorMessageMail: '' as string,
    errorMessagePassword: '' as string,
  }),
});
</script>

<style lang="scss" scoped>
</style>
