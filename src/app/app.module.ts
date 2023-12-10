import { DragDropModule } from '@angular/cdk/drag-drop';
import { registerLocaleData } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import localeZh from '@angular/common/locales/zh';
import { LOCALE_ID, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { MessagesModule } from 'primeng/messages';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';
import { CheckboxModule } from 'primeng/checkbox';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SplitterModule } from 'primeng/splitter';
import { TabViewModule } from 'primeng/tabview';
import { SelectButtonModule } from 'primeng/selectbutton';

import { AppRoutingModule, } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApiService } from './service/api.service';
import { TravelCostRecordComponent } from './travel-cost-record/travel-cost-record.component';
import { TravelHomeComponent } from './travel-home/travel-home.component';
import { TravelDetailComponent } from './travel-introduce/travel-detail/travel-detail.component';
import { TravelIntroduceComponent } from './travel-introduce/travel-introduce.component';
import { TravelLoginComponent } from './travel-login/travel-login.component';
import { TravelRegisterComponent } from './travel-register/travel-register.component';
import { TravelScheduleListComponent } from './travel-schedule-list/travel-schedule-list.component';
import { EditorModule } from 'primeng/editor';
import { FileUploadModule } from 'primeng/fileupload';

registerLocaleData(localeZh);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    TravelIntroduceComponent,
    TravelDetailComponent,
    TravelCostRecordComponent,
    TravelHomeComponent,
    TravelLoginComponent,
    TravelRegisterComponent,
    TravelScheduleListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DragDropModule,
    DialogModule,
    ConfirmDialogModule,
    CalendarModule,
    InputNumberModule,
    InputTextModule,
    HttpClientModule,
    ToastModule,
    MessagesModule,
    TooltipModule,
    CheckboxModule,
    RadioButtonModule,
    EditorModule,
    SplitterModule,
    TabViewModule,
    SelectButtonModule,
    FileUploadModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    ConfirmationService,
    TranslateService,
    MessageService,
    ApiService,
    { provide: LOCALE_ID, useValue: 'zh' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
