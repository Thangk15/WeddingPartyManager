import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-action-job',
  imports: [FormsModule],
  templateUrl: './action-job.component.html',
  styleUrl: './action-job.component.css'
})
export class ActionJobComponent {
  @Input() type: string = '';

  enteredJobName = '';
  get getTitle():string {
    if(this.type === 'add')
      return 'Thêm công việc'
    else
      return 'Chỉnh sửa công việc'
  }

  @Output() back = new EventEmitter<void>();
  exit() {
    this.back.emit();
  }

  save() {

  }
}

