import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-step-services',
  imports: [NgFor],
  templateUrl: './step-services.component.html',
  styleUrl: './step-services.component.css'
})
export class StepServicesComponent {

  @Input() selectedServices!: FormArray;

  constructor(private fb: FormBuilder) {}

  // Danh sách món ăn tĩnh
  serviceList = [
    {
      id: 'DV0001',
      name: 'Dịch vụ trang trí',
      price: 2000000,
    },
    {
      id: 'DV0002',
      name: 'Dịch vụ phục vụ',
      price: 2000000,
    },
    {
      id: 'DV0003',
      name: 'Dịch vụ đứng sảnh',
      price: 2000000,
    },
    {
      id: 'DV0004',
      name: 'Dịch vụ MC',
      price: 2000000,
    },
    {
      id: 'DV0005',
      name: 'Dịch vụ phục vụ',
      price: 2000000,
    },
    {
      id: 'DV0006',
      name: 'Dịch vụ đứng sảnh',
      price: 2000000,
    },
    {
      id: 'DV0007',
      name: 'Dịch vụ MC',
      price: 2000000,
    },
    {
      id: 'DV0008',
      name: 'Dịch vụ phục vụ',
      price: 2000000,
    },
    {
      id: 'DV0009',
      name: 'Dịch vụ đứng sảnh',
      price: 2000000,
    },
    {
      id: 'DV0010',
      name: 'Dịch vụ MC',
      price: 2000000,
    },
    {
      id: 'DV0011',
      name: 'Dịch vụ phục vụ',
      price: 2000000,
    },
    {
      id: 'DV0012',
      name: 'Dịch vụ đứng sảnh',
      price: 2000000,
    },
    {
      id: 'DV0013',
      name: 'Dịch vụ MC',
      price: 2000000,
    },
    {
      id: 'DV0014',
      name: 'Dịch vụ phục vụ',
      price: 2000000,
    },
    {
      id: 'DV0015',
      name: 'Dịch vụ đứng sảnh',
      price: 2000000,
    },
    {
      id: 'DV0016',
      name: 'Dịch vụ MC',
      price: 2000000,
    },
  ];

  // Kiểm tra món đã chọn
  isChecked(id: string): boolean {
    return this.selectedServices.value.some((d: any) => d.id === id);
  }

  getCheckedValue(event: Event): boolean {
    return (event.target as HTMLInputElement).checked;
  }

  getQuantity(id: string): number {
    const service = this.selectedServices.value.find((d: any) => d.id === id);
    return service ? service.quantity : 0;
  }

  toggleServiceSelection(service: any, checked: boolean) {
    const index = this.selectedServices.value.findIndex((d: any) => d.id === service.id);
    if (checked && index === -1) {
      this.selectedServices.push(this.fb.group({
        id: [service.id],
        name: [service.name],
        price: [service.price],
        quantity: [1]
      }));
    } else if (!checked && index !== -1) {
      this.selectedServices.removeAt(index);
    }
  }

  onQuantityChange(service: any, quantity: number) {
    const index = this.selectedServices.value.findIndex((d: any) => d.id === service.id);

    if (quantity <= 0 && index !== -1) {
      // Số lượng về 0 thì bỏ check
      this.selectedServices.removeAt(index);
    } else if (quantity > 0 && index === -1) {
      // Auto check nếu tăng từ 0
      this.selectedServices.push(this.fb.group({
        id: [service.id],
        name: [service.name],
        price: [service.price],
        quantity: [quantity]
      }));
    } else if (quantity > 0 && index !== -1) {
      const fg = this.selectedServices.at(index) as FormGroup;
      fg.get('quantity')?.setValue(quantity);
    }
  }
}