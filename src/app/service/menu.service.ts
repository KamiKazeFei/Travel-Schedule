import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() { }

  /** 選單 */
  getMenu(): any[] {
    return ['introduce', 'cost', 'planning']
  }
}
