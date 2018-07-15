import { TestBed, inject } from '@angular/core/testing';

import { ApiInfoService } from './api-info.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NotificationService } from '../notification/notification.service';

describe('ApiInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiInfoService, NotificationService]
    });
  });

  it('should be created', inject([ApiInfoService], (service: ApiInfoService) => {
    expect(service).toBeTruthy();
  }));
});
