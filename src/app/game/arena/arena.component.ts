import { Component, OnInit } from '@angular/core';
import { PlayerState } from '../../shared/model/player.state';
import { PlayerTeam } from '../../shared/model/player.team';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {

  public enemyState: PlayerState;
  public allyState: PlayerState;

  private stateEnum: typeof PlayerState = PlayerState;
  private playerEnum: typeof PlayerTeam = PlayerTeam;

  constructor() { }

  public ngOnInit(): void {
    this.initDefaultStates();
  }

  private initDefaultStates(): void {
    this.enemyState = this.stateEnum.STILL;
    this.allyState = this.stateEnum.STILL;
  }

}
