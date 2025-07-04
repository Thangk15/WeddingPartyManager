import { Routes } from '@angular/router';
import { CategoryComponent } from './pages/category/category.component';
import { HomeComponent } from './pages/home/home.component';
import { WeddingBookingComponent } from './pages/weddingbooking/wedding-booking.component';
import { StatisticsComponent } from './pages/statistics/statistics.component';
import { StaffsComponent } from './pages/staffs/staffs.component';
import { AccountComponent } from './pages/account/account.component';
import { BookingSearchComponent } from './pages/booking-search/booking-search.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { PrintComponent } from './components/print/print.component';
import { authGuard } from './services/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        canActivateChild: [authGuard],
        children: [
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            { path: '', component: HomeComponent },
            { path: 'category', component: CategoryComponent },
            { path: 'wedding-booking', component: WeddingBookingComponent },
            { path: 'booking-search', component: BookingSearchComponent },
            { path: 'statistics', component: StatisticsComponent },
            { path: 'staffs', component: StaffsComponent },
            { path: 'account', component: AccountComponent },
        ]
    },
    {
        path: 'login',
        component: AuthLayoutComponent,
        children: [
            { path: '', component: LoginComponent }
        ]
    },
    { path: '**', redirectTo: '' }
];
