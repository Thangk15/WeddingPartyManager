import { NgFor } from "@angular/common";
import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { ItemListComponent } from "../../components/item-list/item-list.component";

@Component ({
    selector: 'app-account',
    standalone: true,
    imports: [ItemListComponent],
    templateUrl: './account.component.html',
    styleUrl: './account.component.css',
})

export class AccountComponent {
    accountList = [
        {
            userName: 'ngocthang',
            position: 'Quản lí'
        },
        {
            userName: 'ngocthang1',
            position: 'Nhân viên'
        },
        {
            userName: 'ngocthanhcong',
            position: 'Nhân viên'
        },
        {
            userName: 'letanthuan',
            position: 'Nhân viên'
        },
    ]
}