import { Component, Input } from '@angular/core';
// import { CommonModule } from '@angular/common'; // בשביל ngIf
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-auth-card',
  imports:[RouterLink],
  standalone: true,
  template: `
    <div class="auth-wrapper">
      <div class="auth-card">
        <h2>{{ title }}</h2>
        <p>{{ subtitle }}</p>

        <ng-content></ng-content>

        <div class="auth-footer">
          <span>{{ footerText }} <a [routerLink]="footerLink">{{ footerLinkText }}</a></span>
        </div>
      </div>
    </div>
  `,
  styleUrl: './auth-form-card.css'
})
export class AuthFormCard {
  @Input() title = '';
  @Input() subtitle = '';
  @Input() footerText = '';
  @Input() footerLink = '';
  @Input() footerLinkText = '';
}