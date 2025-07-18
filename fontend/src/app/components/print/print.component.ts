import { Component, inject, OnInit, ViewEncapsulation, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { formatDateFromDB } from '../format-date/format-date.component';

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
  selector: 'app-print',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, RouterModule],
  templateUrl: './print.component.html',
  styleUrl: './print.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class PrintComponent implements OnChanges{
  @Output() close = new EventEmitter<void>();
  @Input() weddingData!: Wedding;
  @Input() amountEntered!:  number;
  @Input() totalBill!: number;
  @Input() billDate!: string;
  @Input() type!: string;
  changeAmount: number=0;

  ngOnChanges(changes: SimpleChanges): void {
    const amountChanged = changes['amountEntered'];
    const billChanged = changes['totalBill'];
    const dataChanged = changes['weddingData'];
    if (this.weddingData?.maTiecCuoi && (amountChanged || billChanged)) {
      this.changeAmount = this.amountEntered - this.totalBill;
    }
  }


  ngAfterViewInit() {
    setTimeout(() => {
      window.print();
    }, 0);
  }

  private router = inject(Router);

  closeComponent() {
    this.router.navigate(['/home']);
  }

  printAgain() {
    window.print();
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
    {
      name: 'Dịch vụ MC',
      count: 1,
      price: 10000000,
      total: 10000000,
    }
  ]

  servicePriceTotal = this.services.reduce((sum, service) => sum + service.total, 0);
  formatDate(str: string) {
    return formatDateFromDB(str);
  }
}
