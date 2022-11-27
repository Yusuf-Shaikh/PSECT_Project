import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { GeneratorInputComponent } from './generator-input/generator-input.component';
import { GeneratorGraphComponent } from './generator-graph/generator-graph.component';
import * as CanvasJSAngularChart from '../assets/canvasjs.angular.component';
import { AppRoutingModule } from './app-routing.module';
import { OutputComponent } from './output/output.component';
import { LoadInputComponent } from './load-input/load-input.component';
import { NgxPrintModule } from 'ngx-print';
var CanvasJSChart = CanvasJSAngularChart.CanvasJSChart;

@NgModule({
  declarations: [
    AppComponent,
    GeneratorInputComponent,
    GeneratorGraphComponent,
    LoadInputComponent,
    CanvasJSChart,
    OutputComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgxPrintModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
