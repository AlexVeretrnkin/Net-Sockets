import {Component, OnInit} from '@angular/core';
import {strictEqual} from 'assert';
import {environment} from '../../../environments/environment';

import {PlayerState} from '../../shared/model/player.state';
import {PlayerTeam} from '../../shared/model/player.team';
import {StartDuelModel} from '../../shared/model/start-duel.model';

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
  public enemyName = null;
  public allyHP = 100;
  public enemyHP = 100;

  public gameStarted = false;
  public won: PlayerTeam;

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

        if (object.entries().length === 2) {
          console.log('Game started');
          this.gameStarted = true;
          this.won = null;
          this.enemyName = object.opponents[0] === this.allyName
            ? object.opponents[1] : object.opponents[0];
          this.allyHP = 100;
          this.enemyHP = 100;
          this.allyState = PlayerState.STILL;
          this.enemyState = PlayerState.STILL;
        } else if (object.entries().length === 3) {
          this.enemyHP = object[this.enemyName].hp;
          this.allyHP = object[this.allyName].hp;
          if (object[this.enemyName].blocking === true) {
            this.enemyState = PlayerState.DEFENDING;
          } else if (object[this.enemyName].attack === true) {
            this.enemyState = PlayerState.ATTACKING;
          }
          if (object[this.allyName].blocking === true) {
            this.allyState = PlayerState.DEFENDING;
          } else if (object[this.allyName].attack === true) {
            this.allyState = PlayerState.ATTACKING;
          }
        } else if (object.entries().length === 5) {
          console.log('Game ended');
          if (object.win === this.allyName) {
            this.won = this.playerEnum.ALLY;
            this.gameStarted = false;
          } else {
            this.won = this.playerEnum.ENEMY;
            this.gameStarted = false;
          }
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
