import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameService {
  public name: string;
  public timestamp: number;

  constructor() {
  }

  public setPlayerId(): void {
    // localStorage.setItem('id', this.name + ':' + this.timestamp.toString());
    localStorage.setItem('id', this.name);
  }

  public getPlayerId(): string {
    return localStorage.getItem('id');
  }
}
