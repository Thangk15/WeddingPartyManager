import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  templateUrl: './bar-chart.component.html'
})
export class BarChartComponent implements OnChanges {
  @Input() labels: string[] = [];
  @Input() data: number[] = [];
  @Input() title: string = 'Biểu đồ';
  @Input() note: string = 'Ghi chú';
  @Input() color: string = '#0d6efd';
  @Input() height: string = '100px';
  @Input() width: string = '100%';
  @Input() Ox: string = 'Trục hoành';
  @Input() Oy: string = 'Trục tung';

  @ViewChild('barCanvas', { static: true }) barCanvas!: ElementRef;
  chart: Chart | null = null;

  ngOnChanges(changes: SimpleChanges): void {
    // Nếu có thay đổi labels hoặc data, thì vẽ lại biểu đồ
    if (changes['labels'] || changes['data']) {
      this.drawChart();
    }
  }

  drawChart() {
  // Nếu có biểu đồ cũ thì hủy đi
  if (this.chart) {
    this.chart.destroy();
  }

  // 🔥 ÉP canvas có đúng width/height trước khi vẽ
  const canvas = this.barCanvas.nativeElement as HTMLCanvasElement;
  canvas.width = parseInt(this.width.replace('px', '')) || 500;
  canvas.height = parseInt(this.height.replace('px', '')) || 400;

  // Vẽ biểu đồ mới
  this.chart = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: this.labels,
      datasets: [{
        data: this.data,
        label: this.note,
        backgroundColor: this.color
      }]
    },
    options: {
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: this.title,
          font: {
            size: 24,      // 👈 Font size tiêu đề (đổi tùy ý)
            weight: 'bold' // 👈 Có thể thêm in đậm
          },
        },
        legend: {
          display: false
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: this.Ox
          }
        },
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: this.Oy
          }
        }
      }
    }
  });
}

}
