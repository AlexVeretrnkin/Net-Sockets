import {Component, OnInit} from '@angular/core';
import {environment} from '../../../environments/environment';

import {PlayerState} from '../../shared/model/player.state';
import {PlayerTeam} from '../../shared/model/player.team';
import {WS} from '../../shared/model/websocket.events';

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

    this.currentUserId = this.nameService.name + ':' + this.nameService.timestamp.toString();
    this.allyName = this.nameService.name;

    this.socketService.on('message').subscribe(
      (x: { response: any }) => {
        const json: any = JSON.parse(x.response) as any;
        const ally = json[this.currentUserId];
        this.allyHP = ally.hp;
        if (ally.blocking) {
          this.allyState = PlayerState.DEFENDING;
        } else if (ally.attack) {
          this.allyState = PlayerState.ATTACKING;
        }

        Object.keys(JSON.parse(x.response)).forEach((key) => {
          if (key.indexOf(':') && (key !== this.currentUserId)) {
            this.enemyName = key.split(':')[0];
            const enemy = json[key];
            this.enemyHP = enemy.hp;
            if (enemy.blocking) {
              this.enemyState = PlayerState.DEFENDING;
            } else if (enemy.attack) {
              this.enemyState = PlayerState.ATTACKING;
            }
          }
        });
      });
    this.socketService.send('name', this.currentUserId);
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
