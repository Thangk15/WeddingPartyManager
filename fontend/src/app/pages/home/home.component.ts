import { Component, Output } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CalendarComponent } from "../../components/calendar/calendar.component";
import { BarChartComponent } from "../../components/barchart/bar-chart.component";
import { ChoosePartyComponent } from "./chooseParty/choose-party.component";
import { NgIf } from "@angular/common";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { formatDateToDDMMYYYY } from "../../components/format-date/format-date.component";

interface SoLuongTiecTheoThang {
  thang: number;
  soLuong: number;
}

@Component ({
    selector: 'app-home',
    standalone: true,
    imports: [
        CalendarComponent, 
        BarChartComponent, 
        ChoosePartyComponent,
        NgIf,
        HttpClientModule
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})

export class HomeComponent {
    @Output() clickedBtn: boolean = false;
    data: SoLuongTiecTheoThang[] = [];
    labels: string[] = [];
    values: number[] = [];
    selectedDate: string = formatDateToDDMMYYYY(new Date());

    extractYear(dateStr: string): number {
        return Number(dateStr.split('/')[2]); // vì chuỗi đã là "dd/MM/yyyy"
    }

    onDateSelected(dateStr: string) {
        this.selectedDate = dateStr;
        const year = this.extractYear(dateStr);
        this.getThongKeTheoThang(year);
    }

    constructor(private http: HttpClient) {}

    ngOnInit() {
        const currentYear = new Date().getFullYear();
        this.getThongKeTheoThang(currentYear);
    }

    setClickedBtn() {
        this.clickedBtn = true;
    }

    goBack() {
        this.clickedBtn = false;
    }

    getThongKeTheoThang(nam: number) {
        const url = `http://localhost:8081/api/phieudattieccuoi/thongke/thang/${nam}`;
        this.http.get<SoLuongTiecTheoThang[]>(url).subscribe({
        next: (res) => {
            const monthMap = new Array(12).fill(0).map((_, i) => ({
            thang: i + 1,
            soLuong: 0
        }));

        // Gộp dữ liệu từ API vào mảng mặc định
        res.forEach(item => {
            const index = monthMap.findIndex(m => m.thang === item.thang);
            if (index !== -1) {
            monthMap[index].soLuong = item.soLuong;
            }
        });

        // Gán labels và values đầy đủ 12 tháng
        this.labels = monthMap.map(m => `Tháng ${m.thang}`);
        this.values = monthMap.map(m => m.soLuong);

        console.log('✅ Labels:', this.labels);
        console.log('✅ Values:', this.values);

        },
        error: (err) => {
            console.error('❌ Lỗi thống kê:', err);
        }
        });
    }

    
    
    
}