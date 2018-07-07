import { TestBed, inject } from '@angular/core/testing';

import { ApiInfoService } from './api-info.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ApiInfoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiInfoService]
    });
  });

  it('should be created', inject([ApiInfoService], (service: ApiInfoService) => {
    expect(service).toBeTruthy();
  }));
});
