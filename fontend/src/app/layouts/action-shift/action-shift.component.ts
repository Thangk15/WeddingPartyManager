import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TimePickerComponent } from "../../components/time-picker/time-picker.component";
import { convertTo12HourFormat, convertTo24HourFormat } from '../../components/format-date/format-date.component';

interface Ca {
  id: number;
  tenCa: string;
  gioBatDau: string;
  gioKetThuc: string;
}

@Component({
  selector: 'app-action-shift',
  imports: [FormsModule, TimePickerComponent],
  templateUrl: './action-shift.component.html',
  styleUrl: './action-shift.component.css'
})
export class ActionShiftComponent implements OnInit{
  @Input() type: string = '';
  @Input() dataEdit: Ca = {
    id: 0,
    tenCa: '',
    gioBatDau: '',
    gioKetThuc: ''
  }
  
  dataInsert = {
    tenCa: '',
    gioBatDau: '',
    gioKetThuc: ''
  }

  get model() {
    return this.type === 'add' ? this.dataInsert : this.dataEdit;
  }

  gioBatDauValue: string = '';
  gioKetThucValue: string = '';

  ngOnInit(): void {
    const isEditing = this.dataEdit && this.dataEdit.id !== 0;

    if (isEditing) {
      this.gioBatDauValue = convertTo12HourFormat(this.dataEdit.gioBatDau);
      this.gioKetThucValue = convertTo12HourFormat(this.dataEdit.gioKetThuc);
    }
  }

  selectedTime = '';
  enteredShiftName = '';
  get getTitle():string {
    if(this.type === 'add')
      return 'Thêm ca'
    else
      return 'Chỉnh sửa ca'
  }

  @Output() back = new EventEmitter<void>();
  @Output() insertData = new EventEmitter<{ key: string, data: any }>();
  @Output() updateData = new EventEmitter<{ key: string, id: number, data: any }>();
  exit() {
    this.back.emit();
  }

  updateTime() {

  }

  save() {
    console.log('Lưu ở ',this.type);
    this.model.gioBatDau = convertTo24HourFormat(this.gioBatDauValue);
    this.model.gioKetThuc = convertTo24HourFormat(this.gioKetThucValue);
    console.log('Data insert o action: ',this.dataInsert);
    if(this.type === 'add') {
      this.insertData.emit({
        key: 'shift',
        data: this.dataInsert
      });
    }
    else if (this.type === 'edit') {
      console.log('data update: ', this.dataEdit)
      this.updateData.emit({
        key: 'shift',
        id: this.dataEdit.id,
        data: this.dataEdit
      })
    }
  }
}
