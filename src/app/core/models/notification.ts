import { NotificationType } from './notification-type';

export class Notification {
  constructor(message?: string, type?: NotificationType) {
    this.message = message;
    this.type = type;
  }
  type: NotificationType;
  message: string;
}
