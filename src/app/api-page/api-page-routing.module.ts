import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule  } from '@angular/router';

import { ApiPageRoutes } from './api-page.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ApiPageRoutes)
  ]
})
export class ApiPageRoutingModule { }
