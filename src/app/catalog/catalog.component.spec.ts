import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogComponent } from './catalog.component';
import { SharedModule } from './../shared';
import { CoreModule } from './../core';
import { ApiCardComponent } from './components/api-card/api-card.component';
import { SearchBoxComponent } from './components/search-box/search-box.component';
import { CatalogListComponent } from './components/catalog-list/catalog-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, ActivatedRoute, convertToParamMap, Params, ParamMap } from '@angular/router';
import { ApiInfoService } from '../core/services/api-info/api-info.service';

describe('CatalogComponent', () => {
  let component: CatalogComponent;
  let fixture: ComponentFixture<CatalogComponent>;
  let apiInfoService: ApiInfoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CatalogComponent, ApiCardComponent, SearchBoxComponent, CatalogListComponent],
      imports: [
        SharedModule,
        CoreModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    apiInfoService = TestBed.get(ApiInfoService);
    fixture = TestBed.createComponent(CatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to a new url location when performing a new search with different keywords', () => {
    const router = TestBed.get(Router);
    const routerSpy = spyOn(router, 'navigate');
    const searchTerm = 'my search phrase';
    component.onSearchTerms(searchTerm);
    expect(routerSpy).toHaveBeenCalledWith(['/catalog'], { queryParams: { q: searchTerm } });
  });
});
