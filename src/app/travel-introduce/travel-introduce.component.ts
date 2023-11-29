import { Component } from '@angular/core';
import AOS from 'aos';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TravelScheduleService } from '../service/travel-schedule.service';
import { TravelDayIntroduce, TravelSchedule } from '../model/travel-schesule.model';

@Component({
  selector: 'app-travel-introduce',
  templateUrl: './travel-introduce.component.html',
  styleUrls: ['./travel-introduce.component.css']
})
export class TravelIntroduceComponent {

  constructor(protected travelScheduleService: TravelScheduleService) { }

  /** 旅行計畫 */
  travelSchedule: TravelSchedule;
  /** 旅行計畫清單 */
  travelScheduleList: TravelSchedule[] = [];

  /** 初始化 */
  async ngOnInit(): Promise<void> {
    AOS.init();
    await this.getTravelSchedule('e3f29e67d4574479aea3650aa24a166')
  }

  /** 查詢行程 */
  async getTravelSchedule(pk_id?: string): Promise<void> {
    await this.travelScheduleService.getTravelSchedule(pk_id).forEach(
      res => {
        if (!res.error) {
          if (res.data.length > 0) {
            this.travelSchedule = res.data[0]
            this.travelSchedule.day_introduces.forEach(ele => {
              ele.date = new Date(ele.date);
            })
            this.travelSchedule.day_introduces.sort((a, b) => a.date.getTime() - b.date.getTime());
          }
        }
      }
    )
  }

  /** 儲存行程 */
  async saveTravelSchedule(): Promise<void> {
    await this.travelScheduleService.saveTravelSchedule(this.travelSchedule).forEach(
      res => {
        if (!res.error) {
          this.getTravelSchedule()
        }
      }
    )
  }

  /** 前往網址 */
  gotoWebLink(link): void {
    window.open(link, '_blank');
  }

  activeIndexChange(index: number): void {
    document.getElementById('content').scroll({
      top: document.getElementById(this.travelSchedule.day_introduces[index].title).offsetTop - 110,
      behavior: 'smooth'
    })
  }
}
