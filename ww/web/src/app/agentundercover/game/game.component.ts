import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { AgentUndercoverService } from '../../agentundercover.service';
import { NotificationService } from '../../animations/notification.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class AgentUndercoverSpielComponent implements OnInit, OnDestroy {

  /** Local */
  _admin = false;

  spielerAuswahl = [];
  registriert = false;
  spielerName = undefined;
  ortBestaetigt = false;

  zustand = 'VORBEREITUNG';
  spieler = [];
  orte = [];

  subscription: Subscription;

  constructor(
    private service: AgentUndercoverService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  get admin() {

    return this._admin;
  }

  set admin(admin) {

    localStorage.setItem('admin', '' + admin);
    this._admin = admin;
  }

  apply() {

    this.spielerName = this.spielerAuswahl.filter(p => p.checked)[0].name;
    localStorage.setItem('spieler', this.spielerName);
    this.service.registriere(this.spielerName).toPromise()
      .then(res => this.registriert = true)
      .catch(error => this.notificationService.error('Es ist ein Fehler aufgetreten.'));
  }

  ngOnDestroy() {

    this.subscription.unsubscribe();
  }

  async ngOnInit() {

    if (localStorage.getItem('spieler')) {
      this.spielerName = localStorage.getItem('spieler');
    }

    if (localStorage.getItem('admin')) {
      this._admin = localStorage.getItem('admin') === 'true';
    }

    const source = interval(1000);
    this.subscription = source.subscribe(val => {

      this.service.getDaten().toPromise()
        .then(data => {

          if (!this.sindSpielerIdentisch(this.spieler, data.spieler)) {
            this.spielerAuswahl = [];
            data.spieler.forEach(p => this.spielerAuswahl.push({ 'name': p.name, 'checked': false }));

            this.spielerName = undefined;
            localStorage.setItem('spieler', undefined);
            this.registriert = false;
            this.ortBestaetigt = false;
          }

          this.spieler = data.spieler;
          this.orte = data.orte;
          const letzterZustand = this.zustand;
          this.zustand = data.zustand;

          if (letzterZustand !== 'NEUERORT' && this.zustand === 'NEUERORT') {

            this.ortBestaetigt = false;
          }
        })
        .catch(error => console.log(error));
    });
  }

  sindSpielerIdentisch(sp1, sp2) {

    if (sp1.length !== sp2.length) {
      return false;
    }

    for (let i = 0; i < sp1.length; i++) {
      if (sp1[i].name !== sp2[i].name) {
        return false;
      }
    }

    return true;
  }

  ort() {

    const ich = this.spieler.filter(s => s.name === this.spielerName)[0];
    if (!ich) {
      return "";
    }

    const ort = ich.ort;
    if (!ort) {
      return "Du hast keine Ahnung<br>wo wir gerade sind. <br><br> Finde es heraus<br> um das Spiel zu gewinnen!";
    } else {
      return "Wir befinden uns hier: <br><br>" + ort;
    }
  }

  async ok() {

    this.ortBestaetigt = true;
    await this.service.bestaetigeOrt(this.spielerName).toPromise();
  }

  async neustart() {

    if (this.admin) {
      await this.service.neustart().toPromise();
    }
  }

  erstellen() {

    this.router.navigate(['/agent-undercover-erstellen']);
  }
}
