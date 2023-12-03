import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { TravelCostRecord, TravelDayIntroduce, TravelDaySchedule, TravelSchedule } from '../model/travel-schesule.model';
import { CommonService } from '../service/common.service';
import { TravelScheduleService } from '../service/travel-schedule.service';

@Component({
  selector: 'app-travel-schedule-list',
  templateUrl: './travel-schedule-list.component.html',
  styleUrls: ['./travel-schedule-list.component.css']
})
export class TravelScheduleListComponent {

  /** 建構子 */
  constructor(
    protected router: Router,
    private commonService: CommonService,
    protected travelScheduleService: TravelScheduleService,
    protected confirmationService: ConfirmationService,
    private config: PrimeNGConfig
  ) { }

  /** 旅行計畫清單 */
  travelScheduleList: TravelSchedule[] = [];
  /** 編輯行程基本資訊視窗 */
  scheduleEditDialog = false;
  /** 選取行程 */
  schedule: TravelSchedule;
  /** 原選取行程 */
  oriSchedule: TravelSchedule;
  /** 現在時間 */
  now = new Date();
  /** 已選取行程 */
  selectedSchedule: TravelSchedule;
  /** 設定基本資訊 */
  basicInfoSettingDialog = false;
  /** 是否為建立中 */
  isCreating = false;
  /** 是否編輯中 */
  isEditMode = false;
  /** 建立步驟 */
  creatingStep: number = 0
  /** 日曆多語 */
  calendarLocale: Object;
  /** 顯示頁籤 */
  activeIndex = 0;
  /* 顯示模式 **/
  mode: string;
  /** 編輯模式 */
  modeOptions = [
    { label: '行程安排', value: 'schedule' },
    { label: '預算紀錄表', value: 'cost_record' }
  ];
  /** 花費類型陣列 */
  costTypeOptions = [
    { label: '機票/車票', value: 'A' },
    { label: '住宿', value: 'B' },
    { label: '景點', value: 'C' },
    { label: '交通', value: 'D' },
    { label: '餐食', value: 'E' },
    { label: '禮物/伴手禮', value: 'F' },
    { label: '其他', value: 'G' }
  ];

  /** 初始化 */
  async ngOnInit(): Promise<void> {
    this.calendarLocale = this.commonService.getCalendarLocale();
    this.config.setTranslation(this.calendarLocale);
    this.commonService.setBlock(true);
    await this.getTravelScheduleData()
  }

  /** 查詢旅行計畫 */
  async getTravelScheduleData(queryObj?: Object): Promise<void> {
    await this.travelScheduleService.getTravelList(queryObj).forEach(
      async res => {
        if (this.commonService.afterServerResponse(res)) {
          const data = res.data as TravelSchedule[];
          data.forEach(ele => {
            ele.start_date = new Date(ele.start_date);
            ele.end_date = new Date(ele.end_date);
          })
          this.travelScheduleList = data;
        }
      }
    )
  }

  /** 僅查單一個行程計畫 */
  async getTravelSchedule(pk_id: string): Promise<void> {
    await this.travelScheduleService.getTravelSchedule(pk_id).forEach(
      res => {
        if (this.commonService.afterServerResponse(res)) {
          const data = res.data as TravelSchedule[];
          data.forEach(ele => {
            ele.start_date = new Date(ele.start_date);
            ele.end_date = new Date(ele.end_date);

            ele.day_introduces.forEach((val, index) => {
              val.date = new Date(val.date);
              val.schedule_list.forEach((val2, i) => {
                val2.ser_no = (i + 1);
              })
            })
            ele.day_introduces.sort((a, b) => a.date.getTime() - b.date.getTime());
          })
          this.activeIndex = 0;
          /** 是否要初始化選取行程 */
          let changeFlag = true
          if (this.schedule && this.schedule.selected_introduce) {
            data[0].selected_introduce = { ...this.schedule.selected_introduce };
            changeFlag = false
          }
          if (!this.mode) {
            this.mode = this.modeOptions[0].value;
          }
          this.schedule = data[0];
          this.oriSchedule = JSON.parse(JSON.stringify(data[0]));
          if (!this.schedule.selected_introduce && changeFlag) {
            this.schedule.selected_introduce = this.schedule.day_introduces[0];
          }
          this.isEditMode = true;
        }
      }
    )
  }

  /** 儲存旅行計畫 */
  async saveTravelScheduleData(schedule: TravelSchedule): Promise<void> {
    await this.travelScheduleService.saveTravelSchedule(schedule).forEach(
      async res => {
        if (this.commonService.afterServerResponse(res)) {
          this.commonService.showMsg('s', '已更新資訊!')
          await this.getTravelScheduleData();
        }
      }
    )
  }

