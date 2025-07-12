import { CommonModule, NgClass, NgFor, NgIf, NgSwitch } from "@angular/common";
import { Component, Input, OnInit } from "@angular/core";
import { StepInfoComponent } from "./step-info/step-info.component";
import { StepMenuComponent } from "./step-menu/step-menu.component";
import { StepServicesComponent } from "./step-services/step-services.component";
import { StepConfirmComponent } from "./step-confirm/step-confirm.component";
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";

@Component ({
    selector: 'app-wedding-booking',
    standalone: true,
    imports: [
        NgFor, 
        NgClass, 
        NgIf,
        NgSwitch, 
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        StepInfoComponent, 
        StepMenuComponent, 
        StepServicesComponent, 
        StepConfirmComponent],
    templateUrl: './wedding-booking.component.html',
    styleUrl: './wedding-booking.component.css',
})

export class WeddingBookingComponent  implements OnInit {
    form!: FormGroup;

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        this.form = this.fb.group({
            customerInfo: this.fb.group({
                groomName: ['', Validators.required],
                brideName: ['', Validators.required],
                phoneNumber: ['', [
                                Validators.required,
                                Validators.pattern('^[0-9]{10,11}$')
                            ]],
            }),

            weddingInfo: this.fb.group({

                weddingDate: ['', Validators.required],
                shift: ['', Validators.required],
                hallName: ['', Validators.required],
                tableCount: [0],
                reserveTableCount: ['', Validators.required],
                totalSelectedDishPrice: [0],
            }),

            selectedDishIds: this.fb.array([]),
            selectedServices: this.fb.array([]),


        });
    }

    get selectedDishIdsFormArray(): FormArray {
        const control = this.form.get('selectedDishIds');
        if (!control || !(control instanceof FormArray)) {
            throw new Error('selectedDishIds is not a FormArray');
        }
        return control;
    }



    // 
    @Input() totalSteps: number = 4;
    @Input() currentStep: number = 1;

    handerStep(index: number) {
        if (index < this.currentStep)
            return 'bi bi-check-circle-fill'
        else
            return 'bi bi-record-circle'
    }

    get currentLineWidth(): string {
        if (this.totalSteps <= 1) return '0%';
        const width = 33* (this.currentStep - 1);
        return `${width}%`;
    }   

    checkGroup(groupPath: string, label: string): boolean {
        const group = this.form.get(groupPath);
        if (group?.invalid) {
            group.markAllAsTouched();
            alert(`Vui lòng nhập đầy đủ ${label} hợp lệ.`);
            return true;
        }
        return false;
    }

    goNext() {
        if (this.currentStep == 1)
        {
            if (this.checkGroup('weddingInfo', 'thông tin tiệc cưới')) return;
            if (this.checkGroup('customerInfo', 'thông tin khách hàng')) return;
        }
        if (this.currentStep < this.totalSteps) {
            this.currentStep++;
        }
    }

    goBack() {
        if (this.currentStep > 1) {
        this.currentStep--;
        }
    }

    get selectedServices(): FormArray {
        return this.form.get('selectedServices') as FormArray;
    }

    get selectedServiceValues(): any[] {
        return this.selectedServices?.value ?? [];
    }
    
}