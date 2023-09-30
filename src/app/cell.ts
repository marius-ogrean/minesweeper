export class Cell {
  public value: number;
  public revealed: boolean = false;

  constructor(value: number) {
    this.value = value;
  }
}
