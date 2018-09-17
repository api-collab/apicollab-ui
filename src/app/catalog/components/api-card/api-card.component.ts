import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ApiInfo } from '../../../core/models/api-info';
import { ApplicationInfo } from '../../../core/models/application-info';
@Component({
  selector: 'app-api-card',
  templateUrl: './api-card.component.html',
  styleUrls: ['./api-card.component.scss']
})
export class ApiCardComponent implements OnChanges {
  @Input()
  apiInfo: ApiInfo;
  @Input()
  applicationInfo: ApplicationInfo;
  allTags: string[];

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const change = changes.apiInfo;
    if (change && change.currentValue !== change.previousValue) {
      this.apiInfo = change.currentValue;
      this.applicationInfo = changes.applicationInfo.currentValue;
      this.allTags = this.buildTags();
    }
  }

  buildTags(): string[] {
    let tags = [];
    if (this.apiInfo.tags != null && this.apiInfo.tags.length > 0) {
      tags = this.apiInfo.tags.filter(
        value => !(!value || value === undefined || value === '' || value.trim().length === 0)
      );
    }
    let version = this.apiInfo.version;
    version = version ? version.trim() : '';
    if (this.apiInfo.version.length > 0) {
      tags.push(`v${version}`);
    }
    return tags;
  }
}
