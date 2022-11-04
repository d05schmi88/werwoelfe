import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { NotificationService } from '../animations/notification.service';
import { AppService } from '../app.service';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  /** Local */
  _admin = false;

  spielerAuswahl = [];
  rollen = [
    { 'name': 'Dorfbewohner', 'checked': false },
    { 'name': 'Lykantrophin', 'checked': false },
    { 'name': 'Verfluchter', 'checked': false },
    { 'name': 'Aussätzige', 'checked': false },
    { 'name': 'Werwolf', 'checked': false },
    { 'name': 'Seherin', 'checked': false },
    { 'name': 'Hexe', 'checked': false },
    { 'name': 'Amor', 'checked': false }];
  registriert = false;
  spielerName = undefined;

  pruefterName = undefined;
  pruefergebnis = undefined;

  /** Backend */

  spieler = [];
  zustand = 'VORBEREITUNG';
  werwoelfe = [];
  opfer = [];

  hexe = undefined;
  hatGeheilt = false;
  hatGetoetet = false;

  seherin = undefined;

  magenVerdorben = false;
  umgewandelt = false;

  amor = undefined;
  verliebter = undefined;

  subscription: Subscription;

  constructor(
    private appService: AppService,
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

  spielerRolleGueltig() {

    return this.spielerAuswahl.filter(p => p.checked).length === 1 && this.rollen.filter(r => r.checked).length === 1;
  }

  apply() {

    this.spielerName = this.spielerAuswahl.filter(p => p.checked)[0].name;
    localStorage.setItem('spieler', this.spielerName);
    let rolle = this.rollen.filter(r => r.checked)[0].name;
    this.appService.setSpielerRolle(this.spielerName, rolle).toPromise()
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

      this.appService.getDaten().toPromise()
        .then(data => {

          if (!this.sindSpielerIdentisch(this.spieler, data.spieler)) {
            data.spieler.forEach(p => this.spielerAuswahl.push({ 'name': p.name, 'checked': false }));
          }

          this.spieler = data.spieler;
          this.werwoelfe = data.werwoelfe;
          this.opfer = data.opfer;

          this.hexe = data.hexe;
          this.hatGeheilt = data.hatGeheilt;
          this.hatGetoetet = data.hatGetoetet;

          this.seherin = data.seherin;

          this.magenVerdorben = data.magenVerdorben;
          this.umgewandelt = data.umgewandelt;

          this.amor = data.amor;
          this.verliebter = data.verliebter;

          const letzterZustand = this.zustand;
          this.zustand = data.zustand;

          if (letzterZustand !== 'VORBEREITUNG' && this.zustand === 'VORBEREITUNG') {

            this.neustart();
          }

          this.spiel(letzterZustand);
        })
        .catch(error => console.log(error));
    });
  }

  spiel(letzterZustand) {

    if (this.admin) {

      if (letzterZustand !== 'NACHT' && this.zustand === 'NACHT') {

        this.spieleAudio("../../../assets/sounds/Nacht.m4a");
        setTimeout(() => this.weiter(), 8000);
      }

      if (letzterZustand !== 'AMOR' && this.zustand === 'AMOR') {

        this.spieleAudio("../../../assets/sounds/Amor.m4a");
      }

      if (letzterZustand !== 'VERLIEBEN' && this.zustand === 'VERLIEBEN') {

        this.spieleAudio("../../../assets/sounds/Verlieben.m4a");
        setTimeout(() => this.weiter(), 15000);
      }

      if (letzterZustand !== 'WERWOLF' && this.zustand === 'WERWOLF') {

        let timeout = 0;
        if (this.umgewandelt) {
          setTimeout(() => this.spieleAudio("../../../assets/sounds/Verfluchter.m4a"), timeout);
          timeout += 8000;
        }
        setTimeout(() => this.spieleAudio("../../../assets/sounds/Werwoelfe_toeten.m4a"), timeout);
      }

      if (letzterZustand !== 'WERWOLF_ENDE' && this.zustand === 'WERWOLF_ENDE') {

        this.spieleAudio("../../../assets/sounds/Werwoelfe_ende.m4a");
        this.weiter();
      }

      if (letzterZustand !== 'HEXE_HEILEN' && this.zustand === 'HEXE_HEILEN') {
        setTimeout(() => this.spieleAudio("../../../assets/sounds/Hexe_heilen.m4a"), 5000);
        if (!this.hexe.lebend) {
          setTimeout(() => this.nichtHeilen(), 15000);
        }
      }

      if (letzterZustand !== 'HEXE_TOETEN' && this.zustand === 'HEXE_TOETEN') {
        this.spieleAudio("../../../assets/sounds/Hexe_toeten.m4a");
        if (!this.hexe.lebend) {
          setTimeout(() => this.nichtToeten(), 12000);
        }
      }

      if (letzterZustand !== 'HEXE_ENDE' && this.zustand === 'HEXE_ENDE') {
        this.spieleAudio("../../../assets/sounds/Hexe_ende.m4a");
        this.weiter();
      }

      if (letzterZustand !== 'SEHERIN' && this.zustand === 'SEHERIN') {
        setTimeout(() => this.spieleAudio("../../../assets/sounds/Seherin_pruefen.m4a"), 5000);
        if (!this.seherin.lebend) {
          setTimeout(() => this.weiterPruefung(), 15000);
        }
      }

      if (letzterZustand !== 'SEHERIN_ENDE' && this.zustand === 'SEHERIN_ENDE') {
        this.spieleAudio("../../../assets/sounds/Seherin_ende.m4a");
        this.weiter();
      }

      if (letzterZustand !== 'DORF_ERWACHT' && this.zustand === 'DORF_ERWACHT') {
        setTimeout(() => this.spieleAudio("../../../assets/sounds/Dorf_start.m4a"), 5000);
      }

      if (letzterZustand !== 'WERWOLF_GEWONNEN' && this.zustand === 'WERWOLF_GEWONNEN') {
        this.spieleAudio("../../../assets/sounds/Werwoelfe_gewonnen.m4a");
      }

      if (letzterZustand !== 'DORF_GEWONNEN' && this.zustand === 'DORF_GEWONNEN') {
        this.spieleAudio("../../../assets/sounds/Dorf_gewonnen.m4a");
      }
    }
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

  public istSpielerAmor() {

    return this.amor && this.amor.name === this.spielerName;
  }

  public istSpielerVerliebter() {

    return this.verliebter && this.verliebter.name === this.spielerName;
  }

  public istSpielerWerwolfUndLebend() {

    return this.werwoelfe.filter(w => w.name === this.spielerName).filter(w => w.lebend).length > 0;
  }

  public istSpielerHexeUndLebend() {

    return this.hexe && this.hexe.name == this.spielerName && this.hexe.lebend;
  }

  public istSpielerSeherinUndLebend() {

    return this.seherin && this.seherin.name == this.spielerName && this.seherin.lebend;
  }

  spieleAudio(src: string) {

    let audio = new Audio();
    audio.src = src;
    audio.load();
    audio.play();
  }

  getSpielerLebend() {

    return this.spieler.filter(p => p.name && p.lebend);
  }

  getSpielerLebendOhneSelbst() {

    return this.spieler.filter(p => p.name && p.lebend).filter(p => p.name !== this.spielerName);
  }

  getSollSterben() {

    let sollSterben = this.spieler.filter(p => p.sollSterben);
    if (sollSterben.length === 0) {
      return '-------';
    }

    return sollSterben.map(v => v.name).join(', ');
  }

  getOpfer() {

    if (this.opfer.length === 0) {
      return '-------';
    }

    return this.opfer.map(v => v.name + "(" + v.gesinnung + ")").join(', ');
  }

  async verlieben(name: string) {

    await this.appService.verlieben(name).toPromise();
  }

  async fressen(name: string) {

    await this.appService.fressen(name).toPromise();
  }

  async heilen() {

    await this.appService.heilen().toPromise();
  }

  async nichtHeilen() {

    await this.appService.nichtHeilen().toPromise();
  }

  async toeten(name: string) {

    await this.appService.toeten(name).toPromise();
  }

  async nichtToeten() {

    await this.appService.nichtToeten().toPromise();
  }

  async pruefen(name: string) {

    this.pruefterName = name;
    this.pruefergebnis = await this.appService.pruefen(name).toPromise();
  }

  async weiterPruefung() {

    await this.weiter();
    this.pruefterName = undefined;
    this.pruefergebnis = undefined;
  }

  async weiter() {

    await this.appService.weiter().toPromise();
  }

  async weiterMagenVerdorben() {

    await this.appService.weiterMagenVerdorben().toPromise();
  }

  async lynchen(name: string) {

    await this.appService.lynchen(name).toPromise();
  }

  async neustart() {

    if (this.admin) {
      await this.appService.neustart().toPromise();
    }

    this.spielerAuswahl.forEach(p => p.checked = false);
    this.rollen.forEach(r => r.checked = false);
    this.spielerName = undefined;
    localStorage.setItem('spieler', undefined);
    this.registriert = false;
  }

  erstellen() {

    this.router.navigate(['/create']);
  }
}
