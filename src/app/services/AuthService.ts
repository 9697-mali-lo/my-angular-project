import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root' // הופך את הסרוויס לזמין בכל האפליקציה
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  // פונקציית הרשמה
  register(userData: any) {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }
  login(userData: any) {
    return this.http.post(`${this.apiUrl}/login`, userData);
  }
  // פונקציה שבודקת האם קיים טוקן (עבור ה-Guard)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token'); 
  }

  // פונקציית התנתקות
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}