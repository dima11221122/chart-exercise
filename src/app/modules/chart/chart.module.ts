import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { BarComponent } from './components/chart/chart/bars/bar/bar.component';
import { XAxisComponent } from './components/chart/chart/x-axis/x-axis.component';
import { YAxisComponent } from './components/chart/chart/y-axis/y-axis.component';
import { ValueFormatterPipe } from './components/chart/chart/bars/bar/value-formatter.pipe';
import { FormsModule } from '@angular/forms';
import { BarsComponent } from './components/chart/chart/bars/bars.component';



@NgModule({
  declarations: [ChartComponent, BarComponent, XAxisComponent, YAxisComponent, ValueFormatterPipe, BarsComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ChartComponent
  ]
})
export class ChartModule { }
