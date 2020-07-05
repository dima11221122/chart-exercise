import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './components/chart/chart.component';
import { BarComponent } from './components/chart/chart/bar/bar.component';
import { XAxisComponent } from './components/chart/chart/x-axis/x-axis.component';
import { YAxisComponent } from './components/chart/chart/y-axis/y-axis.component';



@NgModule({
  declarations: [ChartComponent, BarComponent, XAxisComponent, YAxisComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ChartComponent
  ]
})
export class ChartModule { }
