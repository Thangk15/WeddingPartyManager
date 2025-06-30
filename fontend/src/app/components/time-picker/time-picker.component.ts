import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTimepickerModule} from '@angular/material/timepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-time-picker',
  standalone: true,
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatTimepickerModule,
  ],
  providers: [provideNativeDateAdapter()]
})
export class TimePickerComponent {
  @Input() time: string = '';
  @Output() timeChange = new EventEmitter<string>();

  onTimeChanged(event: Event): void {
  const target = event.target as HTMLInputElement | null;

  if (target && target.value !== undefined) {
    this.time = target.value;
    this.timeChange.emit(this.time);
  }
}
}
