import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameModule } from './game/game.module';
import { HelloComponent } from './hello/hello.component';
import { WebsocketModule } from './websocket';

@NgModule(
  {
    declarations: [
      AppComponent,
      HelloComponent
    ],
    imports: [
      BrowserModule,

      WebsocketModule.config(
        {
          url: environment.ws
        }
      ),

      GameModule,

      AppRoutingModule,
      FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
  })
export class AppModule {
}
