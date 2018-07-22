import { Component, OnInit } from '@angular/core';
import { ApiInfoService } from '../core/services/api-info/api-info.service';

import { Observable, Subject, of } from 'rxjs';
import { distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { WrappedCollection } from '../core/models/wrapped-collection';
import { ApiInfo } from '../core/models/api-info';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  private searchTerms = new Subject<string>();
  apis$: Observable<WrappedCollection<ApiInfo>>;
  searchApiResults$: Observable<WrappedCollection<ApiInfo>>;
  searchPhrase = '';
  constructor(private service: ApiInfoService) {}

  // Push a search term into the observable stream.
  onSearchTerms(terms: string) {
    this.searchTerms.next(terms);
  }
  ngOnInit() {
    this.apis$ = this.service.getAll();
    this.searchApiResults$ = this.searchTerms.pipe(
      // ignore new term if same as previous term
      distinctUntilChanged(),
      // switch to new search observable each time the term changes
      switchMap((term: string) => {
        this.searchPhrase = term;
        if (term.trim().length === 0) {
          return of(null);
        } else {
          return this.service.search(term);
        }
      }),
      catchError(error => {
        console.error('error loading the list of results', error);
        return of(null);
      })
    );
  }
}
