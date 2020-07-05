import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { ChartDataItem } from '../../models/chart-data-item';
import { MarginsConfig } from '../../models/margins-config';
import { ViewboxConfig } from '../../models/viewbox-config';

export enum YAxisType {
  Linear,
  Logarithmic
}

export interface InitParameters {
  margins: MarginsConfig;
  viewbox: ViewboxConfig;
  yAxisType: YAxisType;
}

export interface YAxisTick {
  displayValue: number;
  yCoordinate: number;
}

@Injectable()
export class ChartService {
  private xScale: d3.ScaleBand<string>;
  private yScale: d3.ScaleContinuousNumeric<number, number>;
  private yAxisType: YAxisType;

  constructor() { }

  private createYScale(): d3.ScaleContinuousNumeric<number, number> {
    return this.yAxisType === YAxisType.Linear ? d3.scaleLinear() : d3.scaleLog();
  }

  init(data: ChartDataItem[], params: InitParameters): void {
    const { margins, viewbox } = params;
    this.xScale = d3.scaleBand<string>()
      .domain(data.map(it => it.name))
      .range([margins.left, viewbox.width - margins.right])
      .padding(0.3);

    this.yAxisType = params.yAxisType;
    this.yScale = this.createYScale()
      .domain([0, d3.max(data, d => Math.max(d.todayValue, d.yesterdayValue))])
      .nice()
      .range([viewbox.height - margins.bottom, margins.top]);
  }

  getX(name: string): number {
    return this.xScale(name);
  }

  getBarHeight(value: number): number {
    return this.yScale(0) - this.yScale(value);
  }

  getY(value: number): number {
    return this.yScale(value);
  }

  getBandwidthArea(): number {
    return this.xScale.bandwidth();
  }

  calculatePercent(oldValue: number, newValue: number): number {
    return Math.abs(Math.floor(((oldValue - newValue) / oldValue) * 100));
  }

  generateYTicks(): YAxisTick[] {
    const yDomain = this.yScale.domain();
    const yRange = this.yScale.range();
    const invertYScale = this.createYScale()
      .domain(yRange)
      .range(yDomain)
    ;
    const diff = yRange[0] - yRange[1];
    const steps = 5;
    const stepSize = Math.floor( diff / steps);
    const res: YAxisTick[] = [];
    for (let i = 0, currentY = yRange[0]; i < steps; ++i) {
      res.push({
        displayValue: Math.floor(invertYScale(currentY) / 1000),
        yCoordinate: currentY
      });
      currentY -= stepSize;
    }

    return res;
  }
}
