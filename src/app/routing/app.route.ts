import { Routes, RouterModule } from '@angular/router';
import { ApiPageComponent } from '../api-page/api-page.component';
import { CatalogComponent } from '../catalog/catalog.component';
import { LoginComponent } from '../login/login.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/catalog',
        pathMatch: 'full'
    },

    {
        path: 'catalog',
        loadChildren: 'app/catalog/catalog.module#CatalogModule',
    },
    {
        path: 'api',
        loadChildren: 'app/api-page/api-page.module#ApiPageModule',
    },
    {
        path: 'login',
        loadChildren: 'app/login/login.module#LoginModule',
    }
];
