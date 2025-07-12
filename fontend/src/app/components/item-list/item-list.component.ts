import { KeyValuePipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output, effect, OnInit, inject, Injector, runInInjectionContext, WritableSignal, ViewChild, ElementRef } from '@angular/core';
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
export class ItemListComponent implements OnInit {
  @Output() add = new EventEmitter<void>();
  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<{ key: string, id: number }>();

  selectedItem: any = null;
  typeLayout: string = '';
  typeAction: string = '';

  @Input() showBtnGoBack: boolean = true;
  @Input() listName: string = 'Danh sách';
  @Input() nameIcon: string = 'Hall.png';
  @Input() headDatas: string[] = ['a', 'b', 'a', 'b', 'a', 'b', 'a'];
  @Input() type: string = '';

  @Input() insertStatus!: WritableSignal<'idle' | 'success' | 'fail'>;
  @Input() updateStatus!: WritableSignal<'idle' | 'success' | 'fail'>;
  @Output() refresh = new EventEmitter<void>();

  private injector = inject(Injector)

  ngOnInit(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const isInsertSuccess = this.insertStatus() === 'success';
        const isUpdateSuccess = this.updateStatus() === 'success';

        if (isInsertSuccess || isUpdateSuccess) {
          this.exitLayout();
          this.refresh.emit();

          console.log(isInsertSuccess ? 'Insert thành công!' : 'Update thành công!');

          this.insertStatus.set('idle');
          this.updateStatus.set('idle');
        }
      });
    });
  }

  handleClickedItem(item: any) {
    this.selectedItem = item;
    console.log('Đã chọn dòng:', item);
  }

  onDelete() {
    if(!this.selectedItem)
      alert('Bạn chưa chọn mục để xóa!')
    else {
      const firstKey = Object.keys(this.selectedItem)[0];
      this.delete.emit({ key: this.type, id: this.selectedItem[firstKey] });
    }
  }


  searchTerm: string = '';

  @Output() search = new EventEmitter<string>();

  onSearch() {
    this.search.emit(this.searchTerm);
  }

  customSortFn = (a: any, b: any) => {
    var order = this.headDatas;
    return order.indexOf(a.key) - order.indexOf(b.key);
  };

  @Input() datas: object[] = [];

  @Output() back = new EventEmitter<void>();
  @Output() insert = new EventEmitter<{ key: string, data: any }>();
  @Output() update = new EventEmitter<{ key: string, id: number ,data: any }>();

  onBack() {
    this.back.emit();
  }

  onUpdate(event: { key: string, id: number, data: any }) {
    console.log('key, id, data đc nhan o item: ', event.key, event.id, event.data)
    this.update.emit(event);
  }

  get checkOptionButton(): boolean {
    if(this.typeLayout !== '')
      return true;
    else
      return false;
  }

  showLayout(type: string, name: string) {
    console.log('🛠️ showLayout:', type, name);
    if (type === 'edit' && !this.selectedItem) {
      alert('Bạn chưa chọn mục để chỉnh sửa!');
      return;
    }

    this.typeLayout = name;
    this.typeAction = type;
  }

  exitLayout() {
    this.typeAction = '';
    this.typeLayout = '';
  }

  @ViewChild('dataTable') tableRef!: ElementRef;

  onComponentClick(event: MouseEvent) {
    const clickedInsideTable = this.tableRef?.nativeElement.contains(event.target);
    const clickedOnActionButton = (event.target as HTMLElement).closest('.action-btn-container, .action-layout');

    if (!clickedInsideTable && !clickedOnActionButton) {
      this.selectedItem = null;
    }
  }
}
