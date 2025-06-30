import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-action-staff',
  imports: [
    FormsModule,
    MatSelectModule,
    MatFormFieldModule,
    NgFor
  ],
  templateUrl: './action-staff.component.html',
  styleUrl: './action-staff.component.css'
})
export class ActionStaffComponent {
  @Input() type: string = '';
  selectedType = 'Thời vụ';
  selectedSex = 'Nam';
  selectedJob = 'Phục vụ';
  jobs = ['Phục vụ', 'MC', 'setup', 'Chụp ảnh'];

  enteredDishName = '';
  enteredPhone = '';
  get getTitle():string {
    if(this.type === 'add')
      return 'Thêm nhân viên'
    else
      return 'Chỉnh món thông tin nhân viên'
  }

  @Output() back = new EventEmitter<void>();
  exit() {
    this.back.emit();
  }

  save() {

  }
}
