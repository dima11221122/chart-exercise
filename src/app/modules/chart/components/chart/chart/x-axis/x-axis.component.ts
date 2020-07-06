import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataItem } from '../../../models/chart-data-item';
import { ChartService, XAxisTick } from '../../../../services/chart/chart.service';

@Component({
  selector: '[app-x-axis]',
  templateUrl: './x-axis.component.html',
  styleUrls: ['./x-axis.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class XAxisComponent implements OnInit {
  @Input() xTicks: XAxisTick[];
  @Input() barCenter: number;

  ngOnInit(): void {
  }

}
