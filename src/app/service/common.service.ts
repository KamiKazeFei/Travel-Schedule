import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }
  /** 載入發布 */
  blockEmitter: Subject<boolean> = new Subject<boolean>();
  /** 訊息發布 */
  msgEmitter: Subject<Object> = new Subject<Object>();
  /** 登入狀態更新發布 */
  loginStatusEmitter: Subject<boolean> = new Subject<boolean>();

  /** 設定遮罩 */
  setBlock(action: boolean): void {
    this.blockEmitter.next(action)
  }

  /** 顯示訊息 */
  showMsg(mode: string, msg: string): void {
    const obj = { detail: msg };
    switch (mode) {
      case 's':
        obj['severity'] = 'success';
        break;
      case 'i':
        obj['severity'] = 'info';
        break;
      case 'w':
        obj['severity'] = 'warn';
        break;
      case 'e':
        obj['severity'] = 'error';
        break;
    }
    this.msgEmitter.next(obj);
  }

  /** 補零 */
  paddingZero(str: string, length = 2): string {
    while (str.length < length) {
      str = '0' + str;
    }
    return str;
  }

  /** 設定日期時分秒為0 */
  setDateDetailToZero(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
  }

  /** 接收Server回應後處理 */
  afterServerResponse(request: any): boolean {
    this.setBlock(false);
    // 回傳錯誤訊息
    if (request.error) {
      this.showMsg('e', request.error_detail);
      return false;
    }
    // 正常處裡
    else {
      return true;
    }
  }

  /** 回傳日曆多語 */
  getCalendarLocale(): Object {
    return {
      "firstDayOfWeek": 0,
      "dayNames": ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      "dayNamesShort": ["日", "一", "二", "三", "四", "五", "六"],
      "dayNamesMin": ["日", "一", "二", "三", "四", "五", "六"],
      "monthNames": [
        "一月", "二月", "三月", "四月", "五月", "六月",
        "七月", "八月", "九月", "十月", "十一月", "十二月"
      ],
      "monthNamesShort": [
        "一月", "二月", "三月", "四月", "五月", "六月",
        "七月", "八月", "九月", "十月", "十一月", "十二月"
      ],
      "today": "今天",
      "clear": "清除"
    }
  }

  /** 是否為測試區 */
  isTestArea(): boolean {
    return false;
    // return true;
    // return !location.hostname.toLowerCase().includes('kamikaze');    
  }

  /** 設定Cookies */
  setCookie(cookieName: string, cookieValue: string, expirationDays = 14) {
    this.clearAllCookie();
    const d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();
    let cookieString = cookieName + "=" + cookieValue + ";" + expires + ";path=/;";
    document.cookie = cookieString;
  }

  /** 請除所有Cookies */
  clearAllCookie() {
    const date = new Date();
    date.setTime(date.getTime() - 10000);
    var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
    if (keys) {
      for (var i = keys.length; i--;)
        document.cookie = keys[i] + "=0; expire=" + date.toUTCString() + "; path=/";
    }
  }
}
