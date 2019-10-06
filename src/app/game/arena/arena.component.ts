import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';

import { PlayerState } from '../../shared/model/player.state';
import { PlayerTeam } from '../../shared/model/player.team';
import { WS } from '../../shared/model/websocket.events';

import { WebsocketService } from '../../websocket';
import {NameService} from '../../service/name.service';

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
    private socketService: WebsocketService,
    private nameService: NameService
  ) {
  }

  public ngOnInit(): void {
    this.initDefaultStates();

    this.socketService.on('message').subscribe(x => console.log(JSON.parse(x['response']))); // tslint-disable-line no-use-before-define
    this.socketService.send('name', this.nameService.name + new Date().getTime().toString());
  }

  private initDefaultStates(): void {
    this.enemyState = this.stateEnum.STILL;
    this.allyState = this.stateEnum.STILL;
  }

  public test(): void {
    this.socketService.connect();
  }

  public attackForUser1(): void {
    this.socketService.send('name', {name: 'Test03', action: 'attack'});
  }

  public attackForUser2(): void {
    this.socketService.send('name', {name: 'Test04', action: 'attack'});
  }

  public connectUser2(): void {
    this.socketService.send('name', 'Test04');
  }

  public connectUser1(): void {
    this.socketService.send('name', 'Test03');
  }

  public dropConnection(): void {
    this.socketService.ngOnDestroy();
  }
}
