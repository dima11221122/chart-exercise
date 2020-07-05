import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataItem } from '../../../models/chart-data-item';
import { ChartService } from '../chart.service';

@Component({
  selector: '[app-x-axis]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAxisComponent implements OnInit, OnChanges {
  @Input() bars: ChartDataItem[];
  middleX: number;

  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.middleX = this.chartService.getBandwidthArea() / 2;
  }

  getX(bar: ChartDataItem): number {
    return this.chartService.getX(bar.name)
  }

}
