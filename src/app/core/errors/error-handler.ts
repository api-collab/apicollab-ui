import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from '../services/notification/notification.service';
import { Notification } from '../models/notification';
import { NotificationType } from '../models/notification-type';

@Injectable()
export class ErrorsHandler extends ErrorHandler {
  constructor(@Inject(Injector) private injector: Injector) {
    super();
  }

  handleError(error: Error | HttpErrorResponse) {
    const n = new Notification();
    n.message = error.message;
    n.type = NotificationType.Failed;
    this.injector.get(NotificationService).notify(n);
    // Log the error anyway
    console.error('Oops an error has occured: ', error);
  }
}
