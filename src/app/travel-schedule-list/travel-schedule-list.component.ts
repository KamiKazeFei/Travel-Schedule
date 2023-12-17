import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';
import { TravelCostRecord, TravelDayIntroduce, TravelDaySchedule, TravelSchedule, TravelScheduleFile } from '../model/travel-schesule.model';
import { CommonService } from '../service/common.service';
import { TravelScheduleService } from '../service/travel-schedule.service';
import * as echarts from 'echarts';
import { EChartsOption } from 'echarts';
import { DatePipe, DecimalPipe } from '@angular/common';
import jsPDF, { GState } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { FileUpload } from 'primeng/fileupload';
import { v4 as uuidv4 } from 'uuid';
import * as pdfjs from 'pdfjs';
import * as pdfjsLib from 'pdfjs-dist';

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

  /** 上傳檔案 */
  @ViewChild('fileUpload', { static: false }) fileUpload: FileUpload;
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
  /** pdf載入中 */
  pdfLoading = false;
  /* 顯示模式 **/
  mode: string;
  /** 以上傳檔案 */
  uploadedFiles = [];
  /** 編輯模式 */
  modeOptions = [
    { label: '行程安排', value: 'schedule' },
    { label: '預算紀錄表', value: 'cost_record' },
    { label: '檔案列表', value: 'file_list' },
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
  /** 花費排序 */
  costRecordSortMode: string;
  /** 排序紀錄 */
  costRecordSortMap = {};
  /** 圖表花費圖片網址 */
  costAnanalysisChartImageDataURL: string
  /** 設定輸出pdf設定 */
  exportPdfSettingDialog = false;

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
          this.selectedSchedule.pass_day = Math.floor((this.selectedSchedule.end_date.getTime() - this.selectedSchedule.start_date.getTime()) / 1000 / 60 / 60 / 24) + 1;
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
        if (!this.oriSchedule) {
          this.oriSchedule = {} as any
        }
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
    costRecord.ser_no = this.schedule.cost_records.length + 1
    if (!this.schedule.cost_records) {
      this.schedule.cost_records = []
    }
    // 行動裝置的話往下加，反之從頭插入
    this.commonService.isMobileDevice()
      ? this.schedule.cost_records.push(costRecord)
      : this.schedule.cost_records.splice(0, 0, costRecord)
  }

  /** 移除預算紀錄 */
  deleteCostRecord(data: TravelCostRecord): void {
    data.create_dt ? data.isdelete = 'Y' : (this.schedule.cost_records = this.schedule.cost_records.filter(ele => ele.pk_id !== data.pk_id));
    this.schedule.real_cost = Number((this.schedule.cost_records.filter(ele => ele.isdelete !== 'Y').reduce((acc, ele) => acc + ele.final_cost, 0)).toFixed(2));
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
      this.chartLoading = true;
      setTimeout(() => {
        this.drawCostAnanalysisChart('costRecordChart');
      }, 100)
    } else {
      this.costAnanalysisDialog = false
      window.removeEventListener('reset', null);
    }
  }

  /** 繪製花費分析圖表 */
  async drawCostAnanalysisChart(id: string, download = false): Promise<void> {
    download ? this.commonService.setBlock(true) : false
    this.chartLoading = false;
    setTimeout(async () => {
      // 圖表設定
      const option: EChartsOption = {
        animation: !download,
        grid: {
          top: '30%',
          right: '0%',
          left: '0%',
          bottom: '2%'
        },
        title: {
          text: '花費分析圖',
          textStyle: {
            fontSize: 28
          },
          subtext: '總花費：' + (this.schedule.real_cost !== undefined && this.schedule.real_cost !== null ? this.schedule.real_cost : 0),
          subtextStyle: {
            fontSize: 18
          },
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
            radius: '70%',
            label: {
              formatter: ((ele) => {
                return (ele.value as number) > 1000 ? this.decimalPipe.transform(Number(ele.value), '3.0-0') as any : ele.value
              })
            },
            data: Array.from(new Set(this.schedule.cost_records.map(ele => ele.type))).map(
              type => {
                /** 初始值 */
                return {
                  name: type ? this.costTypeOptions.find(val => val.value === type).label : '未指定',
                  value: this.schedule.cost_records.filter(ele => ele.type === type && ele.isdelete !== 'Y').reduce((acc, ele) => acc + ele.final_cost, 0)
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
      // 畫面物件
      const element = document.getElementById(id);
      if (element) {
        const mychart = echarts.init(element);
        mychart.setOption(option as any);
        // 如果要下載
        if (download) {
          // 如果要載入圖表
          if (this.schedule.cost_records.some(ele => ele.isdelete !== 'Y')) {
            setTimeout(() => {
              const imageDataURL = mychart.getDataURL({
                pixelRatio: 1.2,
                backgroundColor: '#fff',
              });
              this.costAnanalysisChartImageDataURL = imageDataURL
              this.downloadPdf()
            }, 300);
          } else {
            this.downloadPdf()
          }
        }
      }
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
    this.pdfLoading = true;
    this.commonService.setBlock(true);
    /** 取出字體檔 */
    let font = await import('../../assets/msjh-normal.js');
    if (font) {
      // 現在時間
      const nowTime = this.datePipe.transform(new Date(), 'yyyy/MM/dd HH:mm:ss');
      const doc = new jsPDF();
      doc.setFont('msjh');
      // 標題列
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
      // 加上每日行程表
      for (const ele of this.schedule.day_introduces) {
        autoTable(doc, {
          startY: !firstDayCheck ? doc['previousAutoTable']['finalY'] : 15,
          columns: [{ header: '', dataKey: '0' }],
          body: [{ 0: this.datePipe.transform(ele.date, 'MM/dd(EE)') }],
          columnStyles: { 0: { cellWidth: 183 } },
          styles: { font: 'msjh', fontSize: 16, halign: 'center' },
          didParseCell: ((data) => {
            data.cell.styles.textColor = 'darkCyan';
            data.cell.styles.fontSize = 20;
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
            'time': { cellWidth: 38 },
            'description': { cellWidth: 130 },
          },
          styles: { font: 'msjh', fontSize: 12 },
          didParseCell: ((data) => {
            if (data.cell.raw === '移動') {
              data.cell.styles.textColor = 'darkcyan'
            }
            if (data.cell.raw === '停留') {
              data.cell.styles.textColor = 'green'
            }
            if (data.section === 'body') {
              data.cell.styles.minCellHeight = 1;
            } else if (data.section === 'head') {
              data.cell.styles.fillColor = 'darkcyan';
              data.cell.styles.textColor = 'white'
            }
          })
        })

        // 加上住宿 & 餐食
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
            data.cell.styles.minCellHeight = 1.5;
          })
        })

        // 加上購物清單列表
        autoTable(doc, {
          startY: doc['previousAutoTable']['finalY'] + 5,
          columns: [{ header: '購物清單', dataKey: 'shopping' }],
          body: [{ shopping: ele.shopping_detail ? this.decodeHtmlEntities(ele.shopping_detail) : '無' }],
          columnStyles: { 'shopping': { cellWidth: 183 } },
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

        // 加上備註
        autoTable(doc, {
          startY: doc['previousAutoTable']['finalY'] + 5,
          columns: [
            { header: '備註', dataKey: 'memo' },
          ],
          body: [{ memo: ele.memo ? this.decodeHtmlEntities(ele.memo) : '無' }],
          columnStyles: { 'memo': { cellWidth: 183 }, },
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

        c++;
        c < this.schedule.day_introduces.length ? doc.addPage() : null;
        firstDayCheck = true
      }

      // 增加預算表 & 圖表
      if (this.schedule.selected) {
        // 增加預算表
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
                cost: ele.final_cost > 1000 ? this.decimalPipe.transform(ele.final_cost, '3.0-0') : ele.final_cost
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

        // 增加預算圖表
        if (this.costAnanalysisChartImageDataURL && this.schedule.cost_records.find(ele => ele.isdelete !== 'Y')) {
          doc.addPage()
          doc.addImage(this.costAnanalysisChartImageDataURL, 10, 15, 195, 220);
        }
      }

      // 增加上傳附檔
      if (this.returnNotDeleteData(this.schedule.file_list).length > 0 && this.schedule.file_selected) {
        const fileArray: TravelScheduleFile[] = this.returnNotDeleteData(this.schedule.file_list);
        for (const file of fileArray) {
          doc.addPage()
          if (file.file_type === 'A') {
            const element = document.createElement('img');
            element.src = 'http://127.0.0.1:8000/travel/file?file_pk_id=' + file.file_pk_id;
            doc.text(file.file_name, 10, 10);
            doc.addImage(element, 10, 15, ((file.width * 0.263) >= 190 ? 190 : Number((file.width * 0.263).toFixed(0))), ((file.height * 0.195) >= 280 ? 280 : Number((file.height * 0.195).toFixed(0))));
            element.remove()
          }
          if (file.is_pdf) {
            await this.convertPDFToImages(file, doc);
          }
        }
      }

      // 印上頁碼
      for (let i = 0; i < doc.getNumberOfPages(); i++) {
        doc.setPage(i + 1);
        doc.setGState(new GState({ opacity: 1 }));
        doc.setFontSize(10);
        doc.text(`${i + 1} / ${doc.getNumberOfPages()}`, 100, 290);
        /** 頁尾 */
        doc.text(nowTime, 170, 290);
        doc.setGState(new GState({ opacity: 0.065 }));
        doc.setFontSize(11);
        doc.setGState(new GState({ opacity: 1 }));
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
      console.log(doc);
      doc.save(fileName)
      doc.close();
      this.costAnanalysisChartImageDataURL = null;
      this.exportPdfSettingDialog = false;
      delete this.schedule.selected
      delete this.schedule.file_selected
    } else {
      this.commonService.showMsg('e', '下載失敗')
    }
    // 清空字體檔
    font = null
    this.commonService.setBlock(false);
  }

  /** 將上傳檔案轉為圖片放到行程輸出PDF */
  async convertPDFToImages(file: TravelScheduleFile, doc: jsPDF) {
    // 載入PDF文件
    const pdf = await pdfjsLib.getDocument(new URL('http://127.0.0.1:8000/travel/file?file_pk_id=' + file.file_pk_id)).promise;
    // 遍歷每一頁
    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      // 提取每一頁的內容
      const page = await pdf.getPage(pageNum);
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');
      var viewport = page.getViewport({ scale: 2 });

      // 設置canvas的大小
      canvas.width = viewport.width;
      canvas.height = viewport.height;

      // 渲染PDF內容到canvas
      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      await page.render(renderContext).promise.then();
      // 將canvas轉換為圖片
      var image = new Image();
      image.src = canvas.toDataURL('image/jpeg');

      const images = [];
      images.push(image);

      if (pageNum == 1) {
        doc.text(file.file_name, 10, 10);
        doc.addImage(image, 'JPEG', -1, 15, 213, 285);
      } else {
        doc.addImage(image, 'JPEG', -1, -1, 213, 300);
      }
      pageNum < pdf.numPages ? doc.addPage() : false;
    }
  }

  /** 移除HTML Code */
  decodeHtmlEntities(inputStr: string): string {
    inputStr = inputStr.replace(/<.*?>/g, '\n').replace(/\n+/g, '\n');
    const entities = [
      { char: '&lt;', replacement: '<' },
      { char: '&gt;', replacement: '>' },
      { char: '&amp;', replacement: '&' },
      { char: '&quot;', replacement: '"' },
      { char: '&apos;', replacement: "'" },
      { char: '&#39;', replacement: "'" }
    ];

    for (let i = 0; i < entities.length; i++) {
      const entity = entities[i];
      const regex = new RegExp(entity.char, 'g');
      inputStr = inputStr.replace(regex, entity.replacement);
    }
    return inputStr.replace(/^\n+/, '').replace(/\n$/, '')
  }

  /** 移除HTML Code */
  removeHtmlTagsAndEntities(inputStr: string): string {
    const withoutTags = inputStr.replace(/<.*?>/g, '\n');
    const withoutEntities = this.decodeHtmlEntities(withoutTags);
    return withoutEntities;
  }

  /** 進行預算紀錄表排序 */
  sortCostRecordsData(column: string): void {
    this.costRecordSortMap[column] = !this.costRecordSortMap[column];
    ['cost', 'final_cost'].includes(column)
      ? this.schedule.cost_records.sort((a, b) => this.costRecordSortMap[column] ? a[column] - b[column] : b[column] - a[column])
      : this.schedule.cost_records.sort((a, b) => this.costRecordSortMap[column] ? a[column].localeCompare(b[column]) : b[column].localeCompare(a[column]))
    this.schedule.cost_records.forEach((ele, i) => ele.ser_no = i + 1);
  }

  /** 檢查排序鍵值是否已經在Map中 */
  checkSortKeyInMap(columnName: string): boolean {
    return Object.keys(this.costRecordSortMap).includes(columnName)
  }

  /** 檔案上傳 */
  async uploadFinish(event: any): Promise<void> {
    this.commonService.setBlock(true);
    const uploadReturnData = event.originalEvent.body
    if (this.commonService.afterServerResponse(uploadReturnData)) {
      this.commonService.showMsg('s', '上傳成功');
      if (!this.schedule.file_list) {
        this.schedule.file_list = [];
      }
      (uploadReturnData.data as any[]).forEach((file, i) => {
        const scheduleFile = new TravelScheduleFile();
        scheduleFile.schedule_pk_id = this.schedule.pk_id;
        scheduleFile.file_name = file.name;
        scheduleFile.file_pk_id = file.pk_id;
        scheduleFile.file_type = event.files[i].type.includes('image') ? 'A' : 'B';
        scheduleFile.width = file.width
        scheduleFile.height = file.height
        scheduleFile.ser_no = this.schedule.file_list.length + 1;
        this.schedule.file_list.push(scheduleFile);
      })
    }

    this.fileUpload.clear();
    this.commonService.setBlock(false);
    setTimeout(() => {
      this.schedule.file_list.sort((a, b) => a.ser_no - b.ser_no);
    }, 100)
  }

  /** 開始編輯檔名 */
  editFileNameMode(file: TravelScheduleFile): void {
    file.selected = true;
    setTimeout(() => {
      const inputElement = document.getElementById('fileNameEditInput');
      inputElement.focus();
      inputElement.addEventListener('blur', () => {
        if (!file.file_name?.trim()) {
          file.file_name = '未命名檔案'
        }
        file.file_name = file.file_name.trim();
        file.selected = false
        inputElement.removeEventListener('blur', null);
      })
    }, 100)
  }

  /** 檢視檔案 */
  async checkUploadFile(pk_id: string): Promise<void> {
    window.open('http://127.0.0.1:8000/travel/file?file_pk_id=' + pk_id, '_blank');
  }

  /** 移除檔案 */
  deleteFile(file: TravelScheduleFile): void {
    file.create_dt ? file.isdelete = 'Y' : this.schedule.file_list = this.schedule.file_list.filter(ele => ele.pk_id !== file.pk_id);
    this.commonService.showMsg('s', '已刪除附檔');
  }

  /** 設定輸出pdf設定 */
  setExportPdfSettingDialog(action: boolean): void {
    if (action) {
      this.schedule.selected = false;
      this.schedule.file_selected = false;
      this.exportPdfSettingDialog = true;
    } else {
      this.exportPdfSettingDialog = false;
      delete this.schedule.selected
      delete this.schedule.file_selected
    }
  }
}
