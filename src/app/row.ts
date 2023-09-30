import { Cell } from './cell';

export class Row {
  public cells: Array<Cell> = [];
  private cellCount: number;

  constructor(cellCount: number) {
    this.cellCount = cellCount;

    for (let i = 0; i < cellCount; i++) {
      this.cells.push(new Cell(i));
    }
  }
}
