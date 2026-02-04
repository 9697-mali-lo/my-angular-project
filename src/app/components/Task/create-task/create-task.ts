import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'; // הוספת ReactiveFormsModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskToSend } from '../../../models/task';

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [
    MatDialogModule, 
    ReactiveFormsModule, // חובה להוסיף כאן במקום FormsModule
    MatFormFieldModule, 
    MatInputModule, 
    MatSelectModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatButtonModule
  ],
  templateUrl: './create-task.html',
  styleUrl: './create-task.css'
})
export class CreateTask implements OnInit {
  private dialogRef = inject(MatDialogRef<CreateTask>);
  data = inject(MAT_DIALOG_DATA); 

  // הגדרת הטופס עם ערכי ברירת המחדל ישירות
  taskForm = new FormGroup({
    title: new FormControl('Plan campaign', Validators.required),
    description: new FormControl('Define channels and KPIs'),
    status: new FormControl(this.data.status || 'todo'),
    priority: new FormControl('high'),
    dueDate: new FormControl(new Date('2025-12-31')),
    assigneeId: new FormControl(1)
  });

  ngOnInit() {
    // ניתן לוודא כאן שה-projectId הגיע
    console.log('Project ID received:', this.data.projectId);
  }

  onSave() {
    if (this.taskForm.valid) {
      // יצירת האובייקט הסופי לשליחה מתוך ערכי הטופס + ה-projectId מה-data
      const finalTask: TaskToSend = {
        ...this.taskForm.value,
        projectId: this.data.projectId,
        orderIndex: 0,
        // המרה ל-ISO string אם השרת מצפה לפורמט הזה
        dueDate: this.taskForm.value.dueDate?.toISOString() 
      } as TaskToSend;

      console.log('שומר נתונים:', finalTask);
      this.dialogRef.close(finalTask);
    }
  }
}