import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCardComponent } from './api-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './../../../shared';
import { CoreModule } from './../../../core';

describe('ApiCardComponent', () => {
  let component: ApiCardComponent;
  let fixture: ComponentFixture<ApiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, CoreModule],
      declarations: [ApiCardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
