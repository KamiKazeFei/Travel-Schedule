import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { sha256 } from 'js-sha256';
import { CommonService } from '../service/common.service';
import { TravelScheduleService } from '../service/travel-schedule.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel-login',
  templateUrl: './travel-login.component.html',
  styleUrls: ['./travel-login.component.css']
})
export class TravelLoginComponent {

  constructor(
    private commonService: CommonService,
    protected travelScheduleService: TravelScheduleService,
    protected rounter: Router
  ) { }

  /** 登入資訊 */
  loginInfo: { login_id: string, password: string } = {} as any;
  /** 密碼檢視類型 */
  passwordCheckMode: 'text' | 'password' = 'password';

  /** 執行登入 */
  async executeLogin(loginForm: NgForm): Promise<void> {
    if (loginForm.valid) {
      const loginInfo = { ...this.loginInfo };
      loginInfo.password = sha256(loginInfo.password);
      this.commonService.setBlock(true);
      await this.travelScheduleService.login(loginInfo).forEach(
        res => {
          if (this.commonService.afterServerResponse(res)) {
            this.commonService.showMsg('s', '登入成功');
            setTimeout(() => {
              this.rounter.navigate(['/schedule_list']);
            }, 500)
          }
        }
      )
      this.commonService.setBlock(false);
    }
  }

  /** 檢視密碼 */
  setPasswordViewable(): void {
    this.passwordCheckMode === 'password' ? this.passwordCheckMode = 'text' : this.passwordCheckMode = 'password'
  }
}
