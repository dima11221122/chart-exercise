import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataItem } from '../../../models/chart-data-item';
import { ChartService, YAxisTick } from '../chart.service';

@Component({
  selector: '[app-y-axis]',
  templateUrl: './y-axis.component.html',
  styleUrls: ['./y-axis.component.scss']
})
export class YAxisComponent implements OnInit, OnChanges {
  @Input() bars: ChartDataItem[];
  @Input() width: number;
  @Input() marginLeft: number;

  yTicks: YAxisTick[];
  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.yTicks = this.chartService.generateYTicks();
  }

}
