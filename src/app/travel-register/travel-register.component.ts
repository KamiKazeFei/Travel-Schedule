import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CommonService } from '../service/common.service';
import { TravelScheduleService } from '../service/travel-schedule.service';
import { sha256 } from 'js-sha256';
import { Router } from '@angular/router';

@Component({
  selector: 'app-travel-register',
  templateUrl: './travel-register.component.html',
  styleUrls: ['./travel-register.component.css']
})
export class TravelRegisterComponent {

  constructor(
    private commonService: CommonService,
    protected travelScheduleService: TravelScheduleService,
    protected rounter: Router
  ) { }

  /** 註冊資訊 */
  registerInfo: { account: string, email: string, password: string } = {} as any;
  /** 密碼檢視類型 */
  passwordCheckMode: 'text' | 'password' = 'password';

  /** 執行註冊 */
  async executeRegister(loginForm: NgForm): Promise<void> {
    if (loginForm.valid) {
      const registerInfo = { ...this.registerInfo };
      registerInfo.password = sha256(registerInfo.password);
      this.commonService.setBlock(true);
      await this.travelScheduleService.registerAccount(registerInfo).forEach(
        res => {
          if (this.commonService.afterServerResponse(res)) {
            this.commonService.showMsg('s', '註冊成功，為您導向登入畫面');
            setTimeout(() => {
              this.rounter.navigate(['/login']);
            }, 2000)
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
