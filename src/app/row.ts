import { Cell } from './cell';

export class Row {
  public cells: Array<Cell> = [];
  private rowIndex: number;
  private cellCount: number;

  constructor(rowIndex: number, cellCount: number) {
    this.rowIndex = rowIndex;
    this.cellCount = cellCount;

    for (let i = 0; i < cellCount; i++) {
      this.cells.push(new Cell(rowIndex, i));
    }
  }

  resetCells() {
    for (let i = 0; i < this.cellCount; i++) {
      this.cells[i].resetCell();
    }
  }
}
