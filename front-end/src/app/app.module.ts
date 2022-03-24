import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './form.component';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { MatCardModule, } from "@angular/material/card";
import {  MatButtonModule,} from "@angular/material/button";
import {MatToolbarModule, } from "@angular/material/toolbar";
import {  MatExpansionModule} from "@angular/material/expansion";
import{MatPaginatorModule} from '@angular/material/paginator';
import{MatDialogModule} from "@angular/material/dialog"
import{MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatSliderModule} from '@angular/material/slider'
import { MatInputModule, } from "@angular/material/input";
import {MatFormFieldModule } from '@angular/material/form-field';
// import { MatCarouselModule } from '@ngmodule/material-carousel';



@NgModule({
  declarations: [
    AppComponent,
    FormComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule ,
    MatPaginatorModule,
    MatDialogModule,
    MatFormFieldModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
