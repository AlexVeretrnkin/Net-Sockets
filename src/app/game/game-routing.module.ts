import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArenaComponent } from './arena/arena.component';

const routes: Routes = [
  {path: 'game', component: ArenaComponent}
];

@NgModule(
  {
    imports: [
      RouterModule.forChild(routes)
    ],
    exports: [
      RouterModule
    ]
  })

export class GameRoutingModule { }
