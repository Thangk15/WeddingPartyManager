import { CurrencyPipe, KeyValuePipe, NgFor } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Output, EventEmitter, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { formatDateFromDB } from '../../../components/format-date/format-date.component';

interface Wedding {
  maSanh: number;
  maTiecCuoi: number;
  ngayDat: string;
  ngayDaiTiec: string;
  tenCa: string;
  soLuongBan: number;
  soLuongBanDuTru: number;
  donGiaBan: number;
  tongTienBan: number;
  tongTienDichVu: number;
  tongTienDatTiec: number;
  tienDatCoc: number;
  conLai: number;
  tenCoDau: string;
  tenChuRe: string;
  sdt: string;
  gioBatDau: string;
  tinhTrangPhanCong: boolean;
  tenSanh: string;
  userName: string;
}

interface Service {
  maDichVu: number;
  tenDichVu: string;
  gia: number;
  soLuong: number;
  maCongViec: number;
  tenCongViec: number;
}

interface DishFood {
  maMonAn: number;
  tenMonAn: string;
  tenLoaiMonAn: string;
  soLuong: number;
  donGiaMonAn: number;
}

@Component({
  selector: 'app-booking-detail',
  imports: [
    NgFor, 
    KeyValuePipe,
    CurrencyPipe,
  ],
  templateUrl: './booking-detail.component.html',
  styleUrl: './booking-detail.component.css'
})
export class BookingDetailComponent implements OnChanges{
  @Input() weddingData!: Wedding;

  // -----------table logic------------------
  customSortFn = (a: any, b: any) => {
    const order = ['name', 'type', 'price', 'note'];
    return order.indexOf(a.key) - order.indexOf(b.key);
  };

  headFoods = [
    'STT', 'Tên món ăn', 'Loại', 'Đơn giá'
  ]

  customSortFnService = (a: any, b: any) => {
    const order = ['name', 'count', 'price', 'total'];
    return order.indexOf(a.key) - order.indexOf(b.key);
  };

  headServices = [
    'STT', 'Tên dịch vụ', 'SL', 'Đơn giá', 'Thành tiền'
  ]

  constructor(private http: HttpClient) {};

  services: Service[] = [];
  dishFoods: DishFood[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weddingData'] && this.weddingData?.maTiecCuoi) {
      this.loadServiceByWedding();
      this.loadDishFoodByWedding();
    }
  }

  loadServiceByWedding(): void {
    this.http.get<Service[]>(`http://localhost:8081/api/chitietdichvu/tieccuoi/${this.weddingData.maTiecCuoi}`)
      .subscribe(data => {
        this.services = data;
      console.log('DS dich vu tiec cuoi su dung', this.services)
      });
  }

  loadDishFoodByWedding(): void {
    this.http.get<DishFood[]>(`http://localhost:8081/api/chitietmonan/tieccuoi/${this.weddingData.maTiecCuoi}`)
      .subscribe(data => {
        this.dishFoods = data;
      console.log('DS mon an tiec cuoi su dung', this.dishFoods)
      });
  }

  formatMyDateDB(date: string): string {
    return formatDateFromDB(date);
  }

  totalService(item: Service): number {
    return Number(item.gia)*Number(item.soLuong);
  }

  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }
  
}
