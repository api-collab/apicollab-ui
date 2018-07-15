import { Component, OnInit, Input } from '@angular/core';
import { ApiInfo } from '../../../core/models/api-info';

@Component({
  selector: 'app-catalog-list',
  templateUrl: './catalog-list.component.html',
  styleUrls: ['./catalog-list.component.scss']
})
export class CatalogListComponent implements OnInit {
  @Input() items: ApiInfo[];

  constructor() {}

  ngOnInit() {}
}
