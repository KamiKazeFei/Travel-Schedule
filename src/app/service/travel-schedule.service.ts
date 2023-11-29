import { Injectable } from '@angular/core';
import { TravelSchedule } from '../model/travel-schesule.model';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { CommonService } from './common.service';

@Injectable({
  providedIn: 'root'
})
export class TravelScheduleService {

  constructor(
    private apiService: ApiService,
    private commonService: CommonService,
  ) { }

  /** 行程計畫 */
  travelSchedule: TravelSchedule;

  /** 取得旅遊行程 */
  getTravelList(queryObj?: Object): Observable<any> {
    return this.apiService.postApi('query_schedule/', queryObj ? queryObj : {});
  }

  /** 取得旅遊行程 */
  getTravelSchedule(pk_id?: string): Observable<any> {
    /** 傳遞物件 */
    const body = { pk_id };
    return this.apiService.postApi('query/', body);
  }

  /** 儲存行程 */
  saveTravelSchedule(travelSchedule: TravelSchedule): Observable<any> {
    const body = { schedule: travelSchedule };
    return this.apiService.postApi('save/', body);
  }
}
