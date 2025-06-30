import { NgFor } from '@angular/common';
import { Component, Input, Pipe } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-step-menu',
  imports: [FormsModule, NgFor, ReactiveFormsModule, CommonModule],
  templateUrl: './step-menu.component.html',
  styleUrl: './step-menu.component.css'
})
export class StepMenuComponent {




  

  dishTypes = ['Khai vị', 'Món chính', 'Tráng miệng']

  selectedType = this.dishTypes[0];

  dishs = [
    {
      id: 'MA0001',
      name: 'Tôm chiên HongKong',
      price: 400000,
      type: 'Món chính',
      checked: false
    },
    {
      id: 'MA0002',
      name: 'Gà quay HongKong',
      price: 300000,
      type: 'Món chính',
      checked: false
    },
    {
      id: 'MA0003',
      name: 'Chả 4 mùa',
      price: 300000,
      type: 'Khai vị',
      checked: false
    },
    {
      id: 'MA0004',
      name: 'Chả thành hôn',
      price: 300000,
      type: 'Khai vị',
      checked: false
    },
    {
      id: 'MA0005',
      name: 'Súp hạt sen',
      price: 300000,
      type: 'Món chính',
      checked: false
    },
    {
      id: 'MA0006',
      name: 'Bánh bao thịt tứ xuyên',
      price: 300000,
      type: 'Món chính',
      checked: false
    },
    {
      id: 'MA0007',
      name: 'Lẩu hải sản',
      price: 400000,
      type: 'Món chính',
      checked: false
    },
    {
      id: 'MA0008',
      name: 'Chè đậu biếc',
      price: 200000,
      type: 'Tráng miệng',
      checked: false
    },
    {
      id: 'MA0009',
      name: 'Bánh đông sương 4 mùa',
      price: 300000,
      type: 'Tráng miệng',
      checked: false
    },
    {
      id: 'MA0010',
      name: 'Gà Tần',
      price: 500000,
      type: 'Món chính',
      checked: false
    },
    {
      id: 'MA0011',
      name: 'Gỏi bò',
      price: 500000,
      type: 'Món chính',
      checked: false
    },
    {
      id: 'MA0012',
      name: 'Tôm chiên HongKong',
      price: 300000,
      type: 'Món chính',
      checked: false
    },
    {
      id: 'MA0013',
      name: 'Tôm chiên HongKong',
      price: 300000,
      type: 'Món chính',
      checked: false
    },
    {
      id: 'MA0014',
      name: 'Tôm chiên HongKong',
      price: 300000,
      type: 'Món chính',
      checked: false
    },
    {
      id: 'MA0015',
      name: 'Tôm chiên HongKong',
      price: 300000,
      type: 'Món chính',
      checked: false
    },
  ]

  filteredDishs(type: string) {
    return this.dishs.filter(item => item.type === type);
  }
    // Xu ly formsGroup
  @Input() selectedDishIdsFormArray!: FormArray;
  @Input() form!: FormGroup;

  isChecked(dishId: string): boolean {
    return this.selectedDishIdsFormArray.value.includes(dishId);
  }

  getCheckedValue(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  get totalSelectedDishPrice(): number {
    const selectedIds: string[] = this.selectedDishIdsFormArray.value;

    var total = this.dishs
      .filter(dish => selectedIds.includes(dish.id))
      .reduce((sum, dish) => sum + dish.price, 0);
    this.form.get('weddingInfo.totalSelectedDishPrice')?.setValue(total, { emitEvent: false });
    return total;
  }

  toggleDishSelection(dishId: string, isChecked: boolean): void {
    const ids = this.selectedDishIdsFormArray;
    const index = ids.controls.findIndex(control => control.value === dishId);

    if (isChecked && index === -1) {
      ids.push(new FormControl(dishId));
    } else if (!isChecked && index !== -1) {
      ids.removeAt(index);
    }
  }

  // data đc lưu ở step menu
  // stepMenuData = [dish0, ]
}
