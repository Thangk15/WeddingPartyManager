import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet, Router } from "@angular/router";

@Component ({
    selector: 'app-dashboard',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
})

export class DashboardComponent {
    constructor(private router: Router) {}

    isCurrentNav(path: string): boolean {
        return this.router.url === path;
    }

    preventIfCurrentNav(event: Event, path: string): void {
        if (this.isCurrentNav(path)) {
            event.preventDefault();
        }
    }

    logout() {
    // this.authService.clearToken(); // hoặc localStorage.clear()
        this.router.navigate(['/login']);
    }
}