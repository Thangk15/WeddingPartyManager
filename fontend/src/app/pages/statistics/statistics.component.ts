import { NgFor, NgIf } from "@angular/common";
import { Component } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { BarChartComponent } from "../../components/barchart/bar-chart.component";

@Component ({
    selector: 'app-statistics',
    standalone: true,
    imports: [FormsModule, BarChartComponent, NgFor, NgIf],
    templateUrl: './statistics.component.html',
    styleUrl: './statistics.component.css',
})

export class StatisticsComponent {

    selectedValue = 'day';
    inputMonth = '6';
    inputYear = '2025';

    items = [
        {
            title: 'Danh sách món ăn',
            icon: 'monan',
            content: 'đây là content'
        },
        {
            title: 'Danh sách dịch vụ',
            icon: 'dv',
            content: 'đây là content'
        },{
            title: 'Danh sách nhân viên',
            icon: 'nv',
            content: 'đây là content'
        },
    ]

    datas = [
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
        { day: '26/03/2025', shift: 'Tối', idParty: 'TC0001', weddingHall: 'SN0001', nbOfTable: 23, status: 'Chưa phân công'},
        { day: '26/02/2025', shift: 'Tối', idParty: 'TC0002', weddingHall: 'SN0002', nbOfTable: 24, status: 'Đã phân công'},
        { day: '26/01/2025', shift: 'Tối', idParty: 'TC0003', weddingHall: 'SN0003', nbOfTable: 27, status: 'Chưa phân công'},
    ];
}