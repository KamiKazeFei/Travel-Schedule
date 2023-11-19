import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor() { }

  blockEmitter: Subject<boolean> = new Subject<boolean>();

  msgEmitter: Subject<Object> = new Subject<Object>();

  /** 設定遮罩 */
  setBlock(action: boolean): void {
    this.blockEmitter.next(action)
  }

  /** 顯示訊息 */
  setMsg(mode: string, msg: string): void {
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
}
