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
  revealedCount: number = 0;

  constructor() {
    this.initializeGame();
  }

  initializeGame() {
    this.userDied = false;
    this.victory = false;
    this.revealedCount = 0;
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
        this.revealEmptyCells(cell.rowIndex, cell.colIndex);
      } else {
        cell.revealed = true;
        this.updateRevealCount();
      }
    }
  }

  updateRevealCount() {
    this.revealedCount++;

    if (this.rowCount * this.columnCount - this.bombsNumber === this.revealedCount) {
      this.victory = true;
      alert('Victory');
    }
  }

  revealEmptyCells(rowIndex: number, colIndex: number) {
    let stack = [{ row: rowIndex, col: colIndex}];

    while (stack.length) {
      let current: any = stack.pop();
      let currentCell = this.getCell(current.row, current.col);
      if (currentCell.adjacentBombs === 0 && !currentCell.revealed) {
        currentCell.revealed = true;
        this.updateRevealCount();
        if (current.row - 1 >= 0) {
          if (current.col - 1 >= 0) {
            if (this.getCell(current.row - 1, current.col - 1).adjacentBombs !== 0) {
              if (!this.getCell(current.row - 1, current.col - 1).revealed) {
                this.getCell(current.row - 1, current.col - 1).revealed = true;
                this.updateRevealCount();
              }
            }
          }

          if (this.getCell(current.row - 1, current.col).adjacentBombs === 0) {
            if (!this.getCell(current.row - 1, current.col).revealed) {
              stack.push({ row: current.row - 1, col: current.col });
            }
          } else {
            if (!this.getCell(current.row - 1, current.col).revealed) {
              this.getCell(current.row - 1, current.col).revealed = true;
              this.updateRevealCount();
            }
          }

          if (current.col + 1 < this.columnCount) {
            if (this.getCell(current.row - 1, current.col + 1).adjacentBombs !== 0) {
              this.getCell(current.row - 1, current.col + 1).revealed = true;
              this.updateRevealCount();
            }
          }
        }

        if (current.col - 1 >= 0) {
          if (this.getCell(current.row, current.col - 1).adjacentBombs === 0) {
            if (!this.getCell(current.row, current.col - 1).revealed) {
              stack.push({ row: current.row, col: current.col - 1 });
            }
          } else {
            if (!this.getCell(current.row, current.col - 1).revealed) {
              this.getCell(current.row, current.col - 1).revealed = true;
              this.updateRevealCount();
            }
          }
        }

        if (current.col + 1 < this.columnCount) {
          if (this.getCell(current.row, current.col + 1).adjacentBombs === 0) {
            if (!this.getCell(current.row, current.col + 1).revealed) {
              stack.push({ row: current.row, col: current.col + 1 });
            }
          } else {
            if (!this.getCell(current.row, current.col + 1).revealed) {
              this.getCell(current.row, current.col + 1).revealed = true;
              this.updateRevealCount();
            }
          }
        }

        if (current.row + 1 < this.rowCount) {
          if (current.col - 1 >= 0) {
            if (this.getCell(current.row + 1, current.col - 1).adjacentBombs !== 0) {
              if (!this.getCell(current.row + 1, current.col - 1).revealed) {
                this.getCell(current.row + 1, current.col - 1).revealed = true;
                this.updateRevealCount();
              }
            }
          }

          if (this.getCell(current.row + 1, current.col).adjacentBombs === 0) {
            if (!this.getCell(current.row + 1, current.col).revealed) {
              stack.push({ row: current.row + 1, col: current.col });
            }
          } else {
            if (!this.getCell(current.row + 1, current.col).revealed) {
              this.getCell(current.row + 1, current.col).revealed = true;
              this.updateRevealCount();
            }
          }

          if (current.col + 1 < this.columnCount) {
            if (this.getCell(current.row + 1, current.col + 1).adjacentBombs !== 0) {
              if (!this.getCell(current.row + 1, current.col + 1).revealed) {
                this.getCell(current.row + 1, current.col + 1).revealed = true;
                this.updateRevealCount();
              }
            }
          }
        }
      }
    }
  }
}
