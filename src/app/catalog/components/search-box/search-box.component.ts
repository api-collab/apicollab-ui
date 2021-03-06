import { Component, OnInit, EventEmitter, Output, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { Observable, of } from 'rxjs';
import {
  map,
  startWith,
  switchMap,
  debounceTime,
  distinctUntilChanged,
  catchError,
  distinct,
  tap
} from 'rxjs/operators';

import { ApiInfoService } from '../../../core/services/api-info/api-info.service';
import { FormControl } from '@angular/forms';
import { MatAutocomplete } from '@angular/material';
import { MatAutocompleteTrigger } from '@angular/material';

const SPACE = ' ';
const EMPTY_STRING = '';
@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.scss']
})
export class SearchBoxComponent implements OnInit, OnChanges {
  /**
   * View Child for autocomplete dropdown
   */
  @ViewChild(MatAutocompleteTrigger)
  trigger;

  /**
   * Each time user presses enter or selects an item from the autocomplete, the current search phrase is emitted
   */
  @Output()
  searchTerms = new EventEmitter<string>();

  /**
   * Search Input
   */
  myControl = new FormControl();

  filteredOptions$: Observable<string[]>;

  /**
   * Sets the inital value of the search box
   */
  @Input()
  initialValue: string;

  constructor(private service: ApiInfoService) {}

  ngOnInit() {
    this.filteredOptions$ = this.myControl.valueChanges.pipe(
      // must be a string
      startWith(''),
      // Fetch for new suggestions
      debounceTime(300),
      // ignore new term if same as previous term
      distinctUntilChanged(),
      switchMap(value => this._suggestions(value))
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    // If the inital value has been changed, then set the text box value as that.
    const change = changes.initialValue;
    if (change && change.currentValue !== change.previousValue) {
      this.myControl.setValue(change.currentValue);
    }
  }

  onOptionSelected(value: string) {
    this.trigger.closePanel();
    this.searchTerms.emit(value);
  }

  private _suggestions(value: string): Observable<string[]> {
    let searchPhrase = value || EMPTY_STRING;
    searchPhrase = searchPhrase.trim();
    if (searchPhrase === EMPTY_STRING) {
      return of([]);
    }
    const middlePoint = searchPhrase.lastIndexOf(SPACE);
    // split the phrase in two parts
    // first part: the pharse without last word
    // second part(keyword): the last word (sent to the API)
    let keyword: string;
    let prefix: string;
    if (middlePoint < 0) {
      // single word
      if (searchPhrase.length < 3) {
        // if keyword is less than 3 chars
        return of([searchPhrase]);
      }
      prefix = '';
      keyword = searchPhrase;
    } else {
      // Multiple words
      prefix = searchPhrase.substr(0, middlePoint) + SPACE;
      keyword = searchPhrase.substr(middlePoint + 1);
    }

    return this.service.autoComplete(keyword).pipe(
      // Prefix the single word with the rest of the phrase
      map(suggestions => suggestions.items.map(s => prefix + s)),
      // if no search results, the return the orginal phrase
      map(suggestions => (suggestions.length === 0 ? [value] : suggestions)),
      catchError(error => {
        console.log('Failed to retrieve autocompelte suggestions', error);
        return of(null);
      })
    );
  }
}
