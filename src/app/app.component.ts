import { Component } from '@angular/core';
import { Row } from './row';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rows: Array<Row>;
  readonly rowCount = 16;
  readonly columnCount = 30;
  arrayForRandomNumbers = new Uint32Array(1);

  constructor() {
    this.initializeGame();
  }

  initializeGame() {
    this.rows = [];

    for (let i = 0; i < this.rowCount; i++) {
      this.rows.push(new Row(this.columnCount));
    }

    this.addBombs();
  }

  addBombs() {
    let bombsToAdd = 99;

    while (bombsToAdd > 0) {
      const randomRow = this.getRandomNumberSmallerThan(this.rowCount);
      const randomCol = this.getRandomNumberSmallerThan(this.columnCount);
      if (this.rows[randomRow].cells[randomCol].hasBomb) {
        continue;
      }

      this.rows[randomRow].cells[randomCol].hasBomb = true;
      bombsToAdd--;
    }
  }

  getRandomNumberSmallerThan(limit: number) {
    self.crypto.getRandomValues(this.arrayForRandomNumbers);
    return this.arrayForRandomNumbers[0] % limit;
  }
}
