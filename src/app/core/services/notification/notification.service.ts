import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { Notification } from '../../models/notification';

@Injectable()
export class NotificationService {
  private _notification: BehaviorSubject<Notification> = new BehaviorSubject(null);
  readonly notification$: Observable<Notification> = this._notification.asObservable();

  constructor() {}

  notify(notification: Notification) {
    this._notification.next(notification);

    // remove the message after 3 seconds
    setTimeout(() => this._notification.next(null), 3000);
  }
}
