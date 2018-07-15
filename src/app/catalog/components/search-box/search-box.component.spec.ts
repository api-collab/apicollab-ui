import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

import { SharedModule } from './../../../shared';
import { ApiInfoService } from '../../../core/services/api-info/api-info.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchBoxComponent } from './search-box.component';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { of } from 'rxjs';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let inputTextFieldDe: DebugElement;
  let inputTextFieldEl: HTMLInputElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBoxComponent],
      imports: [SharedModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }, ApiInfoService, NotificationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBoxComponent);
    component = fixture.componentInstance;
    inputTextFieldDe = fixture.debugElement.query(By.css('.search-input-box'));
    inputTextFieldEl = inputTextFieldDe.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create textbox to be initially be empty', () => {
    expect(inputTextFieldEl.value).toBe('');
  });
});
