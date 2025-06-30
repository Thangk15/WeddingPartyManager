import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-action-hall',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './action-hall.component.html',
  styleUrl: './action-hall.component.css'
})
export class ActionHallComponent {
  @Input() type: string = '';

  selectedTime = '';
  enteredHallName = '';
  enteredMinPrice = 0;
  enteredMaxTableQuantity = 10;
  get getTitle():string {
    if(this.type === 'add')
      return 'Thêm sảnh'
    else
      return 'Chỉnh sửa sảnh'
  }

  @Output() back = new EventEmitter<void>();
  exit() {
    this.back.emit();
  }

  save() {

  }
}
