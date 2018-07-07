import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { SharedModule } from '../shared/shared.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { ApiCardComponent } from './components/api-card/api-card.component';

@NgModule({
  imports: [CommonModule, SharedModule, CatalogRoutingModule],
  declarations: [CatalogComponent, ApiCardComponent],
  exports: [CatalogComponent, SharedModule]
})
export class CatalogModule {}
