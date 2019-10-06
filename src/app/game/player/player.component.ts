import { Component, Input, OnInit } from '@angular/core';
import { PlayerState } from '../../shared/model/player.state';
import { PlayerTeam } from '../../shared/model/player.team';
import { WS } from '../../shared/model/websocket.events';
import { WebsocketService } from '../../websocket';

@Component(
  {
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
  })
export class PlayerComponent implements OnInit {
  @Input() name: string;
  @Input() health: PlayerTeam;
  @Input() team: PlayerTeam;
  @Input() state: PlayerState;

  private stateEnum: typeof PlayerState = PlayerState;
  private playerEnum: typeof PlayerTeam = PlayerTeam;

  constructor(
  ) {
  }

  ngOnInit() {
    this.name = 'Test';
    // Nothing
  }

  // public sendText(): void {
  //   this.wsService.send(WS.SEND.SEND_TEXT, 'sdfksdjfsdfjds');
  // }

}
