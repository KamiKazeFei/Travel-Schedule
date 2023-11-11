import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelIntroduceComponent } from './travel-introduce/travel-introduce.component';

const routes: Routes = [
  { path: '', component: TravelIntroduceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
