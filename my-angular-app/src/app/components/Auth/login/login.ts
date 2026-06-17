import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthFormCard } from '../auth-form-card/auth-form-card';
import { AuthService } from '../../../services/AuthService';


@Component({
  selector: 'app-login',
  imports: [FormsModule,AuthFormCard],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
    loginData = { "email": '', "password": '' };
  
    constructor(private authService: AuthService, private router: Router) {}
    
    onLogin() {
      this.authService.login( this.loginData)
        .subscribe({
          next: (res: any) => {
            localStorage.setItem('token', res.token);
            localStorage.setItem('user', JSON.stringify(res.user));
            this.router.navigate(['/teams']);
          },
          error: (err) => alert('פרטי התחברות שגויים')
        });
    }
}
