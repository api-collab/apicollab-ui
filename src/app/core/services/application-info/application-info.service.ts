import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { ApplicationInfo } from '../../models/application-info';
import { environment } from '../../../../environments/environment';
import { NotificationService } from '../notification/notification.service';
import { Notification } from '../../models/notification';
import { NotificationType } from '../../models/notification-type';

const applicationInfoUrl = `${environment.API_ROOT}/applications`;
const NotifErrorGetApplication = new Notification('Failed to retrieve the application info', NotificationType.Failed);

@Injectable({
  providedIn: 'root'
})
export class ApplicationInfoService {
  constructor(private http: HttpClient, private notificationService: NotificationService) {}

  /**
   * Get Application Info for a given API
   * @param applicationId
   */
  getApplicationInfo(applicationId: string): Observable<ApplicationInfo> {
    const url = `${applicationInfoUrl}/${applicationId}`;
    return this.http.get<ApplicationInfo>(url).pipe(
      tap(() => console.log(`fetched application info for ${applicationId}`)),
      catchError(this.handleError(NotifErrorGetApplication, new ApplicationInfo()))
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
