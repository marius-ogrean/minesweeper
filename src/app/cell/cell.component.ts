import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../cell';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() cell: Cell;
  @Output() cellClicked = new EventEmitter<Cell>();

  clicked() {
    this.cell.revealed = true;
    this.cellClicked.emit(this.cell);
  }
}
