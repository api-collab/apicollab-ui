import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { ApiInfoService } from '../core/services/api-info/api-info.service';
import { ApiInfo } from '../core/models/api-info';
import { environment } from './../../environments/environment';
import { APP_ID_RANDOM_PROVIDER } from '@angular/core/src/application_tokens';

const url = `/assets/swagger/renderer.html?url=${environment.API_ROOT}/apis/`;

@Component({
  selector: 'app-api-page',
  templateUrl: './api-page.component.html',
  styleUrls: ['./api-page.component.scss']
})
export class ApiPageComponent implements OnInit {
  apiInfo$: Observable<ApiInfo>;
  descriptionUrl: string;
  constructor(private route: ActivatedRoute, private router: Router, private service: ApiInfoService) {
    this.route.queryParamMap.subscribe(param => {
      this.fetchApiInfo(param.get('id'));
    });
  }

  ngOnInit() {
    // this.descriptionUrl = this.route.queryParamMap.map(param => url + param.get('id') + '/swaggerDoc');
  }
  fetchApiInfo(id: string) {
    console.log('Fetching APIs');
    this.descriptionUrl = url + id + '/swaggerDoc';
    this.apiInfo$ = this.service.getApi(id);
  }
}
