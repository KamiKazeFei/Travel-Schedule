import { Injectable } from '@angular/core';
import { TravelSchedule } from '../model/travel-schesule.model';

@Injectable({
  providedIn: 'root'
})
export class TravelScheduleService {

  constructor() { }

  /** 行程計畫 */
  travelSchedule: TravelSchedule;

  /** 取得旅遊行程 */
  getTravelSchedule(): TravelSchedule {
    this.travelSchedule = new TravelSchedule();
    this.travelSchedule.day_introduces = [
      // 第一天 12/30
      {
        title: '【Day 1】12/30(六)',
        description: '台中搭乘高鐵前往桃園入住，隔天一早搭乘計程車前往桃園機場第一航廈',
        schedule_list: [
          {
            time: '15:00 ~ 16:30',
            pic_src: 'assets/綠藤輕旅.jpg',
            description: '前往桃園高鐵，入住綠藤青旅',
            map_location: 'https://www.google.com.tw/maps/place/L%C3%BCtel+Hotel+%E7%B6%A0%E8%97%A4%E8%BC%95%E6%97%85/@25.0192948,121.2114191,17z/data=!3m1!4b1!4m11!3m10!1s0x34682100e30acc9b:0xafb12216d5350302!5m4!1s2023-12-31!2i3!4m1!1i2!8m2!3d25.01929!4d121.213994!16s%2Fg%2F11cn8yqq0w?hl=zh-TW&authuser=0&entry=ttu'
          },
        ],
        hotel_name: '【桃園高鐵站】綠藤輕旅',
        hotel_map_location: 'https://www.google.com.tw/maps/place/L%C3%BCtel+Hotel+%E7%B6%A0%E8%97%A4%E8%BC%95%E6%97%85/@25.0192948,121.2114191,17z/data=!3m1!4b1!4m11!3m10!1s0x34682100e30acc9b:0xafb12216d5350302!5m4!1s2023-12-31!2i3!4m1!1i2!8m2!3d25.01929!4d121.213994!16s%2Fg%2F11cn8yqq0w?hl=zh-TW&authuser=0&entry=ttu',
        shopping_list: [],
        memo_list: [],
        breakfirst: '無',
        breakfirst_map_location: null,
        launch: '無',
        launch_map_location: null,
        dinner: '桃園高鐵美食街',
        dinner_map_location: 'https://www.google.com.tw/maps/place/%E9%AB%98%E9%90%B5%E6%A1%83%E5%9C%92/@25.0133238,121.2118477,17z/data=!4m6!3m5!1s0x34682107ccd0899f:0xe2b48ace5968d6ef!8m2!3d25.01374!4d121.2140636!16s%2Fg%2F11c328z_cc?hl=zh-TW&authuser=0&entry=ttu'
      },
      // 第二天 12/31
      {
        title: '【Day 2】12/31(日)',
        description: '星宇JX820 -> KIX，搭乘Haruka前往京都。',
        schedule_list: [
          {
            time: '04:30 ~ 05:00',
            pic_src: 'assets/第一航廈.jpg',
            description: '綠藤青旅 -> 搭乘計程車 -> 桃園第一航廈',
            map_location: 'https://www.google.com.tw/maps/place/%E8%87%BA%E7%81%A3%E6%A1%83%E5%9C%92%E5%9C%8B%E9%9A%9B%E6%A9%9F%E5%A0%B4%E7%AC%AC%E4%B8%80%E8%88%AA%E5%BB%88/@25.0812628,121.2366347,18.5z/data=!3m1!5s0x34429fc0783a0259:0xb8171ea401fbc5c0!4m6!3m5!1s0x34429fd1b5fda82d:0x3d5496cc66876c8f!8m2!3d25.081385!4d121.2374209!16s%2Fg%2F11h8jdk2my?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '07:40 ~ 11:10',
            pic_src: 'assets/星宇.jpg',
            description: 'TPE 🛬 KIX 🚝 京都',
            map_location: 'https://www.google.com.tw/maps/place/%E9%97%9C%E8%A5%BF%E5%9C%8B%E9%9A%9B%E6%A9%9F%E5%A0%B4/@34.4348683,135.2302949,17z/data=!3m1!4b1!4m6!3m5!1s0x6000b91323cdfaf7:0xf171a79f8d908f88!8m2!3d34.4348639!4d135.2328698!16zL20vMDFiMzRu?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '13:20 ~ 13:30',
            pic_src: 'assets/相鐵FRESA INN - 京都站八條口.jpg',
            description: '辦理旅館入住【相鐵FRESA INN - 京都站八條口】',
            map_location: 'https://www.google.com.tw/maps/place/%E7%9B%B8%E9%90%B5FRESA+INN+%E4%BA%AC%E9%83%BD%E7%AB%99%E5%85%AB%E6%A2%9D%E5%8F%A3/@34.9835958,135.7597569,17.75z/data=!4m11!3m10!1s0x600108ad12afd4d7:0xff8371e5fe953e2c!5m4!1s2023-12-31!2i3!4m1!1i2!8m2!3d34.9828676!4d135.7610043!16s%2Fg%2F11c5rsqn4b?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '13:40 ~ 15:50',
            pic_src: 'assets/錦市場.jpg',
            description: '錦市場、新京極商店街',
            map_location: 'https://www.google.com.tw/maps/place/%E9%8C%A6%E5%B8%82%E5%A0%B4/@35.0050302,135.7621481,17z/data=!3m1!4b1!4m6!3m5!1s0x6001089ccd8ccb4f:0xb69ea31001ec6c9c!8m2!3d35.0050258!4d135.764723!16s%2Fm%2F03d6_6p?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '16:00 ~ 17:00',
            pic_src: 'assets/天樂套餐.jpg',
            description: '玄品ふぐ（玄品河豚）河豚料理名店 ~ 祇園(預約✔️)',
            map_location: 'https://www.google.com.tw/maps/place/Genpin+Kyoto-Gion/@35.002818,135.7747508,17z/data=!3m1!4b1!4m6!3m5!1s0x600108c3914ee833:0xd8864435a8657a68!8m2!3d35.0028136!4d135.7773257!16s%2Fg%2F1tj6tqqf?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '17:30 ~ 19:00',
            pic_src: 'assets/八坂神社.jpg',
            description: '八坂神社',
            map_location: 'https://www.google.com.tw/maps/place/%E5%85%AB%E5%9D%82%E7%A5%9E%E7%A4%BE/@35.0036603,135.7759785,17z/data=!3m1!4b1!4m6!3m5!1s0x60010879a010eca9:0xc77ac89d5a241ae9!8m2!3d35.0036559!4d135.7785534!16zL20vMDVkZGds?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '19:30 ~ ',
            pic_src: 'assets/平安神宮.jpg',
            description: '平安神宮',
            map_location: 'https://www.google.com.tw/maps/place/%E5%B9%B3%E5%AE%89%E7%A5%9E%E5%AE%AE/@35.0159866,135.7775554,17z/data=!3m1!4b1!4m6!3m5!1s0x600108e5187cc88d:0x75bed992d897454f!8m2!3d35.0159823!4d135.7824263!16zL20vMDJ5NGti?hl=zh-TW&authuser=0&entry=ttu'
          },
        ],
        hotel_name: '【京都車站】相鐵FRESA INN - 京都站八條口',
        hotel_map_location: 'https://www.google.com.tw/maps/place/%E7%9B%B8%E9%90%B5FRESA+INN+%E4%BA%AC%E9%83%BD%E7%AB%99%E5%85%AB%E6%A2%9D%E5%8F%A3/@34.9835958,135.7597569,17.75z/data=!4m11!3m10!1s0x600108ad12afd4d7:0xff8371e5fe953e2c!5m4!1s2023-12-31!2i3!4m1!1i2!8m2!3d34.9828676!4d135.7610043!16s%2Fg%2F11c5rsqn4b?hl=zh-TW&authuser=0&entry=ttu',
        shopping_list: [],
        memo_list: [
          '搭乘Haruku從KIX到京都車站'
        ],
        breakfirst: '無',
        breakfirst_map_location: null,
        launch: '星宇機上餐',
        launch_map_location: null,
        dinner: '玄品ふぐ（玄品河豚）河豚料理名店',
        dinner_map_location: 'https://www.google.com.tw/maps/place/Genpin+Kyoto-Gion/@35.002818,135.7747508,17z/data=!3m1!4b1!4m6!3m5!1s0x600108c3914ee833:0xd8864435a8657a68!8m2!3d35.0028136!4d135.7773257!16s%2Fg%2F1tj6tqqf?hl=zh-TW&authuser=0&entry=ttu'
      },
      // 第三天 1/1
      {
        title: '【Day 3】1/1(一)',
        description: '參加天橋立一日遊，避開新年初詣各地人潮，參觀自然風情',
        schedule_list: [
          {
            time: '09:00 ~ 18:00',
            pic_src: 'assets/天橋立一日遊.jpg',
            description: '天橋立一日遊',
            map_location: 'https://www.google.com.tw/maps/place/%E5%A4%A9%E6%A9%8B%E7%AB%8B/@35.5698065,135.1892455,17z/data=!3m1!4b1!4m6!3m5!1s0x5fff972dc7c1e297:0xba61cef3b2e46c81!8m2!3d35.5698022!4d135.1918204!16zL20vMDdyNjZ5?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '19:00 ~ 20:00',
            pic_src: 'assets/豬一拉麵.jpg',
            description: '【晚餐】豬一拉麵',
            map_location: 'https://www.google.com.tw/maps/place/%E9%BA%B5%E5%B1%8B+%E8%B1%AC%E4%B8%80/@35.0006572,135.763825,18z/data=!4m6!3m5!1s0x600108be0e8efcb9:0x6c1bd116c4bb5b35!8m2!3d35.0013284!4d135.7669639!16s%2Fg%2F11cjqs44mn?hl=zh-TW&authuser=0&entry=ttu'
          },
        ],
        hotel_name: '相鐵FRESA INN - 京都站八條口',
        hotel_map_location: 'https://www.google.com.tw/maps/place/%E7%9B%B8%E9%90%B5FRESA+INN+%E4%BA%AC%E9%83%BD%E7%AB%99%E5%85%AB%E6%A2%9D%E5%8F%A3/@34.982872,135.7584294,17z/data=!3m1!4b1!4m11!3m10!1s0x600108ad12afd4d7:0xff8371e5fe953e2c!5m4!1s2023-12-31!2i3!4m1!1i2!8m2!3d34.9828676!4d135.7610043!16s%2Fg%2F11c5rsqn4b?hl=zh-TW&authuser=0&entry=ttu',
        shopping_list: [],
        memo_list: [
          '豬一拉麵：已詢問是否當日有營業，暫未得到答覆'
        ],
        breakfirst: '志津屋 京都站店',
        breakfirst_map_location: 'https://www.google.com.tw/maps/place/%E5%BF%97%E6%B4%A5%E5%B1%8B+%E4%BA%AC%E9%83%BD%E7%AB%99%E5%BA%97/@34.9845394,135.7560451,17z/data=!3m2!4b1!5s0x600108aeec29d2c9:0xdb78b1e4a547310!4m6!3m5!1s0x600108adcfdd2909:0xce7f8952cd3d7086!8m2!3d34.984535!4d135.75862!16s%2Fg%2F1thcs79t?hl=zh-TW&authuser=0&entry=ttu',
        launch: '天橋立 自理',
        launch_map_location: null,
        dinner: '豬一拉麵',
        dinner_map_location: 'https://www.google.com.tw/maps/place/%E9%BA%B5%E5%B1%8B+%E8%B1%AC%E4%B8%80/@35.0006572,135.763825,18z/data=!4m6!3m5!1s0x600108be0e8efcb9:0x6c1bd116c4bb5b35!8m2!3d35.0013284!4d135.7669639!16s%2Fg%2F11cjqs44mn?hl=zh-TW&authuser=0&entry=ttu'
      },
      // 第四天 1/2
      {
        title: '【Day 4】1/2',
        description: '參訪金閣寺、嵐山，晚上享用傳統餐點並在風風之湯體驗古都風情',
        schedule_list: [
          {
            time: '07:00 ~ 08:00',
            pic_src: 'assets/小川咖啡.jpg',
            description: '【早餐】小川咖啡 京都駅中央口店',
            map_location: 'hhttps://www.google.com.tw/maps/place/%E7%9B%B8%E9%90%B5FRESA+INN+%E4%BA%AC%E9%83%BD%E7%AB%99%E5%85%AB%E6%A2%9D%E5%8F%A3/@34.982872,135.7584294,17z/data=!3m1!4b1!4m11!3m10!1s0x600108ad12afd4d7:0xff8371e5fe953e2c!5m4!1s2023-12-31!2i3!4m1!1i2!8m2!3d34.9828676!4d135.7610043!16s%2Fg%2F11c5rsqn4b?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '09:00 ~ 10:00',
            pic_src: 'assets/金閣寺.jpg',
            description: '金閣寺參訪，門票500￥',
            map_location: 'https://www.google.com.tw/maps/place/%E9%B9%BF%E8%8B%91%E5%AF%BA/@35.0393744,135.7266682,17z/data=!3m1!4b1!4m6!3m5!1s0x6001a820c0eb46bd:0xee4272b1c22645f!8m2!3d35.03937!4d135.7292431!16zL20vMDFrbjR3?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '12:10 ~ 13:00',
            pic_src: 'assets/五木茶屋 嵐山本店.jpg',
            description: '【午餐】：五木茶屋 嵐山本店',
            map_location: 'https://www.google.com.tw/maps/place/Arashiyama+Itsukichaya/@35.0120576,135.6772263,17z/data=!3m1!4b1!4m6!3m5!1s0x60010712b368466b:0x1d95f39ac2644e8d!8m2!3d35.0120532!4d135.6798012!16s%2Fg%2F12qgvqzxz?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '13:10 ~ 17:30',
            pic_src: 'assets/嵐山.jpg',
            description: '嵐山- 渡月橋、森林小徑、天龍寺、嵐山商店街、頂上展望台',
            map_location: 'https://www.google.com.tw/maps/place/%E6%B8%A1%E6%9C%88%E6%A9%8B/@35.0121773,135.675021,17z/data=!4m6!3m5!1s0x6001075300916977:0xec14f8e82496283d!8m2!3d35.0128769!4d135.6777748!16s%2Fg%2F122p7w8j?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '17:30 - 18:30',
            pic_src: 'assets/嵐山_喜重郎.jpg',
            description: '【晚餐】：嵐山 喜重郎',
            map_location: 'https://www.google.com.tw/maps/place/Kijurou/@35.0168426,135.6748663,17z/data=!3m1!4b1!4m6!3m5!1s0x6001a9d80cae2f3b:0xcaff64680556a1aa!8m2!3d35.0168382!4d135.6774412!16s%2Fg%2F11f6j2tz_1?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '19:00 ~ 20:00',
            pic_src: 'assets/風風之湯.jpg',
            description: '嵐山 風風之湯',
            map_location: 'https://www.google.com.tw/maps/place/%E9%A2%A8%E9%A2%A8%E4%B9%8B%E6%B9%AF/@35.0115951,135.6774232,17z/data=!3m1!4b1!4m6!3m5!1s0x60010754152e7689:0x51f4b2e69c2b81bf!8m2!3d35.0115907!4d135.6799981!16s%2Fg%2F1210rwbd?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '20:40 ~ ',
            pic_src: 'assets/京都車站.jpg',
            description: '京都車站、唐吉訶德、旅館休息',
            map_location: null
          }
        ],
        hotel_name: '相鐵FRESA INN - 京都站八條口',
        hotel_map_location: 'https://www.google.com.tw/maps/place/%E7%9B%B8%E9%90%B5FRESA+INN+%E4%BA%AC%E9%83%BD%E7%AB%99%E5%85%AB%E6%A2%9D%E5%8F%A3/@34.982872,135.7584294,17z/data=!3m1!4b1!4m11!3m10!1s0x600108ad12afd4d7:0xff8371e5fe953e2c!5m4!1s2023-12-31!2i3!4m1!1i2!8m2!3d34.9828676!4d135.7610043!16s%2Fg%2F11c5rsqn4b?hl=zh-TW&authuser=0&entry=ttu',
        shopping_list: [],
        memo_list: [
          '【關西周遊券(第一天使用)】',
          '嵐山：eX cafe（イクスカフェ）京都嵐山本店(點心店)',
          '晚餐 予約不可'
        ],
        breakfirst: '小川咖啡 京都駅中央口店',
        breakfirst_map_location: 'https://www.google.com.tw/maps/place/%E5%B0%8F%E5%B7%9D%E5%92%96%E5%95%A1/@34.9873815,135.7562141,17z/data=!3m2!4b1!5s0x600108aed0b624b9:0x486cece4a59d26e6!4m6!3m5!1s0x600108af0e6dcaf7:0xd90e42a64e985a08!8m2!3d34.9873771!4d135.758789!16s%2Fg%2F1tf15sjc?hl=zh-TW&authuser=0&entry=ttu',
        launch: '五木茶屋 嵐山本店',
        launch_map_location: 'https://www.google.com.tw/maps/place/Arashiyama+Itsukichaya/@35.0120576,135.6772263,17z/data=!3m1!4b1!4m6!3m5!1s0x60010712b368466b:0x1d95f39ac2644e8d!8m2!3d35.0120532!4d135.6798012!16s%2Fg%2F12qgvqzxz?hl=zh-TW&authuser=0&entry=ttu',
        dinner: '嵐山 喜重郎',
        dinner_map_location: 'https://www.google.com.tw/maps/place/Kijurou/@35.0168426,135.6748663,17z/data=!3m1!4b1!4m6!3m5!1s0x6001a9d80cae2f3b:0xcaff64680556a1aa!8m2!3d35.0168382!4d135.6774412!16s%2Fg%2F11f6j2tz_1?hl=zh-TW&authuser=0&entry=ttu'
      },
      // 第五天 1/3
      {
        title: '【Day 5】1/3(三)',
        description: '參訪京都知名古廟，晚上轉移據點到大阪 心齋橋，並在心齋橋、道頓堀逛街，享用晚餐。',
        schedule_list: [
          {
            time: '07:00 ~ 07:30',
            pic_src: 'assets/INODA咖啡.jpg',
            description: '【早餐】：INODA咖啡 本店',
            map_location: 'https://www.google.com.tw/maps/place/INODA%E5%92%96%E5%95%A1+%E6%9C%AC%E5%BA%97/@34.9995262,135.7698377,15.5z/data=!4m6!3m5!1s0x600108903ca0851d:0x5d532e588a324cd4!8m2!3d35.0081041!4d135.7631928!16s%2Fg%2F11b7lq7szg?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '08:00 ~ 10:30',
            pic_src: 'assets/清水寺.jpg',
            description: '清水寺參訪，門票300￥',
            map_location: 'https://www.google.com.tw/maps/place/%E6%B8%85%E6%B0%B4%E5%AF%BA/@34.9946706,135.7820861,17z/data=!3m1!4b1!4m6!3m5!1s0x600108d385dcfb07:0x62af658650c434ba!8m2!3d34.9946662!4d135.784661!16zL20vMDJ5bjNn?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '11:00 ~ 11:30',
            pic_src: 'assets/天婦羅_天周.jpg',
            description: '【午餐】：天婦羅 天周',
            map_location: 'https://www.google.com.tw/maps/place/%E5%A4%A9%E5%A9%A6%E7%BE%85+%E5%A4%A9%E5%91%A8/@35.0039733,135.7710272,17z/data=!3m1!4b1!4m6!3m5!1s0x600108c1bfc3e4a9:0xd23f7e0981634667!8m2!3d35.0039689!4d135.7736021!16s%2Fg%2F1tdq5xkj?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '12:00 ~ 14:30',
            pic_src: 'assets/伏見稻荷大社.jpg',
            description: '伏見稻荷大社參訪',
            map_location: 'https://www.google.com.tw/maps/place/%E4%BC%8F%E8%A6%8B%E7%A8%BB%E8%8D%B7%E5%A4%A7%E7%A4%BE/@34.9676989,135.7766127,17z/data=!3m1!4b1!4m6!3m5!1s0x60010f153d2e6d21:0x7b1aca1c753ae2e9!8m2!3d34.9676945!4d135.7791876!16zL20vMDVsZHJt?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '15:00 ~ 16:00',
            pic_src: 'assets/京都地鐵.jpg',
            description: '京都 -> 心齋橋',
            map_location: null
          },
          {
            time: '16:10 ~ ',
            pic_src: 'assets/燒肉力丸_難波道頓堀店.jpg',
            description: '【晚餐】：19:00，心齋橋商店街、道頓堀',
            map_location: 'https://www.google.com.tw/maps/place/%E7%87%92%E8%82%89%E5%8A%9B%E4%B8%B8+%E9%9B%A3%E6%B3%A2%E9%81%93%E9%A0%93%E5%A0%80%E5%BA%97/@34.6709513,135.498707,17z/data=!3m1!5s0x6000e7137883b899:0xb1fdafc0874bbafb!4m6!3m5!1s0x6000e7520eb6e909:0x8d4857666a6fbb3a!8m2!3d34.6685996!4d135.5011283!16s%2Fg%2F11sqd3j4dn?hl=zh-TW&authuser=0&entry=ttu'
          }
        ],
        hotel_name: 'IP City Hotel Osaka',
        hotel_map_location: 'https://www.google.com.tw/maps/place/Ip+City+Hotel+Osaka/@34.6758756,135.5011768,17z/data=!3m2!4b1!5s0x6000e717773d6a63:0xcf03e13fee8d40a7!4m11!3m10!1s0x6000e71779eba825:0xab83df9ccff2297!5m4!1s2023-12-31!2i3!4m1!1i2!8m2!3d34.6758712!4d135.5037517!16s%2Fg%2F11ff0w7l80?hl=zh-TW&authuser=0&entry=ttu',
        shopping_list: [
          '清水寺：',
          '\t舞妓咖哩辣仙貝(產寧坂 10:00)、八つ橋',
          ' ',
          '伏見稻禾大社：',
          '\t聖護院(生八橋)、京豆腐冰淇淋、總本家Inariya(煎餅)',
          ' ',
          '心齋橋、道頓堀：',
          '\tPABLO 心齋橋店、十元起司燒',
          ' ',
          '回程路線：京都 -> 烏丸 -> 淡路 -> 長掘橋 -> 心齋橋',
          ' ',
          '烏丸站：',
          '\t塩芳軒、聖護院八橋總 本店大丸京都店'
        ],
        memo_list: [
          '【關西周遊券(第二天使用)】',
        ],
        breakfirst: 'INODA咖啡 本店',
        breakfirst_map_location: 'https://www.google.com.tw/maps/place/INODA%E5%92%96%E5%95%A1+%E6%9C%AC%E5%BA%97/@34.9995262,135.7698377,15.5z/data=!4m6!3m5!1s0x600108903ca0851d:0x5d532e588a324cd4!8m2!3d35.0081041!4d135.7631928!16s%2Fg%2F11b7lq7szg?hl=zh-TW&authuser=0&entry=ttu',
        launch: '【午餐】：天婦羅 天周',
        launch_map_location: 'https://www.google.com.tw/maps/place/%E5%A4%A9%E5%A9%A6%E7%BE%85+%E5%A4%A9%E5%91%A8/@35.0039733,135.7710272,17z/data=!3m1!4b1!4m6!3m5!1s0x600108c1bfc3e4a9:0xd23f7e0981634667!8m2!3d35.0039689!4d135.7736021!16s%2Fg%2F1tdq5xkj?hl=zh-TW&authuser=0&entry=ttu',
        dinner: '【晚餐】：燒肉力丸 難波道頓堀店',
        dinner_map_location: 'https://www.google.com.tw/maps/place/%E7%87%92%E8%82%89%E5%8A%9B%E4%B8%B8+%E9%9B%A3%E6%B3%A2%E9%81%93%E9%A0%93%E5%A0%80%E5%BA%97/@34.6709513,135.498707,17z/data=!3m1!5s0x6000e7137883b899:0xb1fdafc0874bbafb!4m6!3m5!1s0x6000e7520eb6e909:0x8d4857666a6fbb3a!8m2!3d34.6685996!4d135.5011283!16s%2Fg%2F11sqd3j4dn?hl=zh-TW&authuser=0&entry=ttu'
      },
      // 第六天 1/4
      {
        title: '【Day 6】1/4(四)',
        description: '在環球影城玩樂，並於晚上前往空庭溫泉放鬆',
        schedule_list: [
          {
            time: '07:00 ~ 19:00',
            pic_src: 'assets/環球影城.jpg',
            description: '環球影城 + 任天堂入園',
            map_location: 'https://www.google.com.tw/maps/place/%E6%97%A5%E6%9C%AC%E7%92%B0%E7%90%83%E5%BD%B1%E5%9F%8E/@34.6656811,135.4274476,17z/data=!3m1!4b1!4m6!3m5!1s0x6000e0d083d5e25d:0x3605fe25303252aa!8m2!3d34.6656768!4d135.4323185!16zL20vMDczN3g1?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '20:00 ~ 22:00',
            pic_src: 'assets/空庭溫泉.jpg',
            description: '空庭溫泉',
            map_location: 'https://www.google.com.tw/maps/place/%E7%A9%BA%E5%BA%AD%E6%BA%AB%E6%B3%89/@34.6703623,135.4569727,17z/data=!3m2!4b1!5s0x6000e631f5bb5029:0x92a6cb4c26e72234!4m6!3m5!1s0x6000e70de0ff6c87:0x145cc69b7e9ae644!8m2!3d34.6703579!4d135.4595476!16s%2Fg%2F11fd754j_x?hl=zh-TW&authuser=0&entry=ttu'
          },
        ],
        hotel_name: 'IP City Hotel Osaka',
        hotel_map_location: 'https://www.google.com.tw/maps/place/Ip+City+Hotel+Osaka/@34.6758756,135.5011768,17z/data=!3m2!4b1!5s0x6000e717773d6a63:0xcf03e13fee8d40a7!4m11!3m10!1s0x6000e71779eba825:0xab83df9ccff2297!5m4!1s2023-12-31!2i3!4m1!1i2!8m2!3d34.6758712!4d135.5037517!16s%2Fg%2F11ff0w7l80?hl=zh-TW&authuser=0&entry=ttu',
        shopping_list: [],
        memo_list: [
          '空庭溫泉：已購票，夜間入場含岩盤浴',
          '環球影城：08:00 ~ 19:00，已購買任天堂保證入園券 + 1日票',
          '優先順序：',
          '1.蜘蛛人',
          '2.小小兵',
          '3.飛天翼龍',
          '4.哈利波特',
          '5.馬力歐賽車',
          '6.耀西冒險',
        ],
        breakfirst: '隨便買',
        breakfirst_map_location: null,
        launch: '環球影城',
        launch_map_location: 'https://www.google.com.tw/maps/place/%E6%97%A5%E6%9C%AC%E7%92%B0%E7%90%83%E5%BD%B1%E5%9F%8E/@34.6656811,135.4274476,17z/data=!3m1!4b1!4m6!3m5!1s0x6000e0d083d5e25d:0x3605fe25303252aa!8m2!3d34.6656768!4d135.4323185!16zL20vMDczN3g1?hl=zh-TW&authuser=0&entry=ttu',
        dinner: '環球影城',
        dinner_map_location: 'https://www.google.com.tw/maps/place/%E6%97%A5%E6%9C%AC%E7%92%B0%E7%90%83%E5%BD%B1%E5%9F%8E/@34.6656811,135.4274476,17z/data=!3m1!4b1!4m6!3m5!1s0x6000e0d083d5e25d:0x3605fe25303252aa!8m2!3d34.6656768!4d135.4323185!16zL20vMDczN3g1?hl=zh-TW&authuser=0&entry=ttu'
      },
      // 第七天 1/5
      {
        title: '【Day 7】1/5(五)',
        description: '參觀姬路城、神戶動物王國，晚上回到大阪市區享用神戶牛料理，並登上梅田大廈欣賞夜景，再前往長居植物園體驗燈光藝術',
        schedule_list: [
          {
            time: '07:00 ~ 07:40',
            pic_src: 'assets/Planet3rd_心齋橋店.jpg',
            description: '【早餐】：Planet3rd 心齋橋店',
            map_location: 'https://www.google.com.tw/maps/place/Planet3rd/@34.672649,135.4970801,17z/data=!3m2!4b1!5s0x6000e710fc17be9b:0xf948bff24d292cfb!4m6!3m5!1s0x6000e710fc0556e3:0x18c5b963fd949346!8m2!3d34.6726446!4d135.499655!16s%2Fg%2F1tgtfcwm?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '09:00 ~ 11:00',
            pic_src: 'assets/姬路城.jpg',
            description: '姬路城',
            map_location: 'https://www.google.com.tw/maps/place/%E5%A7%AC%E8%B7%AF%E5%9F%8E/@34.8394534,134.6913298,17z/data=!3m1!4b1!4m6!3m5!1s0x3554e003a23324b3:0x7a4f8c2f6eba81b1!8m2!3d34.839449!4d134.6939047!16zL20vMDE4bmN4?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '12:30 ~ 13:20',
            pic_src: 'assets/神戶牛排.jpg',
            description: '【午餐】神戶牛排 Steak Land',
            map_location: 'https://www.google.com.tw/maps/place/%E7%A5%9E%E6%88%B6%E7%89%9B%E6%8E%92+Steak+Land/@34.693006,135.1891604,17z/data=!3m2!4b1!5s0x60008ee4a1077ac1:0xdb7fa57eacfbb012!4m6!3m5!1s0x60008ee4a1055555:0x3b3babcdc69bf4e3!8m2!3d34.6930016!4d135.1917353!16s%2Fg%2F1tj91dj0?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '14:00 ~ 16:00',
            pic_src: 'assets/神戶動物王國.jpg',
            description: '神戶動物王國',
            map_location: 'https://www.google.com.tw/maps/place/%E7%A5%9E%E6%88%B6%E5%8B%95%E7%89%A9%E7%8E%8B%E5%9C%8B/@34.654646,135.2199719,17z/data=!3m1!4b1!4m6!3m5!1s0x600091f82316e69b:0x8ea652d596843c4!8m2!3d34.6546416!4d135.2225468!16s%2Fm%2F080p796?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '17:00 ~ 17:30',
            pic_src: 'assets/神戶あぶり牧場.jpg',
            description: '【晚餐】：神戶あぶり牧場 本店',
            map_location: 'https://www.google.com.tw/maps/place/%E7%87%92%E8%82%89+%E7%A5%9E%E6%88%B6%E3%81%82%E3%81%B6%E3%82%8A%E7%89%A7%E5%A0%B4+%E6%9C%AC%E5%BA%97/@34.7073574,135.4930571,17z/data=!3m2!4b1!5s0x6000e68f94fb1b7b:0xcdcc7db27042c6a!4m6!3m5!1s0x6000e68f94e50b19:0x44a93e6982aeb69e!8m2!3d34.707353!4d135.495632!16s%2Fg%2F1hc1n6y35?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '17:40 ~ 18:40',
            pic_src: 'assets/梅田藍天大樓.jpg',
            description: '梅田藍天大樓',
            map_location: 'https://www.google.com.tw/maps/place/%E6%A2%85%E7%94%B0%E8%97%8D%E5%A4%A9%E5%A4%A7%E6%A8%93/@34.7052916,135.4870778,17z/data=!3m2!4b1!5s0x6000e688863f7021:0x4ceb5b0522a7c0c0!4m6!3m5!1s0x6000e6889074276f:0x57c2e32670decafd!8m2!3d34.7052872!4d135.4896527!16zL20vMDNfZjE3?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '19:40 ~ 21:30',
            pic_src: 'assets/大阪teamlab.jpg',
            description: '大阪teamlab 長居植物園',
            map_location: 'https://www.google.com.tw/maps/place/teamLab+Botanical+Garden+Osaka/@34.6110326,135.518041,17z/data=!3m1!4b1!4m6!3m5!1s0x6000ddcc564160bf:0x44b07e28c7a3a0fb!8m2!3d34.6110282!4d135.5206159!16s%2Fg%2F11szdz0ktq?hl=zh-TW&authuser=0&entry=ttu'
          }
        ],
        hotel_name: 'IP City Hotel Osaka',
        hotel_map_location: 'https://www.google.com.tw/maps/place/Ip+City+Hotel+Osaka/@34.6758756,135.5011768,17z/data=!3m2!4b1!5s0x6000e717773d6a63:0xcf03e13fee8d40a7!4m11!3m10!1s0x6000e71779eba825:0xab83df9ccff2297!5m4!1s2023-12-31!2i3!4m1!1i2!8m2!3d34.6758712!4d135.5037517!16s%2Fg%2F11ff0w7l80?hl=zh-TW&authuser=0&entry=ttu',
        shopping_list: [
          '【晚餐】：神戶あぶり牧場	單點項目：',
          '神戶牛肉生辦烤牛肉	1280',
          '鹽味牛舌(半份)	520',
          '上等肩部裡擠肉	1990',
          '上等樂肉(半份)	780',
          '黑毛和牛治燒茶泡飯	590',
          '黑毛和牛肩頰肉(半份)	520'
        ],
        memo_list: [
          '【關西周遊券(第三天使用)】',
          '神戶あぶり牧場 本店：未預約 估計 5680￥、https://www.aburi-bokujyou.com/zh-tw/menu/dinner',
          '神戶牛排 Steak Land：未預約',
        ],
        breakfirst: '【早餐】：Planet3rd 心齋橋店',
        breakfirst_map_location: 'https://www.google.com.tw/maps/place/Planet3rd/@34.672649,135.4970801,17z/data=!3m2!4b1!5s0x6000e710fc17be9b:0xf948bff24d292cfb!4m6!3m5!1s0x6000e710fc0556e3:0x18c5b963fd949346!8m2!3d34.6726446!4d135.499655!16s%2Fg%2F1tgtfcwm?hl=zh-TW&authuser=0&entry=ttu',
        launch: '【午餐】神戶牛排 Steak Land',
        launch_map_location: 'https://www.google.com.tw/maps/place/%E7%A5%9E%E6%88%B6%E7%89%9B%E6%8E%92+Steak+Land/@34.693006,135.1891604,17z/data=!3m2!4b1!5s0x60008ee4a1077ac1:0xdb7fa57eacfbb012!4m6!3m5!1s0x60008ee4a1055555:0x3b3babcdc69bf4e3!8m2!3d34.6930016!4d135.1917353!16s%2Fg%2F1tj91dj0?hl=zh-TW&authuser=0&entry=ttu',
        dinner: '【晚餐】：神戶あぶり牧場',
        dinner_map_location: 'https://www.google.com.tw/maps/place/%E7%87%92%E8%82%89+%E7%A5%9E%E6%88%B6%E3%81%82%E3%81%B6%E3%82%8A%E7%89%A7%E5%A0%B4+%E6%9C%AC%E5%BA%97/@34.7073574,135.4930571,17z/data=!3m2!4b1!5s0x6000e68f94fb1b7b:0xcdcc7db27042c6a!4m6!3m5!1s0x6000e68f94e50b19:0x44a93e6982aeb69e!8m2!3d34.707353!4d135.495632!16s%2Fg%2F1hc1n6y35?hl=zh-TW&authuser=0&entry=ttu'
      },
      // 第八天 1/6
      {
        title: '【Day 8】1/6(六)',
        description: '在大阪市區造訪各個觀光景點，使用大阪周遊券享受各項免費折扣',
        schedule_list: [
          {
            time: '08:30 ~ 09:00',
            pic_src: 'assets/MONDIAL KAFFEE 328.jpg',
            description: '【早餐】：MONDIAL KAFFEE 328',
            map_location: 'https://www.google.com.tw/maps/place/MONDIAL+KAFFEE+328+NY3/@34.6742069,135.4954195,19z/data=!3m1!4b1!4m6!3m5!1s0x6000e70539401829:0x520fdc8ac5578503!8m2!3d34.6742058!4d135.4960632!16s%2Fg%2F11b6j39nn2?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '09:30 ~ 11:30',
            pic_src: 'assets/大阪城.jpg',
            description: '大阪城 & 御座船',
            map_location: 'https://www.google.com.tw/maps/place/%E5%A4%A7%E9%98%AA%E5%9F%8E/@34.6872615,135.5232797,17z/data=!3m1!4b1!4m6!3m5!1s0x6000e0cd5c283afd:0xf01d07d5ca11e41!8m2!3d34.6872571!4d135.5258546!16zL20vMDI0Yl9n?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '12:00 ~ 13:00',
            pic_src: 'assets/難波御堂筋店.jpg',
            description: '【午餐】：牛かつもと村 難波御堂筋店',
            map_location: 'https://www.google.com.tw/maps/place/Gyukatsu+Motomura+Namba+Midosuji/@34.6667172,135.4974118,17z/data=!3m1!4b1!4m6!3m5!1s0x6000e724a9c8012f:0x81d66dd75e1dccbc!8m2!3d34.6667128!4d135.4999867!16s%2Fg%2F11twj8pbg2?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '14:00 ~ 16:00',
            pic_src: 'assets/通天閣.jpg',
            description: '新世界本通商店街、通天閣、黑門市場',
            map_location: 'https://www.google.com.tw/maps/place/%E9%80%9A%E5%A4%A9%E9%96%A3/@34.6525036,135.5037309,17z/data=!3m2!4b1!5s0x6000e75fd865990d:0x45a94d35329f8d81!4m6!3m5!1s0x6000e76077e042ff:0xe5cbcf56def44557!8m2!3d34.6524992!4d135.5063058!16zL20vMDJia3do?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '16:30 ~ 17:30',
            pic_src: 'assets/難波美食小巷.jpg',
            description: '【晚餐】：難波美食小巷',
            map_location: null
          },
          {
            time: '18:00 ~ 20:30',
            pic_src: 'assets/海遊館.jpg',
            description: '海遊館夜遊',
            map_location: 'https://www.google.com.tw/maps/place/%E6%B5%B7%E9%81%8A%E9%A4%A8/@34.6545225,135.4240936,17z/data=!3m2!4b1!5s0x6000e8f48fa243ff:0x25fc1f29292f7889!4m6!3m5!1s0x6000e8f48c0da9cd:0x6f83c520ae082ccc!8m2!3d34.6545182!4d135.4289645!16zL20vMDJjeW13?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '20:50 ~ 21:05',
            pic_src: 'assets/天保山大摩天輪.jpg',
            description: '天保山大摩天輪',
            map_location: 'https://www.google.com.tw/maps/place/%E5%A4%A9%E4%BF%9D%E5%B1%B1%E5%A4%A7%E6%91%A9%E5%A4%A9%E8%BC%AA/@34.656273,135.428391,17z/data=!3m1!4b1!4m6!3m5!1s0x6000e88b5561e543:0xfe7be2a424a0c226!8m2!3d34.6562686!4d135.4309659!16zL20vMDZrN2M1?hl=zh-TW&authuser=0&entry=ttu'
          },
        ],
        hotel_name: 'IP City Hotel Osaka',
        hotel_map_location: 'https://www.google.com.tw/maps/place/Ip+City+Hotel+Osaka/@34.6758756,135.5011768,17z/data=!3m2!4b1!5s0x6000e717773d6a63:0xcf03e13fee8d40a7!4m11!3m10!1s0x6000e71779eba825:0xab83df9ccff2297!5m4!1s2023-12-31!2i3!4m1!1i2!8m2!3d34.6758712!4d135.5037517!16s%2Fg%2F11ff0w7l80?hl=zh-TW&authuser=0&entry=ttu',
        shopping_list: [],
        memo_list: [
          '【大阪周遊券使用】',
          '天保山大摩天輪、大阪城 & 御座船：周遊券免費',
          '牛かつもと村 難波御堂筋店：預約不可',
          '黑門市場：YUMTEA泱茶 日本橋'
        ],
        breakfirst: '【早餐】：MONDIAL KAFFEE 328',
        breakfirst_map_location: 'https://www.google.com/maps/place/Gyukatsu+Motomura+Namba+Midosuji/@34.6666682,135.4984199,17z/data=!4m6!3m5!1s0x6000e724a9c8012f:0x81d66dd75e1dccbc!8m2!3d34.6667128!4d135.4999867!16s%2Fg%2F11twj8pbg2?entry=ttu',
        launch: '【午餐】：牛かつもと村 難波御堂筋店',
        launch_map_location: 'https://www.google.com/maps/place/Gyukatsu+Motomura+Namba+Midosuji/@34.6667128,135.4999867,15z/data=!4m2!3m1!1s0x0:0x81d66dd75e1dccbc?sa=X&ved=2ahUKEwiBxbH-qb6CAxVHdfUHHTJaD7oQ_BJ6BAhEEAA',
        dinner: '【晚餐】：難波美食小巷',
        dinner_map_location: 'https://www.google.com.tw/maps/place/%E9%AB%98%E9%90%B5%E6%A1%83%E5%9C%92/@25.0133238,121.2118477,17z/data=!4m6!3m5!1s0x34682107ccd0899f:0xe2b48ace5968d6ef!8m2!3d25.01374!4d121.2140636!16s%2Fg%2F11c328z_cc?hl=zh-TW&authuser=0&entry=ttu'
      },
      // 第九天 1/7
      {
        title: '【Day 9】1/7(日)',
        description: '早起享用麥當勞早餐，並參訪住吉大社後啟程前往關西機場返國',
        schedule_list: [
          {
            time: '07:00 ~ 07:20',
            pic_src: 'assets/麥當勞.png',
            description: '【早餐】：McDonald\'s 麥當勞 心齋橋南店：楓糖鬆餅漢堡',
            map_location: 'https://www.google.com.tw/maps/place/McDonald\'s+%E9%BA%A5%E7%95%B6%E5%8B%9E+%E5%BF%83%E9%BD%8B%E6%A9%8B%E5%8D%97%E5%BA%97/@34.6696798,135.4963742,17z/data=!3m1!4b1!4m6!3m5!1s0x6000e7138d49e619:0x4d122e38e7164c5a!8m2!3d34.6696755!4d135.5012451!16s%2Fg%2F1tjt1tzp?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '08:00 ~ 08:30',
            pic_src: 'assets/住吉大社.jpg',
            description: '住吉大社',
            map_location: 'https://www.google.com.tw/maps/place/%E4%BD%8F%E5%90%89%E5%A4%A7%E7%A4%BE/@34.6123989,135.4911863,17z/data=!3m1!4b1!4m6!3m5!1s0x6000e7bbc67c0001:0xa7f51dfe4d001f82!8m2!3d34.6123945!4d135.4937612!16zL20vMGRwdDBj?hl=zh-TW&authuser=0&entry=ttu'
          },
          {
            time: '08:35 ~ 09:25',
            pic_src: 'assets/南海電鐵.jpg',
            description: '住吉大社 🚝 KIX',
            map_location: null
          },
          {
            time: '12:20 ~ 14:35',
            pic_src: 'assets/星宇.jpg',
            description: 'KIX -> TPE',
            map_location: null
          },
        ],
        hotel_name: '我家',
        hotel_map_location: null,
        shopping_list: [],
        memo_list: [
          '住吉大社：南海電鐵道KIX'
        ],
        breakfirst: '麥當勞 心齋橋南店：楓糖鬆餅漢堡',
        breakfirst_map_location: 'https://www.google.com.tw/maps/place/McDonald\'s+%E9%BA%A5%E7%95%B6%E5%8B%9E+%E5%BF%83%E9%BD%8B%E6%A9%8B%E5%8D%97%E5%BA%97/@34.6696798,135.4963742,17z/data=!3m1!4b1!4m6!3m5!1s0x6000e7138d49e619:0x4d122e38e7164c5a!8m2!3d34.6696755!4d135.5012451!16s%2Fg%2F1tjt1tzp?hl=zh-TW&authuser=0&entry=ttu',
        launch: '星宇機上餐',
        launch_map_location: null,
        dinner: '無',
        dinner_map_location: null
      },
    ] as any[]
    return this.travelSchedule;
  }
}