  /** 移除行程 */
  deleteSchedule(schedule: TravelSchedule): void {
    this.confirmationService.confirm({
      header: '【刪除】確認',
      message: '您確定要刪除【' + schedule.title + '】行程計畫?',
      accept: async () => {
        schedule.isdelete = 'Y'
        this.commonService.setBlock(true);
        await this.saveTravelScheduleData(schedule);
        this.commonService.setBlock(false);
      }
    })
  }

  /** 開啟 / 關閉行程設定視窗 */
  async setEditScheduleDialog(action: boolean, schedule?: TravelSchedule): Promise<void> {
    if (action) {
      this.scheduleEditDialog = true;
      await this.getTravelScheduleData({ pk_id: schedule.pk_id });
    } else {

    }
  }

  /** 新增計畫 */
  create(): void {
    this.selectedSchedule = new TravelSchedule();
    this.selectedSchedule.start_date = this.commonService.setDateDetailToZero(new Date());
    this.selectedSchedule.end_date = this.commonService.setDateDetailToZero(new Date());
    this.selectedSchedule.end_date.setDate(this.selectedSchedule.end_date.getDate() + 5);
    this.selectedSchedule.pass_day = 5;
    this.creatingStep = 1;
    this.isCreating = true;
    this.basicInfoSettingDialog = true;
  }

  /** 繼續建立的下一步 */
  gotoNextStep(): void {
    this.basicInfoSettingDialog = false;
    this.schedule = { ...this.selectedSchedule };
    this.creatingStep++;
    for (let i = 0; i < (this.schedule.pass_day === 0 ? 1 : this.schedule.pass_day); i++) {
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
        if (this.selectedSchedule.start_date && this.selectedSchedule.end_date) {
          this.selectedSchedule.pass_day = Math.floor((this.selectedSchedule.end_date.getTime() - this.selectedSchedule.start_date.getTime()) / 1000 / 60 / 60 / 24);
          if (this.selectedSchedule.pass_day < 0) {
            this.commonService.showMsg('i', '旅行日程不得小於0，已自動調整為適當日期!')
            this.selectedSchedule.pass_day = 0
            this.selectedSchedule.end_date = this.commonService.setDateDetailToZero(
              new Date(this.selectedSchedule.start_date.getFullYear(),
                this.selectedSchedule.start_date.getMonth(),
                this.selectedSchedule.start_date.getDate() + this.selectedSchedule.pass_day)
            );
          }
        }
        break;
      case 'day':
        if (this.selectedSchedule.start_date && this.selectedSchedule.pass_day !== undefined && this.selectedSchedule.pass_day !== null) {
          this.selectedSchedule.end_date = this.commonService.setDateDetailToZero(
            new Date(this.selectedSchedule.start_date.getFullYear(),
              this.selectedSchedule.start_date.getMonth(),
              this.selectedSchedule.start_date.getDate() + this.selectedSchedule.pass_day)
          );
        }
        break;
    }
  }

