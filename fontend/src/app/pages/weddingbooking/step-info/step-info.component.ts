import { Component, Input } from '@angular/core';
import { CalendarComponent } from "../../../components/calendar/calendar.component";
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-step-info',
  imports: [
    CalendarComponent, 
    NgFor,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './step-info.component.html',
  styleUrl: './step-info.component.css'
})
export class StepInfoComponent {
  bookingDate = this.formatDateToDDMMYYYY(new Date());
  hallDatas = [
    'Cung điện ánh sách', 'Rừng nguyên sinh', 'Lễ thành hôn'
  ];
  // selectedHall = '';
  // selectedTime = '';
  // phoneNumber = null;
  // tableCount = 0;
  times = [
    '11:00:00 - 13:00:00', '18:00:00 - 21:00:00'
  ]

  formatDateToDDMMYYYY(date: Date): string {
    const d = new Date(date); // đảm bảo là Date
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  }

  parseDate(value: string | Date | null): Date | null {
    if (!value) return null;
    if (value instanceof Date) return value;

    // Giả sử định dạng là "dd/mm/yyyy"
    const [day, month, year] = value.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  // Xu ly formsGroup
  @Input() form!: FormGroup;

  onWeddingDateChange(date: Date): void {
    const formatted = this.formatDateToDDMMYYYY(date);
    this.form.get('weddingInfo.weddingDate')?.setValue(formatted);
  }
}
