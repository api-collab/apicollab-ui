import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { ApiInfoService } from '../core/services/api-info/api-info.service';
import { ApiInfo } from '../core/models/api-info';
import { environment } from './../../environments/environment';
const SwaggerUI = require('swagger-ui');

@Component({
  selector: 'app-api-page',
  templateUrl: './api-page.component.html',
  styleUrls: ['./api-page.component.scss']
})
export class ApiPageComponent implements OnInit, AfterViewInit {
  apiInfo$: Observable<ApiInfo>;
  descriptionUrl: string;
  el: ElementRef;
  apiId: string;

  constructor(
    private _elemRef: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private service: ApiInfoService
  ) {
    this.el = _elemRef;
    this.route.queryParamMap.subscribe(param => {
      this.apiId = param.get('id');
      this.fetchApiInfo(param.get('id'));
    });
  }
  ngAfterViewInit() {
    SwaggerUI({
      url: `${environment.API_ROOT}/apis/${this.apiId}/swaggerDoc`,
      domNode: this.el.nativeElement.querySelector('#swagger-ui'),
      deepLinking: false,
      presets: [SwaggerUI.presets.apis]
    });
  }

  ngOnInit() {}

  fetchApiInfo(id: string) {
    console.log('Fetching APIs');
    this.apiInfo$ = this.service.getApi(id);
  }
}
