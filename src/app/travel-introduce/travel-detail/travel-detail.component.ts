import { Component, Input } from '@angular/core';
import { TravelDaySchedule, TravelSchedule } from 'src/app/model/travel-schesule.model';


@Component({
  selector: 'app-travel-detail',
  templateUrl: './travel-detail.component.html',
  styleUrls: ['./travel-detail.component.css']
})
export class TravelDetailComponent {

  @Input() travelDaySchedules: TravelDaySchedule[];

  /** 前往網址 */
  gotoWebLink(link: string): void {
    window.open(link, '_blank');
  }
}
