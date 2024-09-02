export class Cell {
  public static revealCount: number;
  public hasBomb: boolean = false;
  public adjacentBombs: number = 0;
  private _revealed: boolean = false;
  public rowIndex: number;
  public colIndex: number;
  public addedForReveal: boolean = false;

  constructor(rowIndex: number, colIndex: number) {
    this.rowIndex = rowIndex;
    this.colIndex = colIndex;
  }

  public get revealed() {
    return this._revealed;
  }

  public set revealed(revealed: boolean) {
    if (!this._revealed) {
      Cell.revealCount++;
    }
    this._revealed = revealed;
  }

  public resetCell() {
    this.hasBomb = false;
    this.adjacentBombs = 0;
    this._revealed = false;
    this.addedForReveal = false;
  }
}
