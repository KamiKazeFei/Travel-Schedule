import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { TravelCostRecord, TravelDayIntroduce, TravelDaySchedule, TravelSchedule } from '../model/travel-schesule.model';
import { CommonService } from '../service/common.service';
import { TravelScheduleService } from '../service/travel-schedule.service';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { DatePipe, DecimalPipe } from '@angular/common';
import jsPDF, { GState } from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-travel-schedule-list',
  templateUrl: './travel-schedule-list.component.html',
  styleUrls: ['./travel-schedule-list.component.css'],
  providers: [DecimalPipe, DatePipe]
})
export class TravelScheduleListComponent {

  /** 建構子 */
  constructor(
    protected router: Router,
    private commonService: CommonService,
    protected travelScheduleService: TravelScheduleService,
    protected confirmationService: ConfirmationService,
    private config: PrimeNGConfig,
    private decimalPipe: DecimalPipe,
    private datePipe: DatePipe
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
  /** 檢視分析圖表 */
  costAnanalysisDialog = false;
  /** 圖表載入 */
  chartLoading = false;
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
    if (this.commonService.isTestArea()) {
      const cookieValue = document.cookie.split("; ").find((row) => row.startsWith("schedule_list="))?.split("=")[1];
      cookieValue ? this.travelScheduleList = JSON.parse(cookieValue) : this.travelScheduleList = [];
      this.commonService.setBlock(false);
    } else {
      await this.travelScheduleService.getTravelList(queryObj).forEach(
        async res => {
          if (this.commonService.afterServerResponse(res)) {
            const data = res.data as TravelSchedule[];
            data.forEach(ele => {
              ele.start_date = new Date(ele.start_date);
              ele.end_date = new Date(ele.end_date);
            })
            this.travelScheduleList = data;
            this.commonService.setBlock(false);
          }
        }
      )
    }
  }

