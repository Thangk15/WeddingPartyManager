import { Component, Output, EventEmitter } from "@angular/core";
import { CalendarComponent } from "../../../components/calendar/calendar.component";
import { NgFor, NgIf } from "@angular/common";
import { AssignStaffComponent } from "../assign-staff/assign-staff.component";

@Component ({
    selector: 'app-choose-party',
    standalone: true,
    imports: [CalendarComponent, NgFor, NgIf, AssignStaffComponent],
    templateUrl: './choose-party.component.html',
    styleUrl: './choose-party.component.css'
})

export class ChoosePartyComponent {
    datas = [
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
  ];

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
}