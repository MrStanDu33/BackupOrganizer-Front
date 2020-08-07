import Login from '../views/Login.vue';
import Dashboard from '../views/Dashboard.vue';
import NewAccount from '../views/NewAccount.vue';
import Customers from '../views/Customers.vue';
import CustomerDetails from '../views/CustomerDetails.vue';
import CreateCustomer from '../views/CreateCustomer.vue';

export default [
  {
    path: '/login' as string,
    name: 'Login' as string,
    component: Login,
    meta: <object> {
      name: <object> {
        fr: 'Connexion' as string,
        en: 'Connection' as string,
      },
      menu: false as boolean,
      auth: false as boolean,
    },
  },
  {
    path: '/newaccount' as string,
    name: 'New Account' as string,
    component: NewAccount,
    meta: <object> {
      name: <object> {
        fr: 'Nouveau compte' as string,
        en: 'New Account' as string,
      },
      menu: false as boolean,
      auth: false as boolean,
    },
  },
  {
    path: '' as string,
    name: 'Dashboard' as string,
    component: Dashboard,
    meta: <object> {
      name: <object> {
        fr: 'Tableau de bord',
        en: 'Dashboard',
      },
      menu: true as boolean,
      auth: true as boolean,
    },
  },
  {
    path: '/customers' as string,
    name: 'Customers' as string,
    component: Customers,
    meta: <object> {
      name: <object> {
        fr: 'Clients' as string,
        en: 'Customers' as string,
      },
      menu: true as boolean,
      auth: true as boolean,
    },
  },
  {
    path: '/customer/:customerId' as string,
    name: 'customerDetails' as string,
    component: CustomerDetails,
    meta: <object> {
      name: <object> {
        fr: <string> 'Détails du client' as string,
        en: <string> 'Customer details' as string,
      },
      menu: true as boolean,
      auth: true as boolean,
    },
  },
  {
    path: '/customer/new' as string,
    name: 'createCustomer' as string,
    component: CreateCustomer,
    meta: <object> {
      name: <object> {
        fr: <string> 'Création d\'un nouveau client' as string,
        en: <string> 'Creation of a new customer' as string,
      },
      menu: true as boolean,
      auth: true as boolean,
    },
  },
];
