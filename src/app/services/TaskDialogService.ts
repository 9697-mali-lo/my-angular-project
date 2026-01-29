import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProject } from '../components/Projects/create-project/create-project';
import { CreateTask } from '../components/Task/create-task/create-task';

@Injectable({ providedIn: 'root' })
export class TaskDialogService {
  private dialog = inject(MatDialog);

  openCreateTaskDialog() {
    const dialogRef = this.dialog.open(CreateTask, {
      width: '500px',
      disableClose: false
    });

    return dialogRef.afterClosed();
  }
}