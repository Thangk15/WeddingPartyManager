import { KeyValuePipe, NgFor, NgIf } from '@angular/common';
import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarComponent } from "../../components/calendar/calendar.component";
import { BookingDetailComponent } from './booking-detail/booking-detail.component';
import { PayBillsComponent } from './pay-bills/pay-bills.component';
import { formatDateToDDMMYYYY } from '../../components/format-date/format-date.component';

@Component({
  selector: 'app-booking-search',
  imports: [
    NgFor, 
    FormsModule, 
    CalendarComponent, 
    KeyValuePipe, 
    BookingDetailComponent, 
    PayBillsComponent,
    NgIf],
  templateUrl: './booking-search.component.html',
  styleUrl: './booking-search.component.css'
})
export class BookingSearchComponent {
  myDate: string = formatDateToDDMMYYYY(new Date()) // hoặc null nếu muốn để trống

  onDateChanged(newDate: string) {
    this.myDate = newDate;
    console.log('Ngày được chọn:', newDate);
  }

  hallDatas = [
    'Cung điện ánh sách', 'Rừng nguyên sinh', 'Lễ thành hôn'
  ];
  shiftDatas = ['9:00:00', '17:00:00'];
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

  datas = [
    {
      weddingId: 'TC0004', hallName: 'Cung điện ánh sáng',
      groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
      day: '26/03/2025', shift: '17:00:00', 
      tableCount: 60, userName: 'letanthuan'
    },
    {
      weddingId: 'TC0001', hallName: 'Cung điện ánh sáng',
      groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
      day: '26/03/2025', shift: '17:00:00', 
      tableCount: 60, userName: 'letanthuan'
    },
    {
      weddingId: 'TC0002', hallName: 'Cung điện ánh sáng',
      groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
      day: '26/03/2025', shift: '17:00:00', 
      tableCount: 60, userName: 'letanthuan'
    },
    {
      weddingId: 'TC0004', hallName: 'Cung điện ánh sáng',
      groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
      day: '26/03/2025', shift: '17:00:00', 
      tableCount: 60, userName: 'letanthuan'
    },
    {
      weddingId: 'TC0001', hallName: 'Cung điện ánh sáng',
      groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
      day: '26/03/2025', shift: '17:00:00', 
      tableCount: 60, userName: 'letanthuan'
    },
    {
      weddingId: 'TC0002', hallName: 'Cung điện ánh sáng',
      groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
      day: '26/03/2025', shift: '17:00:00', 
      tableCount: 60, userName: 'letanthuan'
    },
    {
      weddingId: 'TC0004', hallName: 'Cung điện ánh sáng',
      groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
      day: '26/03/2025', shift: '17:00:00', 
      tableCount: 60, userName: 'letanthuan'
    },
    {
      weddingId: 'TC0001', hallName: 'Cung điện ánh sáng',
      groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
      day: '26/03/2025', shift: '17:00:00', 
      tableCount: 60, userName: 'letanthuan'
    },
    {
      weddingId: 'TC0002', hallName: 'Cung điện ánh sáng',
      groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
      day: '26/03/2025', shift: '17:00:00', 
      tableCount: 60, userName: 'letanthuan'
    },
    {
      weddingId: 'TC0004', hallName: 'Cung điện ánh sáng',
      groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
      day: '26/03/2025', shift: '17:00:00', 
      tableCount: 60, userName: 'letanthuan'
    },
    {
      weddingId: 'TC0001', hallName: 'Cung điện ánh sáng',
      groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
      day: '26/03/2025', shift: '17:00:00', 
      tableCount: 60, userName: 'letanthuan'
    },
    {
      weddingId: 'TC0002', hallName: 'Cung điện ánh sáng',
      groomName: 'Nguyễn Thành Công', brideName: 'Lê Thị Yến Vi',
      day: '26/03/2025', shift: '17:00:00', 
      tableCount: 60, userName: 'letanthuan'
    }
  ]

  reSearch() {
    this.selectedHall = '';
    this.selectedShift = '';
    this.selectedBrideName = '';
    this.selectedGroomName = '';
    this.selectedWeddingId = '';
    this.myDate = '';
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

  payBill(data: any) {
    if (data === null)
      console.log("chưa chọn tiệc cưới")
    else
      this.clickedPay = true;
  }

  cancelWedding(data: any) {
    if (data === null)
      console.log("chưa chọn tiệc cưới")
    else
      this.clickedCancel = true;
  }



  goBack() {
    this.selectedItem = null;
    this.clickedDetail = false;
    this.clickedPay = false;
    this.clickedCancel = false;
  }
  
}
