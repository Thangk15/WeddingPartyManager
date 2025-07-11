import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from "../../components/calendar/calendar.component";
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { PayBillsComponent } from './pay-bills/pay-bills.component';
import { formatDateToDDMMYYYY, formatDateFromDB, parseDate } from '../../components/format-date/format-date.component';
import { Router } from 'express';
import { HttpClient } from '@angular/common/http';

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

interface Shift {
  id: number;
  tenCa: string;
  gioBatDau: string;
  gioKetThuc: string;
}

interface Hall {
  maSanh: number;
  tenSanh: string;
  soLuongBanToiDa: number;
  donGiaBanToiThieu: number;
}

@Component({
  selector: 'app-booking-search',
  imports: [
    NgFor, 
    FormsModule, 
    CalendarComponent, 
    BookingDetailComponent, 
    PayBillsComponent,
    NgIf],
  templateUrl: './booking-search.component.html',
  styleUrl: './booking-search.component.css'
})

export class BookingSearchComponent implements OnInit{
  constructor(private http: HttpClient) {};
  selectedWeddingDate: string=''; // hoặc null nếu muốn để trống

  onDateChanged(newDate: string) {
    this.selectedWeddingDate = newDate;
    console.log('Ngày được chọn:', newDate);
  }

  selectedHall = '';
  selectedShift = '';
  selectedGroomName = '';
  selectedBrideName = '';
  selectedWeddingId = '';
  selectedItem: any = null;

  customSortFn = (a: any, b: any) => {
    const order = ['weddingId', 'groomName', 'brideName', 'hallName', 
    'day', 'shift', 'tableCount', 'userName'];
    return order.indexOf(a.key) - order.indexOf(b.key);
  };

  headDatas = [
    'STT', 'Mã tiệc cưới', 'Tên chú rễ', 'Tên cô dâu', 'Tên sảnh',
    'Ngày đãi tiệc', 'Giờ', 'Số lượng bàn', 'UserName'
  ]

  // datas = [
  //   {
  //     weddingId: 'TC0004', hallName: 'Cung điện ánh sáng',
  //     groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
  //     day: '26/03/2025', shift: '17:00:00', 
  //     tableCount: 60, userName: 'letanthuan'
  //   },
  //   {
  //     weddingId: 'TC0001', hallName: 'Cung điện ánh sáng',
  //     groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
  //     day: '26/03/2025', shift: '17:00:00', 
  //     tableCount: 60, userName: 'letanthuan'
  //   },
  //   {
  //     weddingId: 'TC0002', hallName: 'Cung điện ánh sáng',
  //     groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
  //     day: '26/03/2025', shift: '17:00:00', 
  //     tableCount: 60, userName: 'letanthuan'
  //   },
  //   {
  //     weddingId: 'TC0004', hallName: 'Cung điện ánh sáng',
  //     groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
  //     day: '26/03/2025', shift: '17:00:00', 
  //     tableCount: 60, userName: 'letanthuan'
  //   },
  //   {
  //     weddingId: 'TC0001', hallName: 'Cung điện ánh sáng',
  //     groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
  //     day: '26/03/2025', shift: '17:00:00', 
  //     tableCount: 60, userName: 'letanthuan'
  //   },
  //   {
  //     weddingId: 'TC0002', hallName: 'Cung điện ánh sáng',
  //     groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
  //     day: '26/03/2025', shift: '17:00:00', 
  //     tableCount: 60, userName: 'letanthuan'
  //   },
  //   {
  //     weddingId: 'TC0004', hallName: 'Cung điện ánh sáng',
  //     groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
  //     day: '26/03/2025', shift: '17:00:00', 
  //     tableCount: 60, userName: 'letanthuan'
  //   },
  //   {
  //     weddingId: 'TC0001', hallName: 'Cung điện ánh sáng',
  //     groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
  //     day: '26/03/2025', shift: '17:00:00', 
  //     tableCount: 60, userName: 'letanthuan'
  //   },
  //   {
  //     weddingId: 'TC0002', hallName: 'Cung điện ánh sáng',
  //     groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
  //     day: '26/03/2025', shift: '17:00:00', 
  //     tableCount: 60, userName: 'letanthuan'
  //   },
  //   {
  //     weddingId: 'TC0004', hallName: 'Cung điện ánh sáng',
  //     groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
  //     day: '26/03/2025', shift: '17:00:00', 
  //     tableCount: 60, userName: 'letanthuan'
  //   },
  //   {
  //     weddingId: 'TC0001', hallName: 'Cung điện ánh sáng',
  //     groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
  //     day: '26/03/2025', shift: '17:00:00', 
  //     tableCount: 60, userName: 'letanthuan'
  //   },
  //   {
  //     weddingId: 'TC0002', hallName: 'Cung điện ánh sáng',
  //     groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
  //     day: '26/03/2025', shift: '17:00:00', 
  //     tableCount: 60, userName: 'letanthuan'
  //   }
  // ]

