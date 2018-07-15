import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiInfo } from '../../models/api-info';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { ApiInfoList } from '../../models/api-info-list';

import { environment } from '../../../../environments/environment';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../../models/notification';
import { NotificationType } from '../../models/notification-type';

const apiInfoUrl = `${environment.API_ROOT}/apis`;
const NotifErrorAutoComplete = new Notification('Failed to fetch autocomplete suggestions', NotificationType.Failed);
const NotifErrorSearchApi = new Notification('Failed to search for APIs', NotificationType.Failed);
const NotifErrorListApi = new Notification('Failed to list all APIs', NotificationType.Failed);
const NotifErrorGetApi = new Notification('Failed to retrieve the API', NotificationType.Failed);

@Injectable()
export class ApiInfoService {
  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  getAll(): Observable<ApiInfoList> {
    return this.http.get<ApiInfoList>(apiInfoUrl).pipe(
      tap(heroes => console.log(`fetched all apis`)),
      catchError(this.handleError('getAll', NotifErrorListApi, new ApiInfoList()))
    );
  }

  search(term: string): Observable<ApiInfoList> {
    if (!term.trim()) {
      // if not search term, return all
      return this.http.get<ApiInfoList>(apiInfoUrl);
    }
    const url = `${apiInfoUrl}/search?query=${term}`;
    return this.http.get<ApiInfoList>(url).pipe(
      tap(() => console.log(`fetched search results`)),
      catchError(this.handleError('search', NotifErrorSearchApi, new ApiInfoList()))
    );
  }

  autoComplete(keyword: string): Observable<String[]> {
    const url = `${environment.API_ROOT}/suggestions/${keyword}`;
    return this.http.get<String[]>(url).pipe(
      tap(suggestions => console.log(`fetched suggestions`, suggestions)),
      catchError(this.handleError('autocomplete', NotifErrorAutoComplete, Array()))
    );
  }

  /**
   * Get specific API
   */
  getApi(apiId: String): Observable<ApiInfo> {
    const url = `${apiInfoUrl}/${apiId}`;
    console.log(`Fetching API ${apiId}`);

    return this.http.get<ApiInfo>(url).pipe(
      tap(apiInfo => console.log(`fetched API`)),
      catchError(this.handleError('getApi', NotifErrorGetApi, null))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', notification: Notification, result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      if (notification) {
        this.notificationService.notify(notification);
      }
      return of(result as T);
    };
  }
}
