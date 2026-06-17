import { Component, inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms'; // הוספת ReactiveFormsModule
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskToSend, TaskUpdatePayload } from '../../../models/task';

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
    if (this.data.task) {
      // אם הגיעה משימה, ממלאים את הטופס בערכים שלה
      this.taskForm.patchValue(this.data.task);
    }
    
  }

  onSave() {
    if (this.taskForm.valid) {
      if (this.data.task) {
        const updatePayload: TaskUpdatePayload = {
          status: this.taskForm.value.status as any,
          priority: this.taskForm.value.priority as any
        };
        
        console.log('שולח לעריכה רק סטטוס ועדיפות:', updatePayload);
        this.dialogRef.close(updatePayload);
      }
      else {
        const newTask: TaskToSend = {
          ...this.taskForm.value,
          projectId: this.data.projectId,
          orderIndex: 0,
          dueDate: this.taskForm.value.dueDate?.toISOString() 
        } as TaskToSend;
  
        console.log('שומר משימה חדשה:', newTask);
        this.dialogRef.close(newTask);
      }
    }
    

    
  }
}