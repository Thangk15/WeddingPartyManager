import { Component, inject, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-print',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './print.component.html',
  styleUrl: './print.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class PrintComponent {
  @Output() close = new EventEmitter<void>();

  ngAfterViewInit() {
    setTimeout(() => {
      window.print();
    }, 0);
  }

  closeComponent() {
    this.close.emit();
  }

  printAgain() {
    window.print();
  }

  // data
  type = 'HÓA ĐƠN ĐẶT TIỆC'

  data = {
    weddingId: 'TC0001',
    billDate: new Date(),
    userName: 'nguyenngocthang',
    groomName: 'Le Tan Thuan',
    brideName: 'Huynh Tiet My',
    phoneNumber: '0913987213',
    WeddingDate: '01/07/2025',
    weddingTime: '11:00:00',
    tableCount: 20,
    hallName: 'Sảnh hiện đại',
    reserveTableCount: 1,
    tablePrice: 4000000,
  }

  services = [
    {
      name: 'Dịch vụ MC',
      count: 1,
      price: 10000000,
      total: 10000000,
    },    {
      name: 'Dịch vụ trang trí',
      count: 1,
      price: 1000000,
      total: 1000000,
    },    {
      name: 'Dịch vụ phục vụ',
      count: 2,
      price: 1000000,
      total: 20000000,
    },
  ]

  servicePriceTotal = this.services.reduce((sum, service) => sum + service.total, 0);
}
