import { Component, OnInit } from '@angular/core';
import { ApiInfoService } from '../core/services/api-info/api-info.service';

import { Observable, Subject, of, from, forkJoin } from 'rxjs';
import { distinctUntilChanged, switchMap, catchError, groupBy, max, map, mergeMap, toArray } from 'rxjs/operators';
import { WrappedCollection } from '../core/models/wrapped-collection';
import { ApiInfo } from '../core/models/api-info';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ApplicationInfoService } from '../core/services/application-info/application-info.service';
import { ApplicationInfo } from '../core/models/application-info';
import { ApiApplicationInfo } from '../core/models/api-application-info';
import * as compareVersions from 'compare-versions';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  private searchTerms = new Subject<string>();
  applications$: Observable<WrappedCollection<ApplicationInfo>>;
  apis$: Observable<WrappedCollection<ApiInfo>>;
  allApiApplicationInfo$: Observable<WrappedCollection<ApiApplicationInfo>>;
  searchApiResults$: Observable<WrappedCollection<ApiInfo>>;
  searchApiApplicationInfo$: Observable<WrappedCollection<ApiApplicationInfo>>;
  searchPhrase = '';
  constructor(
    private service: ApiInfoService,
    private applicationService: ApplicationInfoService,
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
    this.loadResults();
    this.route.queryParams.subscribe(params => {
      console.log(params);
      this.searchPhrase = params.q || '';
      setTimeout(() => {
        this.searchTerms.next(this.searchPhrase);
      }, 10);
    });
  }

  private loadResults() {
    // Load all apis
    this.applications$ = this.applicationService.getAll();
    this.searchApiApplicationInfo$ = this.searchTerms.pipe(
      distinctUntilChanged(),
      switchMap(term => this.invokeSearch(term)),
      catchError(error => {
        console.error('error loading the list of results', error);
        return of(null);
      })
    );
  }
  private invokeSearch(term): Observable<WrappedCollection<ApiApplicationInfo>> {
    if (term == null || term.trim().length === 0) {
      this.searchPhrase = null;
      return this.service.getAll().pipe(
        map(this.filterLatest),
        switchMap(newCollection => forkJoin(newCollection, this.applications$)),
        map(v => this.buildApiApplicationInfo(v[0], v[1]))
      );
    } else {
      this.searchPhrase = term.trim();
      return this.service.search(this.searchPhrase).pipe(
        map(this.filterLatest),
        switchMap(newCollection => forkJoin(newCollection, this.applications$)),
        map(v => this.buildApiApplicationInfo(v[0], v[1]))
      );
    }
  }

  private buildApiApplicationInfo(
    apis: WrappedCollection<ApiInfo>,
    applications: WrappedCollection<ApplicationInfo>
  ): WrappedCollection<ApiApplicationInfo> {
    const apiApplications = [];
    apis.items.forEach(api => {
      // find the application
      const application = applications.items.filter(a => a.applicationId === api.applicationId)[0];
      const apiApplicationInfo = new ApiApplicationInfo(api, application);
      apiApplications.push(apiApplicationInfo);
    });
    const collection = new WrappedCollection<ApiApplicationInfo>(apiApplications, apiApplications.length);
    return collection;
  }

  private filterLatest(collection: WrappedCollection<ApiInfo>): Observable<WrappedCollection<ApiInfo>> {
    const items = collection.items;
    return from(items).pipe(
      groupBy(api => api.applicationId),
      mergeMap(group => group.pipe(max((api1, api2) => compareVersions(api1.version, api2.version)))),
      toArray(),
      switchMap(values => of(new WrappedCollection(values, values.length)))
    );
  }
}
