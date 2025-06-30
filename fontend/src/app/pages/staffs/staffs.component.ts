import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ItemListComponent } from "../../components/item-list/item-list.component";

@Component ({
    selector: 'app-staffs',
    standalone: true,
    imports: [ItemListComponent],
    templateUrl: './staffs.component.html',
    styleUrl: './staffs.component.css',
})

export class StaffsComponent {
    tableHeader = ['STT', 'Mã nhân viên', 'Tên nhân viên', 'Giới tính', 'SĐT', 'Tên công việc', 'Loại'];
    staffData = [
        {
            id: 'NV0001',
            name: 'Nguyễn Thành Công',
            sex: 'Nam',
            phone: '0917822341',
            job: 'Đứng sảnh',
            type: 'Thời vụ'
        },
        {
            id: 'NV0001',
            name: 'Nguyễn Thành Công',
            sex: 'Nam',
            phone: '0917822341',
            job: 'Đứng sảnh',
            type: 'Thời vụ'
        },
        {
            id: 'NV0001',
            name: 'Nguyễn Thành Công',
            sex: 'Nam',
            phone: '0917822341',
            job: 'Đứng sảnh',
            type: 'Thời vụ'
        },
        {
            id: 'NV0001',
            name: 'Nguyễn Thành Công',
            sex: 'Nam',
            phone: '0917822341',
            job: 'Đứng sảnh',
            type: 'Thời vụ'
        },
        {
            id: 'NV0001',
            name: 'Nguyễn Thành Công',
            sex: 'Nam',
            phone: '0917822341',
            job: 'Đứng sảnh',
            type: 'Thời vụ'
        },
        {
            id: 'NV0001',
            name: 'Nguyễn Thành Công',
            sex: 'Nam',
            phone: '0917822341',
            job: 'Đứng sảnh',
            type: 'Thời vụ'
        },
    ]
}