import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentFixtureAutoDetect } from '@angular/core/testing';

import { SharedModule } from './../../../shared';
import { ApiInfoService } from '../../../core/services/api-info/api-info.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SearchBoxComponent } from './search-box.component';
import { By } from '@angular/platform-browser';
import { DebugElement, Component } from '@angular/core';
import { of } from 'rxjs';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WrappedCollection } from '../../../core/models/wrapped-collection';

@Component({
  template:
    '<app-search-box class="search-box-container" ' +
    '[initialValue]="initialValue" (searchTerms)="onSearchTerms($event)"></app-search-box>'
})
class TestHostComponent {
  initialValue = '';
  currentSearchTerm = null;
  onSearchTerms(terms) {
    console.log('Parent', terms);
    this.currentSearchTerm = terms;
  }
}

describe('SearchBoxComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;
  let component: SearchBoxComponent;
  let inputTextFieldDe: DebugElement;
  let inputTextFieldEl: HTMLInputElement;
  let apiInfoService: ApiInfoService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SearchBoxComponent, TestHostComponent],
      imports: [SharedModule, FormsModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }, ApiInfoService, NotificationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    component = hostFixture.debugElement.query(By.directive(SearchBoxComponent)).componentInstance;

    // initialise text box
    inputTextFieldDe = hostFixture.debugElement.query(By.css('.search-input-box'));
    inputTextFieldEl = inputTextFieldDe.nativeElement;

    // mock suggestions invocation
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
    inputElement = hostFixture.nativeElement.querySelector('input');
    inputElement.focus();
    inputElement.value = text;
    inputElement.dispatchEvent(new Event('input'));
    inputElement.dispatchEvent(new Event('focusin'));
    inputElement.dispatchEvent(new Event('keydown'));
    hostFixture.detectChanges();
    return hostFixture.whenStable();
  }

  it('should create', () => {
    expect(hostComponent).toBeTruthy();
    expect(hostFixture.debugElement).toBeTruthy();
    expect(component).toBeTruthy();
  });

  it('should create textbox to be initially be empty', () => {
    expect(inputTextFieldEl.value).toBe('');
  });

  it('should assign the initial value from parent', async(() => {
    const text = 'hello';
    hostComponent.initialValue = text;
    hostFixture.detectChanges();
    hostFixture.whenStable().then(() => {
      expect(hostComponent.currentSearchTerm).toBe(null);
      expect(inputTextFieldEl.value).toBe(text);
    });
  }));

  it('should inform parent when user wants to perform a search', async(() => {
    let text = 'hello';
    hostComponent.initialValue = text;
    hostFixture.detectChanges();
    text = 'world';
    hostFixture
      .whenStable()
      .then(() => {
        // set new text
        return sendInput(text);
      })
      .then(() => {
        // press enter
        inputTextFieldDe.triggerEventHandler('keyup.enter', {});
        hostFixture.detectChanges();
        return hostFixture.whenStable();
      })
      .then(() => {
        // expect the parent to have been updated
        expect(hostComponent.currentSearchTerm).toBe(text);
      });
  }));

  it('should fetch suggestions when textbox value changes', async(() => {
    const text = 'hello';
    let suggestions: string[];
    expect(component.filteredOptions$).toBeDefined();
    component.filteredOptions$.subscribe(s => {
      suggestions = s;
    });
    sendInput(text).then(() => {
      expect(apiInfoService.autoComplete).toHaveBeenCalledWith(text);
      expect(suggestions).toBeDefined();
      expect(suggestions).toEqual(['word1', 'word2', 'hello world']);
    });
  }));
});
