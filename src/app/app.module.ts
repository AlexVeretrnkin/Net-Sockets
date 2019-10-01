import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { GameModule } from './game/game.module';
import { HelloComponent } from './hello/hello.component';

@NgModule(
  {
    declarations: [
      AppComponent,
      HelloComponent
    ],
    imports: [
      BrowserModule,

      CoreModule,
      GameModule,

      AppRoutingModule,
      FormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
export class AppModule {
}