  /** 僅查單一個行程計畫 */
  async getTravelSchedule(pk_id: string): Promise<void> {
    // 測試區
    if (this.commonService.isTestArea()) {
      this.schedule = JSON.parse(JSON.stringify(this.travelScheduleList.find(ele => ele.pk_id === pk_id)));
      this.oriSchedule = JSON.parse(JSON.stringify(this.travelScheduleList.find(ele => ele.pk_id === pk_id)));

      // 處理查詢檔
      this.schedule.start_date = new Date(this.schedule.start_date)
      this.schedule.end_date = new Date(this.schedule.end_date)
      this.schedule.cost_records = this.schedule.cost_records.map(ele => ({ ...ele }))
      this.schedule.day_introduces = this.schedule.day_introduces.map(ele => {
        const obj = Object.assign({}, ele);
        obj.schedule_list = obj.schedule_list.map(val => ({ ...val }));
        return obj
      })

      this.schedule.selected_introduce = this.schedule.day_introduces[0];

      // 複製原檔
      this.oriSchedule.start_date = new Date(this.oriSchedule.start_date)
      this.oriSchedule.end_date = new Date(this.oriSchedule.end_date)
      this.oriSchedule.cost_records = this.oriSchedule.cost_records.map(ele => ({ ...ele }))
      this.oriSchedule.day_introduces = this.oriSchedule.day_introduces.map(ele => {
        const obj = Object.assign({}, ele);
        obj.schedule_list = obj.schedule_list.map(val => ({ ...val }));
        return obj
      })

      this.schedule.day_introduces.forEach(ele => {
        ele.date = new Date(ele.date);
      })


      if (!this.mode) {
        this.mode = this.modeOptions[0].value;
      }
      this.isEditMode = true;
    }
    // 正式環境
    else {
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
    this.mode = 'schedule'
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
          this.selectedSchedule.pass_day = Math.floor((this.selectedSchedule.end_date.getTime() - this.selectedSchedule.start_date.getTime()) / 1000 / 60 / 60 / 24) - 1;
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
              this.selectedSchedule.start_date.getDate() + this.selectedSchedule.pass_day - 1)
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
              this.selectedSchedule.pass_day = Math.floor((this.selectedSchedule.end_date.getTime() - this.selectedSchedule.start_date.getTime()) / 1000 / 60 / 60 / 24);
              this.schedule.end_date = new Date(this.schedule.start_date.getFullYear(), this.schedule.start_date.getMonth(), this.schedule.start_date.getDate() + this.selectedSchedule.pass_day);

              this.schedule.day_introduces.forEach((ele, i) => ele.date.getTime() > this.schedule.end_date.getTime() ? ele.isdelete = 'Y' : null);
              this.schedule.day_introduces = this.schedule.day_introduces.filter(ele => !(ele.isdelete === 'Y' && !ele.create_dt));
              for (let i = 0; i <= this.selectedSchedule.pass_day; i++) {
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

    switch (mode) {
      case 'basicInfo':
        const tempSchedule = JSON.parse(JSON.stringify(this.schedule))
        const tempOriSchedule = JSON.parse(JSON.stringify(this.oriSchedule))
        delete tempSchedule.selected_introduce
        delete tempOriSchedule.selected_introduce
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
        if (this.isCreating) {
          this.confirmationService.confirm({
            header: '確認',
            message: this.isCreating ? '確認要取消建立新行程?' : '尚有資料尚未儲存，確定要離開編輯介面?',
            accept: () => {
              this.cancel();
            }
          })
        } else {
          const tempSchedule: TravelSchedule = JSON.parse(JSON.stringify(this.schedule))
          const tempOriSchedule: TravelSchedule = JSON.parse(JSON.stringify(this.oriSchedule))
          delete tempSchedule.selected_introduce
          delete tempOriSchedule.selected_introduce
          if (JSON.stringify(tempSchedule) !== JSON.stringify(tempOriSchedule)) {
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
        }
        break
    }
  }

  /** 增加新旅遊天 */
  addNewScheduleDay(): void {
    const dayIntroudece = new TravelDayIntroduce()
    const endDate = this.schedule.day_introduces.slice(-1)[0].date;
    dayIntroudece.schedule_pk_id = this.schedule.pk_id;
    dayIntroudece.date = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate() + 1);
    this.schedule.day_introduces.push(dayIntroudece);
    this.schedule.end_date = new Date(dayIntroudece.date)
    this.schedule.pass_day++;
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
    // 測試環境
    if (this.commonService.isTestArea()) {

      if (this.travelScheduleList.find(ele => ele.pk_id === this.schedule.pk_id)) {
        this.travelScheduleList[this.travelScheduleList.map(ele => ele.pk_id).indexOf(this.schedule.pk_id)] = { ...this.schedule };
      } else {
        this.travelScheduleList.push({ ...this.schedule })
      }
      this.schedule.selected_introduce = this.schedule.day_introduces[0];

      // 複製原檔
      this.oriSchedule = JSON.parse(JSON.stringify(this.schedule));
      this.oriSchedule.start_date = new Date(this.oriSchedule.start_date)
      this.oriSchedule.end_date = new Date(this.oriSchedule.end_date)
      this.oriSchedule.cost_records = this.oriSchedule.cost_records.map(ele => ({ ...ele }))
      this.oriSchedule.day_introduces = this.oriSchedule.day_introduces.map(ele => {
        const obj = Object.assign({}, ele);
        obj.schedule_list = obj.schedule_list.map(val => ({ ...val }));
        return obj
      })

      this.creatingStep = 0;
      this.isCreating = false;
      this.commonService.setCookie('schedule_list', JSON.stringify(this.travelScheduleList));
      this.commonService.showMsg('s', '儲存成功');
    }
    // 正式環境
    else {
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

  /** 切換目前選取單檔 */
  switchSelectedData(data: TravelDayIntroduce): void {
    this.schedule.selected_introduce = data;
  }

  /** 回傳未刪除資料 */
  returnNotDeleteData(data: any[]): any[] {
    return data.filter(ele => ele.isdelete !== 'Y');
  }

  /** 開啟圖表 */
  setCostAnanalysisDialog(action: boolean): void {
    if (action) {
      this.costAnanalysisDialog = true;
      setTimeout(() => {
        this.drawCostAnanalysisChart();
      }, 150)
      window.addEventListener('resize', (() => {
        this.drawCostAnanalysisChart()
      }));
    } else {
      this.costAnanalysisDialog = false
      window.removeEventListener('reset', null);
    }
  }

  /** 繪製花費分析圖表 */
  drawCostAnanalysisChart(): void {
    this.chartLoading = true;
    setTimeout(() => {
      this.chartLoading = false;
      const option: EChartsOption = {
        grid: {
          top: '15%',
          right: '0%',
          left: '0%',
          bottom: '15%'
        },
        title: {
          text: '花費分析圖',
          subtext: '總花費：' + this.schedule.real_cost,
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            type: 'pie',
            radius: '50%',
            label: {
              formatter: ((ele) => {
                return (ele.value as number) > 1000 ? this.decimalPipe.transform(Number(ele.value), '3.0-0') as any : ele.value
              })
            },
            data: Array.from(new Set(this.schedule.cost_records.map(ele => ele.type))).filter(ele => ele).map(
              type => {
                /** 初始值 */
                const initValue = 0;
                return {
                  name: this.costTypeOptions.find(val => val.value === type).label,
                  value: this.schedule.cost_records.filter(ele => ele.type === type && ele.isdelete !== 'Y').reduce((acc, ele) => acc + ele.final_cost, initValue)
                }
              }
            ),
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      setTimeout(() => {
        const element = document.getElementById('costRecordChart');
        if (element) {
          const mychart = echarts.init(element);
          mychart.setOption(option as any);
        }
      }, 100)
    }, 100)
  }

  /** 前往網址 */
  gotoUrl(url: string): void {
    if (url) {
      this.confirmationService.confirm({
        header: '確認',
        message: '是否確認要前往此網址：\n' + url,
        accept: () => {
          window.open(url, '_blank');
        }
      })
    }
  }

  /** 下載PDF */
  async downloadPdf(): Promise<void> {
    this.commonService.setBlock(true);
    await import('../../assets/msjh-normal.js').then(font => {
      if (font) {
        const nowTime = this.datePipe.transform(new Date(), 'yyyy/MM/dd HH:mm:ss');
        const doc = new jsPDF();
        doc.setFont('msjh');
        /** 標題列 */
        const topArray = [
          // 旅程標題
          this.schedule.title,
          // 旅程時段
          (this.datePipe.transform(this.schedule.start_date, 'yyyy/MM/dd (EE)')) + '~' + (this.datePipe.transform(this.schedule.end_date, 'yyyy/MM/dd (EE)')),
          // 敘述
          this.schedule.description,
          '_________________________________________________________________________________________________'
        ]
        // 標題列
        autoTable(doc, {
          startY: 10,
          columns: [{ header: '', dataKey: '0' }],
          body: topArray.map(ele => ({ '0': ele })),
          columnStyles: { 0: { cellWidth: 190 } },
          styles: { font: 'msjh', fontSize: 12 },
          didParseCell: ((data) => {
            if (data.section === 'body') {
              data.cell.styles.fillColor = 'white';
              data.cell.styles.halign = 'left';
              data.cell.styles.minCellHeight = 1
              if (data.cell.text.join('') === this.schedule.title) {
                data.cell.styles.fontSize = 25
              }
            }
          }),
        })

        /** 檢查是否為第一天 */
        let firstDayCheck = false
        let c = 0
        // 每日行程
        for (const ele of this.schedule.day_introduces) {
          autoTable(doc, {
            startY: !firstDayCheck ? doc['previousAutoTable']['finalY'] : 15,
            columns: [{ header: '', dataKey: '0' }],
            body: [{ 0: this.datePipe.transform(ele.date, 'MM/dd(EE)') }],
            columnStyles: { 0: { cellWidth: 183 } },
            styles: { font: 'msjh', fontSize: 15 },
            didParseCell: ((data) => {
              if (data.section === 'body') {
                data.cell.styles.fillColor = 'white';
                data.cell.styles.minCellHeight = 1;
              }
            })
          })
          autoTable(doc, {
            startY: doc['previousAutoTable']['finalY'],
            columns: [
              { header: '', dataKey: 'type' },
              { header: '時段', dataKey: 'time' },
              { header: '敘述', dataKey: 'description' },
            ],
            body: ele.schedule_list.length > 0 ? ele.schedule_list.map(daySchedule => {
              const obj = {
                type: daySchedule.type == 'move' ? '移動' : '停留',
                time: daySchedule.time,
                description: daySchedule.description
              }
              return obj;
            }) : [{ type: '', time: '', description: '查無此日行程' }],
            columnStyles: {
              'type': { cellWidth: 15 },
              'time': { cellWidth: 30 },
              'description': { cellWidth: 138 },
            },
            styles: { font: 'msjh', fontSize: 12 },
            didParseCell: ((data) => {
              if (data.section === 'body') {
                data.cell.styles.minCellHeight = 1;
              } else if (data.section === 'head') {
                data.cell.styles.fillColor = 'darkcyan';
                data.cell.styles.textColor = 'white'
              }
            })
          })
          autoTable(doc, {
            startY: doc['previousAutoTable']['finalY'] + 10,
            columns: [
              { header: '住宿&餐食', dataKey: 'detail' },
            ],
            body: [
              {
                detail: '【住宿】：' + (ele.hotel_name ? ele.hotel_name : '無') + '\n' +
                  '【早餐】：' + (ele.breakfirst ? ele.breakfirst : '無') + '\n' +
                  '【午餐】：' + (ele.launch ? ele.launch : '無') + '\n' +
                  '【晚餐】：' + (ele.dinner ? ele.dinner : '無'),
              }
            ],
            columnStyles: {
              'detail': { cellWidth: 183 },
            },
            styles: { font: 'msjh', fontSize: 12 },
            didParseCell: ((data) => {
              if (data.section === 'body') {
                data.cell.styles.minCellHeight = 1;
              } else if (data.section === 'head') {
                data.cell.styles.fillColor = 'darkcyan';
                data.cell.styles.textColor = 'white'
              }
            })
          })
          autoTable(doc, {
            startY: doc['previousAutoTable']['finalY'] + 5,
            columns: [
              { header: '購物清單', dataKey: 'shopping' },
              { header: '備註', dataKey: 'memo' },
            ],
            body: [
              {
                shopping: ele.shopping_detail ? this.removeHtmlTagsAndEntities(ele.shopping_detail) : '無',
                memo: ele.memo ? this.removeHtmlTagsAndEntities(ele.memo) : '無'
              }
            ],
            columnStyles: {
              'shopping': { cellWidth: 103 },
              'memo': { cellWidth: 80 },
            },
            styles: { font: 'msjh', fontSize: 10.5 },
            didParseCell: ((data) => {
              if (data.section === 'body') {
                data.cell.styles.minCellHeight = 1;
              } else if (data.section === 'head') {
                data.cell.styles.fillColor = 'darkcyan';
                data.cell.styles.textColor = 'white'
              }
            })
          })
          c++;
          c < this.schedule.day_introduces.length ? doc.addPage() : null;
          firstDayCheck = true
        }

        if (this.schedule.cost_records.length > 0) {
          doc.addPage();
          // 標題列
          autoTable(doc, {
            startY: 10,
            columns: [{ header: '', dataKey: '0' }],
            body: [{ '0': '預算紀錄表' }],
            columnStyles: { 0: { cellWidth: 180 } },
            styles: { font: 'msjh', fontSize: 22 }
          })
          autoTable(doc, {
            startY: doc['previousAutoTable']['finalY'],
            columns: [
              { header: '預計花費', dataKey: 'guess' },
              { header: '實際花費', dataKey: 'real' },
            ],
            body: [{
              guess: [null, undefined, NaN].includes(this.schedule.preparation_cost) ? '0' : this.decimalPipe.transform(this.schedule.preparation_cost, '3.0-0'),
              real: [null, undefined, NaN].includes(this.schedule.real_cost) ? '0' : this.decimalPipe.transform(this.schedule.real_cost, '3.0-0')
            }],
            columnStyles: { guess: { cellWidth: 90 }, real: { cellWidth: 90 } },
            styles: { font: 'msjh', fontSize: 14 },
            didParseCell: ((data) => {
              data.cell.styles.halign = 'center';
              if (data.section === 'body') {
                data.cell.styles.fillColor = 'white';
              }
            }),
          })
          autoTable(doc, {
            startY: doc['previousAutoTable']['finalY'],
            columns: [
              { header: '類型', dataKey: 'type' },
              { header: '敘述', dataKey: 'description' },
              { header: '價格', dataKey: 'cost' },
            ],
            body: this.schedule.cost_records.map(ele => {
              return {
                type: this.costTypeOptions.find(val => val.value == ele.type) ? this.costTypeOptions.find(val => val.value == ele.type).label : '-',
                description: ele.description,
                cost: this.decimalPipe.transform(ele.final_cost, '3.0-0')
              }
            }),
            columnStyles: { type: { cellWidth: 25 }, description: { cellWidth: 125 }, cost: { cellWidth: 30 } },
            styles: { font: 'msjh', fontSize: 11 },
            didParseCell: ((data) => {
              if (data.section === 'body') {
                if (data.column.dataKey === 'cost') {
                  data.cell.styles.halign = 'right';
                }
              }
            }),
          })
        }

        // 加圖片
        for (let i = 0; i < doc.getNumberOfPages(); i++) {
          doc.setPage(i + 1);
          doc.setGState(new GState({ opacity: 1 }));
          doc.setFontSize(10);
          doc.text(`${i + 1} / ${doc.getNumberOfPages()}`, 100, 290);
          /** 編號 */
          // doc.text(this.selectedHbcMeetingApplication.application_no, 5.5, 290);
          /** 頁尾 */
          doc.text(nowTime, 170, 290);
          doc.setGState(new GState({ opacity: 0.065 }));
          doc.setFontSize(11);
          doc.setGState(new GState({ opacity: 1 }));
          /** 圖片 */
          // const image = document.getElementById(this.master.secret_level) as HTMLImageElement;
          // doc.addImage(image, 184, 4.5, image.width * 0.6, image.height * 0.6);
          doc.setGState(new GState({ opacity: 0.1 }));
          // const canvas = document.getElementById("myCanvas") as HTMLCanvasElement;
          // const context = canvas.getContext("2d");
          // context.font = "16px Microsoft JhengHei";
          // context.textAlign = "left";
          // context.fillStyle = 'teal';
          // context.fillText(this.empInfo.collea_id + ' ' + this.empInfo.name, 10, 25);
          // const myImg = document.querySelector("#img1") as any;
          // myImg.src = canvas.toDataURL("image/png");
          // const hat = document.getElementById('img1') as HTMLImageElement;
          // for (let i = 0; i < 295; i += 5) {
          //   for (let j = 0; j <= 207; j += 34.5) {
          //     doc.addImage(hat, j, i, hat.width * 0.25, hat.height * 0.25);
          //   }
          // }
        }
        const fileName = this.schedule.title
        doc.save(fileName)
      }
    })
    this.commonService.setBlock(false);
  }

  decodeHtmlEntities(inputStr: string): string {
    const element = document.createElement('div');
    element.innerHTML = inputStr;
    return element.textContent || element.innerText || '';
  }

  removeHtmlTagsAndEntities(inputStr: string): string {
    const withoutTags = inputStr.replace(/<.*?>/g, '');
    const withoutEntities = this.decodeHtmlEntities(withoutTags);
    return withoutEntities;
  }
}