import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiCardComponent } from './api-card.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from './../../../shared';
import { CoreModule } from './../../../core';
import { ApiInfo } from '../../../core/models/api-info';
import { By } from '@angular/platform-browser';
import { MatChip } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  template: '<app-api-card class="app-api-card" [apiInfo]="apiInfo"></app-api-card>'
})
class TestHostComponent {
  apiInfo: ApiInfo;
}

describe('ApiCardComponent', () => {
  let fixture: ComponentFixture<TestHostComponent>;
  let component: TestHostComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, CoreModule],
      declarations: [ApiCardComponent, TestHostComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should assign the initial value from parent', async(() => {
    expect(component).toBeTruthy();
    const dummy = new ApiInfo();
    dummy.apiId = '1';
    dummy.applicationId = '2';
    dummy.desription = 'hello';
    dummy.name = 'name';
    dummy.status = 'BETA';
    dummy.tags = ['hello', '', 'world'];
    dummy.version = ''; // empty tag
    component.apiInfo = dummy;
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const elements = fixture.debugElement.queryAll(By.directive(MatChip));
      expect(elements.length).toBe(2);
    });
  }));
});
