import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-action-service',
  imports: [
    FormsModule, 
    MatSelectModule,
    MatFormFieldModule,
    NgFor],
  templateUrl: './action-service.component.html',
  styleUrl: './action-service.component.css'
})
export class ActionServiceComponent {
  @Input() type: string = '';

  selectedJob = 'Phục vụ';
  jobs = ['Phục vụ', 'MC', 'setup', 'Chụp ảnh'];

  selectedTime = '';
  enteredServiceName = '';
  enteredPrice = 0;
  get getTitle():string {
    if(this.type === 'add')
      return 'Thêm dịch vụ'
    else
      return 'Chỉnh sửa dịch vụ'
  }

  @Output() back = new EventEmitter<void>();
  exit() {
    this.back.emit();
  }

  save() {

  }
}
