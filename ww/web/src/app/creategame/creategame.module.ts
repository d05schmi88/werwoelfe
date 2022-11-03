import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexModule } from "@angular/flex-layout";
import { SharedModule } from "app/shared/shared.module";
import { CreateRoutingModule } from "./creategame-routing.module";
import { CreateGameComponent } from "./creategame.component";
import { PlayersComponent } from "./players/players.component";

@NgModule({
    declarations: [
        CreateGameComponent,
        PlayersComponent
    ],
    providers: [],
    imports: [
        CommonModule,
        SharedModule,
        CreateRoutingModule,
        FlexModule
    ]
})
export class CreateGameModule { }