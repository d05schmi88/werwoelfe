import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  constructor(
    private readonly snackBar: MatSnackBar,
    private readonly zone: NgZone
  ) { }

  default(message: string, duration = 2000) {
    this.show(message, {
      duration: duration,
      panelClass: 'default-notification-overlay'
    });
  }

  info(message: string, duration = 2000) {
    this.show(message, {
      duration: duration,
      panelClass: 'info-notification-overlay'
    });
  }

  success(message: string, duration = 2000) {
    this.show(message, {
      duration: duration,
      panelClass: 'success-notification-overlay'
    });
  }

  warn(message: string, duration = 3000) {
    this.show(message, {
      duration: duration,
      panelClass: 'warning-notification-overlay'
    });
  }

  error(message: string, duration = 5000) {
    this.show(message, {
      duration: duration,
      panelClass: 'error-notification-overlay'
    });
  }

  errorOnRESTCall(errorMessage: string, error: any) {
    const message = `Fehler beim ${errorMessage} (${error.status}): ${error.message}`;
    this.show(message, {
      duration: 10000,
      panelClass: 'error-notification-overlay'
    });
  }

  private show(message: string, configuration: MatSnackBarConfig) {
    // Need to open snackBar from Angular zone to prevent issues with its position per
    // https://stackoverflow.com/questions/50101912/snackbar-position-wrong-when-use-errorhandler-in-angular-5-and-material
    this.zone.run(() => this.snackBar.open(message, null, configuration));
  }
}
