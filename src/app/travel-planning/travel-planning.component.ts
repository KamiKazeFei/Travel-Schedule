import { Component } from '@angular/core';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { TravelDayIntroduce, TravelSchedule } from '../model/travel-schesule.model';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-travel-planning',
  templateUrl: './travel-planning.component.html',
  styleUrls: ['./travel-planning.component.css']
})
export class TravelPlanningComponent {

  constructor(
    protected commonService: CommonService,
    protected confirmationService: ConfirmationService,
    private config: PrimeNGConfig
  ) { }

  /** 現在時間 */
  now = new Date();
  /** 行程清單 */
  travelScheduleData: TravelSchedule[] = [];
  /** 行程 */
  schedule: TravelSchedule;
  /** 已選取行程 */
  selectedSchedule: TravelSchedule;
  /** 原選取行程 */
  oriSchedule: TravelSchedule;
  /** 設定基本資訊 */
  basicInfoSettingDialog = false;
  /** 是否為建立中 */
  isCreating = false;
  /** 是否編輯中 */
  isEditMode = false;
  /** 建立步驟 */
  creatingStep: number = 1
  /** 日曆多語 */
  calendarLocale: Object;


  /** 初始化 */
  async ngOnInit(): Promise<void> {
    this.calendarLocale = this.commonService.getCalendarLocale();
    this.config.setTranslation(this.calendarLocale);
    this.commonService.setBlock(true);
    await this.getTravelScheduleData()
    this.commonService.setBlock(false);
  }

  /** 查詢旅行計畫 */
  async getTravelScheduleData(): Promise<void> {

  }

  /** 新增計畫 */
  create(): void {
    this.schedule = new TravelSchedule();
    this.schedule.start_date = new Date();
    this.schedule.end_date = new Date()
    this.schedule.end_date.setDate(this.schedule.end_date.getDate() + 5);
    this.schedule.pass_day = 5;
    this.creatingStep = 1;
    this.isCreating = true;
    this.basicInfoSettingDialog = true;
  }

  /** 繼續建立的下一步 */
  gotoNextStep(): void {
    this.basicInfoSettingDialog = false;
    this.creatingStep++;
    for (let i = 0; i < this.schedule.pass_day; i++) {
      const date = new Date(this.schedule.start_date.getFullYear(), this.schedule.start_date.getMonth(), this.schedule.start_date.getDate() + i);
      const dayIntroudece = new TravelDayIntroduce();
      dayIntroudece.schedule_pk_id = this.schedule.pk_id;
      dayIntroudece.date = date;
      this.schedule.day_introduces.push(dayIntroudece);
    }
    this.schedule.selected_introduce = this.schedule.day_introduces[0];
    this.isEditMode = true;
  }

  /** 異動起訖日期 */
  changeTravelDate(mode: string): void {
    switch (mode) {
      case 'date':
        if (this.schedule.start_date && this.schedule.end_date) {
          this.schedule.pass_day = Math.floor((this.schedule.end_date.getTime() - this.schedule.start_date.getTime()) / 1000 / 60 / 60 / 24);
        }
        break;
      case 'day':
        if (this.schedule.start_date && this.schedule.pass_day) {
          this.schedule.end_date = new Date(this.schedule.start_date.getFullYear(), this.schedule.start_date.getMonth(), this.schedule.start_date.getDate() + this.schedule.pass_day);
        }
        break;
    }
  }

  /** 編輯基本資訊 */
  openEditBasicInfo(): void {
    this.selectedSchedule = JSON.parse(JSON.stringify(this.schedule));
    this.basicInfoSettingDialog = true;
  }

  /** 確認儲存 */
  confirmSave(mode?: string) {
    switch (mode) {
      case 'basicInfo':
        if ((JSON.stringify(this.schedule) !== JSON.stringify(this.selectedSchedule))) {
          this.confirmationService.confirm({
            header: '確認',
            message: '未超出天數的資料將被保存並更改日期，超出旅程天數的資料將直接移除，確定要更新行程日期，',
            accept: () => {
              const length = this.schedule.day_introduces.length;
              this.schedule.day_introduces = this.schedule.day_introduces.slice(0, this.schedule.pass_day);
              for (let i = 0; i < this.schedule.pass_day; i++) {
                const date = new Date(this.schedule.start_date.getFullYear(), this.schedule.start_date.getMonth(), this.schedule.start_date.getDate() + i);
                if (i < length) {
                  this.schedule.day_introduces[i].date = date;
                } else {
                  const dayIntroudece = new TravelDayIntroduce();
                  dayIntroudece.schedule_pk_id = this.schedule.pk_id;
                  dayIntroudece.date = date;
                  this.schedule.day_introduces.push(dayIntroudece);
                }
              }
            }
          })
        } else {
          this.basicInfoSettingDialog = false;
          this.selectedSchedule = null;
        }
        break;
      default:
        if (this.isCreating || (!this.isCreating && (JSON.stringify(this.schedule) !== JSON.stringify(this.oriSchedule)))) {
          this.confirmationService.confirm({
            header: '確認',
            message: this.isCreating ? '確認要取消建立新行程?' : '尚有資料尚未儲存，確定要離開編輯介面?',
            accept: () => {
              this.cancel();
            }
          })
        } else {
          this.cancel()
        }
        break
    }
  }

  /** 確認儲存 */
  confirmCancel(mode?: string) {
    switch (mode) {
      case 'basicInfo':
        if ((JSON.stringify(this.schedule) !== JSON.stringify(this.selectedSchedule))) {
          this.confirmationService.confirm({
            header: '確認',
            message: '確定不儲存已更動資訊就離開?',
            accept: () => {
              this.schedule = JSON.parse(JSON.stringify(this.selectedSchedule))
            }
          })
        } else {
          this.basicInfoSettingDialog = false;
          this.selectedSchedule = null;
        }
        break;
      default:
        if (this.isCreating || (!this.isCreating && (JSON.stringify(this.schedule) !== JSON.stringify(this.oriSchedule)))) {
          this.confirmationService.confirm({
            header: '確認',
            message: this.isCreating ? '確認要取消建立新行程?' : '尚有資料尚未儲存，確定要離開編輯介面?',
            accept: () => {
              this.cancel();
            }
          })
        } else {
          this.cancel()
        }
        break
    }
  }

  /** 儲存 */
  save() {

  }

  /** 取消 */
  async cancel(): Promise<void> {
    this.basicInfoSettingDialog = false;
    this.isCreating = false;
    this.isEditMode = false;
    this.creatingStep = 1;
    this.schedule = null;
    this.oriSchedule = null;
    await this.getTravelScheduleData();
  }

  /** 按鈕無效判斷 */
  disabelBtn(mode: string): boolean {
    switch (mode) {
      // 初始化專案內容
      case 'schedule_init':
        return this.schedule.title && this.schedule.start_date && this.schedule.end_date && (this.schedule.start_date.getTime() <= this.schedule.end_date.getTime()) ? false : true;
      case 'save':
        return this.schedule.title ? false : true;
      default:
        return false;
    }
  }
}

