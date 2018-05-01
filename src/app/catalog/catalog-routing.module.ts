import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule  } from '@angular/router';
import { CatalogRoutes } from './catalog.routes';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(CatalogRoutes)
  ]
})
export class CatalogRoutingModule { }
