// import { Component, inject } from '@angular/core';
// import { ProjectDialogService } from '../../../services/ProjectDialogService';
// import { ProjectList } from "../task-list/task-list";
// import { ActivatedRoute } from '@angular/router';


// @Component({
//   selector: 'app-task-board',
//   imports: [ProjectList],
//   templateUrl: './task-board.html',
//   styleUrl: './task-board.css',
// })
// export class TaskBoard {
//   private route = inject(ActivatedRoute);
  
//   ngOnInit() {
//     const projectId = this.route.snapshot.paramMap.get('projectId');
//     // כאן תקרא לשרות שמביא משימות לפי ה-projectId
//   }
//   private projectDialogService = inject(ProjectDialogService);

// onclickCreateTask(){
// this.projectDialogService.openCreateProjectDialog(null).subscribe(result => {
//   if (result) {
//     console.log('הפרויקט נוצר');
//   }
// });
// }
// }
import { Component, OnInit, inject, signal } from '@angular/core';
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

  onclickCreateTask() {
    console.log('Opening create task dialog...');
  }
}