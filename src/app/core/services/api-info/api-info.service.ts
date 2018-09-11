import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiInfo } from '../../models/api-info';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { WrappedCollection } from '../../models/wrapped-collection';

import { environment } from '../../../../environments/environment';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../../models/notification';
import { NotificationType } from '../../models/notification-type';

const apiInfoUrl = `${environment.API_ROOT}/apis`;

const NotifErrorAutoComplete = new Notification('Failed to fetch autocomplete suggestions', NotificationType.Failed);
const NotifErrorSearchApi = new Notification('Failed to search for APIs', NotificationType.Failed);
const NotifErrorListApi = new Notification('Failed to list all APIs', NotificationType.Failed);
const NotifErrorGetApi = new Notification('Failed to retrieve the API', NotificationType.Failed);
const NotifErrorGetApplicationApis = new Notification(
  'Failed to fetch APIs for this application',
  NotificationType.Failed
);

@Injectable()
export class ApiInfoService {
  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  getAll(): Observable<WrappedCollection<ApiInfo>> {
    return this.http.get<WrappedCollection<ApiInfo>>(apiInfoUrl).pipe(
      tap(() => console.log(`fetched all apis`)),
      catchError(this.handleError(NotifErrorListApi, new WrappedCollection<ApiInfo>()))
    );
  }

  search(term: string): Observable<WrappedCollection<ApiInfo>> {
    if (!term.trim()) {
      // if not search term, return all
      return this.http.get<WrappedCollection<ApiInfo>>(apiInfoUrl);
    }
    term = encodeURI(term);
    const url = `${apiInfoUrl}/search?query=${term}`;
    return this.http.get<WrappedCollection<ApiInfo>>(url).pipe(
      tap(() => console.log(`fetched search results`)),
      catchError(this.handleError(NotifErrorSearchApi, new WrappedCollection<ApiInfo>()))
    );
  }

  autoComplete(keyword: string): Observable<WrappedCollection<string>> {
    const url = `${environment.API_ROOT}/suggestions/${keyword}`;
    return this.http.get<WrappedCollection<string>>(url).pipe(
      tap(suggestions => console.log(`fetched suggestions`, suggestions)),
      catchError(this.handleError(NotifErrorAutoComplete, new WrappedCollection<string>()))
    );
  }

  /**
   * Get specific API
   */
  getApi(apiId: string): Observable<ApiInfo> {
    const url = `${apiInfoUrl}/${apiId}`;
    console.log(`Fetching API ${apiId}`);

    return this.http.get<ApiInfo>(url).pipe(
      tap(() => console.log(`fetched API`)),
      catchError(this.handleError(NotifErrorGetApi, null))
    );
  }

  /**
   * Get Apis for a given application Id
   */
  getApisForApplicationId(applicationId: string): Observable<WrappedCollection<ApiInfo>> {
    const url = `${environment.API_ROOT}/applications/${applicationId}/apis`;
    return this.http.get<WrappedCollection<ApiInfo>>(url).pipe(
      tap(() => console.log(`fetched apis for application ${applicationId}`)),
      catchError(this.handleError(NotifErrorGetApplicationApis, new WrappedCollection<ApiInfo>()))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(notification: Notification, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      if (notification) {
        this.notificationService.notify(notification);
      }
      return of(result);
    };
  }
}
