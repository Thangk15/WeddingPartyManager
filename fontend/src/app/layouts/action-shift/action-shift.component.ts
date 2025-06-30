import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimePickerComponent } from "../../components/time-picker/time-picker.component";

@Component({
  selector: 'app-action-shift',
  imports: [FormsModule, TimePickerComponent],
  templateUrl: './action-shift.component.html',
  styleUrl: './action-shift.component.css'
})
export class ActionShiftComponent {
  @Input() type: string = '';

  selectedTime = '';
  enteredShiftName = '';
  get getTitle():string {
    if(this.type === 'add')
      return 'Thêm ca'
    else
      return 'Chỉnh sửa ca'
  }

  @Output() back = new EventEmitter<void>();
  exit() {
    this.back.emit();
  }

  save() {

  }
}
