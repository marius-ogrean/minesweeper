import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Cell } from '../cell';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  standalone: true,
  imports: [FormsModule],
  styleUrls: ['./cell.component.scss']
})
export class CellComponent {
  @Input() cell: Cell;
  @Input() userDied: boolean;
}
