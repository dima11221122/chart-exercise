import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataItem } from '../../../models/chart-data-item';
import { ChartService } from '../chart.service';

@Component({
  selector: '[app-bar]',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarComponent implements OnInit, OnChanges {
  @Input() bar: ChartDataItem;

  padding = 5;
  todayWidth = 80;
  yesterdayWidth = 25;
  todayBarCenter = this.todayWidth / 2;

  yesterdayBarConfig = {
    x: 0,
    y: 0,
    width: this.yesterdayWidth,
    height: 0
  };

  todayBarConfig = {
    x: 0,
    y: 0,
    width: this.todayWidth,
    height: 0,
  };
  fillClass: string;
  percent: number;

  constructor(private chartService: ChartService) { }

  ngOnInit(): void {
  }

  private calculateStartX(): number {
    const bandwidth = this.chartService.getBandwidthArea();
    const innerBandwidthArea = this.yesterdayWidth + this.padding + this.todayWidth;
    return Math.floor(bandwidth / 2) - Math.floor(innerBandwidthArea / 2);
  }

  ngOnChanges(changes: SimpleChanges): void {
    const startX = this.calculateStartX();

    this.yesterdayBarConfig.y = this.chartService.getY(this.bar.yesterdayValue);
    this.yesterdayBarConfig.height = this.chartService.getBarHeight(this.bar.yesterdayValue);
    this.yesterdayBarConfig.x = startX;

    this.todayBarConfig.y = this.chartService.getY(this.bar.todayValue);
    this.todayBarConfig.height = this.chartService.getBarHeight(this.bar.todayValue);
    this.todayBarConfig.x = startX + this.yesterdayBarConfig.width + this.padding;
    this.fillClass = this.bar.isGood ? 'good-fill' : 'bad-fill';
    this.percent = this.chartService.calculatePercent(this.bar.yesterdayValue, this.bar.todayValue);
  }

}
