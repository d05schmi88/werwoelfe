import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CreateGameComponent } from "./creategame.component";
import { PlayersComponent } from "./players/players.component";

const routes: Routes = [
    {
        path: '',
        component: CreateGameComponent,
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'players',
            },
            {
                path: 'players',
                component: PlayersComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class CreateRoutingModule { }