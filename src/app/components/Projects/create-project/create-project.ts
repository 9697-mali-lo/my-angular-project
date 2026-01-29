
import { Component, inject } from '@angular/core';
import { projectsService } from '../../../services/projectService';
import { MatDialogRef, MatDialogActions, MatDialogContent, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-project',
  standalone: true, // וודא שזה מוגדר אם אתה משתמש ב-imports ישירים
  imports: [
    MatDialogActions,
    MatDialogContent,
    FormsModule, 
    MatDialogModule, 
    MatFormFieldModule, 
    MatInputModule, 
    MatButtonModule
  ],
  templateUrl: './create-project.html',
  styleUrl: './create-project.css',
})
export class CreateProject {
  // עדכון הטיפוס של data כך שיקבל גם null, בהתאמה ל-Service ול-Signal
  public data = inject<{ teamId: number | null }>(MAT_DIALOG_DATA);
  
  name: string = '';
  description: string = '';
 
  projectsService = inject(projectsService);
  private dialogRef = inject(MatDialogRef<CreateProject>);

  oncreateProject() {
    // יצירת ה-payload עם הנתונים העדכניים
    const payload = { 
      teamId: this.data.teamId, 
      name: this.name, 
      description: this.description 
    };

    console.log('Sending to server:', payload);

    this.projectsService.createProjects(payload).subscribe({
      next: (response) => {
        // סגירת הדיאלוג והחזרת ערך חיובי לרענון הרשימה
        this.dialogRef.close(true); 
        alert('פרויקט ' + this.name + ' נוצר בהצלחה!');
      },
      error: (err) => {
        // במידה והשרת עדיין מחזיר 400, נוכל לראות את הפירוט ב-Console
        console.error('Server error:', err);
        alert('חלה שגיאה ביצירת הפרויקט. וודא שכל השדות תקינים.');
      }
    });
  }
}