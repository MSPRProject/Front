import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ApiComponent } from './pages/api/api.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: LandingComponent,
        pathMatch: 'full',
    },
    
    {
        path: 'dashboard',
        component: DashboardComponent,
        pathMatch: 'full',
    },

    {
        path: 'api',
        component: ApiComponent,
        pathMatch: 'full',
    }
];
