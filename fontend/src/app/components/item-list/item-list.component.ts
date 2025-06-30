import { KeyValuePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActionHallComponent } from "../../layouts/action-hall/action-hall.component";
import { ActionDishComponent } from "../../layouts/action-dish/action-dish.component";
import { ActionServiceComponent } from "../../layouts/action-service/action-service.component";
import { ActionShiftComponent } from "../../layouts/action-shift/action-shift.component";
import { ActionJobComponent } from "../../layouts/action-job/action-job.component";
import { ActionStaffComponent } from "../../layouts/action-staff/action-staff.component";

@Component({
  selector: 'app-item-list',
  imports: [
    NgFor,
    FormsModule,
    NgIf,
    KeyValuePipe,
    ActionHallComponent,
    ActionDishComponent,
    ActionServiceComponent,
    ActionShiftComponent,
    ActionJobComponent,
    ActionStaffComponent
],
  templateUrl: './item-list.component.html',
  styleUrl: './item-list.component.css'
})
export class ItemListComponent implements OnChanges {
  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  selectedItem: any = null;
  typeLayout: string = '';
  typeAction: string = '';

  @Input() showBtnGoBack: boolean = true;
  @Input() listName: string = 'Danh sách';
  @Input() nameIcon: string = 'Hall.png';
  @Input() headDatas: string[] = ['a', 'b', 'a', 'b', 'a', 'b', 'a'];
  @Input() type: string = '';
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['listName']) {
      console.log('listName vừa được truyền vào:', this.listName);
    }
  }


  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  onAddHall() {
      console.log('add-hall');
  }

  onEditHall() {
      console.log('edit-hall');
  }

  onDeleteHall() {
      console.log('delete-hall');
  }
  // sắp xếp cột theo data mong muốn
  customSortFn = (a: any, b: any) => {
    var order = this.headDatas;
    return order.indexOf(a.key) - order.indexOf(b.key);
  };

  @Input() datas: object[] = [
    // { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
    // { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
    // { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
    // { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
    // { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
    // { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
    // { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
    // { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
    // { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
    // { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
    // { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
    // { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
    // { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
    // { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
    // { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
    // { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
    // { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
    // { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
    // { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
    // { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
    // { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
    // { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
    // { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
    // { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
  ];

  //Logic click btn quay lại
  @Output() back = new EventEmitter<void>();

  onBack() {
    this.back.emit();
  }

  get checkOptionButton(): boolean {
    if(this.typeLayout !== '')
      return true;
    else
      return false;
  }

  // action btn 
  showLayout(type: string, name: string) {
    this.typeLayout = name;
    this.typeAction = type;
  }

  exitLayout() {
    this.typeAction = '';
    this.typeLayout = '';
  }
}
