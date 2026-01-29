// import { Component, inject } from '@angular/core';
// import { projectsService } from '../../../services/projectService';
// import { MatDialogRef, MatDialogActions, MatDialogContent, MatDialogModule } from '@angular/material/dialog';
// import { FormsModule } from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatButtonModule } from '@angular/material/button';

// @Component({
//   selector: 'app-create-project',
//   imports: [
//     FormsModule, 
//     MatDialogModule, 
//     MatFormFieldModule, 
//     MatInputModule, 
//     MatButtonModule
//   ],
//   templateUrl: './create-task.html',
//   styleUrl: './create-task.css',
// })
// export class CreateTask {
//   name: string = '';
//   description: string = '';
//   team_id:number=10;
//   projectsService=inject(projectsService);
//   // הזרקת ה-Ref של הדיאלוג הנוכחי
//    private dialogRef = inject(MatDialogRef<CreateTask>);

//   oncreateProject() {
//     this.projectsService.createProjects({teamId:this.team_id,name:this.name,description:this.description}).subscribe({
//       next: (response) => {
//         // 1. סגירת החלון
//         // 2. שליחת ערך true כדי ש-TeamList יבצע loadTeams()
//         this.dialogRef.close(true); 
//         alert('פרויקט ' + this.name + ' נוצר בהצלחה!');
//       },
//       error: (err) => {
//         alert('חלה שגיאה ביצירת הפרויקט.');
//       }
//     });}
// }
import { Component, inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    MatDialogModule, FormsModule, MatFormFieldModule, MatInputModule, 
    MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule
  ],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css'
})
export class CreateTask {
  private dialogRef = inject(MatDialogRef<CreateTask>);
  data = inject(MAT_DIALOG_DATA); // מקבלים כאן את ה-projectId

  // אתחול השדות עם ערכי ברירת המחדל שביקשת
  task = {
    projectId: this.data?.projectId || 1,
    title: 'Plan campaign',
    description: 'Define channels and KPIs',
    status: 'todo',
    priority: 'high',
    assigneeId: 1,
    dueDate: new Date('2025-12-31'),
    orderIndex: 0
  };

  onSave() {
    // כאן מחזירים את האובייקט לקומפוננטה שפתחה את הדיאלוג
    this.dialogRef.close(this.task);
  }
}