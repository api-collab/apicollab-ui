import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiInfoService } from '../core/services/api-info/api-info.service';
import { ApiInfo } from '../core/models/api-info';
import { environment } from './../../environments/environment';
import { WrappedCollection } from '../core/models/wrapped-collection';
import { ApplicationInfo } from '../core/models/application-info';
import { ApplicationInfoService } from '../core/services/application-info/application-info.service';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap, map, tap } from 'rxjs/operators';

const SwaggerUI = require('swagger-ui');

@Component({
  selector: 'app-api-page',
  templateUrl: './api-page.component.html',
  styleUrls: ['./api-page.component.scss']
})
export class ApiPageComponent implements OnInit {
  apiInfo$: Observable<ApiInfo>;
  versions$: Observable<WrappedCollection<ApiInfo>>;
  applicationInfo$: Observable<ApplicationInfo>;
  descriptionUrl: string;
  el: ElementRef;
  apiId: string;

  constructor(
    private _elemRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private apiInfoService: ApiInfoService,
    private applicationInfoService: ApplicationInfoService
  ) {
    this.el = _elemRef;
  }
  ngOnInit() {
    this.route.paramMap.subscribe(param => {
      this.apiId = param.get('apiId');
      this.fetchApiInfo(param.get('apiId'));
      SwaggerUI({
        url: `${environment.API_ROOT}/apis/${this.apiId}/swaggerDoc`,
        domNode: this.el.nativeElement.querySelector('#swagger-ui'),
        deepLinking: false,
        presets: [SwaggerUI.presets.apis]
      });
    });
  }

  /**
   * When a user selected a new version, we navigate to a different url
   */
  onVersionSelected(apiId) {
    console.log('New version selected', apiId);
    this.router.navigate([`/apis/${apiId}`]);
  }

  fetchApiInfo(id: string) {
    console.log('Fetching API');
    this.apiInfo$ = this.apiInfoService.getApi(id);
    this.apiInfo$.subscribe(info => this.fetchVersions(info.applicationId));
    this.apiInfo$.subscribe(info => this.fetchApplicationInfo(info.applicationId));
  }

  fetchVersions(applicationId: string) {
    console.log('Fetching API versions for application Id:', applicationId);
    this.versions$ = this.apiInfoService.getApisForApplicationId(applicationId);
  }
  fetchApplicationInfo(applicationId: string) {
    console.log('Fetching application info for application Id:', applicationId);
    this.applicationInfo$ = this.applicationInfoService.getApplicationInfo(applicationId);
  }
}
