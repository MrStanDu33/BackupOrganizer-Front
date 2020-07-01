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
          :label="$t('login.username')"
          outlined
          required
          :error="error"
          >
          </v-text-field>
          <v-text-field
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          :type="showPassword ? 'text' : 'password'"
          name="input-10-2"
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

  computed: {
  },

  methods: {
    pushLog() {
      this.error = false;
      this.errorMessage = '';
      this.loading = true;
      // insert request her
      window.setTimeout(this.failConnect, 2000);
    },
    connected() {
      this.$router.push({ name: 'dashboard' });
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
