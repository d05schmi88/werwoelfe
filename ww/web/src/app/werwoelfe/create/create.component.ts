import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../../animations/notification.service';
import { WerwoelfeService } from '../../werwoelfe.service';

@Component({
  selector: 'werwoelfe-erstellen',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class WerwoelfeErstellenComponent {

  spieler = [{ name: null, lebend: true }];

  constructor(
    private service: WerwoelfeService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  neuerSpieler() {

    if (this.spieler[this.spieler.length - 1].name) {
      this.spieler.push({ name: null, lebend: true });
    }
  }

  weiter() {

    this.service.setSpieler(this.spieler.filter(p => p.name)).toPromise()
      .then(res => this.router.navigate(['/werwoelfe-spiel']))
      .catch(error => this.notificationService.error('Es ist ein Fehler aufgetreten.'));
  }
}
