export class Cell {
  public hasBomb: boolean = false;
  public adjacentBombs: number = 0;
  public revealed: boolean = false;
  public rowIndex: number;
  public colIndex: number;

  constructor(rowIndex: number, colIndex: number) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
  }
}
