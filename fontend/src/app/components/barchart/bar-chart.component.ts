import { Component, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent implements AfterViewInit {
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() title: string = 'Biểu đồ';
  @Input() note: string = 'Ghi chú';
  @Input() color: string = '#0d6efd';
  @Input() height: string = '100px';
  @Input() width: string = '100%';
  @Input() Ox: string = 'Trục hoành';
  @Input() Oy: string = 'Trục trung';

  @ViewChild('barCanvas') barCanvas!: ElementRef;

  ngAfterViewInit(): void {
    new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: this.labels,
        datasets: [{
          label: this.note,
          data: this.data,
          backgroundColor: this.color
        }]
      },
      options: {
        responsive: false,
        scales: {
            x: {
            title: {
                display: true,
                text: this.Ox,
                color: '#333',
                font: {
                size: 14,
                weight: 'bold'
                }
            }
            },
            y: {
            title: {
                display: true,
                text: this.Oy,
                color: '#333',
                font: {
                size: 14,
                weight: 'bold'
                }
            },
            beginAtZero: true
            }
        },
        plugins: {
          legend: { display: false },
          title: { 
            display: true, 
            text: this.title,
            color: 'black',
            font: {
                size: 24,
                weight: 'bold',
                
            }  }
        }
      }
    });
  }
}
