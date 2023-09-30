export class Cell {
  public hasBomb: boolean = false;
  public adjacentBombs: number = 0;
  public revealed: boolean = false;

  constructor() {
  }
}
