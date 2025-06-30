import { KeyValuePipe, NgFor } from '@angular/common';
import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-booking-detail',
  imports: [NgFor, KeyValuePipe],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css'
})
export class BookingDetailComponent {


  bookingData = {
    weddingId:'tc0001',
    bookingTime:'26/3/2025',
    groomName: 'Nguyen Thanh Cong',
    brideName: 'Le Thi Yen Vi',
    phoneNumber:'0917927113',
    weddingTime:'30/4/2025',
    shift:'Chieu',
    hall: 'Cung dien anh sang',
    tableCount: 10,
    reserveTableCount: 1,
    tablePrice: '2.000.000',
    totalTablePrice: '20.000.000',
    totalServicePrice: '20.000.000',
    deposit: '15.000.000',
    totalBill: '40.000.000',
    RemainingBalance: '25.000.000',
  }

  // -----------table logic------------------
  customSortFn = (a: any, b: any) => {
    const order = ['name', 'type', 'price', 'note'];
    return order.indexOf(a.key) - order.indexOf(b.key);
  };

  headFoods = [
    'STT', 'Tên món ăn', 'Loại', 'Đơn giá', 'Ghi chú'
  ]

  foodDatas = [
    {
      name: 'Cua',
      type: 'Hải sản',
      price: '1.000.000',
      note: ''
    },
    {
      name: 'Cua',
      type: 'Hải sản',
      price: '1.000.000',
      note: ''
    },
    {
      name: 'Cua',
      type: 'Hải sản',
      price: '1.000.000',
      note: ''
    },
    {
      name: 'Cua',
      type: 'Hải sản',
      price: '1.000.000',
      note: ''
    },
    {
      name: 'Cua',
      type: 'Hải sản',
      price: '1.000.000',
      note: ''
    },
    {
      name: 'Cua',
      type: 'Hải sản',
      price: '1.000.000',
      note: ''
    },
    {
      name: 'Cua',
      type: 'Hải sản',
      price: '1.000.000',
      note: ''
    },
    {
      name: 'Cua',
      type: 'Hải sản',
      price: '1.000.000',
      note: ''
    },
    {
      name: 'Cua',
      type: 'Hải sản',
      price: '1.000.000',
      note: ''
    },
    {
      name: 'Cua',
      type: 'Hải sản',
      price: '1.000.000',
      note: ''
    }
  ]

  customSortFnService = (a: any, b: any) => {
    const order = ['name', 'count', 'price', 'total'];
    return order.indexOf(a.key) - order.indexOf(b.key);
  };

  headServices = [
    'STT', 'Tên dịch vụ', 'Số lượng', 'Đơn giá', 'Thành tiền'
  ]

  services = [
    {
      name: 'phục vụ',
      count: 2,
      price: '1.000.000',
      total: '2.000.000'
    },
    {
      name: 'phục vụ',
      count: 2,
      price: '1.000.000',
      total: '2.000.000'
    },
    {
      name: 'phục vụ',
      count: 2,
      price: '1.000.000',
      total: '2.000.000'
    },
    {
      name: 'phục vụ',
      count: 2,
      price: '1.000.000',
      total: '2.000.000'
    },
    {
      name: 'phục vụ',
      count: 2,
      price: '1.000.000',
      total: '2.000.000'
    },
    {
      name: 'phục vụ',
      count: 2,
      price: '1.000.000',
      total: '2.000.000'
    },
  ]

  // handler on back
  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
  
}
