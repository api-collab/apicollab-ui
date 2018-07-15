import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './catalog.component';
import { SharedModule } from '../shared/shared.module';
import { CatalogRoutingModule } from './catalog-routing.module';
import { ApiCardComponent } from './components/api-card/api-card.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CatalogListComponent } from './components/catalog-list/catalog-list.component';

@NgModule({
  imports: [CommonModule, SharedModule, CatalogRoutingModule, FormsModule, ReactiveFormsModule],
  declarations: [CatalogComponent, ApiCardComponent, SearchBoxComponent, CatalogListComponent],
  exports: [CatalogComponent]
})
export class CatalogModule {}
