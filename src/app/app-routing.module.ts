import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelIntroduceComponent } from './travel-introduce/travel-introduce.component';
import { TravelCostRecordComponent } from './travel-cost-record/travel-cost-record.component';
import { TravelPlanningComponent } from './travel-planning/travel-planning.component';

const routes: Routes = [
  { path: 'introduce', component: TravelIntroduceComponent },
  { path: 'cost', component: TravelCostRecordComponent },
  { path: 'planning', component: TravelPlanningComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
