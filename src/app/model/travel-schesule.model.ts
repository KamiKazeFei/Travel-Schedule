import { v4 as uuidv4 } from 'uuid';

class BasicTable {
    /** 主要識別碼 */
    pk_id?: string = uuidv4().replace(/-/g, '');
    /** 建立日期 */
    create_dt: Date;
    /** 最後異動日 */
    last_update_dt: Date;
    /** 版本 */
    version: number = 0;
    /** 是否刪除 */
    isdelete: 'Y' | 'N' = 'N';
    /** 刪除日 */
    delete_dt: Date;
}

/** 行程計畫 */
export class TravelSchedule extends BasicTable {
    /** 行程標題 */
    title: string;
    /** 起 */
    start_date: Date;
    /** 迄 */
    end_date: Date;
    /** 行程說明 */
    description: string;
    /** 行程備註 */
    memo: string;
    /** 行程預計花費 */
    preparation_cost: number;
    /** 行程實際花費 */
    real_cost: number;
    /** 行程介紹 */
    day_introduces: TravelDayIntroduce[] = [];
    /** 花費紀錄 */
    cost_records: TravelCostRecord[] = [];
    /** 天數 */
    pass_day: number = 1;
    /** 選擇天數 */
    selected_introduce?: TravelDayIntroduce;
}

/** 旅遊單天規劃 */
export class TravelDayIntroduce extends BasicTable {
    /** 行程PK */
    schedule_pk_id?: string;
    /** 日期 */
    date: Date;
    /** 當日標題 */
    title: string;
    /** 當日說明 */
    description: string;
    /** 行程介紹 */
    schedule_list: TravelDaySchedule[] = [];
    /** 旅店名稱 */
    hotel_name: string;
    /** 旅店位置網址 */
    hotel_map_location: string;
    /** 購物清單 */
    shopping_detail: string;
    /** 備註清單 */
    memo: string
    /** 早餐 */
    breakfirst: string;
    /** 早餐位置 */
    breakfirst_map_location: string;
    /** 午餐 */
    launch: string;
    /** 午餐位置 */
    launch_map_location: string;
    /** 晚餐 */
    dinner: string;
    /** 晚餐位置 */
    dinner_map_location: string;
}

/** 單一行程 */
export class TravelDaySchedule extends BasicTable {
    /** 序號 */
    ser_no: number;
    /** 行程PK */
    introduce_pk_id?: string;
    /** 行程時間 */
    time: string;
    /** 行程介紹圖片 */
    pic_src: string;
    /** 行程說明 */
    description: string;
    /** 行程位置網址 */
    map_location: string;
    /** 行程類型 */
    type: 'move' | 'stay' = 'stay'
}

/** 花費紀錄 */
export class TravelCostRecord extends BasicTable {
    /** 行程PK_ID */
    schedule_pk_id: string;
    /** A機票、B住宿、C景點票券、D交通、E吃喝、F禮物、G其他 */
    type: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G';
    /** 說明 */
    description: string;
    /** 備註 */
    memo: string;
    /** 花費金額 */
    cost: number = 0;
    /** 幣別 */
    currency_type: string = 'TWD';
    /** 匯率 */
    exchange_rate: number = 1;
    /** 計算後成本 */
    final_cost: number = 0;
}