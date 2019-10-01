import { Component, OnInit } from '@angular/core';
import { PlayerState } from '../../shared/model/player.state';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {

  public enemyStateEnum: PlayerState;
  public allyStateEnum: PlayerState;

  private stateEnum: typeof PlayerState = PlayerState;

  constructor() { }

  public ngOnInit(): void {
    this.initDefaultStates();
  }

  private initDefaultStates(): void {
    this.enemyStateEnum = this.stateEnum.STILL;
    this.allyStateEnum = this.stateEnum.STILL;
  }

}
