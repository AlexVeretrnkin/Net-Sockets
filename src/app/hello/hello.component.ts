import { Component, OnInit } from '@angular/core';

import {NameService} from '../service/name.service';

@Component({
  selector: 'app-hello',
  templateUrl: './hello.component.html',
  styleUrls: ['./hello.component.scss']
})
export class HelloComponent implements OnInit {
  public inputValue: string = null;

  constructor(
    private ns: NameService
  ) { }

  public ngOnInit(): void {
  }

  public test(): void {
    this.ns.timestamp = new Date().getTime();
  }
}
