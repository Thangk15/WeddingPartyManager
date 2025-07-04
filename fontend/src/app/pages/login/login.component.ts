import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  standalone: true, // 👈 PHẢI có dòng này khi bạn import module thủ công
  selector: 'app-login',
  imports: [
    FormsModule,         // nếu dùng [(ngModel)]
    HttpClientModule     // để dùng HttpClient (AuthService)
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // sửa lại từ `styleUrl` → `styleUrls`
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.username, this.password).subscribe({
      next: (res) => {
        console.log('✅ Đăng nhập thành công', res);
        alert(`Xin chào ${res.userName} (${res.role})`);
        this.authService.setLoggedIn(true);
        this.authService.setLoggedInUser(this.username);
        this.router.navigate(['/home'], {
          state: { userName: res.userName, role: res.role }
        });
      },
      error: (err) => {
        console.error('❌ Lỗi đăng nhập:', err.error);
        alert('Đăng nhập thất bại: ' + err.error);
      }
    });

    
  }
}