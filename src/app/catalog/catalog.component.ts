import { Component, OnInit } from '@angular/core';
import { ApiInfoService } from '../core/services/api-info/api-info.service';
import { ApiInfo } from '../core/models/api-info';

import { Observable ,  Subject ,  of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ApiInfoList } from '../core/models/api-info-list';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  private searchTerms = new Subject<string>();
  apis$: Observable<ApiInfoList>;
  searchApiResults$: Observable<ApiInfoList>;
  constructor(private service: ApiInfoService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }
  ngOnInit() {
    this.apis$ = this.service.getAll();
    this.searchApiResults$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.service.search(term))
    );
  }
}
