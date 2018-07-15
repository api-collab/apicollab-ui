import { Component, OnInit, Input } from '@angular/core';
import { ApiInfo } from '../../../core/models/api-info';
@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.scss']
})
export class ApiCardComponent implements OnInit {
  @Input() apiInfo: ApiInfo;

  constructor() {}

  ngOnInit() {}
}
