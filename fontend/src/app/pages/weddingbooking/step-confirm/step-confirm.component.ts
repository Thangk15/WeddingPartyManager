import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-step-confirm',
  imports: [
    ReactiveFormsModule,
    NgFor
  ],
  templateUrl: './step-confirm.component.html',
  styleUrl: './step-confirm.component.css'
})
export class StepConfirmComponent {
  toNumber(value: any): number {
    return Number(value) || 0;
  }

  @Input() form!: FormGroup;
  @Input() selectedServices!: FormArray;

  get getCustomerInfo(): { groomName?: string; brideName?: string; phoneNumber?: string } {
    return this.form.value.customerInfo ?? {};
  }

  get getWeddingInfo(): any {
    return this.form.value.weddingInfo ?? {};
  }

  get totalTablePrice(): number {
    return (this.getWeddingInfo.tableCount || 0) * (this.getWeddingInfo.totalSelectedDishPrice || 0);
  }

  totalServicePrice(quantiry: number, price: number): number {
    return quantiry*price;
  }

  get getServiceList(): any[] {
    return this.selectedServices.controls.map(ctrl => ctrl.value);
  }

  get totalServicesPrice(): number{
    const serviceList: any[] = this.form.value.selectedServices ?? [];

    var total = serviceList.reduce((sum, item) => sum + item.price*item.quantity, 0);
    return total;
  }

  get totalBill(): number {
    // var total = 
    return this.totalTablePrice + this.totalServicesPrice;
  }

  get deposit(): number {
    return this.totalBill*50/100;
  }

  get remainingAmount(): number {
    return this.totalBill - this.deposit
  }


}
