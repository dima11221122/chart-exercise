import { Injectable } from '@angular/core';
import * as d3 from 'd3';
import { ChartDataItem } from '../../components/models/chart-data-item';
import { MarginsConfig } from '../../components/models/margins-config';
import { ViewboxConfig } from '../../components/models/viewbox-config';

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

export interface XAxisTick {
  displayValue: string;
  xCoordinate: number;
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

  private getMinYValue(): number {
    return this.yAxisType === YAxisType.Linear ? 0 : 1;
  }

  init(data: ChartDataItem[], params: InitParameters): void {
    const { margins, viewbox } = params;
    this.xScale = d3.scaleBand<string>()
      .domain(data.map(it => it.name))
      .range([margins.left, viewbox.width - margins.right])
      .padding(0.3);

    this.yAxisType = params.yAxisType;
    this.yScale = this.createYScale()
      .domain([this.getMinYValue(), d3.max(data, d => Math.max(d.todayValue, d.yesterdayValue))])
      .nice()
      .range([viewbox.height - margins.bottom, margins.top]);
  }

  getX(name: string): number {
    return this.xScale(name);
  }

  getBarHeight(value: number): number {
    return this.yScale(this.getMinYValue()) - this.yScale(value);
  }

  getY(value: number): number {
    return this.yScale(value);
  }

  getBandwidthArea(): number {
    return this.xScale.bandwidth();
  }

  generateYTicks(): YAxisTick[] {
    return (d3.axisLeft(this.yScale).scale() as any).ticks(5).map(it => ({
      displayValue: Math.floor(it / 1000),
      yCoordinate: this.yScale(it)
    }));
  }

  generateXTicks(): XAxisTick[] {
    return this.xScale.domain().map(it => ({
      xCoordinate: this.getX(it),
      displayValue: it
    }));
  }
}
