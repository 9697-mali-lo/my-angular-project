
import { Component, OnInit, ViewChild, inject, input, signal } from '@angular/core';
// import { AuthService, User } from '../../../services/auth.service'; // וודא נתיב נכון
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TaskList } from '../task-list/task-list';
import { UsersService,User } from '../../../services/usersService';

@Component({
  selector: 'app-task-board',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, TaskList],
  templateUrl: './task-board.html',
  styleUrl: './task-board.css'
})
export class TaskBoard implements OnInit {
  private usersService = inject(UsersService);
  projectId = input.required<string>();
  // סיגנל למשתמש הנוכחי
  currentUser = signal<User | null>(null);

  ngOnInit() {
    // משיכת המשתמש המחובר כדי להציג את השם ב-Navbar
    this.usersService.getUsers().subscribe(user => {
      if (user.length > 0) {
        this.currentUser.set(user[0]); // שליפת המשתמש הראשון מהמערך
      }
    });
  }

  @ViewChild(TaskList) childRef!: TaskList;
  onclickCreateTaskBoard() {
    // עכשיו ניתן לגשת לכל פונקציה ציבורית בבן
    this.childRef.onclickCreateTask();
  }

}