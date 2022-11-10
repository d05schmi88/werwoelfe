import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentUndercoverErstellenComponent } from './agentundercover/create/create.component';
import { AgentUndercoverSpielComponent } from './agentundercover/game/game.component';
import { AuswahlComponent } from './auswahl/auswahl.component';
import { WerwoelfeErstellenComponent } from './werwoelfe/create/create.component';
import { WerwoelfeSpielComponent } from './werwoelfe/game/game.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'auswahl'
  },
  {
    path: 'auswahl',
    component: AuswahlComponent
  },
  {
    path: 'werwoelfe-spiel',
    component: WerwoelfeSpielComponent
  },
  {
    path: 'werwoelfe-erstellen',
    component: WerwoelfeErstellenComponent
  },
  {
    path: 'agent-undercover-erstellen',
    component: AgentUndercoverErstellenComponent
  },
  {
    path: 'agent-undercover-spiel',
    component: AgentUndercoverSpielComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: true,
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
