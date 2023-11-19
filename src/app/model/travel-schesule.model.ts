import { v4 as uuidv4 } from 'uuid';

/** 行程計畫 */
export class TravelSchedule {
    /** 主要識別碼 */
    pk_id?: string = uuidv4().replace(/-/g, '');
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
export class TravelDayIntroduce {
    /** 主要識別碼 */
    pk_id?: string = uuidv4().replace(/-/g, '');
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
    shopping_list: string[] = [];
    /** 備註清單 */
    memo_list: string[] = [];
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
export class TravelDaySchedule {
    /** 行程PK */
    introduce_pk_id?: string;
    /** 主要識別碼 */
    pk_id?: string = uuidv4().replace(/-/g, '');
    /** 行程時間 */
    time: string;
    /** 行程介紹圖片 */
    pic_src: string;
    /** 行程說明 */
    description: string;
    /** 行程位置網址 */
    map_location: string;
}

/** 花費紀錄 */
export class TravelCostRecord {
    /** 主要識別碼 */
    pk_id?: string = uuidv4().replace(/-/g, '');
    /** A機票、B住宿、C景點票券、D交通、E吃喝、F禮物、G其他 */
    type: 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' = 'G';
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