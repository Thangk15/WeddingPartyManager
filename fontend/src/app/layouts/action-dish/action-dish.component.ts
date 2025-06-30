import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-action-dish',
  imports: [FormsModule, NgFor],
  templateUrl: './action-dish.component.html',
  styleUrl: './action-dish.component.css'
})
export class ActionDishComponent {
  @Input() type: string = '';
  selectedType = 'Khai vị';
  dishTypes = ['Khai vị', 'Món chính', 'Tráng miệng'];

  selectedTime = '';
  enteredDishName = '';
  enteredPrice = 10;
  get getTitle():string {
    if(this.type === 'add')
      return 'Thêm món ăn'
    else
      return 'Chỉnh món ăn'
  }

  @Output() back = new EventEmitter<void>();
  exit() {
    this.back.emit();
  }

  save() {

  }
}
