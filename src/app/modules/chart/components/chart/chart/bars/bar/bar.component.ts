import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataItem } from '../../../../models/chart-data-item';
import { ChartService } from '../../../../../services/chart/chart.service';
import { BarGeometry } from '../../../../../services/bars/bars.service';

@Component({
  selector: '[app-bar]',
  templateUrl: './bar.component.html',
  styleUrls: ['./bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarComponent implements OnInit {
  @Input() yesterdayBarGeometry: BarGeometry;
  @Input() todayBarGeometry: BarGeometry;
  @Input() todayBarCenter: number;
  @Input() set isGood(value: boolean) {
    this.fillClass = value ? 'chart-bar__today-bar_good' : 'chart-bar__today-bar_bad';
  }
  @Input() todayValue: number;
  @Input() yesterdayValue: number;
  @Input() percent: number;

  fillClass: string;

  constructor() { }

  ngOnInit(): void {
  }

}
