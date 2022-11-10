import { Component } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'auswahl',
  templateUrl: './auswahl.component.html',
  styleUrls: ['./auswahl.component.scss']
})
export class AuswahlComponent {

  constructor(
    private router: Router
  ) { }

  werwoelfe() {

    this.router.navigate(['/werwoelfe-spiel']);
  }

  agentundercover() {

    this.router.navigate(['/agent-undercover-spiel']);
  }
}
