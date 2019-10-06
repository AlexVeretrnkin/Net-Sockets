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

  public alyName = 'Tyanka';
  public enemyName = 'Bitart';

  private stateEnum: typeof PlayerState = PlayerState;
  private playerEnum: typeof PlayerTeam = PlayerTeam;

  private currentUserId: string;

  constructor(
    private socketService: WebsocketService,
    private nameService: NameService
  ) {
  }

  public ngOnInit(): void {
    this.initDefaultStates();

    this.currentUserId = this.nameService.name + ':' + this.nameService.timestamp.toString();

    this.socketService.on('message').subscribe((x: {response: any}) => console.log(JSON.parse(x.response)));
    this.socketService.send('name', this.currentUserId);
  }

  private initDefaultStates(): void {
    this.enemyState = this.stateEnum.STILL;
    this.allyState = this.stateEnum.STILL;
  }

  public test(): void {
    this.socketService.connect();
  }

  public attack(): void {
    this.socketService.send('name', {name: this.currentUserId, action: 'attack'});
  }

  public defend(): void {
    this.socketService.send('name', {name: this.currentUserId, action: 'defend'});
  }
}
