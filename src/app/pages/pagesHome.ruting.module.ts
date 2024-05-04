import { Routes } from '@angular/router';
import { AppDashboardComponent } from './dashboard/dashboard.component';
import { AppHomeComponent } from './home/home.component';

export const PagesRoutesHome: Routes = [
  {
    path: '',
    component: AppHomeComponent,
    data: {
      title: 'Starter Page',
    },
  },

];
