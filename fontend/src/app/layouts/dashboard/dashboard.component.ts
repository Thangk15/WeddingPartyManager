import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component ({
    selector: 'app-dashboard',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})

export class DashboardComponent {
    userName = '';
    role = '';
    constructor(private authService: AuthService, private router: Router) {
    }

    isCurrentNav(path: string): boolean {
        return this.router.url === path;
    }

    preventIfCurrentNav(event: Event, path: string): void {
        if (this.isCurrentNav(path)) {
            event.preventDefault();
        }
    }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}