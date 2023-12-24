import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TravelHomeComponent } from './travel-home/travel-home.component';
import { TravelLoginComponent } from './travel-login/travel-login.component';
import { loginGuard } from './login.guard';
import { TravelScheduleListComponent } from './travel-schedule-list/travel-schedule-list.component';
import { TravelRegisterComponent } from './travel-register/travel-register.component';

/** 路由器設定 */
const routes: Routes = [
  { path: 'home', component: TravelHomeComponent, canActivate: [loginGuard] },
  { path: 'schedule_list', component: TravelScheduleListComponent, canActivate: [loginGuard] },
  { path: 'login', component: TravelLoginComponent },
  { path: 'register', component: TravelRegisterComponent },
  { path: '', redirectTo: 'schedule_list', pathMatch: 'full' }, // 重定向到 introduce
  { path: '**', redirectTo: 'schedule_list' } // 其他未匹配路径也重定向到 introduce
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
