import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { SharedModule } from './../shared';
import { CoreModule } from './../core';
import { ApiCardComponent } from './components/api-card/api-card.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CatalogListComponent } from './components/catalog-list/catalog-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogComponent, ApiCardComponent, SearchBoxComponent, CatalogListComponent],
      imports: [SharedModule, CoreModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
