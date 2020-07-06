import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataItem } from '../../../models/chart-data-item';
import { YAxisTick } from '../../../../services/chart/chart.service';

@Component({
  selector: '[app-y-axis]',
  templateUrl: './y-axis.component.html',
  styleUrls: ['./y-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YAxisComponent implements OnInit {
  @Input() bars: ChartDataItem[];
  @Input() width: number;
  @Input() marginLeft: number;
  @Input() yTicks: YAxisTick[];

  ngOnInit(): void {
  }
}
