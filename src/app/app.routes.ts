import { Routes } from '@angular/router';
import {Dashboard} from './pages/dashboard/dashboard';
import {AddEnclos} from './pages/enclos/add-enclos/add-enclos';
import {Enclos} from './pages/enclos/enclos/enclos';
import {Login} from './pages/login/login';
import {Signup} from './pages/signup/signup';

export const routes: Routes = [
  {
    path: 'signup',
    component: Signup,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: Dashboard,
    children: [
      {
        path: 'enclos',
        component: Enclos
      },
      {
        path: 'enclos/add-enclos',
        component: AddEnclos
      }
    ]
  }
];
