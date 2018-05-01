import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog.component';
export const CatalogRoutes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component:  CatalogComponent,
        children: [
        ]
    }
];
