import {Component, OnInit} from '@angular/core';

import {PlayerState} from '../../shared/model/player.state';
import {PlayerTeam} from '../../shared/model/player.team';
import { StartDuelModel } from '../../shared/model/start-duel.model';

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
    this.allyName = this.currentUserId;

    this.socketService.send('name', this.currentUserId);

    this.socketService.on('message').subscribe(
      (x: { response: any }) => {
        const object = JSON.parse(x.response);
        console.log(object);

        if (Object.keys(object).length === 2) {
          Object.values(object).forEach((item: string, index: number) => {
            if (index > 0 && object[item] !== this.allyName) {
              this.enemyName = object[item];
            }
          });
        }

        if (Object.values(object).length === 3) {
          Object.keys(object).forEach((item: string) => {
            if (item === this.currentUserId) {
              this.allyHP = object[item].hp;
            } else {
              this.enemyName = object[item].hp;
            }
          });
        }
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
