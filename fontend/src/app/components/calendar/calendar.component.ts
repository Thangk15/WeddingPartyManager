import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { formatDateToDDMMYYYY} from '../format-date/format-date.component';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule
  ],
  templateUrl: './calendar.component.html',
})
export class CalendarComponent implements OnChanges {
  /** Chuỗi ngày dưới dạng "dd/mm/yyyy" */
  @Input() selectedDate: string | null = null;
  /** Xuất ra cũng là "dd/mm/yyyy" */
  @Output() selectedDateChange = new EventEmitter<string>();

  @Input() minDateStr: string | null = null;
  minDate: Date | null = null;

  /** Model thực tế cho Datepicker */
  dateModel: Date | null = null;

  /** Nếu cần disable calendar */
  @Input() disabled: boolean = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['selectedDate']) {
      this.dateModel = this.parseDateString(this.selectedDate);
    }

    if (changes['minDateStr']) {
      this.minDate = this.parseDateString(this.minDateStr);
    }
  }

  onDateChange(event: any) {
    const date: Date = event.value;
    this.dateModel = date;
    const formatted = formatDateToDDMMYYYY(date)
    this.selectedDateChange.emit(formatted);
  }

  parseDateString(value: string | null): Date | null {
    if (!value) return null;
    const [day, month, year] = value.split('/');
    return new Date(Number(year), Number(month) - 1, Number(day));
  }
}
