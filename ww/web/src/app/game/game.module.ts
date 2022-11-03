import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FlexModule } from "@angular/flex-layout";
import { SharedModule } from "app/shared/shared.module";
import { GameComponent } from "./game.component";

@NgModule({
    declarations: [
        GameComponent
    ],
    providers: [
    ],
    imports: [
        CommonModule,
        SharedModule,
        FlexModule
    ]
})
export class GameModule { }