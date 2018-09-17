import { ApiInfo } from './api-info';
import { ApplicationInfo } from './application-info';

export class ApiApplicationInfo {
  apiInfo: ApiInfo;
  applicationInfo: ApplicationInfo;

  constructor(apiInfo?: ApiInfo, applicationInfo?: ApplicationInfo) {
    this.apiInfo = apiInfo;
    this.applicationInfo = applicationInfo;
  }
}
