import { Component, OnInit } from '@angular/core';

import { PlayerState } from '../../shared/model/player.state';
import { PlayerTeam } from '../../shared/model/player.team';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  private state: PlayerState;
  private team: PlayerTeam;

  private stateEnum: typeof PlayerState = PlayerState;
  private playerEnum: typeof PlayerTeam = PlayerTeam;

  constructor() { }

  public ngOnInit(): void {
    this.state = PlayerState.STILL;
  }

}
