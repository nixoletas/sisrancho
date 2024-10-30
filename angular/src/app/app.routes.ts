import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { CanDeactivateGuard } from './deactivate.guard';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
    {
      path: 'home',
      component: HomeComponent
    },
    {
      path: 'login',
      component: LoginComponent,
      canDeactivate: [CanDeactivateGuard]
    },
    { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];