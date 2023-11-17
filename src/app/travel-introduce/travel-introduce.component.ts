import { Component } from '@angular/core';
import AOS from 'aos';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TravelScheduleService } from '../service/travel-schedule.service';
import { TravelDayIntroduce, TravelSchedule } from '../model/travel-schesule.model';

@Component({
  selector: 'app-travel-introduce',
  templateUrl: './travel-introduce.component.html',
  styleUrls: ['./travel-introduce.component.css'],
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0,
        visibility: 'hidden'
      })),
      state('*', style({
        opacity: 1,
        visibility: 'visible'
      })),
      transition('void <=> *', animate('0.5s'))
    ])
  ]
})
export class TravelIntroduceComponent {

  constructor(protected travelScheduleService: TravelScheduleService) { }

  /** 旅行計畫 */
  travelSchedule: TravelSchedule;

  /** 初始化 */
  ngOnInit() {
    AOS.init();
    this.travelSchedule = this.travelScheduleService.getTravelSchedule();
  }

  /** 前往網址 */
  gotoWebLink(link): void {
    window.open(link, '_blank');
  }

  activeIndexChange(index: number): void {
    document.getElementById('content').scroll({
      top: document.getElementById(this.travelSchedule[index].title).offsetTop - 110,
      behavior: 'smooth'
    })
  }
}
