import { Component, computed, inject, Input, signal } from '@angular/core';
import { Project, projectsService } from '../../../services/projectService';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { TaskBoard } from '../task-board/task-board';
import { TaskDialogService } from '../../../services/TaskDialogService';
import { Task, tasksService } from '../../../services/TaskService';

@Component({
  selector: 'app-task-list',
  imports: [MatCard, MatCardContent, MatIcon],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
// export class TaskList {
//  private taskDialogService=inject(TaskDialogService);
//   onclickCreateProject() {
//     this.taskDialogService.openCreateTaskDialog().subscribe(result => {
//       if (result) {
//         this.loadTeams(); // בונוס: רענון הרשימה לאחר יצירה
//       }
//     });
//   }
//       private taskService = inject(tasksService);
//   // וודא שיש לך computed שמסנן את המשימות לפי הסטטוס של העמודה
// tasks = computed(() => {
//   const allTasks = this.allTasksSignal(); // המשימות הגולמיות מהשרת
//   const columnStatus = this.status(); // הסטטוס של העמודה הנוכחית (למשל 'Done')
  
//   return allTasks.filter(t => t.status === columnStatus);
// });
//       isLoading = signal(true);
//       @Input() status: string = '';
      
//       ngOnInit() {
//         this.loadTeams();
//       }
  
//       loadTeams() {
//         this.taskService.getProjects().subscribe({
//           next: (data) => {
//             this.tasks.set([...data]);
//             this.isLoading.set(false);
//           },
//           error: () => this.isLoading.set(false)
//         });
//       }
    
// }
export class TaskList {
  private taskDialogService = inject(TaskDialogService);
  private taskService = inject(tasksService);

  // 1. הגדרת Input כסיגנל (מומלץ בגרסאות חדשות) או שמירה על @Input רגיל
  @Input() status: string = '';
  statusSignal = signal(''); // עזר להפיכת ה-Input לסיגנל לצורך ה-computed

  // 2. הסיגנל שמחזיק את כל המשימות הגולמיות מהשרת
  allTasksSignal = signal<Task[]>([]);
  isLoading = signal(true);

  // 3. ה-computed שמסנן אוטומטית לפי הסטטוס
  tasks = computed(() => {
    const allTasks = this.allTasksSignal();
    const currentStatus = this.status; // או this.statusSignal()
    
    // חשוב: לוודא שאין בעיית Case Sensitive (למשל Todo מול todo)
    return allTasks.filter(t => t.status?.toLowerCase() === currentStatus.toLowerCase());
  });

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading.set(true);
    this.taskService.getProjects().subscribe({ // וודא ששם הפעולה ב-service הוא getTasks או getProjects
      next: (data) => {
        // כאן אנחנו מעדכנים את הסיגנל הגולמי!
        this.allTasksSignal.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.isLoading.set(false);
      }
    });
  }

  onclickCreateProject() {
    this.taskDialogService.openCreateTaskDialog().subscribe(result => {
      if (result) {
        this.loadTasks(); // רענון לאחר יצירה
      }
    });
  }
}