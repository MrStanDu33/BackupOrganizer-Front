import Login from '../views/Login.vue';

export default [
  {
    path: <string> '/',
    redirect: <object> { name: <string> 'Login' },
  },
  {
    path: <string> 'login',
    name: <string> 'Login',
    component: Login,
    meta: <object> {
      name: <object> {
        fr: <string> 'Connexion',
        en: <string> 'Connection',
      },
      menu: false,
    },
  },
];
