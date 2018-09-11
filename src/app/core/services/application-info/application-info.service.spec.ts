import { TestBed, inject, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { NotificationService } from '../notification/notification.service';

import { ApplicationInfoService } from './application-info.service';
import { environment } from '../../../../environments/environment';

describe('ApplicationInfoService', () => {
  let testBed: TestBed;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ApplicationInfoService, NotificationService]
    });
    testBed = getTestBed();
    httpMock = testBed.get(HttpTestingController);
  });

  afterEach(() => {
    // run HttpTestingController#verify to make sure that there are no outstanding requests
    httpMock.verify();
  });

  it('should be created', inject([ApplicationInfoService], (service: ApplicationInfoService) => {
    expect(service).toBeTruthy();
  }));

  it('should be get Application info for a given id', inject(
    [ApplicationInfoService],
    (service: ApplicationInfoService) => {
      expect(service).toBeTruthy();
      httpMock = testBed.get(HttpTestingController);
      const dummyData = {
        name: 'App 1',
        email: 'support@app1.com',
        applicationId: '123456'
      };

      const id = '123456';
      const url = `${environment.API_ROOT}/applications/${id}`;

      service.getApplicationInfo(id).subscribe(response => {
        expect(response.name).toEqual(dummyData.name);
        expect(response.email).toEqual(dummyData.email);
        expect(response.applicationId).toEqual(dummyData.applicationId);
      });

      const req = httpMock.expectOne(url);
      expect(req.request.method).toBe('GET');
      req.flush(dummyData);
    }
  ));
});
