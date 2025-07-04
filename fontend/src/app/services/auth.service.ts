import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from '../pages/login/login.response';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userName: string = '';
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
    localStorage.setItem('isLoggedIn', status.toString());
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus || localStorage.getItem('isLoggedIn') === 'true';
  }

  logout() {
    this.isLoggedInStatus = false;
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
  }
  // 
  setLoggedInUser(userName: string) {
    this.userName = userName;
    localStorage.setItem('userName', userName);
  }

  getLoggedInUser(): string {
    return this.userName || localStorage.getItem('userName') || '';
  }

}
