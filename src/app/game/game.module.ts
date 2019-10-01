import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GameRoutingModule } from './game-routing.module';
import { PlayerComponent } from './player/player.component';
import { ArenaComponent } from './arena/arena.component';

@NgModule(
  {
    declarations: [PlayerComponent, ArenaComponent],
    imports: [
      CommonModule,

      GameRoutingModule
    ]
  })
export class GameModule {
}
