import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../animations/notification.service';
import { AppService } from '../../app.service';

@Component({
  selector: 'players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.scss']
})
export class PlayersComponent {

  spieler = [{ name: null, lebend: true }];
  gestartet = false;

  constructor(
    private appService: AppService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  neuerSpieler() {

    if (this.spieler[this.spieler.length - 1].name) {
      this.spieler.push({ name: null, lebend: true });
    }
  }

  weiter() {

    this.appService.setSpieler(this.spieler.filter(p => p.name)).toPromise()
      .then(res => {
        this.gestartet = true;
        this.router.navigate(['/game']);
      })
      .catch(error => this.notificationService.error('Es ist ein Fehler aufgetreten.'));
  }
}
