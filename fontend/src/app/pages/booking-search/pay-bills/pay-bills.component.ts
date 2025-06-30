import { NgIf } from '@angular/common';
import { Component, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { NgxPrintModule } from 'ngx-print';
import { Router } from '@angular/router';
import { PrintComponent } from '../../../components/print/print.component';

@Component({
  selector: 'app-pay-bills',
  standalone: true,
  imports: [NgIf, NgxPrintModule, PrintComponent],
  templateUrl: './pay-bills.component.html',
  styleUrl: './pay-bills.component.css',
  // encapsulation: ViewEncapsulation.None,
})
export class PayBillsComponent {
  @Input() type: string = '';

  data = {
    weddingId: 'TC0001',
    paymentDate: '26/04/2025',
    weddingDate: '26/04/2025',
    cancelDate: '06/04/2025',
    cancelDayCount: 20,
    groomName: 'Nguyen Thanh Cong',
    brideName: 'Le Thi Yen Vi',
    tablePrice: 4000000,
    tableCount: 10,
    totalTablePrice: 40000000,
    totalServicePrice: 10000000,
  }

  totalPayment = this.data.totalTablePrice + this.data.totalServicePrice;
  depositRate = 50;
  deposit = this.totalPayment * 50/100;
  payableAmount = this.totalPayment - this.deposit;

  // Xử lý go back
  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }

  //Xử lý in
  // constructor(private router: Router) {}

  // printBooking(id: string) {
  //   this.router.navigate(['booking/print', id]);
  // }


  showPaymentBill = false;

  openPaymentBill() {
    this.showPaymentBill = true;
  }

  closePaymentBill() {
    this.showPaymentBill = false;
  }
  
}
