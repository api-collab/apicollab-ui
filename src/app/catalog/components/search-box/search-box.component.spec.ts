import { async, ComponentFixture, TestBed, fakeAsync, inject } from '@angular/core/testing';

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
import { WrappedCollection } from '../../../core/models/wrapped-collection';

describe('SearchBoxComponent', () => {
  let component: SearchBoxComponent;
  let fixture: ComponentFixture<SearchBoxComponent>;
  let inputTextFieldDe: DebugElement;
  let inputTextFieldEl: HTMLInputElement;
  let apiInfoService: ApiInfoService;

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
    apiInfoService = TestBed.get(ApiInfoService);
    const suggestions = new WrappedCollection();
    suggestions.items = ['word1', 'word2', 'hello world'];
    suggestions.totalCount = suggestions.items.length;
    spyOn(apiInfoService, 'autoComplete').and.returnValue(of(suggestions));
  });
  // helper methods
  function sendInput(text: string) {
    component.myControl.setValue(text);
    let inputElement: HTMLInputElement;
    inputElement = fixture.nativeElement.querySelector('input');
    inputElement.focus();
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input'));
    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.dispatchEvent(new Event('keydown'));
    fixture.detectChanges();
    return fixture.whenStable();
  }

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create textbox to be initially be empty', () => {
    expect(inputTextFieldEl.value).toBe('');
  });

  it('should fetch suggestions when textbox value changes', async(() => {
    const text = 'hello';
    let suggestions: string[];
    component.filteredOptions$.subscribe(s => {
      suggestions = s;
    });
    sendInput(text).then(() => {
      expect(apiInfoService.autoComplete).toHaveBeenCalledWith(text);
      expect(suggestions).toBeDefined();
      expect(suggestions).toEqual(['word1', 'word2', 'hello world']);
    });
  }));

  it('should add the selected suggestions in to the search box', () => {});
});
