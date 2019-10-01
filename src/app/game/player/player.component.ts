import {Component, Input, OnInit} from '@angular/core';
import {PlayerState} from '../../shared/model/player.state';
import {PlayerTeam} from '../../shared/model/player.team';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() name: string;
  @Input() health: PlayerTeam;
  @Input() team: PlayerTeam;
  @Input() state: PlayerState;

  private stateEnum: typeof PlayerState = PlayerState;
  private playerEnum: typeof PlayerTeam = PlayerTeam;

  constructor() { }

  ngOnInit() {
    this.name = 'Test';
    // Nothing
  }

}
