import { Injectable, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProject } from '../components/Projects/create-project/create-project';

@Injectable({ providedIn: 'root' })
export class ProjectDialogService {
  private dialog = inject(MatDialog);

  openCreateProjectDialog(teamId: number | null) {
    return this.dialog.open(CreateProject, {
      width: '400px',
      data: { teamId: teamId } 
    }).afterClosed();
  }

 
  
}