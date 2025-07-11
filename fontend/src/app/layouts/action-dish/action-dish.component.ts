import { NgFor } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface MonAn {
  maMonAn: number;
  tenMonAn: string;
  donGia: number;
  tenLoaiMonAn: string;
}

@Component({
  selector: 'app-action-dish',
  imports: [FormsModule, NgFor],
  templateUrl: './action-dish.component.html',
  styleUrl: './action-dish.component.css'
})
export class ActionDishComponent {
  @Input() type: string = '';
  @Input() dataEdit: MonAn = {
    maMonAn: 0,
    tenMonAn: '',
    donGia: 0,
    tenLoaiMonAn: 'Khai vị'
  }
  
  dataInsert = {
    tenMonAn: '',
    donGia: 0,
    tenLoaiMonAn: 'Khai vị'
  }
  
  selectedType = 'Khai vị';
  dishTypes = ['Khai vị', 'Món chính', 'Tráng miệng'];

  get model() {
    return this.type === 'add' ? this.dataInsert : this.dataEdit;
  }

  get getTitle():string {
    if(this.type === 'add')
      return 'Thêm món ăn'
    else
      return 'Chỉnh sửa món ăn'
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
          key: 'dish',
          data: this.dataInsert
      });
    }
    else if (this.type === 'edit') {
      console.log('data update: ', this.dataEdit)
      this.updateData.emit({
        key: 'dish',
        id: this.dataEdit.maMonAn,
        data: this.dataEdit
      })
    }
  }
}
