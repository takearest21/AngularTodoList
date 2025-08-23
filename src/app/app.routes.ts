import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Settings } from './settings/settings';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'settings', component: Settings }
];
