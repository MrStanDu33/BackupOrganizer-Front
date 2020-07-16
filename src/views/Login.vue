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
          @keydown.enter="pushLog"
          :label="$t('login.email')"
          id="email"
          outlined
          required
          :error="error"
          >
          </v-text-field>
          <v-text-field
          @keydown.enter="pushLog"
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          name="input-10-2"
          id="password"
          :label="$t('login.password')"
          @click:append="showPassword = !showPassword"
          outlined
          required
          :error="error"
          :error-messages="errorMessage"
          >
          </v-text-field>
          <a class="subtitle-2">{{$t('login.forgotPass')}}</a>
        </v-form>
        <v-btn
        class="mt-5"
        block
        color="success"
        @click="pushLog"
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
      {{$t('login.new')}} <a>{{$t('login.createAccount')}}</a>
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
    pushLog() {
      this.error = false;
      this.errorMessage = '';
      this.loading = true;
      // insert request her
      const log = {
        email: document.getElementById('email').value,
        password: document.getElementById('password').value,
      };
      const xhr = new XMLHttpRequest();
      xhr.open('POST', `${this.$store.state.API}/user/login`, true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.onreadystatechange = () => {
        if (xhr.status === 200) {
          this.connected(xhr.response);
        }
        if (xhr.status === 401) {
          this.failConnect();
        }
      };
      xhr.send(JSON.stringify(log));
    },
    connected(response) {
      localStorage.setItem('token', JSON.parse(response).accessToken);
      this.$router.push({ name: 'Dashboard' });
    },
    failConnect() {
      this.loading = false;
      this.error = true;
      this.errorMessage = this.$t('login.errorMessage');
    },
  },

  data: () => ({
    valid: true,
    showPassword: false,
    loading: false,
    error: false,
    errorMessage: '',
    //
  }),
});
</script>

<style lang="scss" scoped>
</style>
