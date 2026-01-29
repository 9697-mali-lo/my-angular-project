import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthFormCard } from '../auth-form-card/auth-form-card';

@Component({
  selector: 'app-register',
  imports: [FormsModule,AuthFormCard],
  templateUrl: './register.html',
  styleUrl: './register.css',
})

export class Register {
  regData={"name":'',"email": '', "password": ''};
  constructor(private http: HttpClient, private router: Router) {}
onRegister() {
this.http.post('http://localhost:3000/api/auth/register',this.regData)
.subscribe({
  next: (res: any) => {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
    this.router.navigate(['/teams']);
  },
  error: (err) => alert('פרטי הרשמה שגויים')
},
)};

}
