import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// import { Sidebar } from "./components/sidebar/sidebar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterLinkActive],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-angular-app');
}
