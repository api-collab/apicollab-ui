import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { ApiInfoService } from '../core/services/api-info/api-info.service';
import { ApiInfo } from '../core/models/api-info';

const url =  '/assets/swagger/renderer.html?url=http://localhost:8080/apis/';

@Component({
  selector: 'app-api-page',
  templateUrl: './api-page.component.html',
  styleUrls: ['./api-page.component.scss']
})
export class ApiPageComponent implements OnInit {

  descriptionUrl: Observable<string>;
  constructor(private route: ActivatedRoute,
    private router: Router, private service: ApiInfoService) {

    // this.route.queryParams.subscribe(params => {
    //   this.id = params['id'];
    // });
  }

  ngOnInit() {
    this.descriptionUrl = this.route.queryParamMap.map(param => url + param.get('id') + '/swaggerDoc');
  }

}
