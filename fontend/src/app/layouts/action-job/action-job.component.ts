import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

interface CongViec {
  maCongViec: number;
  tenCongViec: string;
}

@Component({
  selector: 'app-action-job',
  imports: [FormsModule],
  templateUrl: './action-job.component.html',
  styleUrl: './action-job.component.css'
})
export class ActionJobComponent {
  @Input() type: string = '';
  @Input() dataEdit: CongViec = {
    maCongViec: 0,
    tenCongViec: ''

  }
  
  dataInsert = {
    tenCongViec: ''
  }

  get model() {
    return this.type === 'add' ? this.dataInsert : this.dataEdit;
  }

  get getTitle():string {
    if(this.type === 'add')
      return 'Thêm công việc'
    else
      return 'Chỉnh sửa công việc'
  }

  @Output() back = new EventEmitter<void>();
  @Output() insertData = new EventEmitter<{ key: string, data: any }>();
  @Output() updateData = new EventEmitter<{ key: string, id: number, data: any }>();
  exit() {
    this.back.emit();
  }

  save() {
    if(this.type === 'add') {
        this.insertData.emit({
          key: 'job',
          data: this.dataInsert
      });
    }
    else if (this.type === 'edit') {
      this.updateData.emit({
        key: 'job',
        id: this.dataEdit.maCongViec,
        data: this.dataEdit
      })
    }
  }
}

