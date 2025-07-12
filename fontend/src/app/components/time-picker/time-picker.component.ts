import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaterialTimepickerComponent, NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

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
    NgxMaterialTimepickerModule
  ]
})
export class TimePickerComponent {
  @Input() time: string = '';
  @Output() timeChange = new EventEmitter<string>();
  @ViewChild('picker') picker!: NgxMaterialTimepickerComponent;

  onTimeChanged(newTime: string): void {
    this.time = newTime;
    this.timeChange.emit(newTime);  
    this.picker?.close?.();
  }
}
