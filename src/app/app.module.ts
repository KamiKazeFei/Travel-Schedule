import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AppRoutingModule, } from './app-routing.module';
import { AppComponent } from './app.component';
import { TravelIntroduceComponent } from './travel-introduce/travel-introduce.component';
import { TravelDetailComponent } from './travel-introduce/travel-detail/travel-detail.component';
import { FormsModule } from '@angular/forms';
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AppComponent,
    TravelIntroduceComponent,
    TravelDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    TabViewModule,
    ButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
