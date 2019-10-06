import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

import { PlayerState } from '../../shared/model/player.state';
import { PlayerTeam } from '../../shared/model/player.team';
import { WS } from '../../shared/model/websocket.events';

import { WebsocketService } from '../../websocket';

@Component(
  {
    selector: 'app-arena',
    templateUrl: './arena.component.html',
    styleUrls: ['./arena.component.scss']
  })
export class ArenaComponent implements OnInit {

  public enemyState: PlayerState;
  public allyState: PlayerState;

  private stateEnum: typeof PlayerState = PlayerState;
  private playerEnum: typeof PlayerTeam = PlayerTeam;

  constructor(
    private socketService: WebsocketService
  ) {
  }

  public ngOnInit(): void {
    this.initDefaultStates();

    this.socketService.on('message').subscribe(x => console.log(JSON.parse(x['response'])));
  }

  private initDefaultStates(): void {
    this.enemyState = this.stateEnum.STILL;
    this.allyState = this.stateEnum.STILL;
  }

  public attackForUser1(): void {
    this.socketService.send('name', {name: 'Test01', action: 'attack'});
  }

  public attackForUser2(): void {
    this.socketService.send('name', {name: 'Test02', action: 'attack'});
  }

  public connectUser2(): void {
    this.socketService.send('name', 'Test02');
  }

  public connectUser1(): void {
    this.socketService.send('createName', 'Test01');
  }

  public dropConnection(): void {
    this.socketService.ngOnDestroy();
  }
}
