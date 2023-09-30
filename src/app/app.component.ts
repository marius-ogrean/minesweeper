import { Component } from '@angular/core';
import { Row } from './row';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rows: Array<Row> = [];

  constructor() {
    for (let i = 0; i < 16; i++) {
      this.rows.push(new Row(30));
    }
  }
}
