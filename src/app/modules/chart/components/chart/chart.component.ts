import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ChartDataItem } from '../models/chart-data-item';
import { ChartService, YAxisType } from './chart/chart.service';
import { ViewboxConfig } from '../models/viewbox-config';
import { MarginsConfig } from '../models/margins-config';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ChartService
  ]
})
export class ChartComponent implements OnInit {
  get data(): ChartDataItem[] {
    return this._data;
  }

  @Input()  set data(value: ChartDataItem[]) {
    this._data = value;
    this.chartService.init(value, { viewbox: this.viewbox, margins: this.margins, yAxisType: YAxisType.Linear });
  }

  public readonly viewbox: Readonly<ViewboxConfig> = {
    width: 1000,
    height: 500
  };

  // Actual widths can be lower because of too many bars
  public readonly desiredBarsAreaWidth = 120;
  public readonly desiredTodayBarWidth = 80;
  public readonly desiredYesterdayBarWidth = 25;

  public readonly margins: Readonly<MarginsConfig> = { top: 100, bottom: 100, left: 100, right: 100 };


  private _data: ChartDataItem[];

  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
  }

  getX(bar: ChartDataItem): number {
    return this.chartService.getX(bar.name);
  }

}
