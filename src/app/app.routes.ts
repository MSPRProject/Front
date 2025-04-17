import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SwaggerComponent } from './swagger/swagger.component';
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
        path: 'swagger',
        component: SwaggerComponent,
        pathMatch: 'full',
    }
];
