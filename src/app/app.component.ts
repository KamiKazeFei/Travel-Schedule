import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CommonService } from './service/common.service';
import { MenuService } from './service/menu.service';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';

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
    private messageService: MessageService
  ) {
    this.blockSubscriper = this.commonService.blockEmitter.subscribe(val => {
      this.block = val;
      this.changeDef.detectChanges();
    });
    this.msgSubscriper = this.commonService.msgEmitter.subscribe(val => {
      this.messageService.add(val);
    })
  }

  /** 訊息訂閱器 */
  msgSubscriper: Subscription;
  /** 黑屏訂閱 */
  blockSubscriper: Subscription;
  /** 黑屏 */
  block = false
  /** 選單 */
  menu: any[];

  /** 初始化 */
  ngOnInit() {
    this.menu = this.menuService.getMenu();
    this.translateService.setDefaultLang('zh-TW');
  }

  /** 關閉網頁 */
  ngOnDestroy() {
    this.blockSubscriper.unsubscribe();
    this.msgSubscriper.unsubscribe();
  }

  /** 切換索引 */
  activeIndexChange(index: number): void {
    this.router.navigate(['/' + this.menu[index]]);
  }
}
