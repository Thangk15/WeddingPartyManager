import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../pages/login/login.response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isLoggedInStatus = false;
  private API_URL = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
        return this.http.post<LoginResponse>(`${this.API_URL}/login`, {
            userName: username,
            passWord: password
        });
    }

  setLoggedIn(status: boolean) {
    this.isLoggedInStatus = status;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  logout() {
    this.isLoggedInStatus = false;
  }
}
