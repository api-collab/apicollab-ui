import { TestBed, inject, getTestBed } from '@angular/core/testing';

import { ApiInfoService } from './api-info.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotificationService } from '../notification/notification.service';
import { Observable } from '../../../../../node_modules/rxjs';
import { environment } from '../../../../environments/environment';

describe('ApiInfoService', () => {
  let testBed: TestBed;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApiInfoService, NotificationService]
    });
    testBed = getTestBed();
    httpMock = testBed.get(HttpTestingController);
  });

  afterEach(() => {
    // run HttpTestingController#verify to make sure that there are no outstanding requests
    httpMock.verify();
  });

  it('should be created', inject([ApiInfoService], (service: ApiInfoService) => {
    expect(service).toBeTruthy();
  }));

  it('should be correctly encode | (or) while searching', inject([ApiInfoService], (service: ApiInfoService) => {
    expect(service).toBeTruthy();
    httpMock = testBed.get(HttpTestingController);
    const dummyData = {
      totalCount: 1,
      items: [
        {
          name: 'Simple Inventory API',
          version: '1.0.0',
          description: 'This is a simple API',
          status: 'BETA',
          tags: ['admins', 'developers'],
          id: '54b51a05-48af-4a0e-bb2c-61c132931703'
        }
      ]
    };

    const searchPhrase = 'hello | world';
    const urlWithQuery = `${environment.API_ROOT}/apis/search?query=${encodeURI(searchPhrase)}`;

    service.search(searchPhrase).subscribe(response => {
      expect(response.totalCount).toEqual(dummyData.totalCount);
    });

    const req = httpMock.expectOne(urlWithQuery);
    expect(req.request.method).toBe('GET');
    expect(req.request.urlWithParams).toEqual(urlWithQuery);
    req.flush(dummyData);
  }));
});
