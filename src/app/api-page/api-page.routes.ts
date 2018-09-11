import { Routes, RouterModule } from '@angular/router';
import { ApiPageComponent } from './api-page.component';
export const ApiPageRoutes: Routes = [
  {
    path: ':apiId',
    pathMatch: 'full',
    component: ApiPageComponent
  }
];