  weddingData: Wedding[] = [];
  filterWeddingData: Wedding[] = [];
  shiftData: Shift[] = [];
  hallData: Hall[] = [];


  ngOnInit(): void {
    this.loadWeddingData();
    this.loadShiftData();
    this.loadHallData();
  }

  loadWeddingData(): void {
    this.http.get<Wedding[]>("http://localhost:8081/api/phieudattieccuoi/wedding-search")
      .subscribe(data => {
        this.weddingData = data;
        this.searchWedding();
    console.log('DS tiec cuoi', this.filterWeddingData)
      });
  }

  loadShiftData(): void {
    this.http.get<Shift[]>("http://localhost:8081/api/ca")
      .subscribe(data => {
        this.shiftData = data;
        console.log('DS ca', this.shiftData)
      });
  }

  loadHallData(): void {
    this.http.get<Hall[]>("http://localhost:8081/api/sanh")
      .subscribe(data => {
        this.hallData = data;
        console.log('DS sanh', this.hallData)
      });
  }

  searchWedding() {
    const isAllEmpty =
    !this.selectedBrideName &&
    !this.selectedGroomName &&
    !this.selectedHall &&
    !this.selectedWeddingId &&
    !this.selectedWeddingDate;

  if (isAllEmpty) {
    this.filterWeddingData = [...this.weddingData];
    return;
  }
    this.filterWeddingData = this.weddingData.filter(item => {
    const matchBride = !this.selectedBrideName || item.tenCoDau?.toLowerCase().includes(this.selectedBrideName.toLowerCase());
    const matchGroom = !this.selectedGroomName || item.tenChuRe?.toLowerCase().includes(this.selectedGroomName.toLowerCase());
    const matchHall = !this.selectedHall || item.tenSanh?.toLowerCase().includes(this.selectedHall.toLowerCase());
    const matchId = !this.selectedWeddingId || item.maTiecCuoi?.toString().includes(this.selectedWeddingId.toString());
    const matchDate = !this.selectedWeddingDate ||  formatDateFromDB(item.ngayDaiTiec) === this.selectedWeddingDate;

    return matchBride && matchGroom && matchHall && matchId && matchDate;
  });
  }

  reSearch() {
    this.selectedHall = '';
    this.selectedShift = '';
    this.selectedBrideName = '';
    this.selectedGroomName = '';
    this.selectedWeddingId = '';
    this.selectedWeddingDate = '';
    this.searchWedding();
  }

  // Xử lý chuyển trang xem chi tiết tiệc cưới
  clickedDetail: boolean = false;
  clickedPay: boolean = false;
  clickedCancel: boolean = false;

  seeDetail(data: any) {
    if (data === null)
      console.log("chưa chọn tiệc cưới")
    else
      this.clickedDetail = true;
  }

  payBill(data: Wedding) {
    if (data === null)
      console.log("chưa chọn tiệc cưới")
    else
    {
      if(data.conLai === 0)
        alert(`Tiệc cưới này đã thanh toán rồi`);
      else
        this.clickedPay = true;
    }
  }

  cancelWedding(data: Wedding) {
    if (data === null)
      console.log("chưa chọn tiệc cưới")
    else {
      if (new Date() <= parseDate(formatDateFromDB(data.ngayDaiTiec)))
        this.clickedCancel = true;
      else
        alert("Tiệc cưới đã và đang diễn ra, không thể đãi tiệc")
    }
  }



  goBack() {
    this.selectedItem = null;
    this.clickedDetail = false;
    this.clickedPay = false;
    this.clickedCancel = false;
  }
  
}
