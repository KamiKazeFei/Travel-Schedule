/** 旅遊單天規劃 */
export class TravelDayIntroduce {
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

/** 行程 */
export class TravelDaySchedule {
    /** 行程時間 */
    time: string;
    /** 行程介紹圖片 */
    pic_src: string;
    /** 行程說明 */
    description: string;
    /** 行程位置網址 */
    map_location: string;
}