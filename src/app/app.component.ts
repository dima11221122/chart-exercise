import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  data = [
    { name: 'Open', todayValue: 100000, yesterdayValue: 95000, isGood: true },
    { name: 'Close', todayValue: 90000, yesterdayValue: 40000, isGood: false },
    { name: 'Delete', todayValue: 76000, yesterdayValue: 78000, isGood: true },
    { name: 'Create', todayValue: 120000, yesterdayValue: 110000, isGood: true },
    { name: 'Stat', todayValue: 1000000, yesterdayValue: 1090000, isGood: false },
  ];
  title = 'chart-exercise';
}
