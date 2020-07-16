import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';

export default [
  {
    path: <string> '/',
    redirect: <object> { name: <string> 'Login' },
  },
  {
    path: <string> '/login',
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
  {
    path: <string> '/dashboard',
    redirect: <object> { name: <string> 'Dashboard' },
  },
  {
    path: <string> 'dashboard',
    name: <string> 'Dashboard',
    component: Dashboard,
    meta: <object> {
      name: <object> {
        fr: <string> 'Tableau de bord',
        en: <string> 'Dashboard',
      },
      menu: true,
    },
  },
];
