import { Injectable } from '@angular/core';
import { ChartService } from '../chart/chart.service';
import { ChartDataItem } from '../../components/models/chart-data-item';

export interface BarGeometry {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface BarsParams {
  xCoordinate: number;
  todayBarCenter: number;
  yesterdayBarGeometry: BarGeometry;
  todayBarGeometry: BarGeometry;
  isGood: boolean;
  todayValue: number;
  yesterdayValue: number;
  percent: number;
}

@Injectable()
export class BarsService {
  private static BarsPadding = 5;
  private static TodayWidth = 80;
  private static YesterdayWidth = 25;

  constructor(
    private chartService: ChartService
  ) { }

  private calculateStartX(): number {
    const bandwidth = this.chartService.getBandwidthArea();
    const innerBandwidthArea = BarsService.YesterdayWidth + BarsService.BarsPadding + BarsService.TodayWidth;
    return Math.floor(bandwidth / 2) - Math.floor(innerBandwidthArea / 2);
  }

  private calculatePercent(oldValue: number, newValue: number): number {
    return Math.abs(Math.floor(((oldValue - newValue) / oldValue) * 100));
  }

  init(bars: ChartDataItem[]): BarsParams[] {
    const startX = this.calculateStartX();
    return bars.map(bar => {
      const yesterdayBarGeometry: BarGeometry = {
        x: startX,
        y: this.chartService.getY(bar.yesterdayValue),
        width: BarsService.YesterdayWidth,
        height: this.chartService.getBarHeight(bar.yesterdayValue)
      };
      const todayBarGeometry: BarGeometry = {
        x: startX + yesterdayBarGeometry.width + BarsService.BarsPadding,
        y: this.chartService.getY(bar.todayValue),
        width: BarsService.TodayWidth,
        height: this.chartService.getBarHeight(bar.todayValue)
      };
      return {
        todayBarGeometry,
        yesterdayBarGeometry,
        xCoordinate: this.chartService.getX(bar.name),
        todayBarCenter: BarsService.TodayWidth / 2,
        isGood: bar.isGood,
        todayValue: bar.todayValue,
        yesterdayValue: bar.yesterdayValue,
        percent: this.calculatePercent(bar.yesterdayValue, bar.todayValue)
      };
    });
  }
}
