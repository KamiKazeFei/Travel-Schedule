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
import { TravelTimelineComponent } from './travel-timeline/travel-timeline.component';
import { TravelCostRecordComponent } from './travel-cost-record/travel-cost-record.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    AppComponent,
    TravelIntroduceComponent,
    TravelDetailComponent,
    TravelTimelineComponent,
    TravelCostRecordComponent,

  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ButtonModule,
    CardModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
