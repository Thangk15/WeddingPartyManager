import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { CalendarComponent } from "../../../components/calendar/calendar.component";
import { CommonModule, NgFor, NgIf } from "@angular/common";
import { AssignStaffComponent } from "../assign-staff/assign-staff.component";
import { formatDateToDDMMYYYY, parseDate } from "../../../components/format-date/format-date.component";
import { HttpParams, HttpClient } from "@angular/common/http";

interface TiecCuoiThongTinDonGianDTO {
  maTiecCuoi: number;
  ngayDaiTiec: string;        // định dạng: "dd/MM/yyyy" hoặc ISO nếu để mặc định
  tenCa: string;
  maSanh: number;
  soLuongBan: number;
  tinhTrangPhanCong: boolean;
}

@Component ({
    selector: 'app-choose-party',
    standalone: true,
    imports: [
      CalendarComponent, 
      NgFor, 
      NgIf, 
      AssignStaffComponent,
      CommonModule,
    ],
    templateUrl: './choose-party.component.html',
    styleUrl: './choose-party.component.css'
})

export class ChoosePartyComponent {
  today: string = formatDateToDDMMYYYY(new Date());
  constructor(private http: HttpClient) {}
  danhSachTiecCuoi: TiecCuoiThongTinDonGianDTO[] = [];

  selectedFromDate: string = this.today;
  selectedToDate: string = '';

  minToDateStr(): string {
    const from = parseDate(this.selectedFromDate);
    const plus7 = new Date(from);
    plus7.setDate(plus7.getDate() + 7);
    return formatDateToDDMMYYYY(plus7);
  }

  onFromDateChange(newFromDate: string) {
    this.selectedFromDate = newFromDate;

    const from = parseDate(newFromDate);
    const to = parseDate(this.selectedToDate);

    // Tính khoảng cách từ from đến to
    const minToDate = new Date(from);
    minToDate.setDate(minToDate.getDate() + 7);

    if (to < minToDate) {
      this.selectedToDate = formatDateToDDMMYYYY(minToDate);
    }

    this.loadData();
  }

  onToDateChange(newToDate: string) {
    this.selectedToDate = newToDate;
    this.loadData();
  }

  ngOnInit(): void {
    this.selectedFromDate = this.selectedToDate = formatDateToDDMMYYYY(new Date());
    this.selectedToDate = this.minToDateStr();
    this.loadData();
  }

  loadData() {
    const params = new HttpParams()
      .set('from', this.selectedFromDate)
      .set('to', this.selectedToDate);

    this.http.get<TiecCuoiThongTinDonGianDTO[]>(
      'http://localhost:8081/api/phieudattieccuoi/dongian',
      { params }
    ).subscribe(data => {
      this.danhSachTiecCuoi = data;
      console.log('Dữ liệu:', data);
    });
  }

//   
  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }

//   Xu ly khi click phan cong
  showAssignForm = false;

  onAssignClick() {
    this.showAssignForm = true;
  }
  // Xử lý out assignForm

  outAssignForm() {
    this.showAssignForm = false;
  }

  // Xử lý chọn row
  
  selectedItem: any = null;

  handleClickedItem(item: any) {
    this.selectedItem = item;
    console.log('Đã chọn dòng:', item);
  }
}