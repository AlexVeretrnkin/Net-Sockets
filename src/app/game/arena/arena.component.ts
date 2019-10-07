import {Component, OnInit} from '@angular/core';

import {PlayerState} from '../../shared/model/player.state';
import {PlayerTeam} from '../../shared/model/player.team';

import {WebsocketService} from '../../websocket';
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

  public allyName = 'Tyanka';
  public enemyName = 'Bitart';
  public allyHP = 100;
  public enemyHP = 100;


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

    this.currentUserId = this.nameService.getPlayerId();
    this.nameService.setPlayerId();

    this.socketService.send('name', this.currentUserId);

    this.socketService.on('message').subscribe(
      (x: { response: any }) => {
        console.log(JSON.parse(x.response));

        Object.keys(x.response).forEach((item: string) => {
          if (item === this.currentUserId) {
            this.allyName = item;
          } else {
            if (item !== 'duel') {
              this.enemyName = item;
            }
          }
        });
      });
  }

  private initDefaultStates(): void {
    this.enemyState = this.stateEnum.STILL;
    this.allyState = this.stateEnum.STILL;
  }

  public attack(): void {
    this.socketService.send('name', {name: this.currentUserId, action: 'attack'});
  }

  public defend(): void {
    this.socketService.send('name', {name: this.currentUserId, action: 'defend'});
  }
}
