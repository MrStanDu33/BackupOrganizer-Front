<template>
  <v-avatar :color="backgroundColor" size="36">
    <span v-if="!logo" :class="textColor + ' font-weight-bold text-uppercase'">{{img}}</span>
    <img v-if="logo" :src="img">
  </v-avatar>
</template>

<script lang="ts">
// eslint-disable-next-line no-unused-vars
import Vue, { PropType, ComputedOptions } from 'vue';

export default Vue.extend({
  name: 'Avatar',

  props: {
    color: {
      type: String,
      required: false as boolean,
    },
    customer: {
      type: Object,
      required: true as boolean,
    },
  },

  components: {
  },

  methods: {
  },

  computed: {
    backgroundColor() {
      if (this.color === 'dark') {
        return 'primary';
      }
      return 'white';
    },
    textColor() {
      if (this.color === 'dark') {
        return 'white--text';
      }
      return 'primary--text';
    },
    logo() {
      const { customer } = this;
      const { logo } : any = customer;
      const { avatar } : any = customer;
      if (logo === null || avatar === null) {
        return false;
      }
      return true;
    },
    img() {
      const { customer } = this;
      if (!this.logo) {
        let splitName:Array<string> = [];
        if (customer.name) {
          if (customer.name.search(' ')) {
            splitName = customer.name.split(' ');
          } else {
            splitName = [customer.name];
          }
        }
        const firstleter:Array<any> = [];
        if (splitName.length > 0) {
          splitName.forEach((element) => {
            firstleter.push(element.split('', 1));
          });
        }
        let initials:String = '';
        firstleter.forEach((element) => {
          if (initials.length === 2) {
            return false;
          }
          if (/^[A-Z]+$/i.test(element)) {
            initials += element;
          }
          return true;
        });
        return initials;
      }
      if (customer.logo) return customer.logo as string;
      if (customer.avatar) return customer.avatar as string;
      return 'ERROR' as string;
    },
  },

  data: () => ({
  }),
});
</script>

<style lang="scss" scoped>
</style>
