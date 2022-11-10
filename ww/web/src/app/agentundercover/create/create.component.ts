import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AgentUndercoverService } from '../../agentundercover.service';
import { NotificationService } from '../../animations/notification.service';

@Component({
  selector: 'agent-undercover-erstellen',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class AgentUndercoverErstellenComponent {

  spieler = [{ name: null, registriert: false }];

  constructor(
    private service: AgentUndercoverService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  neuerSpieler() {

    if (this.spieler[this.spieler.length - 1].name) {
      this.spieler.push({ name: null, registriert: false });
    }
  }

  weiter() {

    this.service.setSpieler(this.spieler.filter(p => p.name)).toPromise()
      .then(res => this.router.navigate(['/agent-undercover-spiel']))
      .catch(error => this.notificationService.error('Es ist ein Fehler aufgetreten.'));
  }
}
