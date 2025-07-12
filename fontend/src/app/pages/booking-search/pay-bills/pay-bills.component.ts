import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
import { Router } from '@angular/router';
import { PrintComponent } from '../../../components/print/print.component';
import { formatDateFromDB, formatDateToDDMMYYYY } from '../../../components/format-date/format-date.component';
import { FormsModule } from '@angular/forms';

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


@Component({
  selector: 'app-pay-bills',
  standalone: true,
  imports: [
    NgIf, 
    NgxPrintModule, 
    PrintComponent,
    CurrencyPipe,
    FormsModule
  ],
  templateUrl: './pay-bills.component.html',
  styleUrl: './pay-bills.component.css',
})
export class PayBillsComponent implements OnChanges{
  @Input() type: string = '';
  @Input() weddingData!: Wedding;
  myDate: string = formatDateToDDMMYYYY(new Date());
  amountEntered: number = 0;
  totalBill: number = 0;

  daysBetween = 0;


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['weddingData'] && this.weddingData?.maTiecCuoi) {
      console.log(this.weddingData);
      this.daysBetween = this.calculateDaysBetween(this.myDate, this.formatMyDateDB(this.weddingData.ngayDaiTiec));
      if (this.daysBetween >= 7 && this.type === "cancel") {
        this.totalBill = 0;
        this.amountEntered = 0;
      }
      else {
        this.totalBill = this.weddingData.conLai;
        this.amountEntered = this.weddingData.conLai;
      }
    }
  }

  formatMyDateDB(date: string): string {
    return formatDateFromDB(date);
  }

  calculateDaysBetween(dateStr1: string, dateStr2: string): number {
    const [day1, month1, year1] = dateStr1.split('/').map(Number);
    const [day2, month2, year2] = dateStr2.split('/').map(Number);

    const date1 = new Date(year1, month1 - 1, day1);
    const date2 = new Date(year2, month2 - 1, day2);

    const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());

    const dayDiff = Math.abs((utc2 - utc1) / (1000 * 60 * 60 * 24));

    return dayDiff;
  }

  depositRate = 50;
  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }

  showPaymentBill = false;

  openPaymentBill() {
    const isConfirmed = window.confirm('Bạn có chắc muốn thanh toán không?');
    if (isConfirmed) {
      this.showPaymentBill = true;
    }
  }

  closePaymentBill() {
    this.showPaymentBill = false;
  }
  
}
