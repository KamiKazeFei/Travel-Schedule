import { Component } from '@angular/core';
import { TravelSchedule } from '../model/travel-schesule.model';
import { TravelScheduleService } from '../service/travel-schedule.service';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

import AOS from 'aos';

@Component({
  selector: 'app-travel-timeline',
  templateUrl: './travel-timeline.component.html',
  styleUrls: ['./travel-timeline.component.css'],
})
export class TravelTimelineComponent {

  constructor(protected travelScheduleService: TravelScheduleService) { }

  /** 旅行計畫 */
  travelSchedule: TravelSchedule;

  /** 初始化 */
  ngOnInit() {
    AOS.init();
    this.travelSchedule = this.travelScheduleService.getTravelSchedule();
  }

  /** 移動 */
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.travelSchedule.day_introduces, event.previousIndex, event.currentIndex);
  }
}
