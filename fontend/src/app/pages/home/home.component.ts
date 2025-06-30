import { Component, Output } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { CalendarComponent } from "../../components/calendar/calendar.component";
import { BarChartComponent } from "../../components/barchart/bar-chart.component";
import { ChoosePartyComponent } from "./chooseParty/choose-party.component";
import { NgIf } from "@angular/common";

@Component ({
    selector: 'app-home',
    standalone: true,
    imports: [
        CalendarComponent, 
        BarChartComponent, 
        ChoosePartyComponent,
        NgIf
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})

export class HomeComponent {
    @Output() clickedBtn: boolean = false;
    setClickedBtn() {
        this.clickedBtn = true;
    }

    goBack() {
        this.clickedBtn = false;
    }
    
}