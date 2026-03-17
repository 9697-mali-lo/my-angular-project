import { Injectable, inject, input, signal } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProject } from '../components/Projects/create-project/create-project';
import { CreateTask } from '../components/Task/create-task/create-task';
import { TaskFromServer } from '../models/task';

@Injectable({ providedIn: 'root' })
// export class TaskDialogService {
//   private dialog = inject(MatDialog);

//   openCreateTaskDialog(projectId:string,initialStatus:string) {
//     const dialogRef = this.dialog.open(CreateTask, {
//       width: '500px',
//       data: { projectId: projectId ,status: initialStatus}
//     });

//     return dialogRef.afterClosed();
//   }
// }

export class TaskDialogService {
  private dialog = inject(MatDialog);

  // פונקציה אחת שמתאימה גם ליצירה וגם לעריכה
  openTaskDialog(projectId: string, status: string, taskToEdit?: TaskFromServer) {
    return this.dialog.open(CreateTask, {
      width: '500px',
      data: { 
        projectId, 
        status, 
        task: taskToEdit // אם קיים, נשלח אותו לדיאלוג
      }
    }).afterClosed();
  }
}