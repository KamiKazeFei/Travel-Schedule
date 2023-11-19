import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule, } from './app-routing.module';
import { AppComponent } from './app.component';
import { TravelIntroduceComponent } from './travel-introduce/travel-introduce.component';
import { TravelDetailComponent } from './travel-introduce/travel-detail/travel-detail.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TravelCostRecordComponent } from './travel-cost-record/travel-cost-record.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { TravelPlanningComponent } from './travel-planning/travel-planning.component';
import { ConfirmationService } from 'primeng/api';
import { TooltipModule } from 'primeng/tooltip';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessagesModule } from 'primeng/messages';
import { MessageService } from 'primeng/api';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    TravelIntroduceComponent,
    TravelDetailComponent,
    TravelCostRecordComponent,
    TravelPlanningComponent,
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
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
