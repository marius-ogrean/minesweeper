import { Component } from '@angular/core';
import { Row } from './row';
import { Cell } from './cell';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  rows: Array<Row>;
  readonly rowCount = 16;
  readonly columnCount = 30;
  readonly bombsNumber = 99;
  arrayForRandomNumbers = new Uint32Array(1);
  userDied: boolean = false;
  victory: boolean = false;

  constructor() {
    this.initializeGame();
  }

  initializeGame() {
    Cell.revealCount = 0;
    this.userDied = false;
    this.victory = false;
    this.rows = [];

    for (let i = 0; i < this.rowCount; i++) {
      this.rows.push(new Row(i, this.columnCount));
    }

    this.addBombs();
    this.calculateNumbers();
  }

  addBombs() {
    let bombsToAdd = this.bombsNumber;

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

  calculateNumbers() {
    for (let i = 0; i < this.rowCount; i++) {
      for (let j = 0; j < this.columnCount; j++) {
        const bombCount = this.getAdjacentBombs(i, j);

        this.getCell(i, j).adjacentBombs = bombCount;
      }
    }
  }

  getCell(row: number, column: number): Cell {
    return this.rows[row].cells[column];
  }

  getAdjacentBombs(row: number, column: number) {
    let bombCount = 0;

    if (this.getCell(row, column).hasBomb) {
      return bombCount;
    }

    if (row - 1 >= 0) {
      if (column - 1 >= 0) {
        if (this.getCell(row - 1, column - 1).hasBomb) {
          bombCount++;
        }
      }

      if (this.getCell(row - 1, column).hasBomb) {
        bombCount++;
      }

      if (column + 1 < this.columnCount) {
        if (this.getCell(row - 1, column + 1).hasBomb) {
          bombCount++;
        }
      }
    }

    if (column - 1 >= 0) {
      if (this.getCell(row, column - 1).hasBomb) {
        bombCount++;
      }
    }

    if (column + 1 < this.columnCount) {
      if (this.getCell(row, column + 1).hasBomb) {
        bombCount++;
      }
    }

    if (row + 1 < this.rowCount) {
      if (column - 1 >= 0) {
        if (this.getCell(row + 1, column - 1).hasBomb) {
          bombCount++;
        }
      }

      if (this.getCell(row + 1, column).hasBomb) {
        bombCount++;
      }

      if (column + 1 < this.columnCount) {
        if (this.getCell(row + 1, column + 1).hasBomb) {
          bombCount++;
        }
      }
    }

    return bombCount;
  }

  getRandomNumberSmallerThan(limit: number) {
    self.crypto.getRandomValues(this.arrayForRandomNumbers);
    return this.arrayForRandomNumbers[0] % limit;
  }

  restart() {
    this.initializeGame();
  }

  cellClicked(cell: Cell) {
    if (this.userDied || this.victory) {
      return;
    }

    if (cell.hasBomb) {
      cell.revealed = true;
      this.userDied = true;
    } else {
      if (cell.adjacentBombs === 0) {
        cell.addedForReveal = true;
        this.revealEmptyCells(cell);
      } else {
        cell.revealed = true;
        this.updateRevealCount();
      }
    }
  }

  updateRevealCount() {
    console.log(Cell.revealCount);

    if (this.rowCount * this.columnCount - this.bombsNumber === Cell.revealCount) {
      this.victory = true;
      alert('Victory');
    }
  }

  revealEmptyCells(startCell: Cell) {
    let stack: Array<Cell> = [startCell];

    while (stack.length) {
      let current: Cell = stack.pop() as Cell;
      if (current.adjacentBombs === 0 && !current.revealed) {
        current.revealed = true;
        this.updateRevealCount();
        if (current.rowIndex - 1 >= 0) {
          if (current.colIndex - 1 >= 0) {
            if (this.getCell(current.rowIndex - 1, current.colIndex - 1).adjacentBombs !== 0) {
              if (!this.getCell(current.rowIndex - 1, current.colIndex - 1).revealed) {
                this.getCell(current.rowIndex - 1, current.colIndex - 1).revealed = true;
                this.updateRevealCount();
              }
            }
          }

          if (this.getCell(current.rowIndex - 1, current.colIndex).adjacentBombs === 0) {
            if (!this.getCell(current.rowIndex - 1, current.colIndex).addedForReveal) {
              this.getCell(current.rowIndex - 1, current.colIndex).addedForReveal = true;
              stack.push(this.getCell(current.rowIndex - 1, current.colIndex));
            }
          } else {
            if (!this.getCell(current.rowIndex - 1, current.colIndex).revealed) {
              this.getCell(current.rowIndex - 1, current.colIndex).revealed = true;
              this.updateRevealCount();
            }
          }

          if (current.colIndex + 1 < this.columnCount) {
            if (this.getCell(current.rowIndex - 1, current.colIndex + 1).adjacentBombs !== 0) {
              this.getCell(current.rowIndex - 1, current.colIndex + 1).revealed = true;
              this.updateRevealCount();
            }
          }
        }

        if (current.colIndex - 1 >= 0) {
          if (this.getCell(current.rowIndex, current.colIndex - 1).adjacentBombs === 0) {
            if (!this.getCell(current.rowIndex, current.colIndex - 1).addedForReveal) {
              this.getCell(current.rowIndex, current.colIndex - 1).addedForReveal = true;
              stack.push(this.getCell(current.rowIndex, current.colIndex - 1));
            }
          } else {
            if (!this.getCell(current.rowIndex, current.colIndex - 1).revealed) {
              this.getCell(current.rowIndex, current.colIndex - 1).revealed = true;
              this.updateRevealCount();
            }
          }
        }

        if (current.colIndex + 1 < this.columnCount) {
          if (this.getCell(current.rowIndex, current.colIndex + 1).adjacentBombs === 0) {
            if (!this.getCell(current.rowIndex, current.colIndex + 1).addedForReveal) {
              this.getCell(current.rowIndex, current.colIndex + 1).addedForReveal = true;
              stack.push(this.getCell(current.rowIndex, current.colIndex + 1));
            }
          } else {
            if (!this.getCell(current.rowIndex, current.colIndex + 1).revealed) {
              this.getCell(current.rowIndex, current.colIndex + 1).revealed = true;
              this.updateRevealCount();
            }
          }
        }

        if (current.rowIndex + 1 < this.rowCount) {
          if (current.colIndex - 1 >= 0) {
            if (this.getCell(current.rowIndex + 1, current.colIndex - 1).adjacentBombs !== 0) {
              if (!this.getCell(current.rowIndex + 1, current.colIndex - 1).revealed) {
                this.getCell(current.rowIndex + 1, current.colIndex - 1).revealed = true;
                this.updateRevealCount();
              }
            }
          }

          if (this.getCell(current.rowIndex + 1, current.colIndex).adjacentBombs === 0) {
            if (!this.getCell(current.rowIndex + 1, current.colIndex).addedForReveal) {
              this.getCell(current.rowIndex + 1, current.colIndex).addedForReveal = true;
              stack.push(this.getCell(current.rowIndex + 1, current.colIndex));
            }
          } else {
            if (!this.getCell(current.rowIndex + 1, current.colIndex).revealed) {
              this.getCell(current.rowIndex + 1, current.colIndex).revealed = true;
              this.updateRevealCount();
            }
          }

          if (current.colIndex + 1 < this.columnCount) {
            if (this.getCell(current.rowIndex + 1, current.colIndex + 1).adjacentBombs !== 0) {
              if (!this.getCell(current.rowIndex + 1, current.colIndex + 1).revealed) {
                this.getCell(current.rowIndex + 1, current.colIndex + 1).revealed = true;
                this.updateRevealCount();
              }
            }
          }
        }
      }
    }
  }
}
