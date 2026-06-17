import { Component, computed, inject, input, Input, signal } from '@angular/core';
import { Project, projectsService } from '../../../services/projectService';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { TaskBoard } from '../task-board/task-board';
import { TaskDialogService } from '../../../services/TaskDialogService';
// import { Task, tasksService } from '../../../services/TaskService';
// import { TaskFromServer } from '../../../models/task';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';     // חובה עבור mat-icon
import { MatCardModule } from '@angular/material/card';

import { TaskFromServer } from "../../../models/task";
import { TasksService } from '../../../services/TaskService';

@Component({
  selector: 'app-task-list',
  imports: [MatCard,MatCardModule,MatIconModule, MatCardContent,MatButtonModule, MatIcon,RouterModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})

export class TaskList {
  private taskDialogService = inject(TaskDialogService);
  private taskService = inject(TasksService);

  projectId = input<string>();
  status = input<string>(''); 

  // המקור היחיד לנתונים הוא ה-Service
  tasks = computed(() => {
    return this.taskService.allTasks() // חשוב: לקרוא מה-Service!
      .filter(t => t.status?.toLowerCase() === this.status().toLowerCase());
  });

  onclickCreateTask() {
    this.taskDialogService.openTaskDialog(this.projectId()!, this.status())
      .subscribe(newTask => {
        if (newTask) {
          this.taskService.createTask(newTask).subscribe(saved => {
            // מעדכנים את ה-Service!
            this.taskService.allTasks.update(list => [...list, saved]);
          });
        }
      });
  }

  onEditTask(event: Event, task: TaskFromServer) {
    event.stopPropagation(); // קריטי!
    event.preventDefault();  // קריטי כדי למנוע מה-RouterLink לפעול
    
    this.taskDialogService.openTaskDialog(this.projectId()!, task.status, task)
      .subscribe(updatedData => {
        if (updatedData) {
          this.taskService.updateTask(task.id!, updatedData).subscribe(result => {
            // מעדכנים את ה-Service!
            this.taskService.allTasks.update(list => 
              list.map(t => t.id === result.id ? result : t)
            );
          });
        }
      });
  }

  onDeleteTask(event: Event, taskId: number) {
    event.stopPropagation();
    event.preventDefault();
    if (confirm('מחיקת משימה?')) {
      this.taskService.deleteTask(taskId).subscribe(() => {
        // מעדכנים את ה-Service!
        this.taskService.allTasks.update(list => list.filter(t => t.id !== taskId));
      });
    }
  }
}