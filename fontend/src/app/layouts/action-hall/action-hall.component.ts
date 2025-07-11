import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

interface Sanh {
  maSanh: number;
  tenSanh: string;
  donGiaBanToiThieu: number;
  soLuongBanToiDa: number;
}

@Component({
  selector: 'app-action-hall',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './action-hall.component.html',
  styleUrl: './action-hall.component.css'
})
export class ActionHallComponent {
  @Input() type: string = '';
  @Input() dataEdit: Sanh = {
    maSanh: 0,
    tenSanh: '',
    donGiaBanToiThieu: 0,
    soLuongBanToiDa: 0
  }

  dataInsert = {
    tenSanh: '',
    donGiaBanToiThieu: 0,
    soLuongBanToiDa: 0
  }

  get model() {
    return this.type === 'add' ? this.dataInsert : this.dataEdit;
  }

  get getTitle():string {
    if(this.type === 'add')
      return 'Thêm sảnh'
    else
      return 'Chỉnh sửa sảnh'
  }

  @Output() back = new EventEmitter<void>();
  @Output() insertData = new EventEmitter<{ key: string, data: any }>();
  @Output() updateData = new EventEmitter<{ key: string, id: number, data: any }>();
  exit() {
    this.back.emit();
  }

  save() {
    console.log('Lưu ở ',this.type)
    if(this.type === 'add') {
        this.insertData.emit({
          key: 'hall',
          data: this.dataInsert
      });
    }
    else if (this.type === 'edit') {
      console.log('data update: ', this.dataEdit)
      this.updateData.emit({
        key: 'hall',
        id: this.dataEdit.maSanh,
        data: this.dataEdit
      })
    }
  }
}
