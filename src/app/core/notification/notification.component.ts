import { Component, OnInit, NgZone } from '@angular/core';
import { NotificationService } from '../services/notification/notification.service';
import { MatSnackBar } from '@angular/material';

import { Notification } from '../models/notification';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
  notification: Notification;
  showNotification: boolean;
  snackBar: MatSnackBar;

  constructor(private notificationService: NotificationService, snackBar: MatSnackBar, private zone: NgZone) {
    this.snackBar = snackBar;
  }

  ngOnInit() {
    this.notificationService.notification$.subscribe(n => this.onNotification(n));
  }

  onNotification(notif: Notification) {
    if (notif == null) {
      return;
    }
    this.zone.run(() => {
      this.snackBar.open(notif.message, 'OK', {
        duration: 3000,
        verticalPosition: 'bottom',
        horizontalPosition: 'center'
      });
    });
  }
}
