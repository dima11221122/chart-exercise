import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ChartDataItem } from '../models/chart-data-item';
import { ChartService, XAxisTick, YAxisTick, YAxisType } from '../../services/chart/chart.service';
import { ViewboxConfig } from '../models/viewbox-config';
import { MarginsConfig } from '../models/margins-config';
import { BarsParams, BarsService } from '../../services/bars/bars.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    ChartService,
    BarsService
  ]
})
export class ChartComponent implements OnInit {
  get data(): ChartDataItem[] {
    return this._data;
  }

  @Input()  set data(value: ChartDataItem[]) {
    this._data = value;
    this.initChart();
  }

  public readonly viewbox: Readonly<ViewboxConfig> = {
    width: 1000,
    height: 500
  };

  public readonly margins: Readonly<MarginsConfig> = { top: 100, bottom: 100, left: 100, right: 100 };
  operationsItems: { name: string, value: YAxisType }[] = [
    { name: 'Log', value: YAxisType.Logarithmic },
    { name: 'Linear', value: YAxisType.Linear },
  ];
  selectedOperation = this.operationsItems[0].value;

  // X Axis parameters
  xTicks: XAxisTick[];
  barCenter: number;

  // Y Axis parameters
  yTicks: YAxisTick[];

  // Bars parameters
  barsParams: BarsParams[];


  private _data: ChartDataItem[];

  constructor(
    private chartService: ChartService,
    private barsService: BarsService
  ) { }

  ngOnInit(): void {
  }

  getX(bar: ChartDataItem): number {
    return this.chartService.getX(bar.name);
  }

  initChart(): void {
    this.chartService.init(this._data, { viewbox: this.viewbox, margins: this.margins, yAxisType: this.selectedOperation });
    this.yTicks = this.chartService.generateYTicks();
    this.xTicks = this.chartService.generateXTicks();
    this.barCenter = this.chartService.getBandwidthArea() / 2;
    this.barsParams = this.barsService.init(this._data);
  }

  operationChange(value: YAxisType): void {
    this.selectedOperation = value;
    this.initChart();
  }

}
