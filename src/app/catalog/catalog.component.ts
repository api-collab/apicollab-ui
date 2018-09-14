import { Component, OnInit } from '@angular/core';
import { ApiInfoService } from '../core/services/api-info/api-info.service';

import { Observable, Subject, of } from 'rxjs';
import { distinctUntilChanged, switchMap, catchError, tap } from 'rxjs/operators';
import { WrappedCollection } from '../core/models/wrapped-collection';
import { ApiInfo } from '../core/models/api-info';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

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
  constructor(
    private service: ApiInfoService,
    private router: Router,
    private route: ActivatedRoute,
    private titleService: Title
  ) {
    this.titleService.setTitle('API Catalog');
  }

  // Navigate to a new URL with the search query updated
  onSearchTerms(terms: string) {
    if (terms != null && terms.length > 0) {
      this.router.navigate(['/catalog'], { queryParams: { q: terms } });
    } else {
      this.router.navigate(['/catalog']);
    }
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
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.searchPhrase = params.q || '';
      setTimeout(() => {
        this.searchTerms.next(this.searchPhrase);
      }, 10);
    });
  }
}
