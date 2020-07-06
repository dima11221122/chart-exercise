import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { BarsParams } from '../../../../services/bars/bars.service';

@Component({
  selector: '[app-bars]',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarsComponent implements OnInit {
  @Input() barsParams: BarsParams[];
  constructor() { }

  ngOnInit(): void {
  }

}
