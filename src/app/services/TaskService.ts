import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

export interface Task {
  id?: number;              // נוסף על ידי השרת לאחר היצירה
  projectId: number;
  title: string;
  description: string;
  status: 'todo' | 'doing' | 'done';
  priority: 'low' | 'medium' | 'high';
  assigneeId: number;
  dueDate: string;          // נשלח כטקסט בפורמט ISO (YYYY-MM-DD)
  orderIndex: number;
}

export interface CreateTaskDto {
  title: string;
  description: string;
  projectId: number;
}
@Injectable({ providedIn: 'root' })
export class tasksService{
    private http = inject(HttpClient);
    private apiUrl = 'http://localhost:3000/api/tasks';
    getProjects() {
    
        return this.http.get<Task[]>(this.apiUrl);
      }
      createProjects(task:Task) {
     
        return this.http.post<Task>(this.apiUrl,task);
      }
}