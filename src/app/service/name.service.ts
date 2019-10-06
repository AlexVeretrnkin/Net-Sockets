import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NameService {
  public name: string;
  public timestamp: number;
  constructor() {
  }
}
