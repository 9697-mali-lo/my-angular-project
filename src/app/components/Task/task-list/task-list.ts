import { Component, computed, inject, input, Input, signal } from '@angular/core';
import { Project, projectsService } from '../../../services/projectService';
import { MatCard, MatCardContent } from "@angular/material/card";
import { MatIcon } from "@angular/material/icon";
import { TaskBoard } from '../task-board/task-board';
import { TaskDialogService } from '../../../services/TaskDialogService';
import { Task, tasksService } from '../../../services/TaskService';
import { TaskFromServer } from '../../../models/task';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  imports: [MatCard, MatCardContent, MatIcon,RouterModule],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})

export class TaskList {
  private taskDialogService = inject(TaskDialogService);
  private taskService = inject(tasksService);

  // שימוש ב-Signal Inputs לכל הפרמטרים
  projectId = input<string>();
  status = input<string>(''); 

  allTasksSignal = signal<TaskFromServer[]>([]);
  isLoading = signal(true);

  // ה-computed עכשיו מושלם - הוא יתעדכן כשהמשימות משתנות או כשהסטטוס משתנה
  tasks = computed(() => {
    const allTasks = this.allTasksSignal();
    const currentStatus = this.status(); 
    console.log(`--- בדיקת עמודה: ${currentStatus} ---`);
    console.log('Filtering tasks for status:', currentStatus, 'Total tasks:', allTasks.length);

    return allTasks.filter(t => {
      const match = t.status?.toLowerCase() === currentStatus.toLowerCase();
      if (allTasks.length > 0) {
         console.log(`משימה: ${t.title}, סטטוס במשימה: ${t.status}, האם מתאים לעמודה? ${match}`);
      }
      return match;
    });
  });

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.isLoading.set(true);
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.allTasksSignal.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading tasks:', err);
        this.isLoading.set(false);
      }
    });
  }

  onclickCreateTask() {
    console.log('Sending ID to dialog:', this.projectId());
    this.taskDialogService.openCreateTaskDialog(this.projectId()!,this.status()).subscribe(task => {
      if (task) {
        this.taskService.createTask(task).subscribe({
          next: (savedTask) => {
            console.log('המשימה נשמרה בהצלחה!', savedTask);
            
            // עדכון אופטימי: הוספת המשימה ישירות לסיגנל בלי לקרוא לשרת שוב
            this.allTasksSignal.update(currentTasks => [...currentTasks, savedTask]);
          },
          error: (err) => {
            console.error('שגיאה בשמירה:', err);
          }
        });
      }
    });
  }
  onTaskClick(task: TaskFromServer) {
  
    
  }
}