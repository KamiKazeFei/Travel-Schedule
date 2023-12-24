import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from './service/common.service';
import { MenuService } from './service/menu.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from './service/api.service';
import { TravelScheduleService } from './service/travel-schedule.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
      transition(':enter', [
        animate('0.25s')
      ]),
      transition(':leave', [
        animate('0.25s')
      ])
    ])
  ]
})
export class AppComponent {
  title = 'travel-introduce';

  constructor(
    protected translateService: TranslateService,
    protected changeDef: ChangeDetectorRef,
    protected commonService: CommonService,
    protected menuService: MenuService,
    protected router: Router,
    private messageService: MessageService,
    protected confirmationService: ConfirmationService,
    protected travelScheduleService: TravelScheduleService
  ) {
    this.blockSubscriper = this.commonService.blockEmitter.subscribe(val => {
      this.block = val;
      this.changeDef.detectChanges();
    });
    this.msgSubscriper = this.commonService.msgEmitter.subscribe(val => {
      this.messageService.add(val);
    })
    this.loginStatusSubscriper = this.commonService.loginStatusEmitter.subscribe(val => {
      this.isLogin = val;
    })
  }

  /** 是否登入 */
  isLogin = true;
  /** 訊息訂閱器 */
  msgSubscriper: Subscription;
  /** 黑屏訂閱 */
  blockSubscriper: Subscription;
  /** 登入狀態確認訂閱器 */
  loginStatusSubscriper: Subscription;
  /** 黑屏 */
  block = false
  /** 選單 */
  menu = [
    { label: '我的行程列表', url: 'schedule_list', isLogin: true },
    { label: '登出', url: 'logout', isLogin: true },
    { label: '登入', url: 'login', isLogin: false },
    { label: '註冊', url: 'register', isLogin: false }
  ];

  /** 初始化 */
  ngOnInit() {
    this.translateService.setDefaultLang('zh-TW');
  }

  /** 關閉網頁 */
  ngOnDestroy() {
    this.blockSubscriper.unsubscribe();
    this.msgSubscriper.unsubscribe();
  }

  /** 切換索引 */
  goto(url: string): void {
    this.router.navigate(['/' + url]);
  }

  /** 前往GoogleMap */
  gotoGoogleMap(): void {
    this.confirmationService.confirm({
      header: '確認',
      message: '是否確認要前往Google Map',
      accept: () => {
        window.open('https://www.google.com.tw/maps', '_blank');
      }
    })
  }
}