  /** 編輯基本資訊 */
  openEditBasicInfo(): void {
    this.selectedSchedule = { ...this.schedule };
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
              this.schedule = { ...this.selectedSchedule };
              this.basicInfoSettingDialog = false;
              const length = (this.schedule.end_date.getTime() - this.schedule.start_date.getTime()) / 1000 / 60 / 60 / 24;
              this.schedule.end_date = new Date(this.schedule.start_date.getFullYear(), this.schedule.start_date.getMonth(), this.schedule.start_date.getDate() + length);

              this.schedule.day_introduces.forEach((ele, i) => ele.date.getTime() > this.schedule.end_date.getTime() ? ele.isdelete = 'Y' : null);
              this.schedule.day_introduces = this.schedule.day_introduces.filter(ele => !(ele.isdelete === 'Y' && !ele.create_dt));

              for (let i = 0; i <= length; i++) {
                const date = new Date(this.schedule.start_date.getFullYear(), this.schedule.start_date.getMonth(), this.schedule.start_date.getDate() + i);
                if (this.schedule.day_introduces[i]) {
                  this.schedule.day_introduces[i].date = date;
                } else {
                  const dayIntroudece = new TravelDayIntroduce();
                  dayIntroudece.schedule_pk_id = this.schedule.pk_id;
                  dayIntroudece.date = date;
                  this.schedule.day_introduces.push(dayIntroudece);
                }
              }
              this.schedule.selected_introduce = this.schedule.day_introduces[0];
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
            message: '確認要儲存資料嗎?',
            accept: () => {
              this.save();
            }
          })
        } else {
          this.commonService.showMsg('i', '資料無異動');
        }
        break
    }
  }

  /** 確認儲存 */
  confirmCancel(mode?: string) {
    const tempSchedule = JSON.parse(JSON.stringify(this.schedule))
    const tempOriSchedule = JSON.parse(JSON.stringify(this.schedule))
    delete tempSchedule.selected_introduce
    delete tempOriSchedule.selected_introduce
    switch (mode) {
      case 'basicInfo':
        if ((JSON.stringify(tempSchedule) !== JSON.stringify(tempOriSchedule))) {
          this.confirmationService.confirm({
            header: '確認',
            message: '確定不儲存已更動資訊就離開?',
            accept: () => {
              this.basicInfoSettingDialog = false;
              this.selectedSchedule = null;
            }
          })
        } else {
          this.basicInfoSettingDialog = false;
          this.selectedSchedule = null;
        }
        break;
      default:

        if (this.isCreating || (!this.isCreating && (JSON.stringify(tempSchedule) !== JSON.stringify(tempOriSchedule)))) {
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

  /** 建立新行程 */
  createDayIntroduce(): void {
    const scheduleIntroduce = new TravelDaySchedule();
    scheduleIntroduce.introduce_pk_id = this.schedule.selected_introduce.pk_id;
    this.schedule.selected_introduce.schedule_list.push(scheduleIntroduce)
    this.schedule.selected_introduce.schedule_list.forEach((ele, i) => ele.ser_no = (i + 1));
    setTimeout(() => {
      const element = document.getElementById('dayPerScheduleList');
      if (element) {
        element.scrollTo({
          top: element.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 100)
  }

  /** 建立預算紀錄 */
  createCostRecord(): void {
    const costRecord = new TravelCostRecord();
    costRecord.schedule_pk_id = this.schedule.pk_id;
    if (!this.schedule.cost_records) {
      this.schedule.cost_records = []
    }
    this.schedule.cost_records.push(costRecord);
  }

  /** 移除預算紀錄 */
  deleteCostRecord(data: TravelCostRecord): void {
    data.create_dt ? data.isdelete = 'Y' : (this.schedule.cost_records = this.schedule.cost_records.filter(ele => ele.pk_id !== data.pk_id));
  }

  /** 計算花費成本 */
  calcuteCost(record: TravelCostRecord): void {
    if (record.exchange_rate !== undefined && record.exchange_rate !== null) {
      record.exchange_rate = Number(record.exchange_rate.toFixed(5));
    }
    if (record.cost !== undefined && record.cost !== null && record.exchange_rate !== undefined && record.exchange_rate !== null) {
      record.final_cost = Number((record.cost * record.exchange_rate).toFixed(2));
    }
    const initValue = 0;
    this.schedule.real_cost = Number((this.schedule.cost_records.filter(ele => ele.isdelete !== 'Y').reduce((acc, ele) => acc + ele.final_cost, initValue)).toFixed(2));
  }

  /** 移動行程安排順序 */
  changeScheduleOrder(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.schedule.selected_introduce.schedule_list, event.previousIndex, event.currentIndex);
    this.schedule.selected_introduce.schedule_list.forEach((ele, i) => ele.ser_no = (i + 1));
  }

  /** 移除單一天內的指定行程 */
  deleteDaysSchedule(index: number): void {
    this.schedule.selected_introduce.schedule_list = this.schedule.selected_introduce.schedule_list.filter((ele, i) => i !== index);
    this.schedule.selected_introduce.schedule_list.forEach((ele, i) => ele.ser_no = (i + 1));
  }

  /** 儲存 */
  async save(): Promise<void> {
    this.commonService.setBlock(true)
    await this.travelScheduleService.saveTravelSchedule(this.schedule).forEach(
      async res => {
        this.commonService.setBlock(false)
        if (this.commonService.afterServerResponse(res)) {
          this.commonService.showMsg('s', '儲存成功');
          await this.getTravelSchedule(this.schedule.pk_id);
        }
      }
    )
  }

  /** 取消 */
  async cancel(): Promise<void> {
    this.basicInfoSettingDialog = false;
    this.isCreating = false;
    this.isEditMode = false;
    this.creatingStep = 0;
    this.schedule = null;
    this.oriSchedule = null;
    this.mode = null
    await this.getTravelScheduleData();
  }

  /** 按鈕無效判斷 */
  disabelBtn(mode: string): boolean {
    switch (mode) {
      // 初始化行程內容
      case 'schedule_init':
        const schedule = this.selectedSchedule;
        return (
          schedule.title && schedule.start_date && schedule.end_date &&
          schedule.description && (schedule.start_date.getTime() <= schedule.end_date.getTime())
        ) ? false : true;
      case 'save':
        return this.schedule.title ? false : true;
      default:
        return false;
    }
  }

  /** 回傳未刪除資料 */
  returnNotDeleteData(data: any[]): any[] {
    return data.filter(ele => ele.isdelete !== 'Y');
  }
}
